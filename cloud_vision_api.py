import io
import os
# 環境変数をインポート
from dotenv import load_dotenv

load_dotenv('./config/.env')

# Imports the Google Cloud client library
from google.cloud import vision

# Instantiates a client
client = vision.ImageAnnotatorClient()

def getText(filename):
    # 画像のファイルを指定
    filename = os.path.abspath('./uploads/'+filename)

    # 画像をロード
    with io.open(filename, 'rb') as imagefile:
        content = imagefile.read()

    image = vision.Image(content=content)

    # 画像から日本語文字を検出
    response = client.document_text_detection(
        image=image,
        image_context={'language_hints': ['ja']}
    )

    # レスポンスからテキストデータを抽出
    output_text = []
    for page in response.full_text_annotation.pages:
        for block in page.blocks:
            for paragraph in block.paragraphs:
                
                # ブロックをまとめた文章
                block_text = ''
                for word in paragraph.words:
                    block_text += ''.join([
                        symbol.text for symbol in word.symbols
                    ])
                output_text.append(block_text)

    return output_text