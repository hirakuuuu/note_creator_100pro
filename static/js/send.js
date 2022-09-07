$("#submitButton").click(function () {
  var formData = new FormData();
  var files = document.getElementById("upload").files;
  var imagelist = [];

  // 複数枚の画像を使うので、forを使う
  for (var i = 0; i < files.length; i++) {
    const reader = new FileReader();
    reader.onload = (event) => {
      var base64Text = event.currentTarget.result;
      base64 = base64Text.replace(new RegExp("data.*base64,"), "");
      console.log(base64);
      imagelist.push(base64);
    };
    reader.readAsDataURL(files[i]);
  }

  $.ajax("/predict", {
    type: "post",
    data: { data: imagelist }, // 連想配列をPOSTする
  })
    .done(function (received_data) {
      // 戻ってきたのはJSON（文字列）
      var dict = JSON.parse(received_data); // JSONを連想配列にする
      // 以下、Javascriptで料理する
      var answer = dict["answer"];
      for (const elem of answer) {
        // ブロックごとにdivタグで囲んでeditorの中に追加していく
        $("#trixeditor").append($("<div>").append(elem, "<br />"));
      }
      console.log("成功"); // html要素を書き換える
    })
    .fail(function () {
      console.log("失敗");
    });
  // 非同期で画像をバックに送信する
  // axios
  //   .post("/predict", formData)
  //   .then(function (response) {
  //     console.log(response);
  // var answer = response.data.answer;
  // for (const elem of answer) {
  //   // ブロックごとにdivタグで囲んでeditorの中に追加していく

  //   $("#trixeditor").append($("<div>").append(elem, "<br />"));
  // }
  // console.log("成功");
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
});
