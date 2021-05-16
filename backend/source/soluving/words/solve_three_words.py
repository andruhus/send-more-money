from data import *

solutions = []
with open('beautiful.txt', 'r') as f:
    s = f.readline()
    add1, add2, sum, solution = s.split(';')
    solution = eval(solution)
    solutions.append(BeautifulSolution(add1, add2, sum,solution,0,0,0))


session.add_all(solutions)
session.commit()

