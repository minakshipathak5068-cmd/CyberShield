
import pandas as pd
import matplotlib.pyplot as plt
from pathlib import Path

# Project ke dataset ka path
project_root = Path(__file__).resolve().parent.parent
file_path = project_root / "ai" / "dataset" / "spam.csv"

# Dataset load karo
df = pd.read_csv(file_path)

# Spam aur Ham messages count karo
counts = df["label"].astype(str).str.strip().str.lower().value_counts()

spam_count = int(counts.get("spam", 0))
ham_count = int(counts.get("ham", 0))

# Bar chart
plt.figure(figsize=(7, 5))
plt.bar(
    ["Spam", "Ham (Genuine)"],
    [spam_count, ham_count]
)
plt.title("CyberShield: Spam vs Genuine Messages")
plt.xlabel("Message Type")
plt.ylabel("Number of Messages")
plt.tight_layout()

# Graph save karo
output_path = project_root / "data_analysis" / "spam_ham_bar_chart.png"
plt.savefig(output_path)
print("Bar chart saved at:", output_path)

plt.show()

# Pie chart
plt.figure(figsize=(6, 6))
plt.pie(
    [spam_count, ham_count],
    labels=["Spam", "Ham (Genuine)"],
    autopct="%1.1f%%",
    startangle=90
)
plt.title("Spam vs Genuine Messages Distribution")
plt.tight_layout()
plt.show()
