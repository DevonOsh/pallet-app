(function(pallet, $) {
    var auditGrid = null,
        app = pallet.app = pallet.app || {};

    var windowHeight = function() {
        return $(window).height();
    }
    var gridDataSource = new kendo.data.DataSource({
        type: "jsdo",
        transport: {
            jsdo: app.palletAuditJSDO
        }
    });
    app.auditGrid = {
        onShow: function () {
            $("#audit-grid").kendoGrid({
                dataSource: gridDataSource,
                height: windowHeight,
                scrollable: {
                    virtual: true
                },
                detailInit: app.auditGrid.onDetailInit,
                dataBound: function() {
                    this.expandRow(this.tbody.find("tr.k-master-row").first());
                },
                columns: [
                    {
                        field: "PALLET_ID",
                        title: "Pallet ID"
                    },
                    {
                        field: "PALLET_NUM",
                        title: "Pallet Number"
                    },
                    {
                        field: "ROUTE",
                        title: "Route"
                    },
                    {
                        field: "STAMP_DT",
                        format: "{0: yyyy-MM-dd}",
                        title: "Date"
                    },
                    {
                        field: "STAMP_TM",
                        title: "Time"
                    },
                    {
                        field: "EMP_NAME",
                        title: "Employee"
                    }
                ],
                filterable: true,
                mobile: true
            });
        },
        onDetailInit: function(e) {
            $("<div/>").appendTo(e.detailCell).kendoGrid({
                dataSource: {
                    type: "jsdo",
                    transport: {
                        jsdo: app.palletAuditJSDO
                    },
                    filter: { 
                        field: "PALLET_ID", 
                        operator: "eq", 
                        value: e.data.PALLET_ID 
                    }
                },
                columns: [
                    {
                        field: "MISPICKS",
                        title: "Mispicks found?"
                    },
                    {
                        field: "BUILT_WELL",
                        title: "Pallet built well?"
                    },
                    {
                        field: "CRUSHABLE",
                        title: "Crushables on bottom?"
                    },
                    {
                        field: "MEAT_CHEM",
                        title: "Meat/Chem on bottom?"
                    },
                    {
                        field: "EACHES_BOXES",
                        title: "Eaches?"
                    },
                    {
                        field: "STOP_SEQ",
                        title: "Stop seq followed?"
                    },
                    {
                        field: "WRAPPED",
                        title: "Wrapped well?"
                    },
                    {
                        field: "Catch_Wgt",
                        title: "Catch Weight?"
                    }
                ]
            });
        }
    }

})(window, jQuery);