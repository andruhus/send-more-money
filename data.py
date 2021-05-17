from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, Integer, String, PickleType, JSON
import pickle
engine = create_engine('sqlite:///solutions.db')


Base = declarative_base()


class BeautifulSolution(Base):
    __tablename__ = 'beautiful'

    id = Column(Integer, primary_key=True)
    add1 = Column(String)
    add2 = Column(String)
    sum = Column(String)
    solution = Column(JSON)
    likeCount = Column(Integer)
    triedCount = Column(Integer)
    solvedCount = Column(Integer)

    def __init__(self,add1,add2,sum,solution,likeCount,triedCount,solvedCount):
        self.add1 = add1
        self.add2 = add2
        self.sum = sum
        self.solution = solution
        self.likeCount = likeCount
        self.triedCount = triedCount
        self.solvedCount = solvedCount

    def to_dict(self):
        return {
            'add1':self.add1,
            'add2':self.add2,
            'sum':self.sum,
            'solution':self.solution,
            'likeCount':self.likeCount,
            'triedCount':self.triedCount,
            'solvedCount':self.solvedCount,
                }

# Base.metadata.create_all(engine)

# with open('backend/source/soluving/words/beautiful.txt', 'r') as f:
#     while True:
#         try:
#             s = f.readline()
#             add1, add2, sum, solution = s.split(';')
#             solution = eval(solution)
#             # solution = PickleType(solution)
#             session.add(BeautifulSolution(add1, add2, sum,solution,0,0,0))
#         except:
#             break



# Base.metadata.create_all(engine)
# a = session.query(BeautifulSolution).first().solution
# print(a)
# session.commit()