(function(pallet,$){
	var auditList = null,
		app = pallet.app = pallet.app || {},
        id;
		
    var listDataSource = new kendo.data.DataSource({
        type: "jsdo",
        transport: {
            jsdo: app.palletAuditJSDO
        },
        sort: { field: "STAMP_DT", dir: "desc" }
    });

	app.auditList = {
		onShow: function() {
            $("#auditList").kendoMobileListView({
                dataSource: listDataSource,
                template: "<h4>#= kendo.toString(STAMP_DT, 'MM/dd/yyyy') #</h4>",
                click: function(e) {
                    id = e.dataItem.PALLET_ID;
                    app.goToDetail();
                }
            });
		},
		onHide: function() {
		}
	}

    app.listModel = new kendo.data.ObservableObject({
        PALLET_ID: '',
        EMP_NAME: '',
        PALLET_NUM: '',
        ROUTE: '',
        STAMP_DT: '',
        STAMP_TM: '',
        MISPICKS: false,
        BUILT_WELL: false,
        LIQUIDS_UPRIGHT: false,
        CRUSHABLE: false,
        MEAT_CHEM: false,
        EACHES_BOXES: false,
        STOP_SEQ: false,
        WRAPPED: false,
        COMMENTS: '',
        Catch_Wgt: false
    });

    app.auditListDetail = {
        beforeShow: function() {
            var jsdo = app.palletAuditJSDO;

            auditData = jsdo.find( function(jsrecord) {
                return (jsrecord.data.PALLET_ID == id);
            });

            console.log(auditData);
            //var auditData = dataSource.view(); FIXME remove if fix works
            app.auditListDetail.displayList(auditData);
        },
        onHide: function() {
        },
        displayList: function(auditResult) {
            var model = app.listModel,
                audit = auditResult.data;
            
            var date = kendo.toString(audit.STAMP_DT, 'MM/dd/yyyy');

            model.set("PALLET_ID", audit.PALLET_ID);
            model.set("STAMP_DT", date);            
            model.set("STAMP_TM", audit.STAMP_TM);
            model.set("EMP_NAME", audit.EMP_NAME);
            model.set("ROUTE", audit.ROUTE);
            model.set("PALLET_NUM", audit.PALLET_NUM);
            model.set("MISPICKS", audit.MISPICKS);
            model.set("BUILT_WELL", audit.BUILT_WELL);
            model.set("LIQUIDS_UPRIGHT", audit.LIQUIDS_UPRIGHT);
            model.set("CRUSHABLE", audit.CRUSHABLE);
            model.set("MEAT_CHEM", audit.MEAT_CHEM);
            model.set("EACHES_BOXES", audit.EACHES_BOXES);
            model.set("STOP_SEQ", audit.STOP_SEQ);
            model.set("WRAPPED", audit.WRAPPED);
            model.set("Catch_Wgt", audit.Catch_Wgt);
            model.set("COMMENTS", audit.COMMENTS);
        }
    }
})(window, jQuery);