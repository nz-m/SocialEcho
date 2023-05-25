from flask import Flask, request, jsonify
from transformers import pipeline
import threading

app = Flask(__name__)

CANDIDATE_LABELS = [
    'programming',
    'health_and_fitness',
    'travel',
    'food_and_cooking',
    'music',
    'sports',
    'fashion',
    'art_and_design',
    'business_and_entrepreneurship',
    'education',
    'photography',
    'gaming',
    'science_and_technology',
    'parenting',
    'politics',
    'environment_and_sustainability',
    'beauty_and_skincare',
    'literature',
]

classifier_lock = threading.Lock()
classifier = None


def initialize_classifier():
    global classifier
    try:
        classifier = pipeline(
            "zero-shot-classification",
            model="facebook/bart-large-mnli",
            framework="pt",
            batch_size=4,
        )
        print("Classifier initialized successfully")
    except Exception as e:
        print(f"Classifier initialization failed: {e}")


def get_classifier():
    global classifier
    if classifier is None:
        with classifier_lock:
            if classifier is None:
                initialize_classifier()
    return classifier


@app.route('/', methods=['GET'])
def index():
    return jsonify({
        "response": {
            "status": 200,
            "statusText": "OK"
        }
    })


@app.route('/classify', methods=['POST'])
def classify():
    try:
        data = request.json

        if 'text' not in data or data['text'] == "":
            raise ValueError("Text is required")

        text = data['text']

        classifier = get_classifier()
        result = classifier(text, CANDIDATE_LABELS)

        labels = result['labels']
        scores = result['scores']

        returnData = {
            "response": {
                "statusText": "OK",
                "status": 200,
                "categories": []
            }
        }

        for label, score in zip(labels, scores):
            category = {
                "label": label.capitalize().replace("_", " "),
                "score": score
            }

            returnData["response"]["categories"].append(category)

        formattedReturnData = {
            "response": {
                "categories": sorted(returnData["response"]["categories"], key=lambda x: x["score"], reverse=True)
            }
        }

        return jsonify(formattedReturnData)
    except Exception as e:
        return jsonify({
            "response": {
                "status": 500,
                "statusText": str(e)
            }
        })


if __name__ == '__main__':
    initialize_classifier()
    app.run(host='0.0.0.0', port=5000, debug=True)
