export const  nodeCount = 14
export const dslInput = `DESCRIPTION: A Python-based microservice architecture for Hydra, a water drinking tracker, handling user management, hydration, smart reminders, AI recommendations, and health integrations.
TAGS: Python | Flask | PostgreSQL | Redis | RabbitMQ | AWS S3 | JWT | scikit-learn | requests | pandas

NODE n1 gateway "API Gateway"
d: Entry point for mobile/web apps, handles routing, rate limiting, and initial security checks.
c: import flask; from flask_cors import CORS; app = flask.Flask(__name__); CORS(app); @app.route("/", methods=["GET"]) def home(): return "API Gateway operational"; if __name__ == "__main__": app.run(host='0.0.0.0', port=80)
r: https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html, https://konghq.com/

NODE n2 compute "Auth Service"
d: Manages user registration, login, token issuance (JWT), and OAuth integration for health APIs.
c: from flask import Flask, request, jsonify; import jwt; app = Flask(__name__); SECRET_KEY = "supersecret"; @app.route("/login", methods=["POST"]) def login(): user_id = request.json.get("user_id"); token = jwt.encode({"user_id": user_id}, SECRET_KEY, algorithm="HS256"); return jsonify({"token": token.decode("utf-8")});
r: https://pyjwt.readthedocs.io/en/stable/, https://oauth.net/

NODE n3 compute "User Service"
d: Handles user profiles, account settings, notification preferences, device management, and gamification data.
c: class UserProfile: def __init__(self, id, name): self.id = id; self.name = name; def update_profile(self, new_data): print(f"Updating user {self.id} with {new_data}"); return True;
r: https://www.postgresql.org/docs/

NODE n4 compute "Hydration Service"
d: Manages water intake logging, calculates daily progress, and tracks drink history.
c: class HydrationTracker: def log_intake(self, user_id, volume, drink_type, time): print(f"Logged {volume}ml of {drink_type} for user {user_id}"); return True; def calculate_progress(self, user_id, goal): return {"progress": 0.75, "remaining": 250};
r: https://www.sqlalchemy.org/

NODE n5 compute "Goal Service"
d: Computes personalized daily and hourly hydration goals based on user metrics and external factors.
c: def calculate_daily_goal(weight_kg, activity_level, weather_temp_c): base_ml = weight_kg * 30; if activity_level == "high": base_ml *= 1.2; if weather_temp_c > 25: base_ml += 500; return base_ml;
r: https://scikit-learn.org/stable/

NODE n6 compute "Reminder Service"
d: Schedules, adapts, and manages smart hydration reminders, considering user habits and silent hours.
c: class ReminderScheduler: def schedule_reminder(self, user_id, time, message): print(f"Scheduling reminder for {user_id} at {time}: {message}"); return True; def detect_missed_intake(self, user_id): return False;
r: https://celery.github.io/

NODE n7 compute "Notification Service"
d: Dispatches push notifications and alerts for reminders, achievements, and reports.
c: import requests; def send_push_notification(device_token, title, body): payload = {"to": device_token, "title": title, "body": body}; r = requests.post("https://exp.host/--/api/v2/push/send", json=payload); return r.status_code == 200;
r: https://firebase.google.com/docs/cloud-messaging, https://pusher.com/

NODE n8 compute "AI Recommendation Service"
d: Provides personalized hydration tips, goal adjustments, and optimized reminder timings using ML.
c: from sklearn.linear_model import LogisticRegression; import pandas as pd; def recommend_tip(user_data): model = LogisticRegression(); df = pd.DataFrame([user_data]); return "Drink more water slowly throughout the day!";
r: https://pytorch.org/, https://tensorflow.org/

NODE n9 compute "Health Integration Service"
d: Integrates with external health platforms (Apple Health, Google Fit) and smart water bottles to fetch activity data.
c: import requests; def get_apple_health_data(user_id, token): headers = {"Authorization": f"Bearer {token}"}; r = requests.get("https://healthapi.apple.com/v1/data", headers=headers); return r.json();
r: https://developer.apple.com/documentation/healthkit, https://developers.google.com/fit

NODE n10 compute "Analytics Service"
d: Gathers and processes hydration data to generate daily, weekly, and monthly trends and insights.
c: import pandas as pd; def get_weekly_trends(user_id, data_records): df = pd.DataFrame(data_records); return df.groupby("day").sum()["volume"].to_dict();
r: https://pandas.pydata.org/, https://jupyter.org/

NODE n11 database "PostgreSQL Database"
d: Relational database storing user profiles, hydration records, goals, achievements, and configuration.
c: import psycopg2; conn = psycopg2.connect(database="hydra", user="user", password="pwd"); cur = conn.cursor(); cur.execute("SELECT * FROM users;"); conn.close();
r: https://www.postgresql.org/docs/, https://www.psycopg.org/docs/

NODE n12 cache "Redis Cache"
d: In-memory data store used for high-speed caching of frequently accessed data and session management.
c: import redis; r = redis.Redis(host='localhost', port=6379, db=0); r.set('user:123:profile', '{"name": "Alice"}'); data = r.get('user:123:profile');
r: https://redis.io/docs/, https://pypi.org/project/redis/

NODE n13 database "Object Storage"
d: Stores unstructured data like user profile pictures, custom drink images, and other media files.
c: import boto3; s3 = boto3.client('s3'); s3.upload_file('/tmp/profile.jpg', 'hydra-bucket', 'user/123/profile.jpg'); url = s3.generate_presigned_url('get_object', Params={'Bucket': 'hydra-bucket', 'Key': 'user/123/profile.jpg'});
r: https://aws.amazon.com/s3/, https://cloud.google.com/storage

NODE n14 queue "Message Queue"
d: Asynchronously processes tasks like sending reminders, processing external health data, and generating analytics reports.
c: import pika; connection = pika.BlockingConnection(pika.ConnectionParameters('localhost')); channel = connection.channel(); channel.queue_declare(queue='tasks'); channel.basic_publish(exchange='', routing_key='tasks', body='{"task": "send_reminder", "user_id": 123}'); connection.close();
r: https://www.rabbitmq.com/tutorials/tutorial-one-python.html, https://kafka.apache.org/

EDGE n1 -> n2 "Authenticates API requests"
EDGE n1 -> n3 "Routes user profile requests"
EDGE n1 -> n4 "Routes hydration data requests"
EDGE n1 -> n9 "Routes external integration webhooks"
EDGE n2 -> n11 "Retrieves/Stores user credentials"
EDGE n2 -> n12 "Caches session tokens"
EDGE n3 -> n11 "Manages user data"
EDGE n3 -> n13 "Stores profile images"
EDGE n3 -> n12 "Caches user profiles"
EDGE n3 -> n7 "Sends achievement notifications"
EDGE n4 -> n11 "Logs hydration records"
EDGE n4 -> n5 "Requests goal calculation"
EDGE n4 -> n6 "Triggers reminder updates"
EDGE n4 -> n14 "Publishes hydration events"
EDGE n5 -> n11 "Fetches user health metrics"
EDGE n6 -> n14 "Schedules asynchronous reminder tasks"
EDGE n7 -> n14 "Queues notifications for delivery"
EDGE n8 -> n11 "Accesses user behavior data"
EDGE n8 -> n3 "Suggests goal adjustments"
EDGE n8 -> n6 "Suggests reminder timing"
EDGE n9 -> n4 "Sends external activity data"
EDGE n9 -> n11 "Stores raw integration data"
EDGE n10 -> n11 "Queries historical data"
EDGE n14 -> n7 "Delivers queued notifications"
EDGE n14 -> n10 "Consumes events for processing"`