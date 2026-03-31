"use client";

import React, {useState} from "react";
import MesaCard, {Mesa} from "@/app/components/MesaCard";
import MesaModal from "@/app/components/MesaModal";

export default function MesasPage() {
    const [mesaSeleccionada, setMesaSeleccionada] = useState<Mesa | null>(null);

    const [mesas] = useState<Mesa[]>([
        {
            id: 1,
            numero: 1,
            mesero: "Carlos",
            disponible: false,
            cantidadPersonas: 4,
            ordenes: [
                {id: 1, plato: "Pizza", cantidad: 2, estado: "preparacion"},
                {id: 2, plato: "Refresco", cantidad: 4, estado: "entregado"},
            ],
        },
        {
            id: 2,
            numero: 2,
            mesero: "Ana",
            disponible: true,
            cantidadPersonas: 0,
            ordenes: [],
        },
    ]);

    const styles = {
        container: {
            padding: "30px",
        } as React.CSSProperties,
        grid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
        } as React.CSSProperties,
    };

    return (
        <div style={styles.container}>
            <h1>Gestión de Mesas</h1>

            <div style={styles.grid}>
                {mesas.map((mesa) => (
                    <MesaCard
                        key={mesa.id}
                        mesa={mesa}
                        onClick={setMesaSeleccionada}
                    />
                ))}
            </div>

            {mesaSeleccionada && (
                <MesaModal
                    mesa={mesaSeleccionada}
                    onClose={() => setMesaSeleccionada(null)}
                />
            )}
        </div>
    );
}
