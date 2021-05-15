import numpy as np
import scipy.optimize as sco
from backend.source.soluving.letter_equations import get_free_row_index, create_row_in_matrix
from scipy.linalg import lu


def linear_independant_col(matrix):
    U = lu(matrix)[2]
    result = []
    for i in range(U.shape[0]):
        try:
            result.append(np.flatnonzero(U[i, :])[0])
        except:
            pass
    return result


def get_all_results(matrix, extra_column, len1, len2, len3):
    results = []
    for shift in range(2 ** (len3 - 1)):
        temp_res = get_result_for_shift(shift, matrix, extra_column, len1, len2, len3)

        if not temp_res == None:
            results.extend(temp_res)
    return results


def integer_to_binary_list(i, total):
    binary = np.binary_repr(i)
    res = [int(x) for x in str(binary)]
    while len(res) < total:
        res.insert(0, 0)
    return res


def get_result_for_shift(shift, matrix, extra_column, len1, len2, len3):
    shift_list = integer_to_binary_list(shift, len3 - 1)[::-1]
    matrix_modified, extra_column_modified = adding_equation(shift_list, matrix, extra_column, len1, len2, len3)
    solution = solve_sys_lin_equations(matrix_modified, extra_column_modified)
    return solution


def adding_equation(shift_list, matrix_inp, extra_column_inp, len1, len2, len3):
    matrix = matrix_inp.copy()
    extra_column = extra_column_inp.copy()
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
    return matrix, extra_column


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
    try:
        if solution.shape[0] == 0:
            return False
    except:
        return False
    digits = [0., 1., 2., 3., 4., 5., 6., 7., 8., 9.]
    for x in solution:
        if not int(x) in digits:
            return False
    return True


def solve_complete_system(extended_matr):
    extended_matr = lu(extended_matr)[2]
    extended_matr = extended_matr[:get_free_row_index(extended_matr)]
    matrix, extra_column = extended_matr[:,:extended_matr.shape[1] - 1], extended_matr[:,extended_matr.shape[1]-1]
    extra_column = extra_column.reshape((extra_column.shape[0]))
    try:
        return np.linalg.solve(matrix, extra_column)
    except:
        return None


def iterate_variable(depth, value_columns, dependant_col, matrix_inp, extra_column_inp, results):
    if depth == 0:
        matrix = matrix_inp.copy()
        extra_column = extra_column_inp.copy()
        for index in range(len(dependant_col)):
            row = create_row_in_matrix([dependant_col[index]], matrix.shape[1])
            extra_column[get_free_row_index(matrix)] = value_columns[index]
            matrix[get_free_row_index(matrix)] = row


        extended_matr = np.concatenate((matrix, extra_column.reshape((matrix.shape[0],1))), axis=1)

        res = solve_complete_system(extended_matr)
        if analyze_solution(res):
            results.append(res)

    else:
        index_value_columns = len(dependant_col) - depth
        for digit in range(10):
            if digit in value_columns[:index_value_columns]:
                continue
            value_columns[index_value_columns] = digit
            iterate_variable(depth - 1, value_columns, dependant_col, matrix_inp, extra_column_inp, results)


def iterate_dependant_variables(dependant_col, matrix, extra_column):
    depth = len(dependant_col)
    val_list = [0 for _ in range(len(dependant_col))]
    results = []
    iterate_variable(depth, val_list, dependant_col, matrix, extra_column, results)
    return results


def find_linear_dep_col(matrix):
    result = list(range(matrix.shape[1]))
    independant_col = linear_independant_col(matrix)
    for variable in independant_col:
        result.remove(variable)
    return result


def solve_sys_lin_equations(matrix, extra_column):
    dep_col = find_linear_dep_col(matrix)
    results = iterate_dependant_variables(dep_col, matrix, extra_column)
    return results


def check_sys_lin_equation(matrix):
    return matrix.shape[0] == matrix.shape[1]
