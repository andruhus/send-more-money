import numpy as np


def get_free_row_index(matrix):
    for i in range(matrix.shape[0]):
        if not matrix[i].any():
            return i


def create_row_in_matrix(list_of_indeces, total_len):
    row = np.zeros(total_len)
    for index in range(len(list_of_indeces)):
        if index % 2 == 0:
            row[list_of_indeces[index]] = 1
        else:
            row[list_of_indeces[index]] = -1
    return row


def set_equation_for_one_letter(matrix, list_of_indeces):
    for i in range(1, len(list_of_indeces)):
        pair = [list_of_indeces[0], list_of_indeces[i]]
        matrix[get_free_row_index(matrix)] = create_row_in_matrix(pair, matrix.shape[1])

    pass


def set_equation_for_all_letter(matrix, dict):
    for letter in dict.keys():
        set_equation_for_one_letter(matrix, dict[letter])
