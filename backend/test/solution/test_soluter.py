import unittest
import random
from source.soluving.mock_solver import mock_solution
from backend.source.soluving.solver import solve
import string
class TestSolver(unittest.TestCase):
    def test_solver_have_answer(self):
        solution_list: [{str: int}] = mock_solution('send', 'more', 'money')
        self.assertEqual(1, len(solution_list))

    def test_solver_not_have_answer(self):
        solution_list: [{str: int}] = mock_solution('s', 'more', 'money')
        self.assertEqual(0, len(solution_list))

    def test_solver_multi_answer(self):
        solution_list: [{str: int}] = mock_solution('aaa', 'bbb', 'ccc')
        self.assertEqual(32, len(solution_list))

    def test_solver_correct_answer(self):
        solution_list: [{str: int}] = mock_solution('send', 'more', 'money')
        solution: {str: int} = solution_list[0]
        self.assertEqual(9, solution['s'])
        self.assertEqual(5, solution['e'])
        self.assertEqual(6, solution['n'])
        self.assertEqual(7, solution['d'])
        self.assertEqual(1, solution['m'])
        self.assertEqual(0, solution['o'])
        self.assertEqual(8, solution['r'])
        self.assertEqual(2, solution['y'])

    def create_test_case(self,len1,len2,len3):
        num1 = str(random.randint(10**(len1-1), 10**len1 - 1))
        num2 = str(random.randint(10**(len2-1), 10**len2 - 1))
        num3 = str(random.randint(10**(len3-1), 10**len3 - 1))
        total = num1 + num2 + num3
        dict_num = {}
        for digit in total:
            dict_num[digit] = random.choice(string.ascii_lowercase)
        answ_dict  = dict((y,x) for x,y in dict_num.iteritems())
        temp = [dict_num[digit] for digit in num1]
        word1,word2,word3 = ''
        for letter in temp:
            word1 += letter
        temp = [dict_num[digit] for digit in num2]
        for letter in temp:
            word2 += letter
        temp = [dict_num[digit] for digit in num3]
        for letter in temp:
            word3 += letter
        words = [word1,word2,word3]
        return words,answ_dict



if __name__ == '__main__':
    unittest.main()
