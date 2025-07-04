import React, { useRef, useState } from 'react';
import { Check } from 'lucide-react';

import { useAppStates } from './States';
const canvasRef = useRef(null);

import { useSignatureFunctions } from './SignatureFunctions';
const { startDrawing, draw, stopDrawing, saveSignature, clearCanvas } = useSignatureFunctions();

export default function Signature() {
    const {signatureType, setSignatureType} = useAppStates()
    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Semnătură {signatureType === 'donor' ? 'Donor' : 'Primitor'}
            </h3>
            
            <div className="border-2 border-gray-300 rounded-lg p-4 mb-4">
              <canvas
                ref={canvasRef}
                width={400}
                height={200}
                className="border border-gray-200 rounded w-full cursor-crosshair"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={saveSignature}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Check className="w-4 h-4 inline mr-2" />
                Salvează
              </button>
              <button
                onClick={clearCanvas}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Șterge
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mt-2 text-center">
              Desenează semnătura cu mouse-ul sau touch-ul
            </p>
          </div>
        </div>
    )
};