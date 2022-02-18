with open('夜色的星空日期记录.txt', 'r') as fl:
    lst = fl.readlines()
import time

lst2 = {}


def get_monthdays(year, month):
    day = 31  # 定义每月最多的天数

    while day:

        try:

            time.strptime('%s-%s-%d' % (year, month, day), '%Y-%m-%d')  # 尝试将这个月最大的天数的字符串进行转化

            return day  # 成功时返回得就是这个月的天数

        except:

            day -= 1  # 否则将天数减1继续尝试转化, 直到成功为止


for i in range(len(lst) - 1):
    if lst[i][:10] != lst[i + 1][:10]:
        lst2[lst[i][:10]] = lst[i][11:-1]
    elif 2 > int(lst[i][11:lst[i].index(':')]) >= 0 and int(lst[i + 1][11:lst[i + 1].index(':')]) > 6:
        timehere = lst[i][:8] + str(int(lst[i][8:10]) - 1).rjust(2, '0')
        year = timehere[:4]
        month = str(int(timehere[5:7]) - 1)
        print(year + "-" + month)
        if timehere[-2:] == '00':
            if timehere[5:7] == '01':
                timehere = str(int(year) - 1) + "-" + "12-31"
            else:
                days = get_monthdays(year, month)
                timehere = year + "-" + month + "-" + str(days)
        if lst2[timehere] in lst2.keys():
            del lst2[timehere]
        lst2[timehere] = lst[i][11:-1]

lst3 = lst2.copy()
for i in [k for k in lst2.keys()]:
    if not (22 <= int(lst2[i][:lst2[i].index(':')]) or 2 >= int(lst2[i][:lst2[i].index(':')]) >= 0):
        del lst2[i]

print(lst2)
print(lst3)

lst = []
for i in lst3.values():  # 7-(2+1) 8-2-1
    lsti = i.split(":", 2)
    h = int(lsti[0])
    m = int(lsti[1])
    s = int(lsti[-1])
    lst.append(h * 3600 + m * 60 + s)
print(lst)

from pyecharts import options as opts
from pyecharts.charts import Line, Bar, Grid, Scatter

data = [0, 3600, 7200, 10800, 4 * 3600, 21 * 3600, 22 * 3600, 23 * 3600, 24 * 3600]
dic = {"0点-1点": 0, "1点-2点": 0, "2点-3点": 0, "3点-4点": 0, "4点-21点": 0, "21点-22点": 0, "22点-23点": 0, "23点-24点": 0}

for i in lst:
    for j in range(len(data) - 1):
        if data[j] <= i < data[j + 1]:
            dic[list(dic.keys())[j]] += 1
            break
x_data = [i for i in range(len(lst3.keys()))]
y_data = lst
c = (
    # 散点图
    # 初始化
    Scatter(init_opts=opts.InitOpts(width="1200px", height="800px"))
        .add_xaxis(xaxis_data=x_data)
        .add_yaxis(
        # 系列名称
        series_name="",
        # 系列数据
        y_axis=y_data,
        # 标记的大小
        symbol_size=5,
        # 标记的图形
        symbol=None,
        # 是否选中图例
        is_selected=True,
        # 系列 label 颜色
        color='#ef5b9c',
        # 标签配置项
        label_opts=opts.LabelOpts(is_show=False),  # 不显示标签
    )
        # 系统配置项
        .set_series_opts()
        # 全局配置项
        .set_global_opts(
        # x轴配置
        xaxis_opts=opts.AxisOpts(
            name='日期',
            name_location='center',
            name_gap=15,
            # 坐标轴类型 'value': 数值轴
            type_="value",
            # 分割线配置项
            splitline_opts=opts.SplitLineOpts(is_show=False)  # 显示分割线
        ),
        # y轴配置
        yaxis_opts=opts.AxisOpts(
            name='睡眠时间',
            # 坐标轴类型 'value': 数值轴
            type_="value",
            # 坐标轴刻度配置项
            axistick_opts=opts.AxisTickOpts(is_show=False),  # 显示刻度
            # 分割线配置项
            splitline_opts=opts.SplitLineOpts(is_show=False),  # 显示分割线
        ),
        # 提示框配置项
        tooltip_opts=opts.TooltipOpts(is_show=False),  # 不显示提示框组件
    )
)

bar = (Bar(init_opts=opts.InitOpts(width="1200px", height="800px"))
    .add_xaxis(list(dic.keys()))
    .add_yaxis('次数', list(dic.values()))
    .set_series_opts(label_opts=opts.LabelOpts(is_show=False))
    .set_global_opts(
    title_opts=opts.TitleOpts(title="Grid-Bar")
)
)

# line = (Line()
#         .add_xaxis(province)
#         .add_yaxis('营业额', data,
#                    markline_opts=opts.MarkLineOpts(data=[opts.MarkLineItem(type_="average")]))
#         .set_global_opts(title_opts=opts.TitleOpts(title="Grid-Line", pos_top="48%"))
#         )

grid = (
    Grid()
        .add(bar, grid_opts=opts.GridOpts(pos_bottom="60%"))
        .add(c, grid_opts=opts.GridOpts(pos_top="60%"))
)

grid.render()
