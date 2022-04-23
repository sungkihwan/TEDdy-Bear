import pandas as pd
import ast
import datetime as dt
import numpy as np
import matplotlib.pyplot as plt
from pymongo import MongoClient


# client = MongoClient("mongodb+srv://elice:1234@cluster0.usvux.mongodb.net/")
# 본인의 몽고 db url을 설정해주세요.
client = MongoClient("")
db = client['ted']
collection = db['datas']

######################################### 메인페이지 스튜던트 스터디 아워 #############################
student = pd.read_csv('./student.csv')

student = student.sort_values(by='Hours').values # Hours, Scores

students = {'hours':[], 'scores': []}

for i in student:
  students['hours'].append(i[0])
  students['scores'].append(int(i[1]))

students = {'id': 'student', 'keys': ['hours', 'scores'], 'data': students}
print(students) # 데이터 저장 -> js에서 그래프를 만든다. -> 프론트에서 메인페이지 리퀘스트 요청이 오면 student 데이터를 내보낸다.

################################################### 테드 #################################
tedUltimate = pd.read_csv('./ted_talks_ko.csv', encoding='utf-8')
tedUltimate['link'] = tedUltimate['url'].str.slice(start=26, stop=-1)
tedUltimate.drop(['transcript', 'event', 'views', 'title'], axis=1, inplace=True)
ted = pd.read_csv('./data.csv')
ted['link'] = ted['link'].str.slice(start=22)

newData = pd.merge(tedUltimate, ted, how='inner', on='link')
newData.drop(['link', 'date'], axis=1, inplace=True)

today = dt.date.today()

y = today.year
m = today.month
d = today.day
w = today.weekday()

sixYearsAgo = dt.datetime(y - 6, m, d, w, 0)
newData = newData.fillna(0)

sortedData = newData.sort_values(by=['likes','views'], ascending=False).head()

newlyPublished = newData[newData['published_date'] > str(sixYearsAgo)]

############################ x: duration y: views ###################################
sortedByDuration = newData.sort_values(by='duration')

# fig, ax = plt.subplots(figsize=(10, 7))  # Create a figure containing a single axes. # Plot some data on the axes.
# ax.set_xlabel('duration')  # Add an x-label to the axes.
# ax.set_ylabel('views')  # Add a y-label to the axes.
# ax.scatter(sortedByDuration['duration'], sortedByDuration['views'], label='viewsPerSecond')
#####################################################################################

############################ x: duration y: likes ###################################
# fig, ax = plt.subplots(figsize=(10, 7))  # Create a figure containing a single axes. # Plot some data on the axes.
# ax.set_xlabel('duration')  # Add an x-label to the axes.
# ax.set_ylabel('likes')  # Add a y-label to the axes.
# ax.scatter(sortedByDuration['duration'], sortedByDuration['likes'], label='likesPerSecond')
#####################################################################################

############################ x: duration y: comments ###################################
# fig, ax = plt.subplots(figsize=(10, 7))  # Create a figure containing a single axes. # Plot some data on the axes.
# ax.set_xlabel('duration')  # Add an x-label to the axes.
# ax.set_ylabel('comments')  # Add a y-label to the axes.
# ax.scatter(sortedByDuration['duration'], sortedByDuration['comments'], label='commentsPerSecond')
#####################################################################################

############################ x: published_date y: likes ###################################
sortedByDate = newData.sort_values(by='published_date')

sortedByDate.drop(['talk_id', 'speaker_1', 'all_speakers', 'occupations', 'about_speakers', 'recorded_date',
                   'native_lang', 'available_lang', 'comments', 'duration', 'related_talks', 'url', 'description',
                   'title', 'author', 'views'], axis=1, inplace=True)

# fig, ax = plt.subplots(figsize=(10, 7))  # Create a figure containing a single axes. # Plot some data on the axes.
# ax.set_xlabel('published_date')  # Add an x-label to the axes.
# ax.set_ylabel('likes')  # Add a y-label to the axes.
# ax.scatter(sortedByDate['published_date'], sortedByDate['likes'])
#####################################################################################


############################ x: topic y: likes ###################################
hashmap = {}

for i in sortedByDuration.values:
  for j in ast.literal_eval(i[11]):
    if j in hashmap and j != 'TED-Ed' and j != 'TEDx':
      hashmap[j] += int(i[-2])
    else:
      hashmap[j] = int(i[-2])

