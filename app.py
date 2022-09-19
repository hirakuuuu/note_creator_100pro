from distutils import filelist
import os
import datetime
import pathlib

from flask import Flask, render_template, request, redirect, url_for, flash, send_file, current_app as app
from werkzeug.utils import secure_filename
import json
import html

from flask import send_from_directory

from cloud_vision_api import getText
from fpdf import FPDF, HTMLMixin

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
        output_text = []
        try:
            files = request.files.getlist('image')
            for file in files:
                # ファイル名の確認
                print(file.filename)
                if file.filename == '':
                    return redirect(request.url)

                # ファイルのチェック
                if file and allowed_file(file.filename):
                    # 危険な文字を削除（サニタイズ処理）
                    filename = secure_filename(file.filename)
                    # ファイルの保存
                    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                    # 文字の読み取り
                    output_text += getText(filename=filename)

        except Exception as e:
            print(e)

        dict = {"answer": output_text}

    return json.dumps(dict)

class MyFPDF(FPDF, HTMLMixin):
    pass

@app.route('/topdf', methods=["POST"])
def trix_to_pdf():
    if request.method == "POST":
        trix_content = request.form.get('content')

        # convert html text to pdf
        pdf = MyFPDF()
        pdf.add_page()

        # fontをaddする
        font_path = './static/font/ipaexm.ttf'
        pdf.add_font('mincho', fname=font_path)
        # fontをsetする
        pdf.set_font('mincho')
        # debug print コメントアウトすると，trixに入力した文字が出力
        # trix_content = '''
        # <H1 align="center">html2fpdf</H1>
        # <h2>Basic usage</h2>
        # <p>あああ</p>
        # '''
        start = 0
        # <figure タグを探し、その前に<br>を入れる
        # print('start')
        # while trix_content.find('<figure', start) != -1:
        #     tmp = trix_content.find('<figure', start)
        #     trix_content = trix_content[:tmp] + '<br><br>' + trix_content[tmp:]
        #     # print(trix_content[:tmp + 10]) # debug
        #     start = tmp + 7

        # start = 0
        # # </figure> タグを探し、その後ろに<br>を入れる
        # while trix_content.find('</figure>', start) != -1:
        #     tmp = trix_content.find('</figure>', start)
        #     trix_content = trix_content[:tmp+9] + '<br><br>' + trix_content[tmp+9:]
        #     # print(trix_content[:tmp + 10]) # debug
        #     start = tmp + 9

        print(trix_content)
        pdf.write_html(trix_content)

        now_str = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
        pathlib.Path('downloads').mkdir(exist_ok=True)
        filepath = f'downloads/{now_str}.pdf'
        pdf.output(filepath)
        return send_file(filepath, mimetype='application/pdf')


@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

app.run(port=8000, debug=True)
