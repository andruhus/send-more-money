import numpy as np
import scipy.optimize as sco
from letter_equations import get_free_row_index
from scipy.linalg import lu


def linear_independant_col(matrix):
    U = lu(matrix)[2]
    return [np.flatnonzero(U[i, :])[0] for i in range(U.shape[0])]


def get_all_results(matrix, extra_column, len1, len2, len3):
    results = []
    for shift in range(2 ** (len3 - 1)):
        temp_res = get_result_for_shift(shift, matrix, extra_column, len1, len2, len3)

        if not temp_res == None:
            results.append(temp_res)
    return results


def integer_to_binary_list(i, total):
    binary = np.binary_repr(i)
    res = [int(x) for x in str(binary)]
    while len(res) < total:
        res.insert(0, 0)
    return res


def get_result_for_shift(shift, matrix, extra_column, len1, len2, len3):
    shift_list = integer_to_binary_list(shift, len3 - 1)
    adding_equation(shift_list, matrix, extra_column, len1, len2, len3)
    solution = solve_sys_lin_equations(matrix, extra_column)
    if analyze_solution(solution):
        return solution


def adding_equation(shift_list, matrix, extra_column, len1, len2, len3):
    for i in range(len3):
        list_of_indeces = get_indeces_list(i, len1, len2, len3)
        free_row = get_free_row_index(matrix)
        if i == 0:
            matrix[free_row], extra_column[free_row] = create_row(0, shift_list[i], list_of_indeces, len1 + len2 + len3)

        elif i == len3 - 1:
            matrix[free_row], extra_column[free_row] = create_row(shift_list[i - 1], 0, list_of_indeces,
                                                                  len1 + len2 + len3)
        else:
            matrix[free_row], extra_column[free_row] = create_row(shift_list[i - 1], shift_list[i], list_of_indeces,
                                                                  len1 + len2 + len3)


def create_row(prev_shift, next_shift, list_of_indeces, total):
    row = np.zeros(total)
    if not list_of_indeces[0] == None:
        row[list_of_indeces[0]] = 1
    if not list_of_indeces[1] == None:
        row[list_of_indeces[1]] = 1
    row[list_of_indeces[2]] = -1
    extr_col = 10 * next_shift - prev_shift
    return row, extr_col


def get_indeces_list(i, len1, len2, len3):
    total = len3 + len2 + len1
    ind_sum = total - 1 - i
    ind_add1 = None
    ind_add2 = None
    if i < len1:
        ind_add1 = total - 1 - i - len3 - len2
    if i < len2:
        ind_add2 = total - 1 - i - len3
    return [ind_add1, ind_add2, ind_sum]


def analyze_solution(solution):
    if solution == None:
        return False
    digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    for x in solution:
        if not x in digits:
            return False
    return True


def solve_complete_system(extended_matr):
    extended_matr = sco._remove_redundancy._remove_redundancy(extended_matr, np.zeros_like(extended_matr[:, 0]))[0]
    temp_list = np.array_split(extended_matr, extended_matr.shape[1] - 1, axis=1)
    matrix, extra_column = temp_list[0], temp_list[1]
    return np.linalg.solve(matrix, extra_column)


def iterate_dependant_variables(dependant_col):
    pass


def find_linear_dep_col(matrix):
    result = range(matrix.shape[1])
    independant_col = linear_independant_col(matrix)
    for variable in independant_col:
        result.remove(variable)
    return result


def solve_sys_lin_equations(matrix, extra_column):
    extended_matr = np.concatenate((matrix, extra_column), axis=1)
    dep_col = find_linear_dep_col(extended_matr)
    iterate_dependant_variables(dep_col)


def check_sys_lin_equation(matrix):
    return matrix.shape[0] == matrix.shape[1]
