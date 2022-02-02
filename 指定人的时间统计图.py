import datetime
from os import remove


def showtime(name):
    with open("%s时间记录.txt" % name, "r") as f:
        lst = f.readlines()
    if not lst:
        remove("%s时间记录.txt" % name)
        raise ValueError
    dic = {}
    for i in lst:
        for j in range(len(i) - 1):
            if i[j] == ":":
                dic[i[:j] + "点"] = 1
                break
    for i in lst:
        for j in range(len(i) - 1):
            if i[j] == ":":
                dic[i[:j] + "点"] += 1
                break

    sum = 0
    dic2 = dic.copy()
    for i in dic.keys():
        dic[i] -= 1
        sum += dic[i]
    print(sum)
    for i in dic2.keys():
        dic2[i] = float(dic2[i]) / float(sum)

    print(dic)
    print(dic2)

    import pandas as pd
    import seaborn as sns
    import matplotlib.pyplot as plt
    from matplotlib.font_manager import FontProperties  # 显示中文，并指定字体

    myfont = FontProperties(fname=r'C:/Windows/Fonts/simhei.ttf', size=18)
    sns.set(font=myfont.get_name())

    plt.rcParams['figure.figsize'] = (10.0, 8.0)  # 调整图片大小

    data = pd.Series(dic2)
    lbs = data.index
    plt.pie(data, radius=1.1, labels=lbs, autopct="%1.1f%%",
            colors=sns.color_palette("muted"), startangle=90, pctdistance=0.89,
            textprops={'fontsize': 12, 'color': 'black'})
    plt.legend(loc='upper right', bbox_to_anchor=(1.1, 1.05), fontsize=14, borderaxespad=0.3)
    plt.axis('equal')  # 设置x，y轴刻度一致，以使饼图成为圆形。
    plt.suptitle("%s聊天时间统计图表" % name, fontsize=20)

    d_order = sorted(dic2.items(), key=lambda x: x[1], reverse=True)

    # plt.text(0, 00, "".join(list(i)[0] + ' ' for i in d_order), fontsize=15, verticalalignment="baseline",
    #          horizontalalignment="right")
    plt.savefig('%s聊天时间统计图.png' % name, dpi=120, bbox_inches='tight')
    plt.show()

    with open("%s时间记录排名.txt" % name, "a+") as f:
        f.write(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S") + '\n')
        for i in d_order:
            f.write(list(i)[0] + ' ')
        f.write('\n')
    return True
