(function (pallet, $){
    var addImage,
        app = pallet.app = pallet.app || {};

    app.image = {
        onShow: function() {
            $("#takePicture").on('click', function(){
                app.audit.getImage();
            });
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
        }
    }
})(window, jQuery);