"use client";

import React, { useState } from "react";
import {Mesa} from "@/src/common/domain/entities";

interface NuevaMesaModalProps {
  onClose: () => void;
  onSave: (mesa: Mesa) => void;
  siguienteNumero: number;
}

export default function OrdenModal({
  onClose,
  onSave,
  siguienteNumero,
}: NuevaMesaModalProps) {
  const [mesero, setMesero] = useState<string>("");
  const [cantidadPersonas, setCantidadPersonas] = useState<number>(0);

  const handleGuardar = () => {
    const nuevaMesa: Mesa = {
      id: Date.now(), // id único
      numero: siguienteNumero,
      mesero: mesero || "Sin asignar",
      disponible: cantidadPersonas === 0,
      cantidadPersonas,
      ordenes: [],
    };

    onSave(nuevaMesa);
    onClose();
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>Nueva Mesa #{siguienteNumero}</h2>

        <div style={{ marginBottom: "10px" }}>
          <label>Mesero:</label>
          <input
            type="text"
            value={mesero}
            onChange={(e) => setMesero(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Cantidad de Personas:</label>
          <input
            type="number"
            value={cantidadPersonas}
            onChange={(e) => setCantidadPersonas(Number(e.target.value))}
            style={inputStyle}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button style={buttonStyle} onClick={onClose}>
            Cancelar
          </button>
          <button style={saveButtonStyle} onClick={handleGuardar}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "12px",
  width: "400px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px",
  marginTop: "5px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const buttonStyle: React.CSSProperties = {
  padding: "10px",
  border: "none",
  borderRadius: "6px",
  backgroundColor: "#6c757d",
  color: "white",
  cursor: "pointer",
};

const saveButtonStyle: React.CSSProperties = {
  padding: "10px",
  border: "none",
  borderRadius: "6px",
  backgroundColor: "#28a745",
  color: "white",
  cursor: "pointer",
};
