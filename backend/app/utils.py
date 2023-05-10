import json
import xmltodict
from . import constants

def convert_course_xml_to_json(course_xml_data: str) -> dict:
    course_data_dict = xmltodict.parse(course_xml_data)
    with open(constants.COURSE_JSON_FILE, "w") as f:
        json.dump(course_data_dict, f)
    return course_data_dict

def convert_rotation_xml_to_json(rotation_xml_path: str) -> dict:
    with open(rotation_xml_path, "r") as rotation_xml_file:
        rotation_data_dict = xmltodict.parse(rotation_xml_file.read())
    with open(constants.ROTATION_JSON_FILE, "w") as f:
        json.dump(rotation_data_dict, f)
    return rotation_data_dict

def create_course_dict(rotation_course_dict: dict, course_dict: dict) -> dict:
    course_data = {
        constants.SUBJECT: rotation_course_dict.get(constants.SUBJECT),
        constants.COURSE_NUMBER: rotation_course_dict.get(constants.COURSE_NUMBER),
        constants.CREDIT: course_dict.get(constants.CREDIT),
        constants.COURSE_DESCRIPTION: course_dict.get(constants.COURSE_DESCRIPTION),
        constants.ROTATION_TERM: rotation_course_dict.get(constants.ROTATION_TERM),
    }
    if constants.PREREQUISITE in course_dict:
        course_data[constants.PREREQUISITE] = course_dict.get(constants.PREREQUISITE)
    return course_data