'use strict';

app.home = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_home
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_home
(function(parent) {
    var homeModel = kendo.observable({
        fields: {
            comments: '',
            wrapped: false,
            stopSeq: false,
            eachesBoxes: false,
            meatChem: false,
            crushable: false,
            liquidsUpright: false,
            builtWell: false,
            mispicks: false,
            catchWgt: false,
            palletNum: '',
            route: '',
            employee: '',
            pallet: '',
        },
        submit: function() {},
        cancel: function() {}
    });

    parent.set('homeModel', homeModel);
})(app.home);

// START_CUSTOM_CODE_homeModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

/*
app.home.homeModel.fields = function() {
    var model = app.home.HomeModel,
        fields = model.get("fields");

    fields.set({
        comments: "Place comment here",
        wrapped: false,
        stopSeq: false,
        eachesBoxes: false,
        meatChem: false,
        crushable: false,
        liquidsUpright: false,
        builtWell: false,
        mispicks: false,
        palletNum: "F11",
        route: "111",
        employee: "John Doe",
        pallet: "123123"
    });
};
*/



app.home.homeModel.submit = function() {
    var dataProvider = app.data.progressDataProvider;

    dataProvider.loadCatalogs().then(function _catalogsLoaded() {
       
        //Get the current date and convert it into a usable format
        var currentDate = new Date(),
        	yyyy = currentDate.getFullYear(),
            mm = currentDate.getMonth()+1,
            dd = currentDate.getDate(),
            formatDate = yyyy + "-" + mm + "-" + dd,
            dateString = currentDate.toString(),
            time = dateString.substring(16,21);
        
        var fieldLocation = app.home.homeModel.fields,
         	model = {
                "COMMENTS": String(fieldLocation.comments),
                "WRAPPED": String(fieldLocation.wrapped),
                "STOP_SEQ": String(fieldLocation.stopSeq),
                "EACHES_BOXES": String(fieldLocation.eachesBoxes),
                "MEAT_CHEM": String(fieldLocation.meatChem),
                "CRUSHABLE": String(fieldLocation.crushable),
                "LIQUIDS_UPRIGHT":String(fieldLocation.liquidsUpright),
                "BUILT_WELL": String(fieldLocation.builtWell),
                "MISPICKS": String(fieldLocation.mispicks),
                "Catch_Wgt": String(fieldLocation.catchWgt),
                "STAMP_TM": time,
                "STAMP_DT": formatDate,
                "ROUTE": String(fieldLocation.route),
                "PALLET_NUM": String(fieldLocation.palletNum),
                "EMP_NAME": String(fieldLocation.employee),
                "PALLET_ID": String(fieldLocation.pallet)
            },
            jsdoOptions = {
                name: 'Pallet_Audit',
                autoFill: false
            },
            jsdo = new progress.data.JSDO(jsdoOptions);

        jsdo.create(model);
        jsdo.saveChanges();
        
        app.mobileApp.navigate('#components/welcomeView/view.html');
        
        function clearInputs() {
            
            //var mispicksSwitch = $("#mispicks").data("kendoMobileSwitch");
            //var wellBuiltSwitch = $("#wellBuilt").data("kendoMobileSwitch");
            //var liquidsUprightSwitch = $("#liquidsUpright").data("kendoMobileSwitch");
            //var crushableSwitch = $("#crushable").data("kendoMobileSwitch");
            //var meatChemSwitch = $("#meatChem").data("kendoMobileSwitch");
            //var eachesSwitch = $("#eaches").data("kendoMobileSwitch");
            //var stopSeqSwitch = $("#stopSeq").data("kendoMobileSwitch");
            //var wrappedWellSwitch = $("#mispicks").data("kendoMobileSwitch");
            
            $("#palletID").val('');
            $("#empName").val('');
            $("#route").val('');
            $("#palletNum").val('');
            //mispicksSwitch.check(false);
            //wellBuiltSwitch.check(false);
            //liquidsUprightSwitch.check(false);
            //crushableSwitch.check(false);
            //meatChemSwitch.check(false);
            //eachesSwitch.check(false);
            //stopSeqSwitch.check(false);
            //wrappedWellSwitch.check(false);
            $("#comments").val('');
        }
        
        clearInputs();
    });    
};

app.home.homeModel.cancel = function() {
    app.mobileApp.navigate('#:back');
};


// END_CUSTOM_CODE_homeModel