"use client";

import React from "react";
import { Mesa } from "./MesaCard";

interface MesaModalProps {
  mesa: Mesa;
  onClose: () => void;
}

export default function MesaModal({ mesa, onClose }: MesaModalProps) {
  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    } as React.CSSProperties,
    modal: {
      backgroundColor: "#fff",
      padding: "30px",
      borderRadius: "12px",
      width: "400px",
      maxHeight: "80vh",
      overflowY: "auto",
    } as React.CSSProperties,
    button: {
      marginTop: "15px",
      padding: "10px",
      border: "none",
      borderRadius: "6px",
      backgroundColor: "#3498db",
      color: "white",
      cursor: "pointer",
    } as React.CSSProperties,
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
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

        <button style={styles.button} onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}
