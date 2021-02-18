import numpy as np

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
    return result

