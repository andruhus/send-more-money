def read_file(path: str):
    with open(path, 'r') as outfile:
        return outfile.read()


def overwrite_file(path: str, data) -> None:
    with open(path, 'w+') as outfile:
        outfile.write(data)


def append_file(path: str, data) -> None:
    with open(path, 'a+') as outfile:
        outfile.write(data)
