from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sklearn.linear_model import LogisticRegression
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from typing import Optional

# Define el modelo de entrada
class Diabetes(BaseModel):
    Pregnancies: float
    PlasmaGlucose: float
    DiastolicBloodPressure: float
    TricepsThickness: float
    SerumInsulin: float
    BMI: float
    DiabetesPedigree: float
    Age: float

app = FastAPI()

origins = [
    "http://localhost:5173",  # Reemplaza con la dirección de la otra computadora
    "http://localhost:5174",  # Reemplaza con la dirección de la otra computadora
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Agrega esta variable global
global diabetes

@app.on_event("startup")
def load_model():
    global model, diabetes
    # Carga el conjunto de datos y entrena el modelo aquí
    diabetes = pd.read_csv('diabetes_dataset.csv')
    features = ['Pregnancies','PlasmaGlucose','DiastolicBloodPressure','TricepsThickness','SerumInsulin','BMI','DiabetesPedigree','Age']
    label = 'Diabetic'
    X, y = diabetes[features].values, diabetes[label].values
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.30, random_state=0)
    reg = 0.01
    model = LogisticRegression(C=1/reg, solver="liblinear").fit(X_train, y_train)

@app.post('/predict')
def predict_diabetes(diabetes: Diabetes):
    data = diabetes.dict()
    # Convierte los valores del diccionario en una lista porque el modelo espera una lista de características
    data_in = [val for val in data.values()]
    prediction = model.predict([data_in])
    if prediction[0] == 0:
        return {'prediction': 'No tiene diabetes'}
    else:
        return {'prediction': 'Tiene diabetes'}

@app.get("/patient/{patient_id}")
def read_patient(patient_id: int):
    # Busca al paciente en el conjunto de datos
    patient = diabetes[diabetes['PatientID'] == patient_id]
    if patient.empty:
        return {"error": "Patient not found"}
    else:
        # Convierte el DataFrame de pandas a un diccionario
        patient_dict = patient.to_dict(orient='records')[0]
        return patient_dict