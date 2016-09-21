(function (palletAudit, $) {
    var auditGrid = null,
        app = palletAudit.app = palletAudit.app || {};

    app.auditGrid = {

        onShow: function () {
            $("#grid").kendoGrid({
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
                        title: "Date"
                    },
                    {
                        field: "EMPLOYEE",
                        title: "Employee"
                    }
                ],
                dataSource: [
                    {
                        PALLET_ID: "000001",
                        PALLET_NUM: "A1",
                        ROUTE: "111",
                        STAMP_DT: "2016-06-22",
                        EMPLOYEE: "Devon"
                        },
                    {
                        PALLET_ID: "000002",
                        PALLET_NUM: "B1",
                        ROUTE: "222",
                        STAMP_DT: "2016-06-22",
                        EMPLOYEE: "Cody"
                        },
                    {
                        PALLET_ID: "000003",
                        PALLET_NUM: "C2",
                        ROUTE: "123",
                        STAMP_DT: "2016-06-22",
                        EMPLOYEE: "Stephen"
                        },
                    {
                        PALLET_ID: "000004",
                        PALLET_NUM: "D2",
                        ROUTE: "234",
                        STAMP_DT: "2016-06-22",
                        EMPLOYEE: "Robin"
                        }
                ],
                filterable: true,
                columnMenu: true,
                mobile: "phone"
            });
        }
    }

})(window, jQuery);