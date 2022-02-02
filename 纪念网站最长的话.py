def doit(lst):
    # while lst.count("\n"):
    #     lst.remove("\n")
    count = 0
    wcount = 0
    tcount = 0
    thcount = 0
    fcount = 0
    ficount = 0
    scount = 0
    acount = 0
    for i in lst:
        if i == "[图片]\n":
            tcount += 1
        elif i == "[表情]\n":
            thcount += 1
        elif i == "[流泪]请使用最新版手机QQ体验新功能\n":
            fcount += 1
        elif i == "晚安\n":
            scount += 1
        for j in i:
            if j == '哈':
                count += 1
            elif j == "噗":
                ficount += 1
            elif j == "安":
                acount += 1
            elif j == "呜":
                wcount += 1

    print("哈 %d 图片 %d 表情 %d 流泪 %d 噗 %d 晚安 %d 安 %d 呜 %d" % (
        count, tcount, thcount, fcount, ficount, scount, acount, wcount))

    # 长度最长的语言
    print("总对话条数:", len(lst))
    # lstr = []
    # lst3 = sorted(lst, key=lambda x: len(x), reverse=True)
    # for i in lst3:
    #     if i == "[流泪]请使用最新版手机QQ体验新功能\n" or i=="[自动回复]本人已得道成仙，正在虚无之境与本界最大恶魔瓦辛格拉作斗争，在第一千层次无尽虚空中，它的力量无比强大，吸收了地球上供奉罪恶的所有的人的力量，我难以与之对抗，为保护世界和平，暂无回复，请减少犯罪，控制自身\n":
    #         continue
    #     else:
    #         lstr.append(i)
    # str1 = ''.join(i for i in lstr[:60])
    dic = {}
    # 频率最高的语言
    set1 = set(lst)
    for i in set1:
        dic[i] = lst.count(i)
    lst4 = []
    d_order = sorted(dic.items(), key=lambda x: x[1], reverse=True)
    for i in d_order:
        lst4.append(list(i)[0])
    str2 = ''.join(i for i in lst4[:60])
    # print("最长的那些话\n", str1)
    print("所有对话中 哈哈的占比:%.3f" % float(count / len(lst)))
    print("前四十句最常说的话中 哈哈的占比:%.3f" % float(str2.count("哈") / len(str2)))
    print("所有对话中 呜呜的占比:%.3f" % float(wcount / len(lst)))
    print("前四十句最常说的话中 呜呜的占比:%.3f" % float(str2.count("呜") / len(str2)))
    print("前四十句最常说的话:\n", str2)


with open("夜色的星空记录记录.txt", "r", encoding="utf-8") as f:
    lst = f.readlines()
    doit(lst)
with open("晨风记录记录.txt", "r", encoding="utf-8") as f:
    lst = f.readlines()
    doit(lst)
