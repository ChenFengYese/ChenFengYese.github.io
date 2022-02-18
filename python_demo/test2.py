def do_html(name, choice):
    if name == '1':
        with open("txt.txt", "r", encoding='utf-8') as tt:  # gb18030
            txt = tt.readlines()
    else:
        with open("%s%s记录.txt" % (name, choice), "r", encoding='utf-8') as tt:#gb18030
            txt = tt.readlines()
    if not txt:

        raise IndexError
    counts = []
    tip = []
    for i in range(len(txt) - 1):
        # if txt[i] == '\n':
        #     counts.append(False)
        # else:
        #     counts.append(True)
        # if counts[len(counts) - 1] != counts[len(counts) - 2] and counts[len(counts) - 1] != False:
        #     tip.append('''<a href="#%s">%s<br></a><br><br>''' % (''.join(m for m in txt[i][0:-1]),txt[i]))
        #     txt[i] = "<a id=%s>%s</a>" % (txt[i],txt[i])
        for j in txt[i]:
            if j == '\n':
                txt[i] += '<br>'
    # with open("test2.txt", "a+", encoding='utf-8') as t2:
    #     for i in tip:
    #         t2.write(i)
    with open("%s%shtml.txt" % (name, choice), "w", encoding='utf-8') as t2:
        t2.write("<p id=%s%s记录>" % (name, choice))
        for j in txt:
            t2.write(j)
        t2.write("</p>")
    print("over")
    print(txt)
    # print(tip)
    print(counts)
    return True
