letters = "abcdefghijklmnopqrstuvwxyz"


def checker(word: str) -> int:
    char = 0
    for letter in letters:
        if word.count(letter) >= 1:
            char += 1
    return char
