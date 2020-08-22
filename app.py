from pymongo import MongoClient
from pymongo.collection import ObjectId
import bcrypt
from flask import Flask, request
app = Flask(__name__)

from flask_cors import CORS

import json
from bson import ObjectId

CORS(app)

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)

client = MongoClient("mongodb+srv://user:pass@cluster0.iaejs.mongodb.net/<dbname>?retryWrites=true&w=majority")

db = client.get_database("data")

def register(email, password):
    if db.users.find_one({"email":email}) == None:
        hashp = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        k = {"email":email, "password":hashp}
        db.users.insert_one(k)
        return {"status":"success"}
    else:
        return {"status":"failed"}

def login(email, password):
    k = db.users.find_one({"email":email})

    if k != None:
        x = bcrypt.hashpw(password.encode('utf-8'), k["password"])
        
        
        if x == k["password"]:
            return {"status":"success"}
        else:
            return {"status":"failed"}

    else:
        return {"status":"failed"}

def get_monument_data(name):
    return db.monuments.find_one({"name":name})

@app.route('/monuments', methods=["GET", "POST"])
def get_monument_info_endpoint():
    data = request.json

    return JSONEncoder().encode(get_monument_data(data["name"]))

@app.route('/register', methods=["GET", "POST"])
def register_endpoint():
    data = request.json

    return register(data["email"], data["password"])

@app.route('/login', methods=["GET", "POST"])
def login_endpoint():
    data = request.json

    return login(data["email"], data["password"])

if __name__ == "__main__":
    app.run()