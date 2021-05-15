import unittest
import random
from backend.source.soluving.solver import solve
import string


class TestSolver(unittest.TestCase):

    def create_test_case(self, len1, len2):
        num1 = str(random.randint(10 ** (len1 - 1), 10 ** len1 - 1))
        num2 = str(random.randint(10 ** (len2 - 1), 10 ** len2 - 1))
        num3 = str(int(num1) + int(num2))
        total = num1 + num2 + num3
        dict_num = {}
        used_lett = []
        for digit in total:
            a = random.choice(string.ascii_lowercase)
            while a in used_lett:
                a = random.choice(string.ascii_lowercase)
            dict_num[digit] = a
            used_lett.append(a)
        answ_dict = dict((y, int(x)) for x, y in dict_num.items())
        temp = [dict_num[digit] for digit in num1]
        word1, word2, word3 = '', '', ''
        for letter in temp:
            word1 += letter
        temp = [dict_num[digit] for digit in num2]
        for letter in temp:
            word2 += letter
        temp = [dict_num[digit] for digit in num3]
        for letter in temp:
            word3 += letter
        words = [word1, word2, word3]
        return words, answ_dict

    def test_solver_check_func(self):
        for len1 in range(3, 9):
            for len2 in range(3, 9):
                words, right_answer = self.create_test_case(len1, len2)
                self.assertEqual(right_answer in solve(words[0], words[1], words[2]), True,
                                 msg=f'{words[0]} , {words[1]} , {words[2]} \nright_answer: {right_answer}')


if __name__ == '__main__':
    unittest.main()
