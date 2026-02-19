"use client";

import React from "react";

export interface Orden {
  id: number;
  plato: string;
  cantidad: number;
  estado: "pendiente" | "preparacion" | "entregado";
}

export interface Mesa {
  id: number;
  numero: number;
  mesero: string;
  disponible: boolean;
  cantidadPersonas: number;
  ordenes: Orden[];
}

interface MesaCardProps {
  mesa: Mesa;
  onClick: (mesa: Mesa) => void;
}

export default function MesaCard({ mesa, onClick }: MesaCardProps) {
  const styles = {
    card: {
      padding: "20px",
      borderRadius: "12px",
      cursor: "pointer",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      transition: "0.3s",
      backgroundColor: mesa.disponible ? "#d4edda" : "#f8d7da",
    } as React.CSSProperties,
    title: {
      marginBottom: "10px",
    } as React.CSSProperties,
  };

  return (
    <div style={styles.card} onClick={() => onClick(mesa)}>
      <h3 style={styles.title}>Mesa #{mesa.numero}</h3>
      <p><strong>Mesero:</strong> {mesa.mesero}</p>
      <p>
        <strong>Estado:</strong>{" "}
        {mesa.disponible ? "Disponible" : "Ocupada"}
      </p>
    </div>
  );
}
