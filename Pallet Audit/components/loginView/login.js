var lastAuditDate = 'unknown';

(function (pallet, $) {
    var app = pallet.app = pallet.app || {};

    app.userInfo = {
        firstName: "",
        lastName: "",
        userName: ""
    }

    app.loginViewModel = kendo.observable({
        userName: '',
        password: '',
        validateData: function (data) {
            if (!data.userName) {
                alert('Missing userName');
                return false;
            }

            if (!data.password) {
                alert('Missing password');
                return false;
            }

            return true;
        },
        onShow: function () {
            app.JSDOSession.addCatalog(app.JSDOSettings.catalogURIs);
            app.mobileUserJSDO.fill();
            app.loginViewModel.getLastAuditDate();
        },
        signin: function () {
            var model = app.loginViewModel,
                userName = model.userName,
                password = model.password;

            if (!model.validateData(model)) {
                return false;
            }

            var user;

            user = app.mobileUserJSDO.find(function (jsrecord) {
                return (jsrecord.data.USERNAME == userName);
            });

            var USERNAME, PASSWORD;

            try {
                if (user == null)
                    throw new Error("Invalid Username");
                else {
                    USERNAME = user.data.USERNAME,
                    PASSWORD = user.data.PASSWORD
                }
                if (!(PASSWORD == password))
                    throw new Error("Invalid Password");
                if ((USERNAME == userName) && (PASSWORD == password)) {
                    app.userInfo.firstName = user.data.FIRST_NAME;
                    app.userInfo.lastName = user.data.LAST_NAME;
                    app.userInfo.userName = USERNAME;
                    app.goToWelcome();
                }
            } catch (exception) {
                $("#errorMessage").html("<p>" + exception.message + "</p>");
                $("#errorMessage").css("visibility", "visible");
            }
        },
        logout: function () {
            $("#logout-window").kendoMobileModalView("open");
        },
        yesLogout: function () {
            app.loginViewModel.userName = '';
            app.loginViewModel.password = '';
            app.goToLogin();
        },
        noLogout: function() {
			$("#logout-window").kendoMobileModalView("close");
        },
        getLastAuditDate: function() {
            var onAfterFill = app.loginViewModel.onAfterFill,
                palletJSDO = app.palletAuditJSDO;
            palletJSDO.subscribe('afterFill', onAfterFill);
            palletJSDO.autoSort = true;
            palletJSDO.setSortFields(["STAMP_DT:DESCENDING"]);
            palletJSDO.fill();
        },
        onAfterFill: function(jsdo, succes, request) {
            lastAuditDate = jsdo.record.data.STAMP_DT;
        }
    });

})(window, jQuery);