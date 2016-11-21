
// START_CUSTOM_CODE_kendoUiMobileApp
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes



(function (pallet) {
    var application,
        app = pallet.app = pallet.app || {};

    document.addEventListener("deviceready", function () {
        navigator.splashscreen.hide();
        application = new kendo.mobile.Application(
            document.body, {
                initial: "components/loginView/loginView.html",
                transition: "",
                layout: "",
                skin: "flat"
            }
        );
        var element = document.getElementById('appDrawer');
            if (typeof(element) != 'undefined' && element !== null) {
                if (window.navigator.msPointerEnabled) {
                    $('#navigation-container').on('MSPointerDown', 'a', function(event) {
                        app.keepActiveState($(this));
                    });
                } else {
                    $('#navigation-container').on('touchstart', 'a', function(event) {
                        app.keepActiveState($(this).closest('li'));
                    });
                }
            }
        //This line is here to allow the modal to be called from any view
        kendo.mobile.init(application.element.children("[data-role=modalview]"));
    });
    
    app.keepActiveState = function _keepActiveState(item) {
        var currentItem = item;
        $('#navigation-container li.active').removeClass('active');
        currentItem.addClass('active');
    };
    
    //JSDO Settings and Session creation
    app.JSDOSettings = {
        "serviceURI": "http://10.0.1.239:8810/Pallet_Audit2",
        "catalogURIs": "http://10.0.1.239:8810/Pallet_Audit2/static/Pallet_Audit2Service.json",
        "authenticationModel":"anonymous"
    };
    app.JSDOSession = new progress.data.Session();
    app.JSDOSession.login(app.JSDOSettings.serviceURI);
    app.JSDOSession.addCatalog(app.JSDOSettings.catalogURIs);
    
    //Create PalletAudit and MobileUser JSDOs
    app.palletAuditJSDO = new progress.data.JSDO({
        name: "Pallet_Audit"
    });
    app.palletAuditJSDO.autoSort = true;
    //Mobile users JSDO
    app.mobileUserJSDO = new progress.data.JSDO({
        name: "Mobile_User"
    });
    //PICK_LABEL_DETAIL
    app.pickDetailJSDO = new progress.data.JSDO({
        name: "Pick_Label_Detail"
    });
    
    //App navigation functions
    app.goToWelcome = function() {
        application.navigate("components/welcomeView/welcomeView.html");
    }
    app.goToLogin = function() {
        application.navigate("components/loginView/loginView.html");
    }
    app.goToAudit = function() {
        application.navigate("components/audit/auditView.html");
    }
    app.goToGrid = function() {
        application.navigate("components/auditGridView/auditGridView.html");
    }
    app.goToDataList = function() {
        application.navigate("components/auditDataList/auditListView.html")
    }
    app.goToDetail = function(palletId) {
        application.navigate("components/auditDataList/auditDetailView.html");
    }
    app.goToReport = function() {
        application.navigate("components/reportView/reportView.html");
    }
    app.goToReportOptions = function() {
        application.navigate("components/reportView/reportOptionsView.html");
    }
})(window);

// END_CUSTOM_CODE_kendoUiMobileApp