
// START_CUSTOM_CODE_welcomeView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

//----WELCOME SCREEN----


(function(pallet,$){
    var welcome = null,
        app = pallet.app = pallet.app || {},
        palletJSDO = app.palletAuditJSDO;
    
    app.welcomeView = {
        beforeShow: function() {
            //Fill and sort the pallet JSDO in descending order by date
            //var onAfterFill = app.welcomeView.getLastAuditDate;
            //palletJSDO.subscribe('afterFill', onAfterFill);
            //palletJSDO.autoSort = true;
            //palletJSDO.setSortFields(["STAMP_DT:DESCENDING"]);
            //palletJSDO.fill();

            $("#lastAuditDate").html(lastAuditDate);
        },
        onShow: function() {          
            var name = app.userInfo.firstName;
            
            $("#firstName").html(name);
        }
        //getLastAuditDate: function(jsdo, success, request) {
        //    lastAuditDate = jsdo.record.data.STAMP_DT;
        //},
        //onHide: function() {
        //    var onAfterFill = app.welcomeView.getLastAuditDate;
        //    palletJSDO.unsubscribe('afterFill', onAfterFill);
        //}
    }
})(window,jQuery);

// END_CUSTOM_CODE_welcomeView