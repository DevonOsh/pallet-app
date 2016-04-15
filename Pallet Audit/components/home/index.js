'use strict';

app.home = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_home
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_home
(function(parent) {
    var homeModel = kendo.observable({
        fields: {
            comments: '',
            wrapped: '',
            stopSeq: '',
            eachesBoxes: '',
            meatChem: '',
            crushable: '',
            liquidsUpright: '',
            builtWell: '',
            mispicks: '',
            palletNum: '',
            route: '',
            employee: '',
            pallet: '',
        },
        submit: function() {},
        cancel: function() {}
    });

    parent.set('homeModel', homeModel);
})(app.home);

// START_CUSTOM_CODE_homeModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

/*	dataSource = new kendo.data.DataSource({
    data: [
        {comments: "Hi!", wrapped: true, pallet: "123"},
        {comments: "Boo!", wrapped: false, pallet: "345"}
    ]

})*/

var dataProvider = app.data.progressDataProvider,
    jsdoOptions = {
        name: 'Pallet_Audit',
        autoFill: false
    },
    dataSourceOptions = {
        type: 'jsdo',
        transport: {},
        error: function(e) {
            if (e.xhr) {
                alert(JSON.stringify(e.xhr));
            }
        }
    },
    jsdo = new progress.data.JSDO(jsdoOptions),
    dataSource = new kendo.data.DataSource(dataSourceOptions);

app.home.homeModel.dataSource = dataSource;
app.home.homeModel._dataSourceOptions = dataSourceOptions;
app.home.homeModel._jsdoOptions = jsdoOptions;

app.home.homeModel.submit = function() {
    var model = app.home.homeModel,
        fields = model.get("fields");

    dataSource.add({
        COMMENTS: fields.comments,
        WRAPPED: fields.wrapped,
        PALLET_ID: fields.pallet
    });

}

if (typeof dataProvider.sbProviderReady === 'function') {
    dataProvider.sbProviderReady(function dl_sbProviderReady() {
        parent.set('homeModel', homeModel);
    });
} else {
    parent.set('homeModel', homeModel);
}

app.home.onShow = function(e) {
    var param = e.view.params.filter ? JSON.parse(e.view.params.filter) : null;

    dataProvider.loadCatalogs().then(function _catalogsLoaded() {
        var jsdoOptions = homeModel.get('_jsdoOptions'),
            jsdo = new progress.data.JSDO(jsdoOptions),
            dataSourceOptions = homeModel.get('_dataSourceOptions'),
            dataSource;

        dataSourceOptions.transport.jsdo = jsdo;
        dataSource = new kendo.data.DataSource(dataSourceOptions);
        homeModel.set('dataSource', dataSource);
        fetchFilteredData(param);
    });
};

// END_CUSTOM_CODE_homeModel