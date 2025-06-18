from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

# Load the trained pipeline
pipe_lr = joblib.load("emotion_classifier_pipe_lr.pkl")

# Initialize Flask App
app = Flask(__name__)
CORS(app)  # Enable CORS to connect with frontend

# Emotion dictionary
emotions_emoji_dict = {
    "anger": "😠", "disgust": "🤮", "fear": "😨😱",
    "happy": "🤗", "joy": "😂", "neutral": "😐",
    "sad": "😔", "sadness": "😔", "shame": "😳",
    "surprise": "😮"
}

@app.route('/')
def home():
    return "Emotion Detection API is running."

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    text = data.get("text")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    prediction = pipe_lr.predict([text])[0]
    probability = np.max(pipe_lr.predict_proba([text]))

    return jsonify({
        "emotion": prediction,
        "emoji": emotions_emoji_dict.get(prediction, ""),
        "confidence": float(probability)
    })

if __name__ == '__main__':
    app.run(debug=True)
