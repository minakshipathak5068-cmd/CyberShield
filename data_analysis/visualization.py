import pandas as pd
import matplotlib.pyplot as plt


def create_chart(data):
    """
    Create a chart showing CyberShield message categories.
    """

    df = pd.DataFrame(data)

    if df.empty or "result" not in df.columns:
        print("No data available for visualization.")
        return

    results = df["result"].astype(str).str.lower()

    safe = results.str.contains("safe").sum()
    suspicious = results.str.contains("suspicious").sum()
    dangerous = results.str.contains(
        "dangerous|malicious|phishing"
    ).sum()

    categories = [
        "Safe",
        "Suspicious",
        "Dangerous"
    ]

    values = [
        safe,
        suspicious,
        dangerous
    ]

    plt.bar(categories, values)

    plt.title("CyberShield Message Analysis")
    plt.xlabel("Message Category")
    plt.ylabel("Number of Messages")

    plt.show()


if __name__ == "__main__":

    sample_data = [
        {"message": "Hello", "result": "Safe"},
        {"message": "Click suspicious link", "result": "Suspicious"},
        {"message": "Your account is hacked", "result": "Dangerous"},
        {"message": "Good morning", "result": "Safe"}
    ]

    create_chart(sample_data)