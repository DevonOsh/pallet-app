(function(pallet, $){
    var report,
        app = pallet.app = pallet.app || {};

    var filterModel = kendo.observable({
        employee: "",
        route: "",
        date: ""
    });

    var filter = {
        pEmpName: ""
    };

    var palletJSDO = app.palletAuditJSDO;

    var searchSource = new kendo.data.DataSource({
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
                dataSource: searchSource,
                dataTextField: "EMP_NAME",
                change: function() {
                    var value = this.value();
                    filter.pEmpName = value;
                }
            });
        },
        createRouteAutocomplete: function() {
            $("#routeInput").kendoAutoComplete({
                dataSource: searchSource,
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
                    filterModel.set("date", value);
                }
            });
        }
    } 

    app.report = {
        onShow: function() {          
            palletJSDO.subscribe('AfterFill', app.report.countData);
            palletJSDO.fill();
            var name = "Devon Osh";

            palletJSDO.invoke("countEntries", filter).done(function(jsdo, success, request){
                var response = request.response.ttCount.ttCount[0];

                yesCounts[0] = response.t_mPick;
                yesCounts[1] = response.t_bWell;
                yesCounts[2] = response.t_lUpright;
                yesCounts[3] = response.t_crushable;
                yesCounts[4] = response.t_mChem;
                yesCounts[5] = response.t_eBoxes;
                yesCounts[6] = response.t_sSeq;
                yesCounts[7] = response.t_wrapped;
                yesCounts[8] = response.t_cWeight;
                yesCounts[9] = response.t_iCream;

                var total = response.t_ttlCount;

                for (var i = 0; i < yesCounts.length; i++) {
                    noCounts[i] = total - yesCounts[i];
                }
                console.log(yesCounts);     //FIXME remove
                console.log(noCounts);      //FIXME remove    
                app.report.buildChart();
            });           
        },
        onHide: function() {

        },
        createFilter: function() {
            var filters = [],
                relational = " AND ",
                filterString = "";

            for (var field in filterModel) {
                var value = filterModel.get(field);
                if (value != "") {
                    if(field == "employee") {
                        //filters.push("EMP_NAME = " + value);
                        filters.push({field: "EMP_NAME", operator: "eq", value: value});
                    }
                    if(field == "route") {
                        //filters.push("ROUTE = " + value);
                        filters.push({field: "ROUTE", operator: "eq", value: value});
                    }
                    if(field == "date") {
                        //filters.push("STAMP_DT = " + value);
                        filters.push({field: "STAMP_DT", operator: "eq", value: value});
                    }
                }
            }

            return filters;
        },
        countData: function(jsdo, success, request) {
             
        },
        buildChart: function() {
            $("#palletReportChart").kendoChart({
                title: {
                    text: "Pallet Audit Report Results"
                },
                series: [{
                    name: "Yes",
                    data: yesCounts
                },
                {
                    name: "No",
                    data: noCounts
                }],
                categoryAxis: {
                    categories: ["Mispicks","Built Well","Liquids Upright","Crushables","Meat/Chem", "Eaches","Stop seq","Wrapped well","Catch wgt","Ice cream"]
                }
            });
        }
    }
    
})(window, jQuery);