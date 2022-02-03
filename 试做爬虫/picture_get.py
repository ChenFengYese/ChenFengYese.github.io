import requests
import re
import aiofiles
import aiohttp
import asyncio
import imghdr
from os import remove, listdir, path


def get_urls():
    urls = []
    for i in range(1, 11):
        url = "https://wallhaven.cc/search?q=Genshin%20Impact&categories=111&purity=100&sorting=favorites&order=desc" \
              "&page=" + str(
            i)
        headers = {
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/97.0.4692.99 Safari/537.36"}
        resp = requests.get(url, headers=headers)
        obj = re.compile(r'''<img alt="loading" class="lazyload" data-src="(?P<img>.*?)"''', re.S)
        result = obj.finditer(resp.text)
        for it in result:
            # 各类网站对应的链接解码都不同 多观察
            grouppath = str(it.group("img")).replace("th", "w").replace("small", "full")
            grouppath = grouppath[:-10] + "wallhaven-" + grouppath[-10:]  # 进行链接转换，得到图片所在的原链接
            urls.append(grouppath)
            print("第%d组完成" % i)
        return urls


def read_images():
    pictures = []
    filepath = "D:\\Study\\Pycharm Project\\进阶应用\\爬虫\\genshin_picture"
    pathDir = listdir(filepath)
    for allDir in pathDir:
        child = path.join('%s\\%s' % (filepath, allDir))
        pictures.append(child)
    return pictures


async def aiodownload(url):
    name = url.rsplit("/", 1)[1]
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as resp:
            async with aiofiles.open("genshin_picture//%s" % name, "wb") as fp:
                await fp.write(await resp.content.read())
    print(name, "搞定")


async def aioexamine(picture):
    img = imghdr.what(picture)
    if img is None:
        remove(picture)
        print(picture + "is removed")


async def main():
    tasks = []
    for url in urls:
        tasks.append(asyncio.create_task(aiodownload(url)))

    await asyncio.wait(tasks)


async def examine():
    tasks_examine = []
    for picture in pictures:
        tasks_examine.append(asyncio.create_task(aioexamine(picture)))

    await asyncio.wait(tasks_examine)


if __name__ == '__main__':
    pass
    '''
    # 得到urls
    urls = get_urls()

    # 根据urls进行异步HTTP下载
    print("开始下载")
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())
    # asyncio.run(main())     raise RuntimeError('Event loop is closed') RuntimeError: Event loop is closed

    # 下载完成后进行图片损坏检查
    pictures = read_images()
    # print(pictures)
    loop = asyncio.get_event_loop()
    loop.run_until_complete(examine())
    
    '''

'''
examine_removed_picures:
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-1kry33.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-281eoy.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-283q5m.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-3z7ewd.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-3zom9d.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-57yp87.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-5womy5.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-6od8ex.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-6ok517.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-6okw96.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-6ol796.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-6olgpq.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-6oq3d7.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-6owpll.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-7231ko.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-7293y3.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-72e713.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-72gje9.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-72joe3.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-8o9y2y.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-8ogjp1.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-8ogr81.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-9mk2lk.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-9mzz91.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-dp8d2l.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-dpgleg.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-dpw9vo.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-e7wjyl.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-g7jyke.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-j31dk5.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-j35dmy.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-j3e3ry.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-k727yd.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-k72l7d.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-k78drq.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-l33yv2.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-l3q1qy.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-l3rqzr.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-l3ze3y.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-m932km.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-m9lgp8.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-o32ogm.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-o352om.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-o35kq9.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-o36m75.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-o3lpzl.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-pkm8rm.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-pkwdrp.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-q2jev5.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-q2rp55.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-rd2p7q.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-rd3oqj.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-rdjdmw.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-rdo5l7.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-v9eowl.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-v9x6op.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-v9zv38.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-wypkp7.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-x8e9w3.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-x8p73v.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-x8w59z.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-y87zyd.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-y89zjg.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-y8v2lg.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-z89erj.jpgis removed
D:\Study\Pycharm Project\进阶应用\爬虫\genshin_picture\wallhaven-z8p92j.jpgis removed

'''

'''
urls_get:
    # urls = ['https://w.wallhaven.cc/full/k7/wallhaven-k7wor1.jpg', 'https://w.wallhaven.cc/full/28/wallhaven-28eqqx.jpg', 'https://w.wallhaven.cc/full/md/wallhaven-mdmz51.jpg', 'https://w.wallhaven.cc/full/j3/wallhaven-j3xkzq.jpg', 'https://w.wallhaven.cc/full/72/wallhaven-72r8ry.jpg', 'https://w.wallhaven.cc/full/vg/wallhaven-vg7vk8.jpg', 'https://w.wallhaven.cc/full/wq/wallhaven-wqqk9p.jpg', 'https://w.wallhaven.cc/full/q2/wallhaven-q2rp55.jpg', 'https://w.wallhaven.cc/full/vg/wallhaven-vgwl78.jpg', 'https://w.wallhaven.cc/full/k7/wallhaven-k727yd.jpg', 'https://w.wallhaven.cc/full/72/wallhaven-729zz9.jpg', 'https://w.wallhaven.cc/full/l3/wallhaven-l3kkep.jpg', 'https://w.wallhaven.cc/full/g7/wallhaven-g7jyke.jpg', 'https://w.wallhaven.cc/full/8o/wallhaven-8ordoj.jpg', 'https://w.wallhaven.cc/full/28/wallhaven-281eoy.jpg', 'https://w.wallhaven.cc/full/g8/wallhaven-g8oepq.jpg', 'https://w.wallhaven.cc/full/72/wallhaven-72l373.jpg', 'https://w.wallhaven.cc/full/o3/wallhaven-o376j7.jpg', 'https://w.wallhaven.cc/full/6o/wallhaven-6om5z7.jpg', 'https://w.wallhaven.cc/full/dp/wallhaven-dp8o7g.jpg', 'https://w.wallhaven.cc/full/j3/wallhaven-j3e3ry.jpg', 'https://w.wallhaven.cc/full/e7/wallhaven-e77g7l.jpg', 'https://w.wallhaven.cc/full/l3/wallhaven-l3rqzr.jpg', 'https://w.wallhaven.cc/full/e7/wallhaven-e76og8.jpg', 'https://w.wallhaven.cc/full/g7/wallhaven-g7z2eq.jpg', 'https://w.wallhaven.cc/full/1k/wallhaven-1kpxpg.jpg', 'https://w.wallhaven.cc/full/y8/wallhaven-y8vlox.jpg', 'https://w.wallhaven.cc/full/8o/wallhaven-8ogr81.jpg', 'https://w.wallhaven.cc/full/k7/wallhaven-k72z8q.jpg', 'https://w.wallhaven.cc/full/3z/wallhaven-3z3v8d.jpg', 'https://w.wallhaven.cc/full/j3/wallhaven-j3e56m.jpg', 'https://w.wallhaven.cc/full/6o/wallhaven-6ol5oq.jpg', 'https://w.wallhaven.cc/full/6o/wallhaven-6oq3d7.jpg', 'https://w.wallhaven.cc/full/rd/wallhaven-rdwevw.jpg', 'https://w.wallhaven.cc/full/l3/wallhaven-l33yv2.jpg', 'https://w.wallhaven.cc/full/q6/wallhaven-q6wyer.jpg', 'https://w.wallhaven.cc/full/k7/wallhaven-k7rk61.jpg', 'https://w.wallhaven.cc/full/9m/wallhaven-9mex11.jpg', 'https://w.wallhaven.cc/full/xl/wallhaven-xlxdvo.jpg', 'https://w.wallhaven.cc/full/72/wallhaven-72gje9.jpg', 'https://w.wallhaven.cc/full/o3/wallhaven-o3lpzl.jpg', 'https://w.wallhaven.cc/full/8o/wallhaven-8o8ozj.jpg', 'https://w.wallhaven.cc/full/rd/wallhaven-rdp987.jpg', 'https://w.wallhaven.cc/full/6o/wallhaven-6oo59x.jpg', 'https://w.wallhaven.cc/full/1k/wallhaven-1k13pv.jpg', 'https://w.wallhaven.cc/full/g8/wallhaven-g8oomq.jpg', 'https://w.wallhaven.cc/full/9m/wallhaven-9mogqx.jpg', 'https://w.wallhaven.cc/full/72/wallhaven-72rrlo.jpg', 'https://w.wallhaven.cc/full/wq/wallhaven-wq1gk7.jpg', 'https://w.wallhaven.cc/full/9m/wallhaven-9m9gld.jpg', 'https://w.wallhaven.cc/full/m9/wallhaven-m9o1v8.jpg', 'https://w.wallhaven.cc/full/rd/wallhaven-rdrjzm.jpg', 'https://w.wallhaven.cc/full/pk/wallhaven-pk5y8j.jpg', 'https://w.wallhaven.cc/full/6o/wallhaven-6olgpq.jpg', 'https://w.wallhaven.cc/full/m9/wallhaven-m932jk.jpg', 'https://w.wallhaven.cc/full/6o/wallhaven-6o277w.jpg', 'https://w.wallhaven.cc/full/v9/wallhaven-v9dw95.jpg', 'https://w.wallhaven.cc/full/wq/wallhaven-wqy77r.jpg', 'https://w.wallhaven.cc/full/o3/wallhaven-o352om.jpg', 'https://w.wallhaven.cc/full/dp/wallhaven-dpkmx3.jpg', 'https://w.wallhaven.cc/full/57/wallhaven-577gm7.jpg', 'https://w.wallhaven.cc/full/z8/wallhaven-z8myrw.jpg', 'https://w.wallhaven.cc/full/e7/wallhaven-e7w5gr.jpg', 'https://w.wallhaven.cc/full/57/wallhaven-57wx33.jpg', 'https://w.wallhaven.cc/full/j3/wallhaven-j35dmy.jpg', 'https://w.wallhaven.cc/full/g7/wallhaven-g7ppre.jpg', 'https://w.wallhaven.cc/full/e7/wallhaven-e7379r.jpg', 'https://w.wallhaven.cc/full/y8/wallhaven-y8wgrl.jpg', 'https://w.wallhaven.cc/full/8o/wallhaven-8oojm1.jpg', 'https://w.wallhaven.cc/full/28/wallhaven-283q5m.jpg', 'https://w.wallhaven.cc/full/wy/wallhaven-wypkp7.jpg', 'https://w.wallhaven.cc/full/3z/wallhaven-3z7ewd.jpg', 'https://w.wallhaven.cc/full/wq/wallhaven-wqwv76.jpg', 'https://w.wallhaven.cc/full/g7/wallhaven-g7vm9q.jpg', 'https://w.wallhaven.cc/full/28/wallhaven-289qy9.jpg', 'https://w.wallhaven.cc/full/wq/wallhaven-wqw5rx.jpg', 'https://w.wallhaven.cc/full/1k/wallhaven-1kry33.jpg', 'https://w.wallhaven.cc/full/rd/wallhaven-rdy36q.jpg', 'https://w.wallhaven.cc/full/wq/wallhaven-wq3127.jpg', 'https://w.wallhaven.cc/full/y8/wallhaven-y8v2lg.jpg', 'https://w.wallhaven.cc/full/8o/wallhaven-8ogvq1.jpg', 'https://w.wallhaven.cc/full/57/wallhaven-576op7.jpg', 'https://w.wallhaven.cc/full/wq/wallhaven-wqd587.jpg', 'https://w.wallhaven.cc/full/j3/wallhaven-j3evpy.jpg', 'https://w.wallhaven.cc/full/l3/wallhaven-l329m2.jpg', 'https://w.wallhaven.cc/full/zm/wallhaven-zm1qdo.jpg', 'https://w.wallhaven.cc/full/l3/wallhaven-l3zm1l.jpg', 'https://w.wallhaven.cc/full/v9/wallhaven-v9gwyp.jpg', 'https://w.wallhaven.cc/full/g7/wallhaven-g79yoq.jpg', 'https://w.wallhaven.cc/full/v9/wallhaven-v9x5el.jpg', 'https://w.wallhaven.cc/full/9m/wallhaven-9mzjqw.jpg', 'https://w.wallhaven.cc/full/o3/wallhaven-o3d3l5.jpg', 'https://w.wallhaven.cc/full/k7/wallhaven-k78drq.jpg', 'https://w.wallhaven.cc/full/8o/wallhaven-8o9y2y.jpg', 'https://w.wallhaven.cc/full/p8/wallhaven-p8rw79.jpg', 'https://w.wallhaven.cc/full/pk/wallhaven-pkm8rm.jpg', 'https://w.wallhaven.cc/full/o3/wallhaven-o32ogm.jpg', 'https://w.wallhaven.cc/full/rd/wallhaven-rdjdmw.jpg', 'https://w.wallhaven.cc/full/9m/wallhaven-9m6yxx.jpg', 'https://w.wallhaven.cc/full/pk/wallhaven-pklggj.jpg', 'https://w.wallhaven.cc/full/v9/wallhaven-v9pv5l.jpg', 'https://w.wallhaven.cc/full/g7/wallhaven-g71mdd.jpg', 'https://w.wallhaven.cc/full/l3/wallhaven-l3ze3y.jpg', 'https://w.wallhaven.cc/full/y8/wallhaven-y8qwlx.jpg', 'https://w.wallhaven.cc/full/6o/wallhaven-6oevj6.jpg', 'https://w.wallhaven.cc/full/k7/wallhaven-k7llvm.jpg', 'https://w.wallhaven.cc/full/8o/wallhaven-8ogzd2.jpg', 'https://w.wallhaven.cc/full/q2/wallhaven-q2mjm7.jpg', 'https://w.wallhaven.cc/full/wq/wallhaven-wq5196.jpg', 'https://w.wallhaven.cc/full/xl/wallhaven-xlx9pl.jpg', 'https://w.wallhaven.cc/full/9m/wallhaven-9mm621.jpg', 'https://w.wallhaven.cc/full/dp/wallhaven-dpw9vo.jpg', 'https://w.wallhaven.cc/full/rd/wallhaven-rdg28w.jpg', 'https://w.wallhaven.cc/full/rd/wallhaven-rd3oqj.jpg', 'https://w.wallhaven.cc/full/57/wallhaven-57mze9.jpg', 'https://w.wallhaven.cc/full/57/wallhaven-57yp87.jpg', 'https://w.wallhaven.cc/full/28/wallhaven-28g879.jpg', 'https://w.wallhaven.cc/full/v9/wallhaven-v9gke5.jpg', 'https://w.wallhaven.cc/full/28/wallhaven-28ypvx.jpg', 'https://w.wallhaven.cc/full/z8/wallhaven-z8dljv.jpg', 'https://w.wallhaven.cc/full/28/wallhaven-281jxg.jpg', 'https://w.wallhaven.cc/full/z8/wallhaven-z8gdqy.jpg', 'https://w.wallhaven.cc/full/rd/wallhaven-rd2p7q.jpg', 'https://w.wallhaven.cc/full/vg/wallhaven-vg7rk8.jpg', 'https://w.wallhaven.cc/full/1k/wallhaven-1kd2dw.jpg', 'https://w.wallhaven.cc/full/l3/wallhaven-l3yomr.jpg', 'https://w.wallhaven.cc/full/q2/wallhaven-q2j6zq.jpg', 'https://w.wallhaven.cc/full/q2/wallhaven-q23zd5.jpg', 'https://w.wallhaven.cc/full/dp/wallhaven-dp2w5j.jpg', 'https://w.wallhaven.cc/full/xl/wallhaven-xlvq5z.jpg', 'https://w.wallhaven.cc/full/wq/wallhaven-wq152x.jpg', 'https://w.wallhaven.cc/full/k7/wallhaven-k7r377.jpg', 'https://w.wallhaven.cc/full/q2/wallhaven-q2gjz5.jpg', 'https://w.wallhaven.cc/full/rd/wallhaven-rdrv9w.jpg', 'https://w.wallhaven.cc/full/l3/wallhaven-l3ymky.jpg', 'https://w.wallhaven.cc/full/9m/wallhaven-9m93ww.jpg', 'https://w.wallhaven.cc/full/8o/wallhaven-8ogjp1.jpg', 'https://w.wallhaven.cc/full/9m/wallhaven-9mk2lk.jpg', 'https://w.wallhaven.cc/full/wq/wallhaven-wq6v7q.jpg', 'https://w.wallhaven.cc/full/9m/wallhaven-9mkye1.jpg', 'https://w.wallhaven.cc/full/l3/wallhaven-l3zgzl.jpg', 'https://w.wallhaven.cc/full/8o/wallhaven-8okm6j.jpg', 'https://w.wallhaven.cc/full/v9/wallhaven-v9x6op.jpg', 'https://w.wallhaven.cc/full/3z/wallhaven-3z2zvv.jpg', 'https://w.wallhaven.cc/full/x8/wallhaven-x8w59z.jpg', 'https://w.wallhaven.cc/full/9m/wallhaven-9mzz91.jpg', 'https://w.wallhaven.cc/full/1k/wallhaven-1kg679.jpg', 'https://w.wallhaven.cc/full/o3/wallhaven-o3gv69.jpg', 'https://w.wallhaven.cc/full/57/wallhaven-57yzj5.jpg', 'https://w.wallhaven.cc/full/g7/wallhaven-g7wljl.jpg', 'https://w.wallhaven.cc/full/dp/wallhaven-dpgleg.jpg', 'https://w.wallhaven.cc/full/j3/wallhaven-j3rvky.jpg', 'https://w.wallhaven.cc/full/pk/wallhaven-pkokwm.jpg', 'https://w.wallhaven.cc/full/wq/wallhaven-wqd1o7.jpg', 'https://w.wallhaven.cc/full/pk/wallhaven-pkwdrp.jpg', 'https://w.wallhaven.cc/full/v9/wallhaven-v9zv38.jpg', 'https://w.wallhaven.cc/full/rd/wallhaven-rd2x5w.jpg', 'https://w.wallhaven.cc/full/72/wallhaven-7293y3.jpg', 'https://w.wallhaven.cc/full/k7/wallhaven-k72l7d.jpg', 'https://w.wallhaven.cc/full/6o/wallhaven-6op61w.jpg', 'https://w.wallhaven.cc/full/6o/wallhaven-6o22ww.jpg', 'https://w.wallhaven.cc/full/l3/wallhaven-l33epp.jpg', 'https://w.wallhaven.cc/full/6o/wallhaven-6oek9w.jpg', 'https://w.wallhaven.cc/full/28/wallhaven-28123m.jpg', 'https://w.wallhaven.cc/full/1k/wallhaven-1kq1l9.jpg', 'https://w.wallhaven.cc/full/6o/wallhaven-6o2z1w.jpg', 'https://w.wallhaven.cc/full/5w/wallhaven-5womy5.jpg', 'https://w.wallhaven.cc/full/6o/wallhaven-6od8ex.jpg', 'https://w.wallhaven.cc/full/k7/wallhaven-k7rx27.jpg', 'https://w.wallhaven.cc/full/3z/wallhaven-3zqpvd.jpg', 'https://w.wallhaven.cc/full/rd/wallhaven-rdpo9j.jpg', 'https://w.wallhaven.cc/full/ox/wallhaven-oxkgel.jpg', 'https://w.wallhaven.cc/full/z8/wallhaven-z89erj.jpg', 'https://w.wallhaven.cc/full/1k/wallhaven-1k1gkg.jpg', 'https://w.wallhaven.cc/full/dp/wallhaven-dp8d2l.jpg', 'https://w.wallhaven.cc/full/k7/wallhaven-k7kz96.jpg', 'https://w.wallhaven.cc/full/28/wallhaven-28o3m6.jpg', 'https://w.wallhaven.cc/full/72/wallhaven-72pdv3.jpg', 'https://w.wallhaven.cc/full/6o/wallhaven-6ok517.jpg', 'https://w.wallhaven.cc/full/9m/wallhaven-9mzeew.jpg', 'https://w.wallhaven.cc/full/j3/wallhaven-j3wlwm.jpg', 'https://w.wallhaven.cc/full/e7/wallhaven-e78978.jpg', 'https://w.wallhaven.cc/full/y8/wallhaven-y8w93k.jpg', 'https://w.wallhaven.cc/full/m9/wallhaven-m932km.jpg', 'https://w.wallhaven.cc/full/o3/wallhaven-o332l9.jpg', 'https://w.wallhaven.cc/full/l3/wallhaven-l3q1qy.jpg', 'https://w.wallhaven.cc/full/6o/wallhaven-6ol796.jpg', 'https://w.wallhaven.cc/full/y8/wallhaven-y8xygg.jpg', 'https://w.wallhaven.cc/full/x8/wallhaven-x8pgg3.jpg', 'https://w.wallhaven.cc/full/g8/wallhaven-g8kjm3.jpg', 'https://w.wallhaven.cc/full/z8/wallhaven-z8zk5g.jpg', 'https://w.wallhaven.cc/full/e7/wallhaven-e7w68w.jpg', 'https://w.wallhaven.cc/full/57/wallhaven-57kow3.jpg', 'https://w.wallhaven.cc/full/28/wallhaven-28dok6.jpg', 'https://w.wallhaven.cc/full/6o/wallhaven-6oq9mw.jpg', 'https://w.wallhaven.cc/full/o3/wallhaven-o3gwxp.jpg', 'https://w.wallhaven.cc/full/x8/wallhaven-x8e9w3.jpg', 'https://w.wallhaven.cc/full/v9/wallhaven-v9eowl.jpg', 'https://w.wallhaven.cc/full/y8/wallhaven-y87zyd.jpg', 'https://w.wallhaven.cc/full/e7/wallhaven-e78r7o.jpg', 'https://w.wallhaven.cc/full/8o/wallhaven-8orroj.jpg', 'https://w.wallhaven.cc/full/rd/wallhaven-rde3km.jpg', 'https://w.wallhaven.cc/full/j3/wallhaven-j31dk5.jpg', 'https://w.wallhaven.cc/full/z8/wallhaven-z85v2j.jpg', 'https://w.wallhaven.cc/full/y8/wallhaven-y89zjg.jpg', 'https://w.wallhaven.cc/full/6o/wallhaven-6owpll.jpg', 'https://w.wallhaven.cc/full/3z/wallhaven-3zom9d.jpg', 'https://w.wallhaven.cc/full/e7/wallhaven-e7wjyl.jpg', 'https://w.wallhaven.cc/full/72/wallhaven-72joe3.jpg', 'https://w.wallhaven.cc/full/28/wallhaven-28j9zg.jpg', 'https://w.wallhaven.cc/full/pk/wallhaven-pkk8d3.jpg', 'https://w.wallhaven.cc/full/8o/wallhaven-8oe3qk.jpg', 'https://w.wallhaven.cc/full/z8/wallhaven-z8p59j.jpg', 'https://w.wallhaven.cc/full/wq/wallhaven-wqm3xp.jpg', 'https://w.wallhaven.cc/full/x8/wallhaven-x8p73v.jpg', 'https://w.wallhaven.cc/full/l3/wallhaven-l3r3zr.jpg', 'https://w.wallhaven.cc/full/j3/wallhaven-j3y2vp.jpg', 'https://w.wallhaven.cc/full/72/wallhaven-72e713.jpg', 'https://w.wallhaven.cc/full/dp/wallhaven-dp2q8j.jpg', 'https://w.wallhaven.cc/full/q2/wallhaven-q2reml.jpg', 'https://w.wallhaven.cc/full/q2/wallhaven-q2jev5.jpg', 'https://w.wallhaven.cc/full/m9/wallhaven-m9lgp8.jpg', 'https://w.wallhaven.cc/full/z8/wallhaven-z8p92j.jpg', 'https://w.wallhaven.cc/full/l3/wallhaven-l3kyel.jpg', 'https://w.wallhaven.cc/full/rd/wallhaven-rdo5l7.jpg', 'https://w.wallhaven.cc/full/6o/wallhaven-6okw96.jpg', 'https://w.wallhaven.cc/full/rd/wallhaven-rdgv1w.jpg', 'https://w.wallhaven.cc/full/y8/wallhaven-y89xrl.jpg', 'https://w.wallhaven.cc/full/72/wallhaven-7231ko.jpg', 'https://w.wallhaven.cc/full/8o/wallhaven-8ork62.jpg', 'https://w.wallhaven.cc/full/6o/wallhaven-6oojlw.jpg', 'https://w.wallhaven.cc/full/y8/wallhaven-y858ex.jpg', 'https://w.wallhaven.cc/full/o3/wallhaven-o36er7.jpg', 'https://w.wallhaven.cc/full/8o/wallhaven-8oe1y1.jpg', 'https://w.wallhaven.cc/full/z8/wallhaven-z8ozyv.jpg', 'https://w.wallhaven.cc/full/pk/wallhaven-pkll7m.jpg', 'https://w.wallhaven.cc/full/q2/wallhaven-q2mkeq.jpg', 'https://w.wallhaven.cc/full/8o/wallhaven-8oge6y.jpg', 'https://w.wallhaven.cc/full/o3/wallhaven-o35kq9.jpg', 'https://w.wallhaven.cc/full/o3/wallhaven-o36m75.jpg'][50:]
    # # urls = [i.rsplit("/", 1)[1] for i in urls_all]
    # # print(urls.index("wallhaven-9m9gld.jpg"))
'''
