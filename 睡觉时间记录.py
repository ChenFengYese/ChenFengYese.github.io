with open('夜色的星空日期记录.txt', 'r') as fl:
    lst = fl.readlines()

lst2 = {}
for i in range(len(lst) - 1):
    if lst[i][:10] != lst[i + 1][:10]:
        lst2[lst[i][:10]] = lst[i][11:-1]
    elif 2 > int(lst[i][11:lst[i].index(':')]) >= 0 and int(lst[i + 1][11:lst[i + 1].index(':')]) > 6:
        timehere = lst[i][:8] + str(int(lst[i][8:10]) - 1).rjust(2, '0')
        if timehere == '2021-12-00':
            timehere = '2021-11-30'
        if lst2[timehere] in lst2.keys():
            del lst2[timehere]
        lst2[timehere] = lst[i][11:-1]

lst3 = lst2.copy()
for i in [k for k in lst2.keys()]:
    if not (22 <= int(lst2[i][:lst2[i].index(':')]) or 2 >= int(lst2[i][:lst2[i].index(':')]) >= 0):
        del lst2[i]

print(lst2)
print(lst3)
import matplotlib.pyplot as plt
from matplotlib.font_manager import FontProperties  # 显示中文，并指定字体
import seaborn as sns

myfont = FontProperties(fname=r'C:/Windows/Fonts/simhei.ttf', size=18)
sns.set(font=myfont.get_name())
plt.rcParams["figure.figsize"] = (15, 12)
lst = []
for i in lst3.values():  # 7-(2+1) 8-2-1
    lst.append(int(i[:i.index(':')]) * 3600 + int(i[
                                                  i.index(':') + 1: len(i) - i[::-1].index(':') - 1]) * 60 + int(i[
                                                                                                                 len(
                                                                                                                     i) - i[
                                                                                                                          ::-1].index(
                                                                                                                     ':'): -1]))
print(lst)
plt.plot(lst3.keys(), lst)
plt.xticks(rotation=45, fontsize=16)  # 旋转x轴刻度,并设置字体大小
plt.yticks(fontsize=16)
plt.grid(True)
plt.xlabel("日期", fontsize=16)
plt.ylabel("睡觉时间", fontsize=16)
for a, b, c in zip(lst3.keys(), lst, lst3.values()):
    plt.text(a, b, c, ha='center', va='bottom', fontsize=16)
plt.title("日睡眠时间统计", fontsize=20)
plt.savefig(r'日睡眠时间统计.png', dpi=500, bbox_inches='tight')
plt.show()
# plt.figure(figsize=(20,8))
# tab = plt.table(cellText=lst,
#               colLabels=lst3.keys(),
#              rowLabels='睡觉时间',
#               loc='center',
#               cellLoc='center',
#               rowLoc='center')
# tab.scale(1,2)
# plt.axis('off')
