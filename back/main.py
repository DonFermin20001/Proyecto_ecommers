from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List,Optional
from supabase import create_client, Client
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import os

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins =["*"],
    allow_methods =["*"],
    allow_headers=["*"]
)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL,SUPABASE_KEY)

class Herramienta(BaseModel):
    codigo: int
    nombre: str
    estado: str
    tipo: str
    precio_hora: float
    precio_venta: float
    imagen_principal: str
    
class Kit(BaseModel):
    id: int
    nombre: str
    descripcion: str
    precio_total: float
    imagen_principal: str
    
class KitItem(BaseModel):
    id: int
    kit_id: int
    herramienta_codigo: int
    cantidad: float

class KitImagen(BaseModel):
    id: int
    kit_id: int
    url: str
    descripcion: str
    
class Carrito(BaseModel):
    id: int
    tipo: str            
    modo: str            
    kit_id: Optional[int]
    herramienta_codigo: Optional[int]
    cantidad: int
    
@app.post("/herramienta")
def insertar_herramienta(h: Herramienta):
    try:
        supabase.table("herramienta").insert(h.model_dump()).execute()
        return {"status": "ok", "msg": "Herramienta registrada"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/herramienta", response_model=List[Herramienta])
def listar_herramientas():
    data = supabase.table("herramienta").select("*").execute()
    return data.data

@app.post("/kit")
def insertar_kit(k: Kit):
    supabase.table("kits").insert(k.model_dump()).execute()
    return {"status": "ok", "msg": "Kit registrado"}

@app.get("/kit", response_model=List[Kit])
def listar_kits():
    data = supabase.table("kits").select("*").execute()
    return data.data

@app.post("/kit_item")
def insertar_kit_item(ki: KitItem):
    supabase.table("kits_items").insert(ki.model_dump()).execute()
    return {"status": "ok", "msg": "Item del kit registrado"}

@app.get("/kit_item", response_model=List[KitItem])
def listar_kit_items():
    data = supabase.table("kits_items").select("*").execute()
    return data.data

@app.post("/kit_imagen")
def insertar_kit_imagen(img: KitImagen):
    supabase.table("kits_imagenes").insert(img.model_dump()).execute()
    return {"status": "ok", "msg": "Imagen del kit registrada"}

@app.get("/kit_imagen", response_model=List[KitImagen])
def listar_kit_imagenes():
    data = supabase.table("kits_imagenes").select("*").execute()
    return data.data

@app.post("/carrito")
def insertar_carrito(c: Carrito):
    supabase.table("carrito").insert(c.model_dump()).execute()
    return {"status": "ok", "msg": "Elemento agregado al carrito"}

@app.get("/carrito", response_model=List[Carrito])
def listar_carrito():
    data = supabase.table("carrito").select("*").execute()
    return data.data