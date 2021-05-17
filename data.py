from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, Integer, String, PickleType

engine = create_engine('sqlite:///solutions.db')
session = sessionmaker(bind=engine)()

Base = declarative_base()


class BeautifulSolution(Base):
    __tablename__ = 'beautiful'

    id = Column(Integer, primary_key=True, autoincrement=True)
    add1 = Column(String)
    add2 = Column(String)
    sum = Column(String)
    solution = Column(PickleType)
    likeCount = Column(Integer)
    triedCount = Column(Integer)
    solvedCount = Column(Integer)

