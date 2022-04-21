import pandas as pd
import ast
import datetime as dt
import numpy as np
import matplotlib.pyplot as plt

######################################### 스튜던트 스터디 아워 #############################
student = pd.read_csv('./student.csv')
student = student.sort_values(by='Hours').values # Hours, Scores
print(student)

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

# fig, ax = plt.subplots(figsize=(10, 7))  # Create a figure containing a single axes. # Plot some data on the axes.
# ax.set_xlabel('published_date')  # Add an x-label to the axes.
# ax.set_ylabel('likes')  # Add a y-label to the axes.
# ax.scatter(sortedByDate['published_date'], sortedByDate['likes'])
#####################################################################################


############################ x: topic y: likes ###################################
hashmap = {}

for i in sortedByDuration.values:
  for j in ast.literal_eval(i[11]):
    if j in hashmap:
      hashmap[j] += int(i[-2])
    else:
      hashmap[j] = int(i[-2])

sortedByTopicLikes = pd.DataFrame(list(hashmap.items()), columns=['topic', 'likes']).sort_values(by='likes', ascending=False).head(10)

print(sortedByTopicLikes.values) # topic, likes

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

print(result) # 이름, 직업, 좋아요

###################################################################################

# plt.bar(speaker_df.index, speaker_df['likes'])
# plt.xticks(fontsize=15, rotation=90)
# plt.tight_layout()
# plt.show()