(function(pallet, $){
    var report,
        app = pallet.app = pallet.app || {};

/* Model from attempting to create a queryString for the fill event
Delete if OE dynamic query works
    var filterModel = kendo.observable({
        employee: "",
        route: "",
        date: ""
    });
    */

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

    //Create arrays for holding returned count data and easy display in the chart.
    //Initialize each array element to 0.
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
            console.log(filter);
            var total;

            $("#startDisplay").html(kendo.toString(filter.pStartDate, "MM/dd/yy"));
            $("#endDisplay").html(kendo.toString(filter.pEndDate, "MM/dd/yy"));

            //Call invoke, which returns count values for each of the logical fields in the palletAudit table
            //Store results in the count arrays.
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
                app.report.buildChart();
                $("#totalDisplay").html(total);     
            });      
        },
        onHide: function() {

        },
        //If there is no value in pEndDate, give it today's date.
        tweakFilter: function() {
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
                    template: "#= series.name #: #= value #"
                }
            });
        }
    }
    
})(window, jQuery);