import joblib
import json
import pandas as pd
from flask_cors import CORS  
from flask import Flask, request, jsonify

app = Flask(__name__)
CORS(app)

# Load model and feature order
model = joblib.load("heart_model.pkl")
with open("feature_order.json", "r") as f:
    feature_order = json.load(f)

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Welcome to the Cardiovascular Disease Prediction API. Use POST /predict to get predictions."})

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json  # Input JSON from frontend

    try:
        # Build input dictionary with defaults if missing
        feature_values = {}
        for feat in feature_order:
            if feat in data:
                feature_values[feat] = data[feat]
            else:
                if feat == "date":
                    feature_values[feat] = "2025-01-01"
                elif feat in ["country", "occupation"]:
                    feature_values[feat] = "unknown"
                else:
                    feature_values[feat] = 0

        # Convert to DataFrame with proper column names
        input_df = pd.DataFrame([feature_values])

        # Predict
        prediction = model.predict(input_df)[0]
        result = "Cardiovascular Disease Detected" if prediction == 1 else "No Cardiovascular Disease"

        return jsonify({
            "prediction": int(prediction),
            "message": result,
            "features_used": feature_values
        })
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
