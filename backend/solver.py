import numpy as np
def check_combination(add1,add2,sum):
    return len(set(add1+add2+sum)) <= 10



def solve(add1,add2,sum):
    if check_combination(add1,add2,sum):
        total_len = len(add1) + len(add2) + len(sum)
        matrix = np.zeros((total_len,total_len**2))
        extra_column = np.zeros(total_len**2)
        
        pass

solve('send','more','money')