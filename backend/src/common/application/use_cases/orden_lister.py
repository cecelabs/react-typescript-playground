from src.common.domain.entities.orden import Orden
from src.common.domain.interfaces.use_case import UseCase


class OrdenLister(UseCase):
    def execute(self) -> list[Orden]:
        return [
            Orden(
                id=2,
                plato="sajta",
                cantidad=2,
                estado="espera",
            ),
            Orden(
                id=4,
                plato="papas",
                cantidad=3,
                estado="espera",
            )
        ]

if __name__=="__main__":
    listado=OrdenLister().execute()
    print(listado)