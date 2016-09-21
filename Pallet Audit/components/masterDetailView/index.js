'use strict';

app.masterDetailView = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_masterDetailView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_masterDetailView
(function(parent) {
    var dataProvider = app.data.progressDataProvider,
        fetchFilteredData = function(paramFilter, searchFilter) {
            var model = parent.get('masterDetailViewModel'),
                dataSource = model.get('dataSource');

            if (paramFilter) {
                model.set('paramFilter', paramFilter);
            } else {
                model.set('paramFilter', undefined);
            }

            if (paramFilter && searchFilter) {
                dataSource.filter({
                    logic: 'and',
                    filters: [paramFilter, searchFilter]
                });
            } else if (paramFilter || searchFilter) {
                dataSource.filter(paramFilter || searchFilter);
            } else {
                dataSource.filter({});
            }
        },
        jsdoOptions = {
            name: 'Pallet_Audit',
            autoFill: false
        },
        dataSourceOptions = {
            type: 'jsdo',
            transport: {},
            error: function(e) {
                if (e.xhr) {
                    console.log(e.xhr);
                }
            },
            schema: {
                model: {
                    fields: {
                        'STAMP_DT': {
                            field: 'STAMP_DT',
                            defaultValue: ''
                        },
                        'EMP_NAME': {
                            field: 'EMP_NAME',
                            defaultValue: ''
                        },
                    }
                }
            },
            serverFiltering: true,
        },
        dataSource = new kendo.data.DataSource({
            pageSize: 50
        }),
        masterDetailViewModel = kendo.observable({
            dataSource: dataSource,
            _dataSourceOptions: dataSourceOptions,
            _jsdoOptions: jsdoOptions,
            searchChange: function(e) {
                var searchVal = e.target.value,
                    searchFilter;

                if (searchVal) {
                    searchFilter = {
                        field: 'STAMP_DT',
                        operator: 'contains',
                        value: searchVal
                    };
                }
                fetchFilteredData(masterDetailViewModel.get('paramFilter'), searchFilter);
            },
            itemClick: function(e) {

                app.mobileApp.navigate('#components/masterDetailView/details.html?uid=' + e.dataItem.uid);

            },
            addClick: function() {
                app.mobileApp.navigate('#components/masterDetailView/add.html');
            },
            detailsShow: function(e) {
                var item = e.view.params.uid,
                    dataSource = masterDetailViewModel.get('dataSource'),
                    itemModel = dataSource.getByUid(item);

                if (!itemModel.STAMP_DT) {
                    itemModel.STAMP_DT = String.fromCharCode(160);
                }

                masterDetailViewModel.set('currentItem', null);
                masterDetailViewModel.set('currentItem', itemModel);
            },
            currentItem: null
        });

    parent.set('addItemViewModel', kendo.observable({
        onShow: function(e) {
            // Reset the form data.
            this.set('addFormData', {
                createComments: '',
                createWrapped: '',
                createStopSeq: '',
                createEachesBoxes: '',
                createMeatChem: '',
                createCrushable: '',
                createLiquidsUpright: '',
                createBuiltWell: '',
                createMispicks: '',
                createRoute: '',
                createPalletNum: '',
                createPallet: '',
            });
        },
        onSaveClick: function(e) {
            var addFormData = this.get('addFormData'),
                dataSource = masterDetailViewModel.get('dataSource');

            dataSource.add({
                COMMENTS: addFormData.createComments,
                WRAPPED: addFormData.createWrapped,
                STOP_SEQ: addFormData.createStopSeq,
                EACHES_BOXES: addFormData.createEachesBoxes,
                MEAT_CHEM: addFormData.createMeatChem,
                CRUSHABLE: addFormData.createCrushable,
                LIQUIDS_UPRIGHT: addFormData.createLiquidsUpright,
                BUILT_WELL: addFormData.createBuiltWell,
                MISPICKS: addFormData.createMispicks,
                ROUTE: addFormData.createRoute,
                PALLET_NUM: addFormData.createPalletNum,
                PALLET_ID: addFormData.createPallet,
            });

            dataSource.one('change', function(e) {
                app.mobileApp.navigate('#:back');
            });

            dataSource.sync();
        }
    }));

    if (typeof dataProvider.sbProviderReady === 'function') {
        dataProvider.sbProviderReady(function dl_sbProviderReady() {
            parent.set('masterDetailViewModel', masterDetailViewModel);
        });
    } else {
        parent.set('masterDetailViewModel', masterDetailViewModel);
    }

    parent.set('onShow', function(e) {
        var param = e.view.params.filter ? JSON.parse(e.view.params.filter) : null;

        dataProvider.loadCatalogs().then(function _catalogsLoaded() {
            var jsdoOptions = masterDetailViewModel.get('_jsdoOptions'),
                jsdo = new progress.data.JSDO(jsdoOptions),
                dataSourceOptions = masterDetailViewModel.get('_dataSourceOptions'),
                dataSource;

            dataSourceOptions.transport.jsdo = jsdo;
            dataSource = new kendo.data.DataSource(dataSourceOptions);
            masterDetailViewModel.set('dataSource', dataSource);
            fetchFilteredData(param);
        });
    });
})(app.masterDetailView);

// START_CUSTOM_CODE_masterDetailViewModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes




// you can handle the beforeFill / afterFill events here. For example:
/*
app.masterDetailView.masterDetailViewModel.get('_jsdoOptions').events = {
    'beforeFill' : [ {
        scope : app.masterDetailView.masterDetailViewModel,
        fn : function (jsdo, success, request) {
            // beforeFill event handler statements ...
        }
    } ]
};
*/
// END_CUSTOM_CODE_masterDetailViewModel