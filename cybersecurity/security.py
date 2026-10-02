# CyberShield cybersecurity module
from password_checker import check_password_strength
from vulnerability_scanner import scan_text
from security_utils import (
    sanitize_input,
    validate_email,
    validate_username
)


def check_password(password):

    return check_password_strength(password)


def scan_input(user_input):

    clean_input = sanitize_input(user_input)

    return scan_text(clean_input)


def validate_user(username, email):

    username_valid = validate_username(username)
    email_valid = validate_email(email)

    return {
        "username_valid": username_valid,
        "email_valid": email_valid
    }


def run_security_check():

    print("================================")
    print("       CyberShield Security")
    print("================================")

    # Password check
    password = input("\nEnter password to check: ")

    password_result = check_password(password)

    print("\nPassword Strength:",
          password_result["strength"])

    print("Score:",
          password_result["score"], "/ 5")

    # Text scan
    text = input("\nEnter text to scan: ")

    scan_result = scan_input(text)

    print("\nScan Status:",
          scan_result["status"])

    if scan_result["findings"]:

        print("\nSecurity Findings:")

        for finding in scan_result["findings"]:

            print(
                f"- {finding['type']} "
                f"| Severity: {finding['severity']}"
            )

    else:

        print("No basic security issues detected.")


if __name__ == "__main__":
    run_security_check()
