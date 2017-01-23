var lastAuditDate = 'unknown';

(function (pallet, $) {
    var app = pallet.app = pallet.app || {};

    //Object for storing user info for use throughout the app.
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
        //Fill with data from mobile user table
        //Set sort fields on the pallet audit jsdo
        onShow: function () {
            app.mobileUserJSDO.fill();
            app.palletAuditJSDO.autoSort = true;
            app.palletAuditJSDO.setSortFields(["STAMP_DT:DESCENDING", "STAMP_TM:DESCENDING"]);
        },
        //Unsubscribe from the fill event to prevent unwanted firings of onAfterFill
        onHide: function () {
            var palletJSDO = app.palletAuditJSDO,
                onAfterFill = app.loginViewModel.onAfterFill;

            palletJSDO.unsubscribe('afterFill', onAfterFill);
        },
        //Validate user inputs against content of the mobile user table
        //On successful login, get the date of the last audit to be displayed on welcome page
        //as well as set the contents of the user object
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
                    app.loginViewModel.getLastAuditDate();
                    app.goToWelcome();
                }
            } catch (exception) {
                $("#errorMessage").html("<p>" + exception.message + "</p>");
                $("#errorMessage").css("visibility", "visible");
            }
        },
        //Open the logout modal
        logout: function () {
            $("#logout-window").kendoMobileModalView("open");
            //Testing adding logout buttons functions through jQuery.
            $("#yes-logout-btn").on('click', function() {
                app.loginViewModel.yesLogout();
                });
            $("#no-logout-btn").on('click', function() {
                app.loginViewModel.noLogout();
                });
        },
        //Clear the user info and go back to login page
        yesLogout: function () {
            app.loginViewModel.userName = '';
            app.loginViewModel.password = '';
            app.goToLogin();
        },
        //close the modal
        noLogout: function () {
            $("#logout-window").kendoMobileModalView("close");
        },
        //The following two function grab the first record in the jsdo, 
        //which should be the most recent record
        //since the jsdo has been sorted
        getLastAuditDate: function () {
            var onAfterFill = app.loginViewModel.onAfterFill,
                palletJSDO = app.palletAuditJSDO;
            palletJSDO.subscribe('afterFill', onAfterFill);
            palletJSDO.fill();
        },
        onAfterFill: function (jsdo, succes, request) {
            lastAuditDate = jsdo.record.data.STAMP_DT;
        }
    });

})(window, jQuery);