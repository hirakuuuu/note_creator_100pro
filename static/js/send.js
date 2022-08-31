$("#submitButton").click(function () {
  var formData = new FormData($("#uploadForm")[0]);

  $.ajax("/predict", {
    type: "post",
    data: formData,
    processData: false,
    contentType: false,
    cache: false,
    timeout: 10000,
  })
    .done(function (received_data) {
      var dict = JSON.parse(received_data);
      var answer = dict["answer"];
      var text = "";
      var colsize = 0;
      var rowsize = answer.length * 3;
      for (const elem of answer) {
        // $("#predict").append($("<p>").append(elem));
        text += elem + "\n" + "\n";
        colsize = Math.max(colsize, elem.length);
      }
      // textareaにテキストを入れる
      var textform = document.getElementById("textform");
      textform.style.display = "block";
      textform.value = text;
      textform.cols = (colsize * 2).toString();
      textform.rows = rowsize.toString();
      console.log("成功");
    })
    .fail(function () {
      console.log("失敗");
    });
});
