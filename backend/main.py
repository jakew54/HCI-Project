import models
from fastapi import FastAPI, Request, Depends
from database import SessionLocal, engine
from pydantic import BaseModel
from models import Student
from sqlalchemy.orm import Session
import pandas as pd
from datetime import datetime
from typing import List
from fastapi.middleware.cors import CORSMiddleware

MAJOR_LIST = ["Computer Science", "Math", "Biology", "Political Science", "Chemistry", "Physics"]
CLASS_NAME_LIST = ['Data Bases', 'Calc 1', 'Statistics', 'Introduction to Computer Science']
PLACE_TYPE_LIST = ['Library', 'Outside', 'Online', 'Study Room']
LANGUAGE_LIST = ["English", "Spanish", "Hindi", "Japanese", "French", "German"]
STUDY_ROLE = ["Tutor", "Student", "Study-Buddy", "Expert", "Novice"]
ORIGINS = ["http://localhost:3000"]


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

    def clear_filters(self):
        self.__init__()


class StudentRequests(BaseModel):
    name: str
    time: int
    major: str
    class_name: str
    place_type: str
    place: str
    group_size: int
    language: str
    study_role: str
    picture: str


class StudentsResponse(BaseModel):
    students: List[StudentRequests]
    number_of_students: int


def add_people_to_db(db):
    students = db.query(Student)
    if not students.count():
        users = pd.read_csv('Users.csv')
        for index, row in users.iterrows():
            new_student = Student(name=row['name'], time=row['time'], major=row['major'], class_name=row['class_name'],
                                  place_type=row['place_type'], place=row['place'], group_size=row['group_size'], language=row['language'],
                                  study_role=row['study_role'], picture=row['picture'])
            db.add(new_student)
        db.commit()


def get_dict(lst):
    return dict.fromkeys(lst, 0)


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
    # print(current_dict)
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

    if main_filter.majors and main_filter.majors[0]:
        students = apply_checkbox_filter(main_filter.majors, MAJOR_LIST, students, 'Major')

    if main_filter.class_names and main_filter.class_names[0]:
        students = apply_checkbox_filter(main_filter.class_names, CLASS_NAME_LIST, students, 'Class Name')

    if main_filter.place_types and main_filter.place_types[0]:
        students = apply_checkbox_filter(main_filter.place_types, PLACE_TYPE_LIST, students, 'Place Type')

    if main_filter.min_group_size:
        students = students.filter(Student.group_size >= main_filter.min_group_size)

    if main_filter.max_group_size:
        students = students.filter(Student.group_size <= main_filter.max_group_size)

    if main_filter.languages and main_filter.languages[0]:
        students = apply_checkbox_filter(main_filter.languages, LANGUAGE_LIST, students, 'Language')

    if main_filter.study_roles and main_filter.study_roles[0]:
        students = apply_checkbox_filter(main_filter.study_roles, STUDY_ROLE, students, 'Study Role')

    return students


def response(students):
    students_list = [
        StudentRequests(
            name=student.name,
            time=student.time,
            major=student.major,
            class_name=student.class_name,
            place_type=student.place_type,
            place=student.place,
            group_size=student.group_size,
            language=student.language,
            study_role=student.study_role,
            picture=student.picture
        )
        for student in students.all()
    ]
    return StudentsResponse(students=students_list, number_of_students=len(students_list))


app = FastAPI()

main_filter = Filter()

models.Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

add_people_to_db(SessionLocal())


@app.get("/group_size_filter", response_model=StudentsResponse)
def group_size_filter(min_group_size: int, max_group_size: int, db: Session = Depends(get_db)):
    main_filter.min_group_size = min_group_size
    main_filter.max_group_size = max_group_size
    students = get_filtered_students(db)
    return response(students)


@app.get("/time_filter", response_model=StudentsResponse)
def time_filter(min_time, max_time, db: Session = Depends(get_db)):
    main_filter.min_time = min_time
    main_filter.max_time = max_time
    students = get_filtered_students(db)
    return response(students)


@app.get("/major_filter", response_model=StudentsResponse)
def major_filter(majors, db: Session = Depends(get_db)):
    main_filter.majors = majors.split(',')
    students = get_filtered_students(db)
    return response(students)


@app.get("/class_filter", response_model=StudentsResponse)
def class_filter(classes, db: Session = Depends(get_db)):
    main_filter.class_names = classes.split(',')
    students = get_filtered_students(db)
    return response(students)


@app.get("/place_type_filter", response_model=StudentsResponse)
def place_type_filter(place_types, db: Session = Depends(get_db)):
    main_filter.place_types = place_types.split(',')
    students = get_filtered_students(db)
    return response(students)


@app.get("/languages_filter", response_model=StudentsResponse)
def languages_filter(languages, db: Session = Depends(get_db)):
    main_filter.languages = languages.split(',')
    students = get_filtered_students(db)
    return response(students)


@app.get("/study_roles_filter", response_model=StudentsResponse)
def study_roles_filter(study_roles, db: Session = Depends(get_db)):
    main_filter.study_roles = study_roles.split(',')
    students = get_filtered_students(db)
    return response(students)


@app.get("/done_filtering", response_model=StudentsResponse)
def done_filtering(db: Session = Depends(get_db)):
    students = get_filtered_students(db)
    return response(students)


@app.get("/clear_filters", response_model=StudentsResponse)
def clear_filters(db: Session = Depends(get_db)):
    main_filter.clear_filters()
    students = get_filtered_students(db)
    return response(students)

# @app.post("/student")
# async def create_student(student_request: StudentRequests, db: Session = Depends(get_db)):
#     """
#     add one or more tickers to the database
#     background task to use yfinance and load key statistics
#     """
#
#     student = Student()
#     student.name = student_request.name
#     student.time = student_request.time
#     student.major = student_request.major
#     student.place_type = student_request.place_type
#     student.place = student_request.place
#     student.class_name = student_request.class_name
#     student.group_size = student_request.group_size
#     student.language = student_request.language
#     student.study_role = student_request.study_role
#
#     db.add(student)
#     db.commit()
#     print("done")
#
#     return {
#         "code": "success",
#     }

#
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
