# coding=utf-8
import tkinter as tk
import tkinter.messagebox
from 聊天记录切片 import cut
from 指定人的时间统计图 import showtime
from 对话总数的对比图 import complete
from 抓取数据分析 import explain_data
from glob import glob
from os import remove
from test2 import do_html

# 第1步，实例化object，建立窗口window
window = tk.Tk()
# pyinstaller -F -w 小试验\test\test1\客户端使用.py
# 第2步，给窗口的可视化起名字
window.title('自动化形成工具-晨风')

# 第3步，设定窗口的大小(长 * 宽)
window.geometry('800x600')  # 这里的乘是小x
# 第5步，用户信息
tk.Label(window, text='查询对象:', font=('Arial', 14)).place(x=210, y=340)
tk.Label(window, text='切片内容:', font=('Arial', 14)).place(x=210, y=390)
var_usr_name = tk.StringVar()
var_usr_name.set('夜色的星空')
entry_usr_name = tk.Entry(window, textvariable=var_usr_name, font=('Arial', 14))
entry_usr_name.place(x=320, y=340)
var_usr_pwd = tk.StringVar()
entry_usr_pwd = tk.Entry(window, textvariable=var_usr_pwd, font=('Arial', 14))
var_usr_pwd.set('日期')
entry_usr_pwd.place(x=320, y=390)


def usr_login():
    usr_name = var_usr_name.get()
    usr_pwd = var_usr_pwd.get()
    try:
        if cut(usr_pwd, usr_name):
            tkinter.messagebox.showinfo(message="切片成功")
    except:
        tkinter.messagebox.showinfo(message="未找到聊天记录源文件或者命令输入错误")


def button_showtime():
    usr_name = var_usr_name.get()
    # if showtime(usr_name):
    #     tkinter.messagebox.showinfo(message="时间图显示成功")
    try:
        if showtime(usr_name):
            tkinter.messagebox.showinfo(message="时间图显示成功")
    except:
        tkinter.messagebox.showinfo(message="未查询到时间记录文件")


def button_complete():
    # try:
    complete()


# except:
#     tkinter.messagebox.showinfo(message="未查询到日期记录文件")


def button_show():
    lst = glob(r"*.txt")
    tkinter.messagebox.showinfo(message="".join(i + ' ' for i in lst))


def button_upgrade():
    try:
        with open("憨憨星空jinxinxin2000@yahoo.com.hk.txt", "r", encoding="utf-8") as hh:
            lst = hh.readlines()
        with open("txt.txt", "r", encoding="utf-8") as tt:
            lst2 = tt.readlines()
        if not lst:
            remove("憨憨星空jinxinxin2000@yahoo.com.hk.txt")
            raise IndexError

        def find(lst):
            for j in lst[-1:0:-1]:
                if j != "\n":
                    num = lst[-1:0:-1].index(j)
                    # return len(lst) - num - 1
                    if lst[::-1][num][:4] != "2021":
                        num += 1
                    return num
                # num=2 0 1 2 len(lst)-1 = 0 -2 1 -3 2 -4 3 -num-1

        # if lst[find(lst)] != lst2[find(lst2)]:
        # 5 123 6 213
        test1 = lst[::-1][find(lst)]
        test2 = lst2[::-1][find(lst2)]
        if test1 != test2:
            num2 = lst.index(test2) + 2
            for i in lst[num2:-1]:
                with open("txt.txt", "a+", encoding="utf-8") as tt:
                    tt.write(i)
            tkinter.messagebox.showinfo(message="聊天记录更新成功")

        else:
            tkinter.messagebox.showinfo(message="当前聊天记录已是最新")



    except IndexError:
        tkinter.messagebox.showinfo(message="原聊天记录 憨憨星空jinxinxin2000@yahoo.com.hk.txt 不存在")
    except Exception as e:
        tkinter.messagebox.showinfo(message=e)


def button_answer():
    tkinter.messagebox.showinfo(message="查询对象为 夜色的星空 或者 晨风")
    tkinter.messagebox.showinfo(message="切片内容或HTML制作填写内容为 日期 时间 或者 记录")
    tkinter.messagebox.showinfo(message="显示TOP3即在切片内容一栏填写相应的时间 如12-11 或 12-09")
    tkinter.messagebox.showinfo(message="TOP3文件在应用目录下，文件名为查询对象+相应的时间")
    tkinter.messagebox.showinfo(message="填写其他会出错")


def button_html():
    usr_name = var_usr_name.get()
    usr_pwd = var_usr_pwd.get()
    try:
        if do_html(usr_name, usr_pwd):
            tkinter.messagebox.showinfo(message="HTML制作成功")
    except:
        tkinter.messagebox.showinfo(message="未找到聊天记录源文件或者命令输入错误")


def button_talk():
    usr_name = var_usr_name.get()
    usr_pwd = var_usr_pwd.get()
    try:
        if explain_data(usr_pwd, usr_name):
            tkinter.messagebox.showinfo(message="数据分析成功")
    except:
        tkinter.messagebox.showinfo(message="未找到聊天记录源文件或者命令输入错误")


btn_login = tk.Button(window, text='开始切片', command=usr_login)
btn_login.place(x=320, y=440)
btn_login = tk.Button(window, text='显示时间统计图', command=button_showtime)
btn_login.place(x=420, y=440)
btn_login = tk.Button(window, text='显示对话总数对比图', command=button_complete)
btn_login.place(x=420, y=500)
btn_login = tk.Button(window, text='显示已创造出的文件', command=button_show)
btn_login.place(x=490, y=140)
btn_login = tk.Button(window, text='更新聊天记录', command=button_upgrade)
btn_login.place(x=370, y=140)
btn_login = tk.Button(window, text='注意事项', command=button_answer)
btn_login.place(x=490, y=70)
btn_login = tk.Button(window, text='HTML制作', command=button_html)
btn_login.place(x=370, y=70)
btn_login = tk.Button(window, text='显示TOP3', command=button_talk)
btn_login.place(x=370, y=240)
window.mainloop()
