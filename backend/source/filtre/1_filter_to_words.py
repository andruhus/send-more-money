from lazy_streams import stream

from json_util import read_json, write_json

data: [str] = read_json('0_data.json')['data']

result: [str] = stream(data) \
    .filter(lambda s: s.isalpha()) \
    .to_list()

write_json('1_post_filter.json',
           {
               'length': len(result),
               'data': result
           })
