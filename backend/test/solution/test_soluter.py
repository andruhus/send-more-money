import unittest

from source.solution.mock_solve import mock_solution


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


if __name__ == '__main__':
    unittest.main()
