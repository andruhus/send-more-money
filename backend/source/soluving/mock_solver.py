from itertools import combinations, permutations


def replacements(uniq_letters: str, uniq_letters_length: int) -> [{str: int}]:
    for comb in combinations(range(10), uniq_letters_length):
        for perm in permutations(comb):
            if perm[0] * perm[1] != 0:
                yield dict(zip(uniq_letters, perm))


def mock_solution(add_1: str, add_2: str, product: str) -> [{str: int}]:
    length_add_1 = len(add_1)
    length_add_2 = len(add_2)
    length_product = len(product)
    uniq_letters: str = ''.join(set(add_1 + add_2 + product))
    res = []
    for replacement in replacements(uniq_letters, len(uniq_letters)):
        f = lambda x: sum(replacement[e] * 10 ** i for i, e in enumerate(x[::-1]))
        number_add_1: int = f(add_1)
        number_add_2: int = f(add_2)
        number_product: int = f(product)
        if len(str(number_add_1)) != length_add_1:
            continue
        if len(str(number_add_2)) != length_add_2:
            continue
        if len(str(number_product)) != length_product:
            continue
        if number_add_1 + number_add_2 == number_product:
            letters: str = add_1 + add_2 + product
            numbers: str = str(number_add_1) + str(number_add_2) + str(number_product)
            answer = {letters[i]: int(numbers[i]) for i in range(len(letters))}
            res.append(answer)
    return res