sortedByTopicLikes = pd.DataFrame(list(hashmap.items()), columns=['topic', 'likes']).sort_values(by='likes', ascending=False)

topicAllList = []
topic20List = []

for i in sortedByTopicLikes.values:
  topicAllList.append(i[0])

for i in sortedByTopicLikes.head(20).values:
  topic20List.append(i[0])

topic20List = {'id': 'topic20List', 'data': topic20List}
topicAllList = {'id': 'topicAllList', 'data': topicAllList}
print(topic20List)
print(topicAllList)

# 오늘의 영상 -> 토픽 리스트 455 -> 토픽리스트를 data 컬렉션에 넣어놓고
# 추천을 위한 토픽 -> 상위토픽 20개 -> 토픽 리스트 만들기

sortedByTopicLikes = sortedByTopicLikes.head(10)

topicLikes = {'topic': [], 'likes': []}

for i in sortedByTopicLikes.values:
  topicLikes['topic'].append(i[0])
  topicLikes['likes'].append(i[1])

topicLikes = {'id': 'topicLikes', 'keys': ['topic', 'likes'], 'data': topicLikes}

print(topicLikes) # topic, likes

sortedByTopicLikes = sortedByTopicLikes.head(5)
# fig, ax = plt.subplots(figsize=(20, 15))  # Create a figure containing a single axes. # Plot some data on the axes.
# ax.set_ylabel('likes')  # Add a y-label to the axes.
# plt.xticks(rotation=90, size=12)
# ax.bar(sortedByTopicLikes['topic'], sortedByTopicLikes['likes'])
#####################################################################################


# 강연자, 직업, likes top 10 #########################################################
df = pd.read_csv('./merged.csv')

# 강연자와 직업을 묶어 likes의 평균을 계산
speaker_df = df.groupby(['speaker_1', 'occupations'])['likes'].mean()
speaker_df = pd.DataFrame(speaker_df)
speaker_df = speaker_df.sort_values(by='likes', ascending=False)
speaker_df = speaker_df[:10]

keys = speaker_df['likes'].keys()
values = speaker_df['likes'].values
result = []

for i in range(len(keys)):
    result.append([keys[i][0], ast.literal_eval(keys[i][1])[0][0], int(values[i])])

occupationsLikes = {'name': [], 'topic': [], 'likes': []}

for i in result:
  occupationsLikes['name'].append(i[0])
  occupationsLikes['topic'].append(i[1])
  occupationsLikes['likes'].append(i[2])

occupationsLikes = {'id': 'occupationsLikes', 'keys': ['name', 'topic', 'likes'], 'data': occupationsLikes}

print(occupationsLikes) # 이름, 직업, 좋아요

###################################################################################

# plt.bar(speaker_df.index, speaker_df['likes'])
# plt.xticks(fontsize=15, rotation=90)
# plt.tight_layout()
# plt.show()



###################################################################################
result = []
count = {}
keys = [i[0] for i in sortedByTopicLikes.values]
topics = {i[0]: [] for i in sortedByTopicLikes.values}  # science, culture, technology, animation, business

for i in range(14):
  firstWindow = dt.datetime(2006 + i, m, d, w, 0)
  nextWindow = dt.datetime(2006 + i + 1, m, d, w, 0)
  threeYearsTopicLikes = sortedByDate[(sortedByDate['published_date'] > str(firstWindow)) & (sortedByDate['published_date'] < str(nextWindow))]

  hashmap = {}
  for i in threeYearsTopicLikes.values:
    for j in ast.literal_eval(i[1]):
      if j in topics:
        if j in hashmap and j != 'TED-Ed' and j != 'TEDx':
          hashmap[j] += int(i[2])
        else:
          hashmap[j] = int(i[2])

  df = pd.DataFrame(list(hashmap.items()), columns=['topic', 'likes']).sort_values(by='likes', ascending=False)
  for i in df.values:
    topics[i[0]].append(i[1])

topics = {'id': 'topics', 'keys': keys, 'data': topics}
print(topics)


## 여러번 실행할 경우 nosql 특성상 중복 데이터가 생기니 1번만 실행하시면 됩니다.
collection.insert_one(students)
collection.insert_one(topicLikes)
collection.insert_one(occupationsLikes)
collection.insert_one(topics)
collection.insert_one(topic20List)
collection.insert_one(topicAllList)


