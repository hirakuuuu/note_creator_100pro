let cropper = "";

// save on click
$(".save").click(function (e) {
  e.preventDefault();
  // get result to data uri
  let imgSrc = cropper
    .getCroppedCanvas({
      width: $("#img-w")[0].value, // input value
    })
    .toDataURL();
  // remove hide class of img
  $(".cropped").removeClass("hide");
  $(".img-result").removeClass("hide");
  // show image cropped
  $(".cropped").attr("src", imgSrc);
  $(".insert").removeClass("hide");
  $(".download").removeClass("hide");
  $(".download").attr("download", "imagename.png");
  $(".download").attr("href", imgSrc);
});

// insert on click
$(".insert").click(function (e) {
  e.preventDefault();
  // get result to data uri
  let imgSrc = cropper
    .getCroppedCanvas({
      width: $("#img-w")[0].value, // input value
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
});

// when you crop preview-img, crop target will change to the image you click
function viewCrop(obj) {
  // clean result before
  $(".result").html("");
  // create new image, append new image
  $("<img>", {
    id: "img",
    src: obj.src,
  }).appendTo(".result");

  $(".cropped").attr("src", obj.src);
  //show save btn and options
  $(".save").removeClass("hide");
  $(".options").removeClass("hide");
  // init cropper, set crop frames
  cropper = new Cropper(img);
}
