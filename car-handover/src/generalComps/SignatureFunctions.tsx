import { useRef } from "react";
import { useAppStates } from "./States";

export function useSignatureFunctions() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const {
    setIsDrawing,
    isDrawing,
    setSignatureType,
    setSignatures,
    signatureType,
    setShowSignature,
  } = useAppStates();

  interface StartDrawingEvent
    extends React.MouseEvent<HTMLCanvasElement, MouseEvent> {}

  const startDrawing = (e: StartDrawingEvent): void => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  interface DrawEvent extends React.MouseEvent<HTMLCanvasElement, MouseEvent> {}

  const draw = (e: DrawEvent): void => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataURL = canvas.toDataURL();
    setSignatures((prev) => ({ ...prev, [signatureType]: dataURL }));

    if (signatureType === "donor") {
      setSignatureType("recipient");
      clearCanvas();
    } else {
      setShowSignature(false);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return {
    canvasRef,
    startDrawing,
    draw,
    stopDrawing,
    saveSignature,
    clearCanvas,
  };
}
