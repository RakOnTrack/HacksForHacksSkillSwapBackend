from werkzeug.security import generate_password_hash

class User:
    def __init__(self, db):
        self.collection = db['users']

    def create_user(self, username, password):
        hashed_password = generate_password_hash(password)
        user = {
            'username': username,
            'password': hashed_password
        }
        return self.collection.insert_one(user)

    def find_user(self, username):
        return self.collection.find_one({'username': username})

class Project:
    def __init__(self, db):
        self.collection = db['projects']

    def create_project(self, name, owner_id):
        project = {
            'name': name,
            'owner_id': owner_id,
            'applicants': []
        }
        return self.collection.insert_one(project)

    def find_all_projects(self):
        return self.collection.find()

    def apply_to_project(self, project_id, user_id):
        return self.collection.update_one(
            {'_id': project_id},
            {'$addToSet': {'applicants': user_id}}
        )

class Review:
    def __init__(self, db):
        self.collection = db['reviews']

    def create_review(self, content, coder_id):
        review = {
            'content': content,
            'coder_id': coder_id
        }
        return self.collection.insert_one(review)

    def find_reviews_by_coder(self, coder_id):
        return self.collection.find({'coder_id': coder_id})
