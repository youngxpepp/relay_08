import pandas as pd
import re
from krwordrank.word import KRWordRank
import os, sys

cur_dir = os.path.dirname(os.path.abspath( __file__ ))
os.chdir(cur_dir)
os.chdir('..')
os.chdir('./public')

sentence_pattern = re.compile('\n+|[.?!]')

df = pd.read_csv('./contents.csv')
data = df[['title', 'body']].agg('\n'.join, axis=1)
split_data = [sentence_pattern.split(row) for row in data]

min_count = 4   # 단어의 최소 출현 빈도수 (그래프 생성 시)
max_length = 10 # 단어의 최대 길이
wordrank_extractor = KRWordRank(min_count=min_count, max_length=max_length)

beta = 0.85    # PageRank의 decaying factor beta
max_iter = 10
verbose = True

df.tagList = df.tagList.astype(str)
for i, row in enumerate(split_data):
    try:
        keywords, rank, graph = wordrank_extractor.extract(row, beta, max_iter)
        print(f'[success] index: {i}, len: {len(row)}, keywords: {tuple(keywords.keys())}')
        df._set_value(i, 'tagList', ' '.join(list(keywords.keys())))
    except:
        print(f'[fail] index: {i}, len: {len(row)}')
        df._set_value(i, 'tagList', '')

df.to_csv('./tag_contents.csv', encoding='utf8', index=False)
