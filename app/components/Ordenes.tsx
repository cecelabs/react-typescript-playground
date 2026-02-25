"use client";

import React, {useState} from "react";
import MesaCard, {Mesa} from "@/app/components/MesaCard";
import MesaModal from "@/app/components/MesaModal";
import OrdenModal from "@/app/components/OrdenesModal"; // ⬅️ antes NuevaMesaModal
import EditarMesaModal from "@/app/components/EditarMesaModal";
import {useMesas} from "@/src/common/application/mesas-store";

export default function OrdenesPage() {
    const [mesaSeleccionada, setMesaSeleccionada] = useState<Mesa | null>(null);
    const [mostrarOrdenModal, setMostrarOrdenModal] = useState<boolean>(false); // ⬅️ antes mostrarModalNuevaMesa
    const [mostrarEditar, setMostrarEditar] = useState<boolean>(false);
    const {numeroMesas, setNumeroMesas, mesas, setMesas} = useMesas();


    const eliminarMesa = (id: number) => {
        const confirmacion = window.confirm(
            "¿Estás seguro que deseas eliminar esta mesa?"
        );
        if (!confirmacion) return;

        setMesas(mesas.filter((mesa) => mesa.id !== id));
        setMesaSeleccionada(null);
        setNumeroMesas(numeroMesas+2);
    };

    const actualizarMesa = (mesaActualizada: Mesa) => {
        setMesas(
            mesas.map((m) =>
                m.id === mesaActualizada.id ? mesaActualizada : m
            )
        );
        setMesaSeleccionada(mesaActualizada);
    };

    return (
        <div style={{padding: "30px"}}>
            <h1>Gestión de Órdenes</h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                    gap: "20px",
                }}
            >
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
                    onDelete={eliminarMesa}
                    onEdit={() => setMostrarEditar(true)}
                />
            )}

            {/* ⬇️ Aquí ahora usamos OrdenModal */}
            {mostrarOrdenModal && (
                <OrdenModal
                    onClose={() => setMostrarOrdenModal(false)}
                />
            )}

            {mostrarEditar && mesaSeleccionada && (
                <EditarMesaModal
                    mesa={mesaSeleccionada}
                    onClose={() => setMostrarEditar(false)}
                    onSave={actualizarMesa}
                />
            )}
        </div>
    );
}