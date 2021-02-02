import json


def read_json_data(path: str) -> [str]:
    return json.load(open(path))['data']


def write_json_data(path: str, arr: [str]) -> None:
    with open(path, 'w') as outfile:
        json.dump({'data': arr}, outfile, indent=4)
