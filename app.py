from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_pymongo import PyMongo
from bson.json_util import dumps
from bson.objectid import ObjectId
from models import User, Project, Review
from pymongo import MongoClient
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token

app = Flask(__name__)

# Update the MongoDB connection string to match your setup
# app.config["MONGO_URI"] = "mongodb+srv://yutoneteru:Test123@skillswap.yhxq3.mongodb.net"
# client = MongoClient()
client = MongoClient(
    "mongodb+srv://yutoneteru:Test123@skillswap.yhxq3.mongodb.net/")
# mongo = PyMongo(app)
# db = mongo.db
db = client.test_database


app.config['JWT_SECRET_KEY'] = 'your_secret_key'
jwt = JWTManager(app)

# Initialize models
user_model = User(db)
project_model = Project(db)
review_model = Review(db)


@app.route('/signup', methods=['POST'])
def signup():
    username = request.json.get('username')
    password = request.json.get('password')
    # Ensure both username and password are provided
    if username and password:
        # Check if the username already exists in the database
        existing_user = db.users.find_one({"username": username})
        if existing_user:
            return jsonify(message="Username already taken"), 400

        # If no user exists, create a new user
        user_model.create_user(username, password)
        return jsonify(message="User created"), 201

    return jsonify(message="Username and password are required"), 400


@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')

    # Find the user by username
    user = user_model.find_user(username)
    
    # Check if user exists and password matches
    if user and check_password_hash(user['password'], password):
        # Create JWT access token
        access_token = create_access_token(identity=str(user['_id']))
        return jsonify(access_token=access_token), 200

    return jsonify(message="Invalid credentials"), 401


@app.route('/projects', methods=['GET'])
def get_projects():
    projects = project_model.find_all_projects()
    return dumps(projects)


@app.route('/projects', methods=['POST'])
@jwt_required()
def create_project():
    current_user = get_jwt_identity()
    project_data = request.json
    project_model.create_project(project_data['name'], current_user)
    return jsonify(message="Project created"), 201


@app.route('/projects/<id>/apply', methods=['PUT'])
@jwt_required()
def apply_project(id):
    current_user = get_jwt_identity()
    project_model.apply_to_project(ObjectId(id), current_user)
    return jsonify(message="Applied to project"), 200


@app.route('/reviews', methods=['POST'])
@jwt_required()
def create_review():
    review_data = request.json
    review_model.create_review(review_data['content'], review_data['coder_id'])
    return jsonify(message="Review created"), 201


@app.route('/reviews/<coder_id>', methods=['GET'])
def get_reviews(coder_id):
    reviews = review_model.find_reviews_by_coder(coder_id)
    return dumps(reviews)


@app.route('/')
def home():
    data = db.collection_name.find()
    return dumps(data)


if __name__ == '__main__':
    app.run(debug=True)
