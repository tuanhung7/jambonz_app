import requests

url = "https://4689-14-241-131-43.ngrok-free.app/webhooks/jambonz/webhook"
headers = {"Content-Type": "application/json"}

data = {
    "sender_id": "123",
    "message_jambonz": "Chào cậu"
}

try:
    response = requests.post(url, json=data, headers=headers)
    response.raise_for_status()  # Raise an error for bad responses
    print("Request successful. Response:", response.text)
except requests.exceptions.RequestException as err:
    print(f"Error making the request: {err}")
