(function (palletAudit, $) {
    var auditGrid = null,
        app = palletAudit.app = palletAudit.app || {};

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
                        field: "EMPLOYEE",
                        title: "Employee"
                    }
                ],
                filterable: true,
                mobile: true
            });
        }
    }

})(window, jQuery);