let cropper = "";
let cnt = 0;
// insert on click
$(".insert").click(function (e) {
  e.preventDefault();
  console.log(e);
  // get result to data uri
  let imgSrc = cropper
    .getCroppedCanvas({
      height: (300 * canvas.height) / canvas.width,
      width: 300,
    })
    .toDataURL();
  // remove hide class of img
  $(".cropped").removeClass("hide");
  $(".img-result").removeClass("hide");
  // show image cropped
  $(".cropped").attr("src", imgSrc);
  $(".download").removeClass("hide");
  $(".download").attr("download", "imagename.png");
  $(".download").attr("href", imgSrc);
  // insert
  $("<img>", {
    class: "img-trix",
    src: imgSrc,
  }).appendTo("#trixeditor");
  cnt += 1
  $("#inserted-counter").removeClass("hide");
  $("#inserted-counter").text("Inserted: " + cnt)
});

const canvas = document.getElementById("canvas");
// when you crop preview-img, crop target will change to the image you click
function viewCrop(obj) {
  $("#cropping-desc").remove()
  // clean result before
  $(".result").html("");
  // create new image, append new image
  $("<img>", {
    id: "img",
    src: obj.src,
  }).appendTo(".result");

  //show save btn and options
  $(".save").removeClass("hide");
  $(".options").removeClass("hide");
  // init cropper, set crop frames
  cropper = new Cropper(img, {
    viewMode: 0,
    maxCanvasWidth: 420,
    maxCanvasHeight: 230,
    crop(event) {
      console.log(event.detail.x);
      console.log(event.detail.y);
      console.log(event.detail.width);
      console.log(event.detail.height);
      console.log(canvas.width);
      console.log(canvas.height);

      var x1 = Math.min(img.width, Math.max(0, event.detail.x));
      var y1 = Math.min(img.height, Math.max(0, event.detail.y));
      var cropwidth = Math.min(img.width, event.detail.width);
      var cropheight = Math.min(img.height, event.detail.height);
      canvas.width = cropwidth;
      canvas.height = cropheight;
      const canvasCtx = document.getElementById("canvas").getContext("2d");
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height); // 描画前にクリア
      canvasCtx.drawImage(
        img,
        x1,
        y1,
        cropwidth,
        cropheight,
        0,
        0,
        canvas.width,
        canvas.height
      );
    },
  });
}
