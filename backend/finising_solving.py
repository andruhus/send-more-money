import numpy as np
import scipy.optimize as sco
def get_all_results(matrix,extra_column,len1,len2,len3):
    results = []
    for shift in range(len3):
        temp_res = get_result_for_shift(shift,matrix,extra_column,len1,len2,len3)
        if len(temp_res.keys()) > 0:
            results.append(temp_res)
    return results

def integer_to_binary_list(i):
    binary = np.binary_repr(i)
    return [int(x) for x in str(binary)]

def get_result_for_shift(shift,matrix,extra_column,len1,len2,len3):
    result = {}
    shift_list = integer_to_binary_list(shift)
    adding_equation(shift_list,matrix,extra_column,len1,len2,len3)
    solution = solve_sys_lin_equations(matrix,extra_column)
    return result

def adding_equation(shift_list,matrix,extra_column,len1,len2,len3):
    pass


def solve_sys_lin_equations(matrix,extra_column):
    extended_matr = np.concatenate((matrix,extra_column),axis = 1)
    extended_matr = sco._remove_redundancy._remove_redundancy(extended_matr, np.zeros_like(extended_matr[:, 0]))[0]
    temp_list = np.array_split(extended_matr,extended_matr.shape[1] - 1,axis = 1)
    matrix,extra_column = temp_list[0],temp_list[1]
    if check_sys_lin_equation(matrix,extra_column):
        return np.linalg.solve(matrix,extra_column)


def check_sys_lin_equation(matrix,extra_column):
    pass
