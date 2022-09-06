import os
from flask import Flask, render_template, request, redirect, url_for, flash
from werkzeug.utils import secure_filename
import json

from flask import send_from_directory

from cloud_vision_api import getText

# 画像のアップロード先のディレクトリ
UPLOAD_FOLDER = './uploads'
# アップロードされる拡張子の制限
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'gif'])

app = Flask(__name__, template_folder='template', static_folder='static')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# アップロードされたファイルの拡張子が正しいかを確認する関数
def allowed_file(filename):
    '''
    Parameters:
        filename(String): ファイル名
    Returns:
        bool: ファイルに'.'があり、拡張子がALLOWED_EXTENSIONSに含まれているかを判定した値
    '''
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET', 'POST'])
def index():
    # リクエストがポストかどうかの判別
    if request.method == 'POST':
        # ファイルが無かった場合の処理
        if 'file' not in request.files:
            return redirect(request.url)

        # データの取り出し
        file = request.files['file']
        # ファイル名がなかったときの処理
        if file.filename == '':
            return redirect(request.url)

        # ファイルのチェック
        if file and allowed_file(file.filename):
            # 危険な文字を削除（サニタイズ処理）
            filename = secure_filename(file.filename)
            # ファイルの保存
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            # ファイルのパス
            imgfilepath = '../uploads/'+filename
            # 文字の読み取り
            output_text = getText(filename=filename)
            # アプロード後のページに転送
            return render_template('index.html', imgfilepath=imgfilepath, prediction=output_text)

    return render_template('index.html')

@app.route("/predict", methods=["POST"])
def get_text_on_img():
    if request.method == "POST":
        try:
            file = request.files["upfile"]
            # ファイルが無かった場合の処理
            # if 'file' not in request.files:
            #     return redirect(request.url)

            # データの取り出し
            # file = request.files['file']
            # ファイル名がなかったときの処理
            print(file.filename)
            if file.filename == '':
                return redirect(request.url)

            # ファイルのチェック
            if file and allowed_file(file.filename):
                # 危険な文字を削除（サニタイズ処理）
                filename = secure_filename(file.filename)
                # ファイルの保存
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                # ファイルのパス
                imgfilepath = '../uploads/'+filename
                # 文字の読み取り
                output_text = getText(filename=filename)

        except Exception as e:
            print(e)
            output_text = ''

        dict = {"answer": output_text}

    return json.dumps(dict)

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

app.run(port=8000, debug=True)
