from sqlalchemy import Column, Numeric, Integer, String
from database import Base


class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    time = Column(Numeric(4))
    major = Column(String)
    class_name = Column(String)
    place_type = Column(String)
    place = Column(String)
    group_size = Column(Integer)
    language = Column(String)
    study_role = Column(String)
