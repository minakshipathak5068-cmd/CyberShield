import re


def check_password_strength(password):
    score = 0
    suggestions = []

    # Length check
    if len(password) >= 8:
        score += 1
    else:
        suggestions.append("Use at least 8 characters.")

    # Uppercase check
    if re.search(r"[A-Z]", password):
        score += 1
    else:
        suggestions.append("Add at least one uppercase letter.")

    # Lowercase check
    if re.search(r"[a-z]", password):
        score += 1
    else:
        suggestions.append("Add at least one lowercase letter.")

    # Number check
    if re.search(r"\d", password):
        score += 1
    else:
        suggestions.append("Add at least one number.")

    # Special character check
    if re.search(r"[^A-Za-z0-9]", password):
        score += 1
    else:
        suggestions.append("Add at least one special character.")

    # Final result
    if score <= 2:
        strength = "Weak"
    elif score <= 4:
        strength = "Medium"
    else:
        strength = "Strong"

    return {
        "strength": strength,
        "score": score,
        "suggestions": suggestions
    }


if __name__ == "__main__":

    password = input("Enter password to check: ")

    result = check_password_strength(password)

    print("\nPassword Strength:", result["strength"])
    print("Score:", result["score"], "/ 5")

    if result["suggestions"]:
        print("\nSuggestions:")

        for suggestion in result["suggestions"]:
            print("-", suggestion)