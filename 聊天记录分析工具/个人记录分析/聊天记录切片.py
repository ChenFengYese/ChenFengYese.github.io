from os import remove
import time


def get_monthdays(year, month):
    day = 31  # 定义每月最多的天数

    while day:

        try:

            time.strptime('%s-%s-%d' % (year, month, day), '%Y-%m-%d')  # 尝试将这个月最大的天数的字符串进行转化
            break


        except:

            day -= 1  # 否则将天数减1继续尝试转化, 直到成功为止

    return day  # 成功时返回得就是这个月的天数


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
            if name == "夜色的星空":
                if name in i or "憨憨星空" in i:
                    if i[:4] in datatime and i[4] == i[7] == '-':
                        lst2.append(i.replace(" ", "/", 1).split(" ", 1)[0].replace("/", " ") + '\n')
            else:
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
            number_get = str(int(lst2[i][8:lst2[i - 1].index(' ')]) - 1)
            month = str(int(lst2[i][5:7]) - 1)
            if s != 1 and s != 0 and 0 < s < 15:
                print(s, lst2[i])
                number_get = str(int(lst2[i][8:lst2[i - 1].index(' ')]) - 1)
                num = number_get.rjust(len(number_get) + 1, '0') if len(number_get) < 2 else number_get
                lst3.insert(i, lst2[i][:8] + num + ' 00:00:00\n')

            # elif s < 0:
            #     print(lst2[i][8:len(lst2[i - 1].split()[0])], get_monthdays(lst2[i][:4], month), number_get, month)
            #     if lst2[i][8:len(lst2[i - 1].split()[0])] != str(get_monthdays(lst2[i][:4], month)) and number_get == '0':
            #         if month == '0':
            #             num = str(int(lst2[i][:4]) - 1) + '-12-31 00:00:00\n'
            #         else:
            #             num = lst2[i][:5] + month + '-' + str(get_monthdays(lst2[i][:4], month)) + ' 00:00:00\n'
            #
            # else:
            #     continue

        lst3.insert(lst2.index('2021-12-01 0:09:58\n'), '2021-11-30 0:00:00\n') if name == '夜色的星空' else None
        lst2 = lst3

    elif choice == "时间":

        for i in lst:
            if i[:4] in datatime:
                if name == "夜色的星空":
                    if name in i or "憨憨星空" in i:
                        lst2.append(i.split()[1] + '\n')
                else:
                    if name in i:
                        lst2.append(i.split()[1] + '\n')
    elif choice == "记录":
        for i in range(0, len(lst) - 1):
            if lst[i][:4] in datatime:
                if name == "夜色的星空":
                    if name in lst[i] or "憨憨星空" in lst[i]:
                        for j in range(i + 1, len(lst) - 1):
                            if lst[j] == '\n':
                                break
                            else:
                                lst2.append(lst[j] + '\n')
                else:
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
