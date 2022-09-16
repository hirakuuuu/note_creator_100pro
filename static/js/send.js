$("#submitButton").click(function () {
  var formData = new FormData();
  var files = document.getElementById("upload").files;

  // 複数枚の画像を使うので、forを使う
  for (var i = 0; i < files.length; i++) {
    formData.append("image", files[i]);
  }

  // 非同期で画像をバックに送信する
  axios
    .post("/predict", formData)
    .then(function (response) {
      console.log(response);
      var answer = response.data.answer;
      for (const elem of answer) {
        // ブロックごとにdivタグで囲んでeditorの中に追加していく

        $("#trixeditor").append($("<div>").append(elem, "<br />", "<br />"));
      }
      console.log("成功");
    })
    .catch(function (error) {
      console.log(error);
    });
});
