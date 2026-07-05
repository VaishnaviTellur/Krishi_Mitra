from fastapi import FastAPI, File, UploadFile, Form
from typing import Optional
from PIL import Image
import numpy as np
import io
import os

# Optional ONNX model support
MODEL_PATH = os.environ.get('MODEL_ONNX_PATH')
MODEL_LABELS = os.environ.get('MODEL_LABELS', 'healthy,disease').split(',')
model_session = None
try:
    if MODEL_PATH and os.path.exists(MODEL_PATH):
        import onnxruntime as ort
        model_session = ort.InferenceSession(MODEL_PATH, providers=['CPUExecutionProvider'])
        # log model info
        print('Loaded ONNX model from', MODEL_PATH)
except Exception as e:
    model_session = None
    print('ONNX model not loaded:', str(e))

def run_onnx_inference(img: Image.Image):
    # Preprocess to 224x224, normalize to 0-1, transpose to NCHW
    target = (224, 224)
    img_resized = img.resize(target).convert('RGB')
    arr = np.array(img_resized).astype(np.float32) / 255.0
    # assume model expects NCHW
    if arr.ndim == 3:
        arr = arr.transpose(2, 0, 1)
    arr = np.expand_dims(arr, 0).astype(np.float32)
    inputs = {model_session.get_inputs()[0].name: arr}
    out = model_session.run(None, inputs)
    # assume first output is logits or probabilities
    logits = out[0]
    if logits.ndim == 2 and logits.shape[0] == 1:
        probs = logits[0]
    else:
        probs = np.array(logits).flatten()
    # softmax if necessary
    try:
        exp = np.exp(probs - np.max(probs))
        probs = exp / exp.sum()
    except Exception:
        probs = probs / (probs.sum() + 1e-9)
    top_idx = int(np.argmax(probs))
    top_label = MODEL_LABELS[top_idx] if top_idx < len(MODEL_LABELS) else str(top_idx)
    confidence = float(np.round(float(probs[top_idx]), 3))
    return top_label, confidence

app = FastAPI(title="Krishi Mitra — AI Service")


@app.get("/")
def health_check():
    return {
        "message": "Krishi Mitra AI service is running",
        "status": "ok",
    }


@app.post("/predict")
async def predict(question: Optional[str] = Form(None), photo: Optional[UploadFile] = File(None)):
    # If a photo is uploaded, run a simple stubbed vision response.
    if photo is not None:
        # Read image bytes
        contents = await photo.read()
        try:
            img = Image.open(io.BytesIO(contents)).convert('RGB')
        except Exception:
            return {
                "crop": "Unknown",
                "problem": "Could not read image",
                "solution": "Upload a valid image file",
                "tips": "JPEG or PNG images are preferred",
                "annotations": []
            }

        # If an ONNX model is loaded, use it first for classification
        if model_session is not None:
            try:
                label, conf = run_onnx_inference(img)
                # if model indicates disease-like label, return model result
                if label.lower() != 'healthy' and conf >= 0.4:
                    w, h_img = img.size
                    return {
                        "crop": "Unknown",
                        "problem": f"Model detected: {label}",
                        "solution": "Review detected area and consider appropriate action.",
                        "tips": "Provide more close-up images for better accuracy.",
                        "annotations": [{"label": label, "confidence": conf, "bbox": [0, 0, img.size[0], img.size[1]]}],
                        "image_info": {"width": img.size[0], "height": img.size[1], "model_confidence": conf}
                    }
            except Exception:
                # fall back to heuristic on any model error
                pass

        # Small heuristic analysis: detect yellow/brown pixels in HSV space
        np_img = np.array(img)
        # Convert to HSV using PIL to keep things simple
        hsv = img.convert('HSV')
        h, s, v = hsv.split()
        h = np.array(h, dtype=np.int16)
        s = np.array(s, dtype=np.int16)
        v = np.array(v, dtype=np.int16)

        # Normalize H to 0-360-like by mapping 0-255 -> 0-360 approx
        h_deg = (h.astype(np.float32) / 255.0) * 360.0

        # Define yellow/brown hue ranges (approx). We'll consider yellow: 15-70 deg, brown: 10-40 with lower V
        yellow_mask = (h_deg >= 15) & (h_deg <= 70) & (s > 50) & (v > 60)
        brown_mask = (h_deg >= 10) & (h_deg <= 45) & (s > 40) & (v > 30) & (v < 120)

        combined = yellow_mask | brown_mask
        proportion = float(np.count_nonzero(combined)) / (combined.size)

        # Confidence heuristic
        confidence = min(0.99, round(proportion * 1.5, 2))

        annotations = []
        if proportion > 0.02:  # if more than 2% of pixels are yellow/brown, report
            # approximate bbox: full image (more complex segmentation requires heavier models)
            w, h_img = img.size
            annotations.append({
                "label": "yellow_brown_spots",
                "confidence": confidence,
                "bbox": [0, 0, w, h_img]
            })

            return {
                "crop": "Unknown",
                "problem": "Possible foliar disease or nutrient deficiency detected",
                "solution": "Inspect affected areas closely; remove severely affected tissue and consider appropriate treatment.",
                "tips": "Upload close-up photos of symptomatic leaves for better analysis.",
                "annotations": annotations,
                "image_info": {"width": w, "height": h_img, "detected_ratio": proportion}
            }

        return {
            "crop": "Unknown",
            "problem": "No obvious disease detected in the image",
            "solution": "Provide a clearer close-up of affected area",
            "tips": "Upload multiple photos from different angles",
            "annotations": [],
            "image_info": {"width": img.size[0], "height": img.size[1], "detected_ratio": proportion}
        }

    # fallback to text-only logic
    if not question:
        return {
            "crop": "General",
            "problem": "No input provided",
            "solution": "Ask a specific question or upload a photo",
            "tips": "Example: 'My tomato leaves have yellow spots.'",
        }

    question_text = question.lower()

    # Simple keyword matching for the first version.
    if "tomato" in question_text:
        return {
            "crop": "Tomato",
            "problem": "Possible fungal or nutrient issue",
            "solution": "Check for fungal infection, remove infected leaves, and use recommended treatment.",
            "tips": "Avoid overwatering and keep good air circulation around the plant.",
        }

    if "rice" in question_text:
        return {
            "crop": "Rice",
            "problem": "General crop care advice",
            "solution": "Use proper spacing, balanced fertilizer, and monitor water levels carefully.",
            "tips": "Check the field regularly for pests and nutrient deficiency.",
        }

    if "fertilizer" in question_text:
        return {
            "crop": "General",
            "problem": "Fertilizer guidance needed",
            "solution": "Use soil testing to choose the correct fertilizer and dosage.",
            "tips": "Avoid overuse of fertilizer because it can damage the crop and soil.",
        }

    if "chilli" in question_text or "chili" in question_text:
        return {
            "crop": "Chilli",
            "problem": "Possible drying or pest issue",
            "solution": "Inspect leaves and stems for pests, and ensure proper watering.",
            "tips": "Remove damaged parts and keep the soil moist but not waterlogged.",
        }

    if "rain" in question_text or "weather" in question_text:
        return {
            "crop": "Weather",
            "problem": "Weather-related farming advice",
            "solution": "Check local weather updates before irrigation or spraying.",
            "tips": "Avoid spraying pesticides before rain.",
        }

    return {
        "crop": "General",
        "problem": "No exact keyword match found",
        "solution": "Try asking about a crop name, fertilizer, pest issue, or weather concern.",
        "tips": "Example: 'My tomato leaves have yellow spots.'",
    }
