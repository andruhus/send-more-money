import json

from lazy_streams import stream

data: [str] = json.load(open("0_data.json"))["data"]

result: [str] = stream(data).filter(lambda s: s.isalpha()).to_list()
result_data = {"data": result}

with open('1_post_filter.json', 'w') as outfile:
    json.dump(result_data, outfile, indent=4)
