from lazy_streams import stream

from json_util import read_json, write_json

words: [str] = read_json('all_words.json')['words']

result = []
for i in range(len(max(words, key=len))):
    result.append([])

stream(words) \
    .filter(lambda s: s.isalpha()) \
    .filter(lambda s: len(set(s)) <= 10) \
    .for_each(lambda s: result[len(s)].append(s))

for i in range(1, len(result)):
    if len(result[i]) == 0:
        break
    write_json('filtered_words/%s_length_words.json' % i,
               {
                   'length': len(result[i]),
                   'words': result[i]
               })
