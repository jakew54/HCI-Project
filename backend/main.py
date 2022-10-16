import models
from fastapi import FastAPI, Request, Depends
from database import SessionLocal, engine
from pydantic import BaseModel
from models import Student
from sqlalchemy.orm import Session
import pandas as pd
from datetime import datetime

MAJOR_LIST = ['Computer Science', 'Biology', 'Philosophy', 'Electrical Engineering']
CLASS_NAME_LIST = ['Data Bases', 'Calc 1', 'Statistics', 'Introduction to Computer Science']
PLACE_TYPE_LIST = ['Library', 'Outside', 'Online', 'Study Room']
LANGUAGE_LIST = ['English', 'Spanish', 'Hindi']
STUDY_ROLE = ['Teacher', 'Student', 'Study-Buddy']


class Filter:
    def __init__(self):
        self.min_time = None
        self.max_time = None
        self.majors = None
        self.class_names = None
        self.place_types = None
        self.min_group_size = None
        self.max_group_size = None
        self.languages = None
        self.study_roles = None


main_filter = Filter()


def add_people_to_DB(db):
    students = db.query(Student)
    if not students.count():
        users = pd.read_csv('Users.csv')
        for index, row in users.iterrows():
            new_student = Student(name=row['name'], time=row['time'], major=row['major'], class_name=row['class_name'],
                                  place_type=row['place_type'], place=row['place'], group_size=row['group_size'], language=row['language'],
                                  study_role=row['study_role'])
            db.add(new_student)
        db.commit()


def get_dict(lst):
    return dict.fromkeys(lst, 0)


app = FastAPI()
models.Base.metadata.create_all(bind=engine)


class Student_Request(BaseModel):
    name: str
    time: int
    major: str
    class_name: str
    place_type: str
    place: str
    group_size: int
    language: str
    study_role: str


#
# class Filters(BaseModel):
#     min_time: int


def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


def get_current_time():
    current_time = datetime.now()
    return int(str(current_time.hour) + str(current_time.minute))


def apply_checkbox_filter(filter_lst, general_lst, students, query_name):
    current_dict = get_dict(general_lst)
    for key in filter_lst:
        current_dict[key] = 1
    for key, value in current_dict.items():
        if value == 0:
            if query_name == 'Major':
                students = students.filter(Student.major != key)
            elif query_name == 'Class Name':
                students = students.filter(Student.class_name != key)
            elif query_name == 'Place Type':
                students = students.filter(Student.place_type != key)
            elif query_name == 'Language':
                students = students.filter(Student.language != key)
            elif query_name == 'Study Role':
                students = students.filter(Student.study_role != key)
    return students


def get_filtered_students(db):
    students = db.query(Student)

    if main_filter.min_time:
        students = students.filter(Student.time >= (get_current_time() + int(main_filter.min_time) * 100))

    if main_filter.max_time:
        students = students.filter(Student.time <= (get_current_time() + int(main_filter.max_time) * 100))

    if main_filter.majors:
        students = apply_checkbox_filter(main_filter.majors, MAJOR_LIST, students, 'Major')

    if main_filter.class_names:
        students = apply_checkbox_filter(main_filter.class_names, CLASS_NAME_LIST, students, 'Class Name')

    if main_filter.place_types:
        students = apply_checkbox_filter(main_filter.place_types, PLACE_TYPE_LIST, students, 'Place Type')

    if main_filter.min_group_size:
        students = students.filter(Student.group_size >= main_filter.min_group_size)

    if main_filter.max_group_size:
        students = students.filter(Student.group_size <= main_filter.max_group_size)

    if main_filter.languages:
        students = apply_checkbox_filter(main_filter.languages, LANGUAGE_LIST, students, 'Language')

    if main_filter.study_roles:
        students = apply_checkbox_filter(main_filter.study_roles, STUDY_ROLE, students, 'Study Role')

    return students


@app.get("/time_filter")
def time_filter(min_time, max_time, db: Session = Depends(get_db)):
    main_filter.min_time = min_time
    main_filter.max_time = max_time
    students = get_filtered_students(db)
    return {"student number": students.count()}


@app.get("/major_filter")
def major_filter(majors, db: Session = Depends(get_db)):
    main_filter.majors = majors
    students = get_filtered_students(db)
    return {"student number": students.count()}


@app.get("/class_filter")
def class_filter(classes, db: Session = Depends(get_db)):
    main_filter.class_names = classes
    students = get_filtered_students(db)
    return {"student number": students.count()}


@app.get("/place_type_filter")
def place_type_filter(place_types, db: Session = Depends(get_db)):
    main_filter.place_types = place_types
    students = get_filtered_students(db)
    return {"student number": students.count()}


@app.get("/groupsize")
def group_size_filter(min_group_size, max_group_size, db: Session = Depends(get_db)):
    main_filter.min_group_size = min_group_size
    main_filter.max_group_size = max_group_size
    students = get_filtered_students(db)
    print("blabla", students.count())
    return {"student number": students.count()}


@app.get("/languages_filter")
def languages_filter(languages, db: Session = Depends(get_db)):
    main_filter.languages = languages
    students = get_filtered_students(db)
    return {"student number": students.count()}


@app.get("/study_roles_filter")
def study_roles_filter(study_roles, db: Session = Depends(get_db)):
    main_filter.study_roles = study_roles
    students = get_filtered_students(db)
    return {"student number": students.count()}


