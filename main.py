from fastapi import FastAPI
import os

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hello from Liara PaaS!", "port": os.getenv("PORT")}
