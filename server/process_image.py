import sys
import cv2
import numpy as np

def parse_args():
    import json
    return json.loads(sys.argv[1])
    #return json.load(sys.stdin)

def process_image(params):
    img = cv2.imread(params["imagePath"])

    # Resize
    w, h = params["resize"].get("width"), params["resize"].get("height")
    if w and h:
        img = cv2.resize(img, (int(w), int(h)))

    # Rotate
    if params["rotate"]:
        angle = int(params["rotate"])
        (h, w) = img.shape[:2]
        center = (w // 2, h // 2)
        M = cv2.getRotationMatrix2D(center, angle, 1.0)
        img = cv2.warpAffine(img, M, (w, h))

    # Blur
    if params["blur"]:
        k = int(params["blur"])
        img = cv2.GaussianBlur(img, (k, k), 0)

    # Brightness & Contrast
    if params["brightness"] or params["contrast"]:
        brightness = int(params["brightness"] or 0)
        contrast = int(params["contrast"] or 0)
        img = cv2.convertScaleAbs(img, alpha=1 + contrast / 100.0, beta=brightness)
    
    # Filter
    if params.get("filter"):
        f = params["filter"].lower()

        if f == "invert":
            img = cv2.bitwise_not(img)

        elif f == "sepia":
            kernel = np.array([[0.272, 0.534, 0.131],
                               [0.349, 0.686, 0.168],
                               [0.393, 0.769, 0.189]])
            img = cv2.transform(img, kernel)
            img = np.clip(img, 0, 255)

        elif f == "emboss":
            kernel = np.array([[ -2, -1, 0],
                               [ -1,  1, 1],
                               [  0,  1, 2]])
            img = cv2.filter2D(img, -1, kernel)

        elif f == "edge":
            img = cv2.Canny(img, 100, 200)

        elif f == "warm":
            increase = np.full(img.shape, (10, 0, 0), dtype=np.uint8)
            img = cv2.add(img, increase)

        elif f == "cool":
            decrease = np.full(img.shape, (0, 0, 10), dtype=np.uint8)
            img = cv2.subtract(img, decrease)
        elif f == "grayscale":
            img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Text overlay
    text = params["textOverlay"].get("text")
    x = params["textOverlay"].get("x")
    y = params["textOverlay"].get("y")
    if text and x and y:
        pos = (int(x), int(y))
        font = cv2.FONT_HERSHEY_SIMPLEX
        color = (255, ) if len(img.shape) == 2 else (255, 255, 255)
        cv2.putText(img, text, pos, font, 1, color, 2)


    cv2.imwrite(params["outputPath"], img)

if __name__ == "__main__":
    params = parse_args()
    process_image(params)
