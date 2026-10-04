import pandas as pd
import re


def clean_text(text):
    text = str(text).lower()
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text


def load_and_clean_data(file_path):
    data = pd.read_csv(file_path)

    data['text'] = data['text'].apply(clean_text)

    return data


if __name__ == "__main__":
    file_path = "ai/dataset/spam.csv"

    data = load_and_clean_data(file_path)

    print("Dataset loaded successfully!")
    print(data)