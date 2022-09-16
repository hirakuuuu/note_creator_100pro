$(function () {

    //画像の名前を表示
    $("input").on("change", function () {
      //getElementByIdで上記のhtmlのID id="file_input"　から選択されたファイルの情報を読み込む。
      var files = document.getElementById("upload").files;
      var file = [];
  
      for (var i = 0; i < files.length; i++) {
        //console.log(files[i]);
        file[i] = files[i].name
      }
      $("p.name").text(file);
    });


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
          $('<img src="' + e.target.result + '" width="40%">')
        );
      };
      fileReader.readAsDataURL(files[i]);
    }
  });
  // 送信ボタンの制御
  $('input[type=file]').change(function (){ 
    $('#submitButton').css({
      'border-radius' : '5%',          /* 角丸       */
      'font-size'     : '10pt',        /* 文字サイズ */
      'text-align'    : 'center',      /* 文字位置   */
      'cursor'        : 'pointer',    /* カーソル   */
      'padding'       : '11px 29px',   /* 余白       */
      'background'    : '#1d9ca8',     /* 背景色     */
      'color'         : '#ffffff',     /* 文字色     */
      'line-height'   : '1em',         /* 1行の高さ  */
      'transition'    : '.3s',         /* なめらか変化 */
      'box-shadow'    : '6px 6px 3px #189ca8b6',  /* 影の設定 */
      'border'        : '2px solid #029aa877',    /* 枠の指定 */
    })
    $('#submitButton').on({
      'mouseenter': function () {
        $(this).css('opacity', '0.8');
      },
      
      'mouseleave': function () {
        $(this).css('opacity', '1.0');
      }
    })
  });
  
  // 保存ボタンの制御
  $('input[type=button]').change(function (){ 
    $('#trixButton').css({
      'border-radius' : '5%',          /* 角丸       */
      'font-size'     : '10pt',        /* 文字サイズ */
      'text-align'    : 'center',      /* 文字位置   */
      'cursor'        : 'pointer',    /* カーソル   */
      'padding'       : '11px 29px',   /* 余白       */
      'background'    : '#1d9ca8',     /* 背景色     */
      'color'         : '#ffffff',     /* 文字色     */
      'line-height'   : '1em',         /* 1行の高さ  */
      'transition'    : '.3s',         /* なめらか変化 */
      'box-shadow'    : '6px 6px 3px #189ca8b6',  /* 影の設定 */
      'border'        : '2px solid #029aa877',    /* 枠の指定 */
    })
    $('#trixButton').on({
      'mouseenter': function () {
        $(this).css('opacity', '0.8');
      },
      'mouseleave': function () {
        $(this).css('opacity', '1.0'); 
      }
    })
  });

});
