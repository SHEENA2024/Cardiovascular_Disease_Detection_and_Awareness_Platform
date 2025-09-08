import requests

url = "http://127.0.0.1:5000/predict"

data = {
    "date": "2025-09-06",
    "country": "India",
    "id": 1,
    "active": 1,
    "age": 45,
    "alco": 0,
    "ap_hi": 130,
    "ap_lo": 85,
    "cholesterol": 220,
    "gender": 1,
    "gluc": 1,
    "height": 170,
    "occupation": "Engineer",
    "smoke": 1,
    "weight": 70
}

response = requests.post(url, json=data)
print(response.json())
