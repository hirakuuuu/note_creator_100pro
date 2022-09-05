$("#submitButton").click(function () {
  var formData = new FormData();
  var files = document.getElementById("upload").files;

  for (var i = 0; i < files.length; i++) {
    console.log(files[i]);
    formData.append("image", files[i]);
  }

  axios
    .post("/predict", formData)
    .then(function (response) {
      console.log(response);
      var answer = response.data.answer;
      console.log(answer);
      for (const elem of answer) {
        $("#trixeditor").append($("<div>").append(elem, "<br />"));
      }
      // textareaにテキストを入れる
      var trixeditor = document.getElementById("trixeditor");
      trixeditor.style.display = "block";
      console.log("成功");
    })
    .catch(function (error) {
      console.log(error);
    });

  // $.ajax("/predict", {
  //   type: "post",
  //   data: formData,
  //   processData: false,
  //   contentType: false,
  //   cache: false,
  //   timeout: 10000,
  // })
  //   .done(function (received_data) {
  //     var dict = JSON.parse(received_data);
  //     var answer = dict["answer"];
  //     console.log(answer);
  //     for (const elem of answer) {
  //       $("#trixeditor").append($("<div>").append(elem, "<br />"));
  //     }
  //     // textareaにテキストを入れる
  //     var trixeditor = document.getElementById("trixeditor");
  //     trixeditor.style.display = "block";
  //     console.log("成功");
  //   })
  //   .fail(function () {
  //     console.log("失敗");
  //   });
});
