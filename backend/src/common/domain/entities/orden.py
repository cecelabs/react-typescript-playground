from dataclasses import dataclass


@dataclass
class Orden:
    id: int
    plato: str
    cantidad: int
    estado: str
