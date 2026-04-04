import React, { useEffect, useRef, useState } from "react";
import {
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";
import "../styles/FaceExpression.scss";

import {
  getExpression,
  getFinalExpression,
} from "../utils/utils";

const FaceExpression = () => {
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);

  const [expression, setExpression] = useState("Not checked");
  const [countdown, setCountdown] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const startScan = () => {
    if (isScanning) return;

    setIsScanning(true);
    setExpression("Scanning...");
    let seconds = 3;

    const collected = [];

    const countdownInterval = setInterval(() => {
      setCountdown(seconds);
      seconds--;

      if (seconds < 0) clearInterval(countdownInterval);
    }, 1000);

    const startTime = Date.now();

    const scanLoop = () => {
      if (!videoRef.current || !faceLandmarkerRef.current) return;

      const now = performance.now();
      const result =
        faceLandmarkerRef.current.detectForVideo(
          videoRef.current,
          now
        );

      if (
        result.faceBlendshapes &&
        result.faceBlendshapes.length > 0
      ) {
        const shapes =
          result.faceBlendshapes[0].categories;

        const exp = getExpression(shapes);
        collected.push(exp);
      }

      if (Date.now() - startTime < 5000) {
        requestAnimationFrame(scanLoop);
      } else {
        finishScan(collected);
      }
    };

    scanLoop();
  };

  const finishScan = (collected) => {
    setIsScanning(false);
    setCountdown(null);

    const finalExpression =
      getFinalExpression(collected);

    setExpression(finalExpression);
  };

  useEffect(() => {
    const init = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
      );

      const faceLandmarker =
        await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
          },
          runningMode: "VIDEO",
          outputFaceBlendshapes: true,
        });

      faceLandmarkerRef.current = faceLandmarker;

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      videoRef.current.srcObject = stream;
      await videoRef.current.play();
    };

    init();

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="face-expression-container">
      <div className="face-expression-card">
        <div className="face-expression-title">
          AI Face Expression Detector
        </div>

        <div className="face-expression-result">
          Expression: {expression}
        </div>

        {countdown !== null && (
          <div className="face-expression-countdown">
            Scanning in: {countdown}
          </div>
        )}

        <div className="video-wrapper">
          <video ref={videoRef} autoPlay muted />
        </div>

        <button
          onClick={startScan}
          disabled={isScanning}
          className="scan-button"
        >
          {isScanning ? "Scanning..." : "Check Expression"}
        </button>
      </div>
    </div>
  );
};

export default FaceExpression;