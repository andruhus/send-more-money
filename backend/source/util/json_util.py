import json


def read_json_format(data):
    return json.loads(data)


def to_json_format(data):
    return json.dumps(data, indent=4, default=lambda o: o.__dict__)


