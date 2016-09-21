

(function (palletAudit, $) {
    var auditData = null,
        app = palletAudit.app = palletAudit.app || {};

    app.auditData = {

        onShow: function () {
            var date1 = new Date(2016, 6, 12),
                date2 = new Date(2016, 5, 31),
                date3 = new Date(2016, 6, 25),
                date4 = new Date(2016, 7, 1),
                date5 = new Date(2016, 6, 20);
            
            var dataSource = new kendo.data.DataSource({
                data: [
                    { 
                        MISPICKS: true,
                        BUILT_WELL: true,
                        STAMP_DT: date1
                    },
                   	{ 
                        MISPICKS: true,
                        BUILT_WELL: false,
                        STAMP_DT: date2
                    },
                    { 
                        MISPICKS: false,
                        BUILT_WELL: true,
                        STAMP_DT: date3
                    },
                    { 
                        MISPICKS: false,
                        BUILT_WELL: false,
                        STAMP_DT: date4
                    },
                    { 
                        MISPICKS: true,
                        BUILT_WELL: true,
                        STAMP_DT: date5
                    }
                ]
            });
            
            var yesCount = 0,
                noCount = 0;
            
            dataSource.query({
                sort: {
                    field: "STAMP_DT",
                    dir: "desc"
                }
            }).then(function(e){
                var view = dataSource.view();
                for(var i=0; i < view.length; i++) {
                    if(view[i].MISPICKS === true)
                        yesCount++;
                    else
                        noCount++;
                }
                console.log("Yes count = " +  yesCount +
                           "\nNo count = " + noCount);
            });
            
            $("#chart").kendoChart({
                title: {
                    text: "Audit Data"
                },
                series: [
                    {name: "Yes", data: yesCount},
                    {name: "No", data: [10, 11, 12, 9]}
                ]
            });
        }
    }

})(window, jQuery);