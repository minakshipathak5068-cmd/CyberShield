import pandas as pd


def clean_data(data):
    """
    Clean CyberShield message analysis data.
    """

    df = pd.DataFrame(data)

    if df.empty:
        return df

    # Remove duplicate records
    df = df.drop_duplicates()

    # Remove rows where message is missing
    if "message" in df.columns:
        df = df.dropna(subset=["message"])

    # Fill missing result values
    if "result" in df.columns:
        df["result"] = df["result"].fillna("Unknown")

    # Fill missing risk values
    if "risk" in df.columns:
        df["risk"] = df["risk"].fillna("Unknown")

    return df