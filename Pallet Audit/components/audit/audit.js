

// START_CUSTOM_CODE_home
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_home
(function(pallet, $){
    var audit,
        app = pallet.app = pallet.app || {};
    
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
        /*_reset: function() {
            this.set('PALLET_ID', '');
            this.set('EMP_NAME', '');
            this.set('PALLET_NUM', '');
            this.set('ROUTE', '');
            this.set('STAMP_DT', '');
            this.set('STAMP_TM', '');
            this.set('COMMENTS', '');
            this.set('MISPICKS','false');
            this.set('BUILT_WELL','false');
            this.set('LIQUIDS_UPRIGHT','false');
            this.set('CRUSHABLE','false');
            this.set('MEAT_CHEM','false');
            this.set('EACHES_BOXES','false');
            this.set('STOP_SEQ','false');
            this.set('WRAPPED','false');
            this.set('Catch_Wgt','false');
        }
        */
    });
    app.audit = {
        onShow: function() {
            //binds the model above to the inputs in the form
            kendo.bind($("#palletForm"), app.auditModel);
            
            //Set the date and time in the model.
            var date = app.audit.getDate();
            app.auditModel.set("STAMP_DT", date);
            
            var time = app.audit.getTime();
            app.auditModel.set("STAMP_TM", time);
            
            $("#btn-submit").on('click', function(){
                app.audit.submitAudit();
            });
            $("#btn-cancel").on('click', function() {
                app.audit.clearFields();
            });
        },
        submitAudit: function(){
            var model = app.auditModel,
                palletJSDO = app.palletAuditJSDO;
            	
            palletJSDO.create(model);
            palletJSDO.saveChanges();

            alert("Audit submitted successfully!");
            app.audit.clearFields();
        },
        clearFields: function() {
            var model = app.auditModel;
            
            for (var field in model) {
                var value = model.get(field);
                console.log(value);
                if (typeof(value) === "boolean"){
                    console.log("I have set a bool field.");
                	model.set(field, false);
                }
                else if (typeof(value) === "string"){
                    if((field != "STAMP_DT") && (field != "STAMP_TM")) {
                        model.set(field, '');
                        console.log("I have set a string field.");
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