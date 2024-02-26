from flask import Flask, jsonify,request
from flask_cors import CORS
from dicom_engine import dcm_signle_file_open
import os

app = Flask(__name__)
CORS(app)


@app.route("/api/nav", methods=['POST'])
def navigate():
    data = request.get_json()
    dir = data['dir']
    file_name = data['file']
    file_data = {
        "pixel_array":[[]],
        "s1":0,
        "s2":0,
    }

    dirs,files = [],[]
    for child in os.listdir(dir):
        if os.path.isdir(os.path.join(dir,child)):
            dirs.append(child)
        else:
            files.append(child)
       
    if file_name!="":
        file_path = os.path.join(dir,file_name)
        if os.path.isfile(file_path):
            if file_path[-4:]==".dcm":
                pixel_array,s1,s2,_ = dcm_signle_file_open(file_path)
                file_data={
                    "pixel_array":pixel_array.tolist(),
                    "s1":s1,
                    "s2":s2,
                }

    return jsonify({
        "dir":dirs,
        "file":files,
        "fileData":file_data,
    })


if __name__ == "__main__":
    app.run(debug=True,port=8080)