(function(pallet, $){
    var report,
        app = pallet.app = pallet.app || {};

    var filterModel = kendo.observable({
        employee: "",
        route: "",
        date: ""
    });

    var filter = {
        pStartDate: "",
        pEndDate: ""
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
            //app.reportOptions.createEmpAutocomplete();
            //app.reportOptions.createRouteAutocomplete();
            app.reportOptions.createDatePickers();

            $("#choiceButton").on("click", function() {
                app.goToReport();
            });
        },
        //create an autocomplete that shows available employee names
        createEmpAutocomplete: function() {
            $("#empInput").kendoAutoComplete({
                dataSource: searchSource,
                dataTextField: "EMP_NAME",
                open: function(e) {
                    var item = e.item,
                        text = item.text();
                },
                change: function() {
                    var value = this.value();
                    //filter.pEmpName = value;
                }
            });
        },
        //create and autocomplete that shows available routes
        createRouteAutocomplete: function() {
            $("#routeInput").kendoAutoComplete({
                dataSource: searchSource,
                dataTextField: "ROUTE",
                change: function() {
                    var value = this.value();
                }
            });

        },
        //create a date picker to search for dates
        createDatePickers: function() {
            $("#startDateInput").kendoDatePicker({
                change: function() {
                    var value = this.value();
                    filter.pStartDate = value;
                }
            });

            $("#endDateInput").kendoDatePicker({
                change: function() {
                    var value = this.value();
                    filter.pEndDate = value;
                }
            });
        }
    } 

    app.report = {
        beforeShow: function() {
            app.report.tweakFilter();
        },
        onShow: function() {          
            //palletJSDO.fill();
            console.log(filter);
            var total;

            $("#startDisplay").html(kendo.toString(filter.pStartDate, "MM/dd/yy"));
            $("#endDisplay").html(kendo.toString(filter.pEndDate, "MM/dd/yy"));

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

                total = response.t_ttlCount;

                for (var i = 0; i < yesCounts.length; i++) {
                    noCounts[i] = total - yesCounts[i];
                }
                console.log(yesCounts);     //FIXME remove
                console.log(noCounts);      //FIXME remove    
                app.report.buildChart();
                $("#totalDisplay").html(total);     
            });      
        },
        onHide: function() {

        },
        tweakFilter: function() {
            /*var filters = [],
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
            */
            if (filter.pEndDate == "") {
                filter.pEndDate = new Date();
            }

        },
        buildChart: function() {
            $("#palletReportChart").kendoChart({
                title: {
                    text: "Pallet Audit Report Results"
                },
                series: [{
                    name: "Yes",
                    data: yesCounts,
                    color: "#3661e2"
                },
                {
                    name: "No",
                    data: noCounts,
                    color: "#9f3635"
                }],
                categoryAxis: {
                    categories: ["Mispicks","Built Well","Liquids Upright","Crushables","Meat/Chem", "Eaches","Stop seq","Wrapped well","Catch wgt","Ice cream"]
                },
                tooltip: {
                    visible: true,
                    template: "#= value #"
                }
            });
        }
    }
    
})(window, jQuery);