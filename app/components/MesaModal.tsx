"use client";

import React from "react";
import { Mesa } from "./MesaCard";

interface MesaModalProps {
  mesa: Mesa;
  onClose: () => void;
  onDelete: (id: number) => void;
  onEdit: () => void;
}

export default function MesaModal({
  mesa,
  onClose,
  onDelete,
  onEdit,
}: MesaModalProps) {
  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>Mesa #{mesa.numero}</h2>
        <p><strong>Mesero:</strong> {mesa.mesero}</p>
        <p><strong>Personas:</strong> {mesa.cantidadPersonas}</p>
        <p>
          <strong>Estado:</strong>{" "}
          {mesa.disponible ? "Disponible" : "Ocupada"}
        </p>

        <h3>Órdenes:</h3>
        {mesa.ordenes.length === 0 ? (
          <p>No hay órdenes registradas.</p>
        ) : (
          <ul>
            {mesa.ordenes.map((orden) => (
              <li key={orden.id}>
                {orden.plato} x{orden.cantidad} -{" "}
                <strong>{orden.estado}</strong>
              </li>
            ))}
          </ul>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <button onClick={onClose} style={buttonStyle}>
            Cerrar
          </button>

          <button onClick={onEdit} style={editButtonStyle}>
            Editar
          </button>

          <button
            onClick={() => onDelete(mesa.id)}
            style={deleteButtonStyle}
          >
            Eliminar
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
  maxHeight: "80vh",
  overflowY: "auto",
};

const buttonStyle: React.CSSProperties = {
  padding: "10px",
  border: "none",
  borderRadius: "6px",
  backgroundColor: "#3498db",
  color: "white",
  cursor: "pointer",
};

const editButtonStyle: React.CSSProperties = {
  padding: "10px",
  border: "none",
  borderRadius: "6px",
  backgroundColor: "#f39c12",
  color: "white",
  cursor: "pointer",
};

const deleteButtonStyle: React.CSSProperties = {
  padding: "10px",
  border: "none",
  borderRadius: "6px",
  backgroundColor: "#e74c3c",
  color: "white",
  cursor: "pointer",
};
