import joblib

# Load trained model
model = joblib.load("ai/spam_model.pkl")
vectorizer = joblib.load("ai/tfidf_vectorizer.pkl")


def predict_email(email):
    email_vector = vectorizer.transform([email])
    prediction = model.predict(email_vector)

    return prediction[0]


if __name__ == "__main__":

    email = input("Enter email message: ")

    result = predict_email(email)

    if result == "spam":
        print("Result: SPAM")
    else:
        print("Result: NOT SPAM")