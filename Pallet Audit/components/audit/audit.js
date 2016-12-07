

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
        beforeShow: function() {
            //Attempting to get the Routes and Pallets from the PICK_LABEL_DETAIL table
            var routesDataSource = new kendo.data.DataSource({
                type: "jsdo",
                transport: {
                    jsdo: app.pickDetailJSDO
                },
                filter: {
                    logic: "and",
                    filters: [
                        {field: "DATE_", operator: "eq", value: "03/11/16"},
                        {field: "CO", operator: "eq", value: " 3"}
                    ]
                }
            });
            var routes = [];
            routesDataSource.fetch(function() {
                var data = routesDataSource.data();
                routes.push(data[0].ROUTE);
                for(var i = 1; i < data.length; i++){
                    var searchResult = $.inArray(data[i].ROUTE, routes);
                    if(searchResult == -1) {
                        routes.push(data[i].ROUTE);
                    }
                }
            });
            console.log(routes);       //FIXME remove
        },
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
            $("#takePictureBtn").on('click', function(){
                app.audit.getImage();
            });
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
        getImage: function() {
            var options = {
                allowEdit: true,
                destinationType: Camera.DestinationType.DATA_URL,
                targetWidth: 600,
                targetHeight: 600
            }
            function success(imageData) {
                var image = document.getElementById('displayImage');
                image.style.display = 'block';
                image.src = "data:image/jpeg;base64," + imageData;

                var length = imageData.length;
                var imageSize = 4 * Math.ceil(length / 3);
                $("#imageData").html("Approximate image size: " + imageSize + " bytes");
                $("#stringLength").html("String length: " + length);
            }
            function error(message){
                alert(message);
            }
            navigator.camera.getPicture(success, error, options);
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