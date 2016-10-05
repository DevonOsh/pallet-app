
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
})(window);

// END_CUSTOM_CODE_kendoUiMobileApp


/*'use strict';

(function() {
    var app = {
        data: {}
    };

    var bootstrap = function() {
        $(function() {
            app.mobileApp = new kendo.mobile.Application(document.body, {
                skin: 'flat',
                initial: 'components/loginView/loginView.html'
            });
        });
    };

    if (window.cordova) {
        document.addEventListener('deviceready', function() {
            if (navigator && navigator.splashscreen) {
                navigator.splashscreen.hide();
            }

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

            bootstrap();
        }, false);
    } else {
        bootstrap();
    }

    app.keepActiveState = function _keepActiveState(item) {
        var currentItem = item;
        $('#navigation-container li.active').removeClass('active');
        currentItem.addClass('active');
    };

    window.app = app;

    app.isOnline = function() {
        if (!navigator || !navigator.connection) {
            return true;
        } else {
            return navigator.connection.type !== 'none';
        }
    };
    
    app.JSDOSettings = {
        "serviceURI": "http://10.0.1.239:8810/Pallet_Audit2",
        "catalogURIs": "http://10.0.1.239:8810/Pallet_Audit2/static/Pallet_Audit2Service.json",
        "authenticationModel":"anonymous"
    };
    app.JSDOSession = new progress.data.Session();
    app.JSDOSession.login(app.JSDOSettings.serviceURI);
    app.JSDOSession.addCatalog(app.JSDOSettings.catalogURI);
    
    app.palletAuditJSDO = new progress.data.JSDO({
        name: "Pallet_Audit2"
    });
    app.mobileUserJSDO = new progress.data.JSDO({
        name: "Mobile_User"
    });
    
}());
*/