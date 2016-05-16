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
        var jsdo = new progress.data.JSDO({name: 'Pallet_Audit'});
		jsdo.autoSort = true;
        jsdo.setSortFields( "STAMP_DT:DESC" );
        jsdo.fill();
    });

})(app.welcomeView);


// END_CUSTOM_CODE_welcomeView