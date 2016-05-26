//BETA
// function previewFile(){
//       var preview = document.querySelector('img'); //selects the query named img
//       var file    = document.querySelector('input[type=file]').files[0]; //sames as here
//       var reader  = new FileReader();
//
//       reader.onloadend = function () {
//           preview.src = reader.result;
//       }
//
//       if (file) {
//           reader.readAsDataURL(file); //reads the data as a URL
//
//       } else {
//           preview.src = "";
//       }
//       var img = document.getElementById('image');
//       console.log(img);
//       imgData = getBase64Image(img);
//       localStorage.setItem("imgData", imgData);
//
//       var newImg = new Image()
//  }
//
//  previewFile();
$(document).ready(function() {
    var canvas, ctx;
    var img = new Image();
    img.src = 'grayscale.jpg';
    var grayScaleMatrix;
    img.onload = function() {
        canvas = document.getElementById('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        grayScaleMatrix = createArray(canvas.width, canvas.height);
        ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        for (var y = 0; y < canvas.height; y++) {
            for (var x = 0; x < canvas.width; x++) {
                var i = (y * 4) * canvas.width + x * 4;
                var avg = (imageData[i] + imageData[i + 1] + imageData[i + 2]) / 3;
                grayScaleMatrix[x][y] = avg;
            }
        }
        console.log(grayScaleMatrix);
    }


    function createArray(length) {
        var arr = new Array(length || 0),
            i = length;

        if (arguments.length > 1) {
            var args = Array.prototype.slice.call(arguments, 1);
            while (i--) arr[length - 1 - i] = createArray.apply(this, args);
        }

        return arr;
    }
});
