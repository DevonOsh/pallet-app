(function(pallet,$){
	var auditList = null,
		app = pallet.app = pallet.app || {},
        id;
		
    var listDataSource = new kendo.data.DataSource({
        type: "jsdo",
        transport: {
            jsdo: app.palletAuditJSDO
        }
    });

	app.auditList = {
        //Create the list view using the Pallet Audit JSDO, on click go to the audit detail.
		onShow: function() {
            $("#auditList").kendoMobileListView({
                dataSource: listDataSource,
                template: "<h4 class='list-group-item'><span class='list-item-title'>Date:</span> #= kendo.toString(STAMP_DT, 'MM/dd/yyyy') # <span class='list-item-title'>Time:</span> #= STAMP_TM #" +
                    "<span class='glyphicon glyphicon-chevron-right pull-right'></span>" + 
                    "</h4>",
                click: function(e) {
                    id = e.dataItem.PALLET_ID;
                    app.goToDetail();
                },
                pullToRefresh: true
            });
		},
		onHide: function() {
            app.palletAuditJSDO.fill();
		}
	}

    //Model for to be bound to the detail list view
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
        Catch_Wgt: false,
        ICE_CREAM: false
    });

    app.auditListDetail = {
        //Before showing, filter the Pallet Audit JSDO 
        //using the pallet ID from selected listview item.
        beforeShow: function() {
            var jsdo = app.palletAuditJSDO;

            var auditData = jsdo.find( function(jsrecord) {
                return (jsrecord.data.PALLET_ID == id);
            });
            console.log(auditData);
            app.auditListDetail.displayList(auditData);
        },
        onHide: function() {
            app.palletAuditJSDO.fill();
        },
        //Bind an observable to the fields of the returned audit.
        displayList: function(auditResult) {
            var displayList = app.auditListDetail.displayList;
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
            model.set("ICE_CREAM", audit.ICE_CREAM);

            for (var field in model) {
                var value = model.get(field);
                if (value === true) {
                    model.set(field, "yes");
                }
                if (value === false) {
                    model.set(field, "no");
                }
            }

            console.log(app.listModel);
        }
    }
})(window, jQuery);