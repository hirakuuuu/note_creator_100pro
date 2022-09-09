(function () {
  function asBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  document.addEventListener("trix-file-accept", function (event) {
    event.preventDefault();
    if (event.file) {
      asBase64(event.file)
        .then(function (data) {
          let editor = document.querySelector("trix-editor");
          let image = document.createElement("img");
          image.src = data;
          let tmp = document.createElement("div");
          tmp.appendChild(image);
          editor.editor.insertHTML(tmp.innerHTML);
          editor.editor.insertLineBreak();
        })
        .catch((e) => console.log(e));
    }
  });
})();
