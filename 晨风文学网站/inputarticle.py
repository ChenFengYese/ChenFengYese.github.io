# coding=utf-8
with open("t2.txt", "r", encoding="utf-8") as f:
    lst = f.readlines()

# print(lst)

with open("2018.txt", "r", encoding="utf-8") as f:
    lst2 = f.readlines()
lst0 = []
lst1 = []
dic = {}
for i in lst2:
    if "WTZ" in i:
        lst1.append(i)
        lst0.append(lst2.index(i))
for i in range(len(lst1)):
    try:
        dic[lst1[i][:-1]] = lst2[lst0[i] + 1:lst0[i + 1]]
    except:
        dic[lst1[i][:-1]] = lst2[lst0[i] + 1:-1]


def deln(dic):
    for j in dic.keys():
        for i in range(len(dic[j]) - 1):
            dic[j][i] = dic[j][i][:-1]+"</br>"
    return dic

# print(deln(dic).items())
# for i, j in deln(dic).items():
#     print(i)
#     print(''.join(r for r in j))


# with open('test2.txt', 'w', encoding='utf-8') as f:
#     for i, j in deln(dic).items():
#         lst[7] = '''
#             <a class="base_list_box_title_a" href="%s.html" title="这里是文章title">%s</a>\n
#             ''' % (i, i)
#         lst[16] = '''
#         <a href="%s.html" title="文章title">\n''' % i
#         lst[22] = '''
#             <div class="base_list_box_info" title="文章的全部简介部分">%s</div>\n
#             ''' % (''.join(r for r in j))
#         lst[29] = '''
#          <a href="%s.html" title="阅读全部">阅读全部<i class="fa fa-paper-plane"></i></a>\n''' % i
#         lst[36] = '''
#         <a href="list.html" title="文章所在栏目"><i class="fa fa-bookmark"></i>[2018文章]汇总</a>\n'''
#         for m in lst:
#             f.write(m)
for i, j in deln(dic).items():
    with open("%s.html" % i, "w", encoding="utf-8") as f:
        lst[140] = "%s" % i
        lst[178] = "%s" % (''.join(r for r in j))
        lst[199] = '<p>本文标题： <span class="wenzhang_box_article_shengming_title" title="文章title">%s</span></p>\n'%i
        try:
            lst[204] = '<a href="%s.html" title="上篇文章：标题"><i class="fa ' \
                       'fa-arrow-left"></i>上篇文章：%s</a>\n' % (
                           list(dic.keys())[list(dic.keys()).index(i) - 1],
                           list(dic.keys())[list(dic.keys()).index(i) - 1])
        except:
            lst[204] = '<a href="%s.html" title="上篇文章：标题"><i class="fa ' \
                       'fa-arrow-left"></i>上篇文章：%s</a>\n' % (i, i)
        try:
            lst[206] = '<a href="%s.html" title="下篇文章：标题"><i class="fa ' \
                       'fa-arrow-left"></i>下篇文章：%s</a>\n' % (
                           list(dic.keys())[list(dic.keys()).index(i) + 1],
                           list(dic.keys())[list(dic.keys()).index(i) + 1])
        except:
            lst[206] = '<a href="%s.html" title="上篇文章：标题"><i class="fa ' \
                       'fa-arrow-left"></i>上篇文章：%s</a>\n' % (i, i)
        for i in lst:
            f.write(i)