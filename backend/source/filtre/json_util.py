import json


def read_json(path: str):
    return json.load(open(path))


def write_json(path: str, data) -> None:
    with open(path, 'w') as outfile:
        json.dump(data, outfile, indent=4)
