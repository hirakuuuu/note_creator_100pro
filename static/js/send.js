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
      for (const elem of answer) {
        $("#predict").append($("<p>").append(elem));
      }
      console.log("成功");
    })
    .fail(function () {
      console.log("失敗");
    });
});
