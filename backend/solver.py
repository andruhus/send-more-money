import numpy as np
def check_combination(add1,add2,sum):
    return len(set(add1+add2+sum)) <= 10

def empty_system_initiate(total_len):
    matrix = np.zeros((total_len ** 2,total_len))
    extra_column = np.zeros(total_len ** 2)
    return matrix,extra_column

def create_dict_of_letters(str):
    res = {}
    for letter_ind in range(len(str)):
        if not str[letter_ind] in res.keys():
            res[str[letter_ind]] = []
        res[str[letter_ind]].append(letter_ind)
    return res

def get_free_row_index(matrix):
    for i in range(matrix.shape[0]):
        if not matrix[i].any():
            return i

def create_row_in_matrix(list_of_indexes,total_len):
    row = np.zeros(total_len)
    for index in list_of_indexes:
        row[index] = 1
    return row



def set_equation_for_one_letter(matrix,):
    pass

def solve(add1,add2,sum):
    if check_combination(add1,add2,sum):
        total_len = len(add1) + len(add2) + len(sum)
        matrix, extra_column = empty_system_initiate(total_len)
        lett_dict = create_dict_of_letters(add1+add2+sum)
        pass

solve('send','more','money')