def complete(name1, name2):
    with open("%s日期记录.txt" % name1, "r") as f:
        lst2 = f.readlines()
    with open("%s日期记录.txt" % name2, "r") as f:
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
    def date_sort(dic):
        dic_sort = {}
        dic_list = [i.split('-')[0] for i in dic.keys()]
        lst = []
        for i in sorted(list(set(dic_list)), key=dic_list.index):
            dic_sort[i] = []
        for i in dic.keys():
            if i.split('-')[0] in dic_sort.keys():
                dic_sort[i.split('-')[0]].append(int(i.split('-')[1]))
        for i in dic_sort.keys():
            dic_sort[i].sort()
        for i in dic_sort.keys():
            for j in dic_sort[i]:
                lst.append(i + '-' + str(j).rjust(2, '0'))
        dic_sort = {}
        for i in lst:
            dic_sort[i] = dic[i]
        return dic_sort

    import matplotlib.pyplot as plt
    from matplotlib.font_manager import FontProperties  # 显示中文，并指定字体
    import seaborn as sns

    dic1, average1 = odic(lst1)
    dic2, average2 = odic(lst2)
    myfont = FontProperties(fname=r'C:/Windows/Fonts/simhei.ttf', size=18)
    sns.set(font=myfont.get_name())
    plt.rcParams["figure.figsize"] = (15, 12)
    dic3 = {}
    for j in dic1.keys():
        if j not in dic2.keys():
            dic2[j] = 1
    for j in dic2.keys():
        if j not in dic1.keys():
            dic1[j] = 1
    for i in dic1.keys():
        dic3[i] = dic2[i]
    dic2 = dic3
    dic1, dic2 = date_sort(dic1), date_sort(dic2)
    print(list(dic1.keys()))
    for i in range(len(dic1) - len(average1)):
        average1.append(average1[0])
    for i in range(len(dic2) - len(average2)):
        average2.append(average2[0])
    # print(len(dic1.keys()), len(dic2.keys()), len(average1), len(average2)) dic2.keys(), dic2.values(),
    # dic2.keys(), average1, dic2.keys(), average2,
    plt.plot(dic1.keys(), dic1.values(),dic2.keys(), dic2.values(), dic2.keys(), average1, dic2.keys(), average2,
             'r-.p')
    plt.xticks(rotation=45, fontsize=16)  # 旋转x轴刻度,并设置字体大小
    plt.yticks(fontsize=16)
    plt.grid(True)
    plt.xlabel("日期", fontsize=16)
    plt.ylabel("对话总数", fontsize=16)

    # opic(dic1.keys(), dic1.values())
    # opic(dic2.keys(), dic2.values())
    # plt.text("", average1[0], average1[0], ha='center', va='bottom', fontsize=16)
    # plt.text("", average2[0], average2[0], ha='center', va='bottom', fontsize=16)
    #
    # for a, b in zip(dic2.keys(), dic2.values()):
    #     plt.text(a, b, b, ha='center', va='bottom', fontsize=16)
    plt.legend(['%s' % name2, '%s' % name1, '%s平均值' % name2, '%s平均值' % name1])
    plt.title("日对话总数对比", fontsize=20)
    plt.savefig(r'日对话总数对比表.png', dpi=500, bbox_inches='tight')
    plt.show()



