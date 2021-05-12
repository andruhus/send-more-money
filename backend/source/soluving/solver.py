import numpy as np
from backend.source.soluving.letter_equations import set_equation_for_all_letter
from backend.source.soluving.finising_solving import get_all_results

def check_combination(add1, add2, sum):
    return len(set(add1 + add2 + sum)) <= 10


def empty_system_initiate(total_len):
    matrix = np.zeros((total_len ** 2, total_len))
    extra_column = np.zeros(total_len ** 2)
    return matrix, extra_column


def create_dict_of_letters(str):
    res = {}
    for letter_ind in range(len(str)):
        if not str[letter_ind] in res.keys():
            res[str[letter_ind]] = []
        res[str[letter_ind]].append(letter_ind)
    return res


def solve(add1, add2, sum):
    result = {}
    if check_combination(add1, add2, sum):
        total_len = len(add1) + len(add2) + len(sum)
        matrix, extra_column = empty_system_initiate(total_len)
        lett_dict = create_dict_of_letters(add1 + add2 + sum)
        set_equation_for_all_letter(matrix, lett_dict)
    solution_array = get_all_results(matrix, extra_column, len(add1), len(add2), len(sum))
    if len(solution_array) == 1:
        result = represent_to_dict(add1, add2, sum, solution_array[0])

    return result


def represent_to_dict(add1, add2, sum, solution_array):
    concatenation = add1 + add2 + sum
    dict = {}
    for i in range(len(solution_array)):
        dict[concatenation[i]] = solution_array[i]
    return dict

print(solve('send','more','money'))