@app.get("/done_filtering")
def done_filtering(db: Session = Depends(get_db)):
    return {"data": get_filtered_students(db)}


@app.post("/student")
async def create_student(student_request: Student_Request, db: Session = Depends(get_db)):
    """
    add one or more tickers to the database
    background task to use yfinance and load key statistics
    """

    student = Student()
    student.name = student_request.name
    student.time = student_request.time
    student.major = student_request.major
    student.place_type = student_request.place_type
    student.place = student_request.place
    student.class_name = student_request.class_name
    student.group_size = student_request.group_size
    student.language = student_request.language
    student.study_role = student_request.study_role

    db.add(student)
    db.commit()
    print("done")

    return {
        "code": "success",
    }


add_people_to_DB(SessionLocal())

# class Filter:
#     def __init__(self):


# def get_dict(lst):
#     return dict.fromkeys(lst, 0)
#
#
# app = FastAPI()
#
# models.Base.metadata.create_all(bind=engine)
#
#
# class Student_Request(BaseModel):
#     name: str
#     time: int
#     major: str
#     class_name: str
#     place_type: str
#     place: str
#     group_size: int
#     language: str
#     study_role: str
#
#
# class Filters(BaseModel):
#     min_time: int
#
#
# def get_db():
#     try:
#         db = SessionLocal()
#         yield db
#     finally:
#         db.close()
#
#
# def get_current_time():
#     current_time = datetime.now()
#     return int(str(current_time.hour) + str(current_time.minute))
#
#
# def apply_checkbox_filter(filter_lst, general_lst, students, query_name):
#     current_dict = get_dict(general_lst)
#     for key in filter_lst:
#         current_dict[key] = 1
#     for key, value in current_dict.items():
#         if value == 0:
#             if query_name == 'Major':
#                 students = students.filter(Student.major != key)
#             elif query_name == 'Class Name':
#                 students = students.filter(Student.class_name != key)
#             elif query_name == 'Place Type':
#                 students = students.filter(Student.place_type != key)
#             elif query_name == 'Language':
#                 students = students.filter(Student.language != key)
#             elif query_name == 'Study Role':
#                 students = students.filter(Student.study_role != key)
#     return students
#
#
# @app.get("/apply_filters")
# def get_number_of_filtered_students(min_time=None, max_time=None, majors=None, class_names=None, place_types=None, min_group_size=None,
#                                     max_group_size=None, languages=None, study_roles=None,
#                                     db: Session = Depends(get_db)):
#     students = db.query(Student)
#
#     if min_time:
#         students = students.filter(Student.time >= (get_current_time() + int(min_time) * 100))
#
#     if max_time:
#         students = students.filter(Student.time <= (get_current_time() + int(max_time) * 100))
#
#     if majors:
#         students = apply_checkbox_filter(majors, MAJOR_LIST, students, 'Major')
#
#     if class_names:
#         students = apply_checkbox_filter(class_names, CLASS_NAME_LIST, students, 'Class Name')
#
#     if place_types:
#         students = apply_checkbox_filter(place_types, PLACE_TYPE_LIST, students, 'Place Type')
#
#     if min_group_size:
#         students = students.filter(Student.group_size >= min_group_size)
#
#     if max_group_size:
#         students = students.filter(students.group_size <= max_group_size)
#
#     if languages:
#         students = apply_checkbox_filter(languages, LANGUAGE_LIST, students, 'Language')
#
#     if study_roles:
#         students = apply_checkbox_filter(study_roles, STUDY_ROLE, students, 'Study Role')
#
#     return {"student number": students.count()}
#
#
# # @app.get("/")
# # def home(request: Request, forward_pe = None, dividend_yield = None, ma50 = None, ma200 = None, db: Session = Depends(get_db)):
# #     """
# #     show all stocks in the database and button to add more
# #     button next to each stock to delete from database
# #     filters to filter this list of stocks
# #     button next to each to add a note or save for later
# #     """
# #
# #     stocks = db.query(Stock)
# #
# #     if forward_pe:
# #         stocks = stocks.filter(Stock.forward_pe < forward_pe)
# #
# #     if dividend_yield:
# #         stocks = stocks.filter(Stock.dividend_yield > dividend_yield)
# #
# #     if ma50:
# #         stocks = stocks.filter(Stock.price > Stock.ma50)
# #
# #     if ma200:
# #         stocks = stocks.filter(Stock.price > Stock.ma200)
# #
# #     stocks = stocks.all()
# #
# #     return templates.TemplateResponse("home.html", {
# #         "request": request,
# #         "stocks": stocks,
# #         "dividend_yield": dividend_yield,
# #         "forward_pe": forward_pe,
# #         "ma200": ma200,
# #         "ma50": ma50
# #     })
# #
# #
# # def fetch_stock_data(id: int):
# #
# #     db = SessionLocal()
# #
# #     stock = db.query(Stock).filter(Stock.id == id).first()
# #
# #     yahoo_data = yfinance.Ticker(stock.symbol)
# #
# #     stock.ma200 = yahoo_data.info['twoHundredDayAverage']
# #     stock.ma50 = yahoo_data.info['fiftyDayAverage']
# #     stock.price = yahoo_data.info['previousClose']
# #     stock.forward_pe = yahoo_data.info['forwardPE']
# #     stock.forward_eps = yahoo_data.info['forwardEps']
# #     stock.dividend_yield = yahoo_data.info['dividendYield'] * 100
# #
# #     db.add(stock)
# #     db.commit()
# #
# #
