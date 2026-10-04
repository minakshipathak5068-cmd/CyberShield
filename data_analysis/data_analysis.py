import pandas as pd
from pathlib import Path


def analyze_data():
    project_root = Path(__file__).resolve().parent.parent
    file_path = project_root / "ai" / "dataset" / "spam.csv"

    df = pd.read_csv(file_path)

    if not {"label", "text"}.issubset(df.columns):
        raise ValueError("CSV must contain label and text columns.")

    df = df.dropna(subset=["label", "text"]).drop_duplicates()
    df["label"] = df["label"].astype(str).str.strip().str.lower()

    print("CyberShield - Spam Email Data Analysis")
    print("--------------------------------------")
    print("Total Messages:", len(df))
    print("Spam Messages:", int((df["label"] == "spam").sum()))
    print("Ham (Safe) Messages:", int((df["label"] == "ham").sum()))
    print("Missing Values Remaining:", int(df[["label", "text"]].isnull().sum().sum()))
    print("Duplicate Rows Remaining:", int(df.duplicated().sum()))


if __name__ == "__main__":
    analyze_data()
