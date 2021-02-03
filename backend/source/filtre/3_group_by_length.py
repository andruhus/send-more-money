from json_util import read_json, write_json

data: [str] = read_json('2_post_filter.json')['data']

result = [[]]
for i in range(len(max(data, key=len))):
    result.append([])

for s in data:
    result[len(s)].append(s)

write_json('3_post_filter.json',
           {
               'length': len(result),
               'data': result
           })
