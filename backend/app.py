import wikipedia

def get_info(k):
    a = wikipedia.search(k)[0]
    b = wikipedia.summary(a)

    c = wikipedia.page(a).url
    d = wikipedia.page(a).images[0]
    return {"text":b, "url":c, "image":d}

from pymongo import MongoClient
from pymongo.collection import ObjectId
import bcrypt
from flask import Flask, request
app = Flask(__name__)

from flask_cors import CORS
import math
import json
from bson import ObjectId
import requests
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

def get_nearby(lat, lon, d, id):
    a = abs(float(d["geometry"]["location"]["lat"]) - lat)
    b = abs(float(d["geometry"]["location"]["lng"]) - lon)
    k = round(math.sqrt(a * a + b * b), 1)

    return {"id":id, "title":d["name"], "description":str(k) + " mi away", "image":d["icon"], "link":"https://www.google.com/search?q=" + d["name"], "maps":"https://www.google.com/maps/search/?api=1&query=" + str(lat) + "," + str(lon)}


def get_all(lat, lon):
    final = []
    x = requests.get("https://maps.googleapis.com/maps/api/place/textsearch/json?query=monuments&&radius=10000&key=AIzaSyB7L122E6_uJGXT6uheNw95q2cmrp7UClQ&location=" + str(lat) + "," + str(lon)).json()
    for i in range(1, 7):
        k = x["results"][i - 1]
        final.append(get_nearby(lat, lon, k, i))
    return {"first":final[0], "second":final[1], "third":final[2], "fourth":final[3], "fifth":final[4], "sixth":final[5]}
print(get_all(0, 0))
@app.route('/monuments', methods=["GET", "POST"])
def get_monument_info_endpoint():
    data = request.json

    return get_info(data["name"])

@app.route('/register', methods=["GET", "POST"])
def register_endpoint():
    data = request.json

    return register(data["email"], data["password"])

@app.route('/login', methods=["GET", "POST"])
def login_endpoint():
    data = request.json

    return login(data["email"], data["password"])

@app.route('/maps', methods=["GET", "POST"])
def maps_endpoint():
    data = request.json

    return get_all(float(data["lat"]), float(data["lon"]))

if __name__ == "__main__":
    app.run()

