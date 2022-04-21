import pandas as pd
import matplotlib.pyplot as plt
df = pd.read_csv('./merged.csv')

# 강연자와 직업을 묶어 likes의 평균을 계산
speaker_df = df.groupby(['speaker_1', 'occupations'])['likes'].mean()
speaker_df = pd.DataFrame(speaker_df)
speaker_df = speaker_df.sort_values(by='likes', ascending=False)
speaker_df = speaker_df[:10]
print(speaker_df)

plt.bar(speaker_df.index, speaker_df['likes'])
plt.xticks(fontsize=15, rotation=90)
plt.tight_layout()
plt.show()