def complete():
    with open("夜色的星空日期记录.txt", "r") as f:
        lst2 = f.readlines()
    with open("晨风日期记录.txt", "r") as f:
        lst1 = f.readlines()
    if lst1 == [] or lst2 == []:
        raise ValueError

    def odic(lst):
        dic = {}
        for i in lst:  # 5 10
            dic[i[5:10]] = 1

        for i in lst:
            dic[i[5:10]] += 1

        sum = 0
        dic2 = dic.copy()
        for i in dic.keys():
            dic[i] -= 1
            sum += dic[i]
        average = [sum / len(dic2.keys()) for i in dic2.keys()]
        return dic, average

    def opic(lst1, lst2):
        for a, b in zip(lst1, lst2):
            plt.text(a, b, b, ha='center', va='bottom', fontsize=16)

    # for i in dic2.keys():
    #     dic2[i] = float(dic2[i]) / float(sum)
    #
    import matplotlib.pyplot as plt
    from matplotlib.font_manager import FontProperties  # 显示中文，并指定字体
    import seaborn as sns

    dic1, average1 = odic(lst1)
    dic2, average2 = odic(lst2)
    print(len(dic1.keys()),len(dic2.keys()))
    myfont = FontProperties(fname=r'C:/Windows/Fonts/simhei.ttf', size=18)
    sns.set(font=myfont.get_name())
    plt.rcParams["figure.figsize"] = (15, 12)
    try:
        plt.plot(dic1.keys(), dic1.values(), dic2.keys(), dic2.values(), dic2.keys(), average1, dic2.keys(), average2,
                 'r-.p')
    except:
        for j in dic1.keys():
            if j not in dic2.keys():
                dic2[j] = 1
        plt.plot(dic1.keys(), dic1.values(), dic2.keys(), dic2.values(), dic2.keys(), average1, dic2.keys(), average2,
                 'r-.p')
    plt.xticks(rotation=45, fontsize=16)  # 旋转x轴刻度,并设置字体大小
    plt.yticks(fontsize=16)
    plt.grid(True)
    plt.xlabel("日期", fontsize=16)
    plt.ylabel("对话总数", fontsize=16)

    opic(dic1.keys(), dic1.values())
    opic(dic2.keys(), dic2.values())
    plt.text("10-20", average1[0], average1[0], ha='center', va='bottom', fontsize=16)
    plt.text("10-20", average2[0], average2[0], ha='center', va='bottom', fontsize=16)
    #
    # for a, b in zip(dic2.keys(), dic2.values()):
    #     plt.text(a, b, b, ha='center', va='bottom', fontsize=16)
    plt.legend(['晨风', '夜色的星空', '晨风平均值', '夜色的星空平均值'])
    plt.title("日对话总数对比", fontsize=20)
    plt.savefig(r'日对话总数对比表.png', dpi=500, bbox_inches='tight')
    plt.show()
