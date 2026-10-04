import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import joblib

# Load dataset
data = pd.read_csv("ai/dataset/spam.csv")

# Input and output
X = data["text"]
y = data["label"]

# Convert text into numbers
vectorizer = TfidfVectorizer()

X_vectorized = vectorizer.fit_transform(X)

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X_vectorized,
    y,
    test_size=0.2,
    random_state=42
)

# Train model
model = MultinomialNB()
model.fit(X_train, y_train)

# Test model
y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)

print("Model trained successfully!")
print("Accuracy:", accuracy)

# Save model
joblib.dump(model, "ai/spam_model.pkl")
joblib.dump(vectorizer, "ai/tfidf_vectorizer.pkl")

print("Model saved successfully!")