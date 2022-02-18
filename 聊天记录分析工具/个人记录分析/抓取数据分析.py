# coding=utf-8
from os import remove
def explain_data(choice, name):
    with open("txt.txt", "r", encoding="utf-8") as tt:
        lst = tt.readlines()
    if not lst:
        remove("txt.txt")
        raise ValueError
    # print(lst)
    lst2 = []
    datatime = ["20" + str(i) for i in range(21, 100)]
    if list(choice)[2] != '-':
        raise IndexError
    for i in range(0, len(lst) - 1):
        if lst[i][:4] in datatime:
            if lst[i][5:10] == choice:
                if name in lst[i]:
                    for j in range(i + 1, len(lst) - 1):
                        if lst[j] == '\n':
                            break
                        else:
                            lst2.append(lst[j] + '\n')

    if not lst2:
        raise ValueError
    for i in range(0, lst2.count('\n')):
        lst2.remove('\n')
    # 长度最长的语言
    lst3 = sorted(lst2, key=lambda x: len(x), reverse=True)
    str1 = ''.join(i for i in lst3[:3])
    dic = {}
    # 频率最高的语言
    set1 = set(lst2)
    for i in set1:
        dic[i] = lst2.count(i)
    lst4 = []
    d_order = sorted(dic.items(), key=lambda x: x[1], reverse=True)
    for i in d_order:
        lst4.append(list(i)[0])
    str2 = ''.join(i for i in lst4[:3])

    with open("%s对话更新.txt" % choice, "w",encoding="utf-8") as fl:
        fl.write("%s日 ：\n\n对话长度最多的前三名：\n\n"%choice)
        fl.write(str1)
        fl.write("对话频率最高的三句话：\n\n")
        fl.write(str2)
    return True

