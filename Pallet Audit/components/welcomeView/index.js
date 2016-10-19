'use strict';

app.welcomeView = kendo.observable({
    onShow: function () {},
    afterShow: function () {}
});

// START_CUSTOM_CODE_welcomeView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

/*----WELCOME SCREEN----*/

(function (parent) {

var dataProvider = app.data.progressDataProvider;
    dataProvider.loadCatalogs().then(function _catalogsLoaded() {
        var jsdo = new progress.data.JSDO({name: 'Pallet_Audit'}),
            lastDate,
            pallet;
		jsdo.sort(["PALLET_ID:DESC"]);
        jsdo.fill().done(function(jsdo, success, request) {
            if (success) {
                var item = request.response.dsPALLET_AUDIT.ttPALLET_AUDIT[0];
                    lastDate = item.STAMP_DT;
                	pallet = item.PALLET_ID;
                alert(lastDate + " " + pallet);
            }
        }).fail(function() {
            lastDate = "No entry found";
            alert(lastDate);
        });
    });
    
})(app.welcomeView);


// END_CUSTOM_CODE_welcomeView