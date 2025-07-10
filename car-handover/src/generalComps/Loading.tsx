import React from "react";

const spinnerStyle: React.CSSProperties = {
  border: "6px solid #f3f3f3",
  borderTop: "6px solid #3498db",
  borderRadius: "50%",
  width: 60,
  height: 60,
  animation: "spin 1s linear infinite",
  margin: "auto",
};

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  background: "rgba(255,255,255,0.8)",
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  zIndex: 9999,
};

export default function Loading() {
  return (
    <div style={containerStyle}>
      <div style={spinnerStyle} />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <div style={{ marginTop: 24, fontWeight: 600, color: "#3498db" }}>
        Loading...
      </div>
    </div>
  );
}
