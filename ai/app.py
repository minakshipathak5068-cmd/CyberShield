from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

# Load trained AI model
model = joblib.load("ai/spam_model.pkl")
vectorizer = joblib.load("ai/tfidf_vectorizer.pkl")


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    email = data.get("email", "")

    if not email:
        return jsonify({"error": "Email text is required"}), 400

    # Convert email into numbers
    email_vector = vectorizer.transform([email])

    # Predict
    prediction = model.predict(email_vector)[0]

    if prediction == "spam":
        result = "SPAM"
    else:
        result = "NOT SPAM"

    return jsonify({
        "prediction": result
    })


@app.route("/")
def home():
    return "CyberShield AI Spam Detection API is running!"


if __name__ == "__main__":
    app.run(debug=True)
    