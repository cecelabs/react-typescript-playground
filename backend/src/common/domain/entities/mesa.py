from dataclasses import dataclass

from src.common.domain.entities.orden import Orden


@dataclass
class Mesa:
    id: int
    numero: int
    mesero: str
    disponible: bool
    cantidad_personas: int
    ordenes: list[Orden]
