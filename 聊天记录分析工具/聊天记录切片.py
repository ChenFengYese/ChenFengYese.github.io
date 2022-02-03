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
        for i in lst:
            if name in i:
                if i[:4] in datatime and i[4] == i[7] == '-':
                    lst2.append(i.replace(" ", "/", 1).split(" ", 1)[0].replace("/", " ") + '\n')

        lst3 = lst2
        for i in range(1, len(lst2) - 1):
            # print(lst2[i])
            try:
                time_data, time_data_content = int(lst2[i][8:len(lst2[i].split()[0])]), int(
                    lst2[i - 1][8:len(lst2[i - 1].split()[0])])
            except:
                lst3.remove(lst2[i])
                continue
            # print(time_data, time_data_content)
            s = time_data - time_data_content
            if s != 1 and s != 0 and 0 < s < 15:
                # print(lst2[i])
                number_get = str(int(lst2[i][8:lst2[i - 1].index(' ')]) - 1)
                num = number_get.rjust(len(number_get) + 1, '0') if len(number_get) < 2 else number_get
                lst3.insert(i, lst2[i][:8] + num + ' 00:00:00\n')

        lst2 = lst3

    elif choice == "时间":

        for i in lst:
            if i[:4] in datatime:
                if name in i:
                    lst2.append(i.split()[1] + '\n')

    elif choice == "记录":
        for i in range(0, len(lst) - 1):
            if lst[i][:4] in datatime:
                if name in lst[i]:
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
