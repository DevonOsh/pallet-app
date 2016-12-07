(function (pallet, $){
    var addImage,
        app = pallet.app = pallet.app || {};

    app.image = {
        onShow: function() {
            $("#takePicture").on('click', function(){
                app.audit.getImage();
            });
        }
    }
})(window, jQuery);