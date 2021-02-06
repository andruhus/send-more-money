from lazy_streams import stream

from source.util.file_util import read_file, overwrite_file
from source.util.json_util import read_json_format, to_json_format


def group_by_length(words: [str]) -> [[str]]:
    res = []
    for i in range(len(max(words, key=len))):
        res.append([])
    stream(words) \
        .filter(lambda s: s.isalpha()) \
        .filter(lambda s: len(set(s)) <= 10) \
        .for_each(lambda s: res[len(s)].append(s))
    return res


def analise_words():
    file_data = read_file('all_words.json')
    json_data = read_json_format(file_data)
    words: [str] = json_data['words']
    result: [[str]] = group_by_length(words)
    for i in range(1, len(result)):
        if len(result[i]) == 0:
            break
        overwrite_file('filtered_words/%s_length_words.json' % i,
                       to_json_format({
                           'length': len(result[i]),
                           'words': result[i]
                       }))


analise_words()
