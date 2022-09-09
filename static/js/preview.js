$(function () {
  // アップロードした画像のプレビューを表示する処理
  // imgurを使うなら、色々変えていく必要性あり
  $("#upload").change(function () {
    if (!this.files.length) {
      return;
    }
    var files = $(this).prop("files");
    var len = files.length;
    for (var i = 0; i < len; i++) {
      var fileReader = new FileReader();

      fileReader.onload = function (e) {
        $("#preview").append(
          $('<img class="preview-img" src="' + e.target.result + '" width="100%" onclick="viewCrop(this)">')
        );
      };
      fileReader.readAsDataURL(files[i]);
    }
  });
});
