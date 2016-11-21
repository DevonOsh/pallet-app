(function (pallet, $){
    var addImage,
        app = pallet.app = pallet.app || {};

    app.addImage = function() {
        var options = {
            destinationType: Camera.DestinationType.DATA_URL
        }
        var success = function(imageData) {
            app.auditModel.IMAGE = imageData;
        }
        var error = function(error) {
            alert(error);
        }
        camera.getPicture(success, error, options);
    }
})(window, jQuery);