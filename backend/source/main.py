import json
from datetime import datetime
from lazy_streams import stream

from util import checker

data = json.load(open("filter_words_data.json"))["data"]
words = []
arr: [] = [[]]
var = 0

for string in data:
    if checker(string) <= 10:
        words.append(string)

for i in range(1, 47):
    arr.append([])

for string in words:
    for i in range(1, 46):
        if len(string) == i:
            arr[i].append(string)
# print(arr)
stream(arr).map(lambda x: x).for_each(lambda x: None)

print(list(map(lambda x: len(x), arr)))

start = datetime.now().time()

l = len(arr[9])
for i in range(0, l):
    print("------")
    print(i)
    print(datetime.now().time())
    for j in range(i, l):
        for k in range(j, l):
            var += 1
print("start:\t", start)
print("count:\t", var)
print("stop:\t", datetime.now().time())

