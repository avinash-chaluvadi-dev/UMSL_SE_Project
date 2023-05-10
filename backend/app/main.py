import os
import json
import fastapi
import sqlite3
import xmltodict
from pathlib import Path
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from fastapi import FastAPI, HTTPException
from fastapi.security import HTTPBasic, HTTPBasicCredentials

from. import constants
from. import utils

# USERS = [
#     {"username": "admin@umsl.edu", "password": "Admin1234"}
# ]

conn = sqlite3.connect("degree_planner.sqlite3", check_same_thread=False)
cursor = conn.cursor()

app = FastAPI(
    title="Degree Planner Tool",
    description="Tool designed to help students plan",
    version="0.0.1",
    contact={
        "name": "Avinash, Chaluvadi",
        "email": "acfy8@umsystem.edu",
    },
    license_info={
        "name": "MIT",
    },
)
security = HTTPBasic()

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/ping", tags=["Status Check"])
async def ping():
    return {"status": "Alive"}

def get_data_from_db():
    cursor.execute("SELECT * FROM admin")
    return cursor.fetchall()


@app.post("/login")
def login(credentials: HTTPBasicCredentials):
    data = get_data_from_db()
    user = None
    for _, username, password in data:
        if username == credentials.username and password == credentials.password:
            user = username
            break
    if user is None:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    else:
        return {"username": username}

  
@app.post("/uploadjson/")
async def upload_json(file: UploadFile = File(...)):
    parent = os.path.dirname(os.getcwd())
    file_location = f"{parent}/frontend/src/assets/test.json"
    with open(file_location, "wb") as file_object:
        file_object.write(await file.read())
    with open(file_location, "r") as f:
        json_data = json.load(f)
    return {"filename": file.filename, "json_data": json_data}

@app.post("/xml_to_json")
def convert_xml_to_json(file: UploadFile = File(...)):
    parent = os.path.dirname(os.getcwd())
    merged_data = {}
    course_data = (
        utils.convert_course_xml_to_json(course_xml_path=course_xml_path)
        .get(constants.DESCRIPTIONS)
        .get(constants.COURSE)
    )
    rotation_data = utils.convert_rotation_xml_to_json(rotation_xml_path=utils.rotation_xml_path)
    rotation_year_data = [
        data
        for data in rotation_data.get(constants.ROTATIONS).get(constants.ROTATION_YEAR)
        if data.get(constants.YEAR) == "2022"
    ]
    for index, course in enumerate(rotation_year_data[0].get(constants.COURSE)):
        course_name = course.get(constants.COURSE_NAME)
        print(course_name)
        filtered_course = list(
            filter(lambda course: course[constants.COURSE_NAME] == course_name, course_data)
        )
        merged_data[course_name] = utils.create_course_dict(
            rotation_course_dict=course, course_dict=filtered_course[0]
        )
    with open(constants.MERGED_JSON_FILE, "w") as merged_json_file:
        json.dump(merged_data, merged_json_file)
