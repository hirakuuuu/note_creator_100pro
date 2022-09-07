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
        // base64に変換した文字列を取得
        var base64Text = e.currentTarget.result;

        $("#preview").append($('<img src="' + base64Text + '" width="100%">'));
      };
      fileReader.readAsDataURL(files[i]);
    }
  });
});
