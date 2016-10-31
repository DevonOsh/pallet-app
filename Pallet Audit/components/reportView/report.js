(function(pallet, $){
    var report,
        app = pallet.app = pallet.app || {};

    var choiceModel = kendo.observable({
        fields: []
    });

    palletJSDO = app.palletAuditJSDO;

    app.reportOptions = {
        onShow: function() {
            kendo.bind($(".fields"), choiceModel);

            $("#choiceButton").on("click", function() {
                app.reportOptions.widgetInit();
            });
        },
        widgetInit: function() {
            var fields = choiceModel.fields;
            for(var i = 0; i < fields.length; i++) {
                if(fields[i] == "employee") {
                    //define datasource
                    //init widgetInit
                    //show input
                }
                if(fields[i] == "route") {
                    //define datasource
                    //init widget
                    //show input
                }
                if(fields[i] == "date") {
                    //define datasource
                    //init widget
                    //show input
                }
            }
        },
        createEmpAutocomplete: function() {
            var dataSource = new kendo.data.DataSource({
                type: jsdo,
                transport: {
                    jsdo: palletJSDO
                }
            });

            $()
        },
        createRouteAutocomplete: function() {},
        createDatePicker: function() {},
        createFilter: function() {}
    }

    app.report = {
        onShow: function() {}
    }
    
})(window, jQuery);