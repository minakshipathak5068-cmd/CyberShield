import pandas as pd
from data_cleaning import clean_data


def analyze_data(data):
    """
    Perform basic statistical analysis on CyberShield data.
    """

    df = clean_data(data)

    if df.empty:
        return {
            "total_messages": 0,
            "safe_messages": 0,
            "suspicious_messages": 0,
            "dangerous_messages": 0
        }

    total_messages = len(df)

    safe_messages = 0
    suspicious_messages = 0
    dangerous_messages = 0

    if "result" in df.columns:
        results = df["result"].astype(str).str.lower()

        safe_messages = results.str.contains("safe").sum()
        suspicious_messages = results.str.contains("suspicious").sum()
        dangerous_messages = (
            results.str.contains("dangerous|malicious|phishing").sum()
        )

    return {
        "total_messages": int(total_messages),
        "safe_messages": int(safe_messages),
        "suspicious_messages": int(suspicious_messages),
        "dangerous_messages": int(dangerous_messages)
    }


if __name__ == "__main__":

    sample_data = [
        {
            "message": "Hello, how are you?",
            "result": "Safe",
            "risk": "Low"
        },
        {
            "message": "Click this suspicious link",
            "result": "Suspicious",
            "risk": "Medium"
        },
        {
            "message": "Your account has been hacked",
            "result": "Dangerous",
            "risk": "High"
        }
    ]

    report = analyze_data(sample_data)

    print("CyberShield Data Analysis")
    print("-------------------------")
    print("Total Messages:", report["total_messages"])
    print("Safe Messages:", report["safe_messages"])
    print("Suspicious Messages:", report["suspicious_messages"])
    print("Dangerous Messages:", report["dangerous_messages"])