import multiprocessing
from backend.source.soluving.solver import solve, check_combination
from backend.source.soluving.word_filtration.group_by_length import analise_words
from backend.source.util.file_util import read_file, overwrite_file
from backend.source.util.json_util import read_json_format, to_json_format

analise_words()

# This is groups to devide evaluating time

# # The biggest group
# start = 1
# end = 4

# Try the middle group
start = 4
end = 7


# # The smallest group I will give to my computer
# start = 7
# end = 11

def group_solutions(solutions, add1, add2, sum):
    # here I will devide solutions on three groups: 'beautiful' if the example has only one solution,
    # 'not bad' if the example has up to 5 solutions ('beautiful' are also 'not bad')
    # 'trash' if the solutions is empty or has too many solutions we won`t deal with it
    if len(solutions) not in range(1, 6):
        return None
    filename_notbad = 'backend/source/soluving/words/notbad.txt'
    filename_beautiful = 'backend/source/soluving/words/beautiful.txt'
    try:
        with open(filename_notbad, 'a') as file:
            file.writelines(add1 + ' + ' + add2 + ' = ' + sum + '; ' + str(solutions))
    except:
        with open(filename_notbad, 'w') as file:
            file.writelines(add1 + ' + ' + add2 + ' = ' + sum + '; ' + str(solutions))

    if len(solutions) == 1:
        try:
            with open(filename_beautiful, 'a') as file:
                file.writelines(add1 + ' + ' + add2 + ' = ' + sum + '; ' + str(solutions))
        except:
            with open(filename_beautiful, 'w') as file:
                file.writelines(add1 + ' + ' + add2 + ' = ' + sum + '; ' + str(solutions))


def func_for_prosess(core, add1, add2, sum_set):
    for sum_ind in range(core, len(sum_set), 4):
        if check_combination(add1, add2, sum_set[sum_ind]):
            solution = solve(add1, add2, sum_set[sum_ind])
            group_solutions(solution,add1,add2,sum_set[sum_ind])


def iterate(start, end, core_num):
    for len1 in range(start, end):
        for len2 in range(len1, 21):
            file_data = read_file('backend/source/soluving/words/%s_length_words.json' % len1)
            json_data = read_json_format(file_data)
            add1_set = json_data['words']
            file_data = read_file('backend/source/soluving/words/%s_length_words.json' % len2)
            json_data = read_json_format(file_data)
            add2_set = json_data['words']
            sum_set = []
            sum_set.extend(add2_set)
            try:
                file_data = read_file('backend/source/soluving/words/%s_length_words.json' % len2 + 1)
                json_data = read_json_format(file_data)
                sum_set.extend(json_data['words'])
            except:
                pass
            for add1 in add1_set:
                for add2 in add2_set:
                    processes = []
                    for core in range(core_num):
                        p = multiprocessing.Process(target=func_for_prosess, args=(core, add1, add2, sum_set))
                        p.start()
                        processes.append(p)
                    for p in processes:
                        p.join()


# Enter your number of cores in CPU
cores = 4

iterate(start, end, cores)
