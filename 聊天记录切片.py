from os import remove


def cut(choice, name):
    with open("txt.txt", "r", encoding="utf-8") as tt:
        lst = tt.readlines()
    if not lst:
        remove("txt.txt")
        raise ValueError
    # print(lst)
    lst2 = []
    datatime = ["20" + str(i) for i in range(21, 100)]
    # choice = input("日期or时间or记录\n")
    # name = input("name\n")
    if choice == "日期":
        for i in range(0, len(lst) - 1):
            if lst[i][:4] in datatime:
                if name == "夜色的星空" and ("憨憨星空" in lst[i] or name in lst[i]):
                    lst2.append(lst[i][:-6] + '\n')
                elif name == "晨风" and name in lst[i]:
                    lst2.append(lst[i][:-4] + '\n')

        lst3 = lst2
        for i in range(1, len(lst2) - 1):
            s = int(lst2[i][8:lst2[i].index(' ')]) - int(lst2[i - 1][8:lst2[i - 1].index(' ')])
            if s != 1 and s != 0 and 0 < s < 15:
                print(s, lst2[i])
                number_get = str(int(lst2[i][8:lst2[i - 1].index(' ')]) - 1)
                num = number_get.rjust(len(number_get) + 1, '0') if len(number_get) < 2 else number_get
                lst3.insert(i, lst2[i][:8] + num + ' 00:00:00\n')
        lst3.insert(lst2.index('2021-12-01 0:09:58\n'), '2021-11-30 0:00:00\n') if name == '夜色的星空' else None
        lst2 = lst3



    elif choice == "时间":

        for i in range(0, len(lst) - 1):
            if lst[i][:4] in datatime:

                if name == "夜色的星空" and ("憨憨星空" in lst[i] or name in lst[i]):
                    for j in range(len(lst[i])):
                        if lst[i][j] == ":":
                            lst2.append(lst[i][j - 2:-6] + '\n')
                            break
                elif name == "晨风":
                    if name in lst[i]:
                        for j in range(len(lst[i])):
                            if lst[i][j] == ":":
                                lst2.append(lst[i][j - 2:-4] + '\n')
                                break
    elif choice == "记录":
        for i in range(0, len(lst) - 1):
            if lst[i][:4] in datatime:

                if (name == "夜色的星空" and ("憨憨星空" in lst[i] or name in lst[i])) or (name == "晨风" and name in lst[i]):
                    for j in range(i + 1, len(lst) - 1):
                        if lst[j] == '\n':
                            break
                        else:
                            lst2.append(lst[j] + '\n')
    # print(lst2)
    for i in range(0, lst2.count('\n')):
        lst2.remove('\n')
    # # for i in range(0, len(lst2)-1):
    # #     lst2[i] = lst2[i][:-1]
    if not lst2:
        raise ValueError

    with open("%s%s记录.txt" % (name, choice), "w", encoding="utf-8") as f:
        for k in lst2:
            try:
                f.write(k)
            except:
                continue

    return True
