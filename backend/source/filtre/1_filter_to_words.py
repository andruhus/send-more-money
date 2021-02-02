from lazy_streams import stream

from json_util import read_json_data as read_json
from json_util import write_json_data as write_json

data: [str] = read_json('0_data.json')

result: [str] = stream(data)\
    .filter(lambda s: s.isalpha())\
    .to_list()

write_json('1_post_filter.json', result)
