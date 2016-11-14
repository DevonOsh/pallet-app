

// START_CUSTOM_CODE_home
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_home
(function (pallet, $) {
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
        Catch_Wgt: false,
        ICE_CREAM: false
    });
    app.audit = {
        onShow: function () {
            //binds the model above to the inputs in the form
            kendo.bind($("#palletForm"), app.auditModel);

            var palletJSDO = app.palletAuditJSDO,
                onAfterFill = app.audit.getReportId;

            palletJSDO.subscribe('afterFill', onAfterFill);
            palletJSDO.fill();

            $("#btn-submit").on('click', function () {
                app.audit.submitAudit();
            });
            $("#btn-cancel").on('click', function () {
                app.audit.clearFields();
            });

            //Trying to make enter go to next input, must be tested yet
            $("input").on("keyup", function (e) {
                if (e.keycode == 13) {
                    $(this).next("input").focus();
                }
            });
        },
        validateData: function () {
        },
        setDateAndTime: function () {
            //Set the date and time in the model
            var date = app.audit.getDate();
            app.auditModel.set("STAMP_DT", date);

            var time = app.audit.getTime();
            app.auditModel.set("STAMP_TM", time);
        },
        submitAudit: function () {
            var model = app.auditModel,
                palletJSDO = app.palletAuditJSDO;

            app.audit.setDateAndTime();

            var validator = $("#palletForm").kendoValidator().data("kendoValidator");

            if (validator.validate()) {
                palletJSDO.create(model);
                palletJSDO.saveChanges();

                alert("Audit submitted successfully!");
                app.audit.clearFields();
            }
            else {
                alert("Please complete the form.");
            }
        },
        clearFields: function () {
            var model = app.auditModel;

            for (var field in model) {
                var value = model.get(field);
                if (typeof (value) === "boolean") {
                    model.set(field, false);
                }
                else if (typeof (value) === "string") {
                    if ((field != "STAMP_DT") && (field != "STAMP_TM")) {
                        model.set(field, '');
                    }
                }
            }
        },
        getReportId: function (jsdo, success, request) {
            var onAfterFill = app.audit.getReportId;

            jsdo.unsubscribe('afterFill', onAfterFill);

            var lastAuditID = jsdo.record.data.PALLET_ID;
            var currentAuditID = parseInt(lastAuditID) + 1;
            app.auditModel.set("PALLET_ID", currentAuditID);
        },
        getDate: function () {
            var currentDate = new Date();
            var dateString = kendo.toString(currentDate, "yyyy-MM-dd");
            return dateString;
        },
        getTime: function () {
            var currentDate = new Date(),
                dateString = currentDate.toString();
            var currentTime = dateString.substring(16, 21);

            return currentTime;
        }
    }
})(window, jQuery);

// END_CUSTOM_CODE_homeModel