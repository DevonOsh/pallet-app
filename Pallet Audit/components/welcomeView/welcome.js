
// START_CUSTOM_CODE_welcomeView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

//----WELCOME SCREEN----


(function(pallet,$){
    var welcome = null,
        app = pallet.app = pallet.app || {},
        palletJSDO = app.palletAuditJSDO;
    
    app.welcomeView = {
        beforeShow: function() {
            $("#lastAuditDate").html(lastAuditDate);
            palletJSDO.setSortFields(["STAMP_DT:DESCENDING", "STAMP_TM:DESCENDING"]);
        },
        onShow: function() {          
            var name = app.userInfo.firstName;
            
            $("#firstName").html(name);
            $("#create-audit-btn").on('click', function() {
                app.goToAudit();
            });
            $("#past-audits-btn").on('click', function() {
                app.goToDataList();
            });

            palletJSDO.fill().done(
                    function (jsdo, success, request) {
                        jsdo.saveLocal();
                    }
                );
        }
    }
})(window,jQuery);

// END_CUSTOM_CODE_welcomeView