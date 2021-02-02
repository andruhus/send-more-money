from lazy_streams import stream

from json_util import read_json as read_json
from json_util import write_json as write_json

data: [str] = read_json('1_post_filter.json')['data']

result: [str] = stream(data) \
    .filter(lambda s: len(set(s)) <= 10) \
    .to_list()

write_json('2_post_filter.json', {'data': result})
