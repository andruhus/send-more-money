import numpy as np
import scipy.optimize as sco
def get_all_results(matrix,extra_column,len1,len2,len3):
    results = []
    for shift in range(len3):
        temp_res = get_result_for_shift(shift,matrix,extra_column,len1,len2,len3)
        if not temp_res == None:
            results.append(temp_res)
    return results

def integer_to_binary_list(i):
    binary = np.binary_repr(i)
    return [int(x) for x in str(binary)]

def get_result_for_shift(shift,matrix,extra_column,len1,len2,len3):
    shift_list = integer_to_binary_list(shift)
    adding_equation(shift_list,matrix,extra_column,len1,len2,len3)
    solution = solve_sys_lin_equations(matrix,extra_column)
    if analyze_solution(solution):
        return solution

def adding_equation(shift_list,matrix,extra_column,len1,len2,len3):
    pass

def analyze_solution(solution):
    if solution == None:
        return False
    digits = [0,1,2,3,4,5,6,7,8,9]
    for x in solution:
        if not x in digits:
            return False
    return True

def solve_sys_lin_equations(matrix,extra_column):
    extended_matr = np.concatenate((matrix,extra_column),axis = 1)
    extended_matr = sco._remove_redundancy._remove_redundancy(extended_matr, np.zeros_like(extended_matr[:, 0]))[0]
    temp_list = np.array_split(extended_matr,extended_matr.shape[1] - 1,axis = 1)
    matrix,extra_column = temp_list[0],temp_list[1]
    if check_sys_lin_equation(matrix):
        return np.linalg.solve(matrix,extra_column)


def check_sys_lin_equation(matrix):
    return matrix.shape[0] == matrix.shape[1]
