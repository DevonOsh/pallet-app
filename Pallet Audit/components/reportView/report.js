(function(pallet, $){
    var report,
        app = pallet.app = pallet.app || {};

    var filterModel = kendo.observable({
        employee: "",
        route: "",
        date: ""
    });

    var palletJSDO = app.palletAuditJSDO;

    var dataSource = new kendo.data.DataSource({
        type: "jsdo",
        transport: {
            jsdo: palletJSDO
        }
    });

    var yesCounts = [0,0,0,0,0,0,0,0,0,0];
    var noCounts = [0,0,0,0,0,0,0,0,0,0];     

    app.reportOptions = {
        onShow: function() {
            app.reportOptions.createEmpAutocomplete();
            app.reportOptions.createRouteAutocomplete();
            app.reportOptions.createDatePicker();

            $("#choiceButton").on("click", function() {
                app.goToReport();
            });
        },
        widgetInit: function() {
        },
        createEmpAutocomplete: function() {
            $("#empInput").kendoAutoComplete({
                dataSource: dataSource,
                dataTextField: "EMP_NAME",
                change: function() {
                    var value = this.value();
                    filterModel.set("employee", value);
                }
            });
        },
        createRouteAutocomplete: function() {
            $("#routeInput").kendoAutoComplete({
                dataSource: dataSource,
                dataTextField: "ROUTE",
                change: function() {
                    var value = this.value();
                    filterModel.set("route", value);
                }
            });
        },
        createDatePicker: function() {
            $("#dateInput").kendoDatePicker({
                change: function() {
                    var value = this.value();
                    value = kendo.toString(value,"MM/dd/yy");
                    console.log(value);
                    filterModel.set("date", value);
                }
            });
        }
    }

    app.report = {
        onShow: function() {
            //var filter = app.report.createFilter();

            palletJSDO.subscribe('AfterFill', app.report.countData);
            palletJSDO.fill();
            var name = "Devon Osh";

            palletJSDO.invoke("countEntries");

            app.report.buildChart();
        },
        onHide: function() {
            palletJSDO.unsubscribe('AfterFill', app.report.countData);
        },
        createFilter: function() {
            var filters = [],
                relational = " AND ",
                filterString = "";

            for (var field in filterModel) {
                var value = filterModel.get(field);
                if (value != "") {
                    if(field == "employee") {
                        filters.push("EMP_NAME = " + value);
                    }
                    if(field == "route") {
                        filters.push("ROUTE = " + value);
                    }
                    if(field == "date") {
                        filters.push("STAMP_DT = " + value);
                    }
                }
            }

            filterString = filters.join(" AND ");

            console.log(filterString);          //FIXME remove
            console.log(typeof filterString);   //FIXME remove
            return filterString;
        },
        countData: function(jsdo, success, request) {
            var fields = ["MISPICKS","BUILT_WELL","LIQUIDS_UPRIGHT","CRUSHABLE","MEAT_CHEM","EACHES_BOXES","STOP_SEQ","WRAPPED","Catch_Wgt","ICE_CREAM"];       

            jsdo.foreach(
                function(entry) {
                    for(var i = 0; i < fields.length; i++) {
                        if (entry.data[fields[i]] == true) {
                            yesCounts[i] = yesCounts[i] + 1;
                        }
                        else if (entry.data[fields[i]] == false) {
                            noCounts[i] = noCounts[i] + 1;
                        }
                    }
                }
            )

            console.log(yesCounts);
            console.log(noCounts);
        },
        buildChart: function() {
            $("#palletReportChart").kendoChart({
                title: {
                    text: "Pallet Audit Report Results"
                },
                series: [{
                    name: "Yes"
                },
                {
                    name: "No"
                }],
                categoryAxis: {
                    categories: ["Mispicks","Built Well","Liquids Upright","Crushables on bottom","Meat/Chem on bottom", "Eaches in boxes","Stop seq followed","Wrapped well","Catch wgt accurate","Ice cream insulated"]
                }
            });
        }
    }
    
})(window, jQuery);