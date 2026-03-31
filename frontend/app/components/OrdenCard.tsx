"use client";

import React from "react";
import {Orden} from "@/src/common/domain/entities";

interface OrdenCardProps {
  orden: Orden;
  onActualizar: (campo: keyof Orden, valor: any) => void;
  onBorrar: () => void;
}

export default function OrdenCard({ orden, onActualizar, onBorrar }: OrdenCardProps) {
  const styles = {
    card: {
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      marginBottom: "10px",
      backgroundColor: "#f0f0f0",
    } as React.CSSProperties,
    input: {
      display: "block",
      width: "100%",
      marginBottom: "10px",
      padding: "8px",
      borderRadius: "6px",
      border: "1px solid #ccc",
    } as React.CSSProperties,
    button: {
      padding: "8px 12px",
      backgroundColor: "#e74c3c",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
    } as React.CSSProperties,
  };

  return (
    <div style={styles.card}>
      <input
        placeholder="Plato"
        value={orden.plato}
        onChange={(e) => onActualizar("plato", e.target.value)}
        style={styles.input}
      />
      <input
        type="number"
        value={orden.cantidad}
        onChange={(e) => onActualizar("cantidad", Number(e.target.value))}
        style={styles.input}
      />
      <select
        value={orden.estado}
        onChange={(e) => onActualizar("estado", e.target.value)}
        style={styles.input}
      >
        <option value="pendiente">Pendiente</option>
        <option value="preparacion">Preparación</option>
        <option value="entregado">Entregado</option>
      </select>
      <button style={styles.button} onClick={onBorrar}>
        Borrar
      </button>
    </div>
  );
}