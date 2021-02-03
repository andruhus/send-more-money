import numpy as np
def check_combination(add1,add2,sum):
    return len(set(add1+add2+sum)) <= 10

def empty_system_initiate(total_len):
    matrix = np.zeros((total_len ** 2,total_len))
    extra_column = np.zeros(total_len ** 2)
    return matrix,extra_column

def get_free_row_index(matrix):
    for i in range(matrix.shape[1]):

def set_equation_for_one_letter(matrix,):
    pass

def solve(add1,add2,sum):
    if check_combination(add1,add2,sum):
        total_len = len(add1) + len(add2) + len(sum)
        matrix, extra_column = empty_system_initiate(total_len)

        pass

solve('send','more','money')