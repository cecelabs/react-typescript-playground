from fastapi import FastAPI

from src.common.domain.entities.orden import Orden
from src.common.application.use_cases.orden_lister import OrdenLister

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{num_id}/{q}")
def read_item(num_id: int, q: str | None = None):
    return {"item_id": num_id, "q": q}

@app.get("/ordenes")
def orden_lister()->list[Orden]:
    return OrdenLister().execute()