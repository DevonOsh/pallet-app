

// START_CUSTOM_CODE_home
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_home
(function(pallet, $){
    var audit,
        app = pallet.app = pallet.app || {},
        lastAuditID;
    
    app.auditModel = new kendo.data.ObservableObject({
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
    app.audit = {
        onShow: function() {
            //binds the model above to the inputs in the form
            kendo.bind($("#palletForm"), app.auditModel);

            var palletJSDO = app.palletAuditJSDO,
                //onAfterFill = app.audit.getReportId,
                session = app.JSDOSession,
                model = app.auditModel;

            //Attempting offline functions
            /*
            function onAfterFill(jsdo, success, request) {
                jsdo.unsubscribe('afterFill', onAfterFill);

                lastAuditID = jsdo.record.data.PALLET_ID;
                jsdo.saveLocal();
                console.log(lastAuditID);        //FIXME remove

                var hasLocal = palletJSDO.readLocal();
                if(hasLocal) {            //FIXME remove
                    let data = palletJSDO;    //FIXME remove
                    console.log(jsdo);           //FIXME remove
                }
                //alert("Record found locally: " + aRecord);
            }

            palletJSDO.subscribe('afterFill', onAfterFill);
            */

            var isOnline = session.ping({async: false});

            if(isOnline) {
                palletJSDO.fill().done(
                    function (jsdo, success, request) {
                        jsdo.saveLocal();
                    }
                );
            }
            else {
                alert("App if offline.");   //Fixme add offline here or remove
            }
            //End of offline code

            //palletJSDO.subscribe('afterFill', onAfterFill);
            //palletJSDO.fill();
            
            $("#btn-submit").on('click', function(){
                app.audit.submitAudit();
            });
            $("#btn-cancel").on('click', function() {
                app.audit.clearFields();
            });
        },
        onHide: function() {
            var palletJSDO = app.palletAuditJSDO,
                session = app.JSDOSession;
            var isOnline = session.ping({async: false});

            if(!isOnline) {
                palletJSDO.addLocalRecords(1);
            }
        },
        setReportID: function() {
            var palletJSDO = app.palletAuditJSDO;

            lastAuditID = palletJSDO.record.data.PALLET_ID;
            var newAuditID = parseInt(lastAuditID) + 1;

            app.auditModel.set("PALLET_ID", newAuditID);
        },
        setDateAndTime: function() {
            //Set the date and time in the model
            var date = app.audit.getDate();
            app.auditModel.set("STAMP_DT", date);

            var time = app.audit.getTime();
            app.auditModel.set("STAMP_TM", time);
        },
        /* Removed to test offline function
        getReportId: function(jsdo, success, request) {
            var onAfterFill = app.audit.getReportId,
                currentAuditID;

            jsdo.unsubscribe('afterFill', onAfterFill);

            var lastAuditID = jsdo.record.data.PALLET_ID;
            if(lastAuditID == null) {
                currentAuditID = 1000000000;
                app.auditModel.set("PALLET_ID", currentAuditID);
            }
            else {
                currentAuditID = parseInt(lastAuditID) + 1;
                app.auditModel.set("PALLET_ID", currentAuditID);
            }
        },
        */
        submitAudit: function() {
            var model = app.auditModel,
                palletJSDO = app.palletAuditJSDO,
                session = app.JSDOSession;

            app.audit.setDateAndTime();
            app.audit.setReportID();
            	
            palletJSDO.create(model);
            var isOnline = session.ping({async: false});
            
            if(isOnline) {
                palletJSDO.saveChanges();
                palletJSDO.acceptChanges();
                alert("Audit submitted successfully!");
            }
            else {
                palletJSDO.saveLocal();
                alert("Audit submitted successfully!");
            }
            app.audit.clearFields();
        },
        clearFields: function() {
            var model = app.auditModel;
            
            for (var field in model) {
                var value = model.get(field);
                if (typeof(value) === "boolean"){
                	model.set(field, false);
                }
                else if (typeof(value) === "string"){
                    if((field != "STAMP_DT") && (field != "STAMP_TM")) {
                        model.set(field, '');
                    }
                }
            }
        },
        getDate: function() {            
            function getMonth(date) {
            	var month = date.getMonth() + 1;
            	return month < 10 ? '0' + month : '' + month; // ('' + month) for string result
        	}
            var currentDate = new Date(),
            	yyyy = currentDate.getFullYear(),
            	mm = getMonth(currentDate),
            	dd = currentDate.getDate();
        	if (dd <= 9)
        	    dd = '0'+dd;
            
        	var formatDate = yyyy + "-" + mm + "-" + dd;
        	return formatDate;
        },
        getTime: function() {
            var currentDate = new Date(),
            	dateString = currentDate.toString();
        	var currentTime = dateString.substring(16, 21);

        	return currentTime;
        }
    }
})(window,jQuery);

// END_CUSTOM_CODE_homeModel