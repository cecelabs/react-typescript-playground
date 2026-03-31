import {create} from "zustand";
import {Mesa} from "@/src/common/domain/entities";

interface MesasStore {
    numeroMesas: number
    setNumeroMesas: (numeroMesas: number) => void
    mesas: Mesa[]
    setMesas: (mesas: Mesa[]) => void
}

export const useMesas = create<MesasStore>((set, get) => ({
    numeroMesas: 5,
    setNumeroMesas: (numeroMesas: number) => set({numeroMesas: numeroMesas}),
    mesas: [
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
    ],
    setMesas: (mesas: Mesa[]) => set({mesas}),

}));
