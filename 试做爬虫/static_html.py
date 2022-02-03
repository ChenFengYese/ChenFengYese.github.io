import requests
import re

# 个人网站：晨星.top 爬取示例

# step 1
url = "https://xn--kiv4f.top/"
lst = []
headers = {
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36"
}
resp = requests.get(url, headers=headers)
obj = re.compile(r'''<p>.*?</p>.*?<a.*?href="(?P<href>.*?)">.*?</a>.*?</figcaption>''', re.S)
result = obj.finditer(resp.text)
for it in result:
    group = it.group("href")
    groups = group if group[:22] == url and group[
        -4] != "." else url + group if group == "happybirth.html" else None
    lst.append(groups) if groups is not None else None
print("".join(i + '\n' for i in lst))  # 输出index页面的所有超链接地址

# step 2
url2 = "https://xn--kiv4f.top/%E6%99%A8%E6%98%9F%E6%96%B0%E7%BD%91%E7%AB%99.html"
resp = requests.get(url2, headers=headers)
obj = re.compile('''<span class="comments">(?P<text>.*?)</span><br />''')
obj2 = re.compile('''<a href=(?P<href>.*?)>(?P<text>.*?)<br/></a>''')
result, result2 = obj.finditer(resp.text), obj2.finditer(resp.text)
print('\n'.join(it.group("text") for it in result))
print("\n")
print('\n'.join(it.group("text") + '\n' + url + it.group("href") for it in result2))  # 输出动画页面的文字内容及其超链接地址
print('\n\n\n\n\n\n\n\n\n\n\n\n')

# step3
from bs4 import BeautifulSoup

url3 = "https://xn--kiv4f.top/%E6%99%A8%E6%98%9F%E8%AF%9D%E8%AF%AD%E7%BA%AA%E5%BF%B5%E7%BD%91%E7%AB%99.html"
lenth = 0
resp = requests.get(url3, headers=headers)
page = BeautifulSoup(resp.text, "html.parser")
div = page.find_all("div", attrs={"id": "talkToXHJ"})
# for it in div:
#     result = obj.finditer(it)
#     print(result)
# print('\n'.join(it.group("text") for it in result))
with open("love.txt", "w") as love:
    for it in div:
        lenth += len(it.text)
        # love.write(it.text)
        print("ok")
print(lenth)  # 记录页面内隐藏的文本内容及其字数
print('\n\n\n\n\n\n\n\n\n\n\n\n')

# step4
url4 = "https://xn--kiv4f.top/photo.html"
resp = requests.get(url4, headers=headers)
page = BeautifulSoup(resp.text, "html.parser")
div = page.find_all("div", attrs={"class": "love-content-text"})
obj = re.compile('''data-src="(?P<href>.*?)">''')
result = obj.finditer(resp.text)
lst0 = [str(love.text).rstrip().lstrip() for love in div]
lst1 = [it.group("href") for it in result]
# with open("photo_commemoration.txt", "w") as commemoration:
#     for j, k in zip(lst0, lst1):
#         commemoration.write(j + "\t" + url + (k[2:] if k[0] != "h" else k) + '\n')
#     print("ok")
print('\n\n\n\n\n\n\n\n\n\n\n\n')  # 记录页面内的所有照片文本和其地址

# step5
url_index = "https://xn--kiv4f.top/%E6%99%A8%E9%A3%8E%E6%96%87%E5%AD%A6%E7%BD%91%E7%AB%99/"
url5 = "https://xn--kiv4f.top/%E6%99%A8%E9%A3%8E%E6%96%87%E5%AD%A6%E7%BD%91%E7%AB%99/%E5%BF%98%E5%BF%A7%E6%83%85list.html"
resp = requests.get(url5, headers=headers)
page = BeautifulSoup(resp.text, "html.parser")
div = page.find("div", attrs={"class": "blog_right_nav"})
obj = re.compile('''<li><a href="(?P<href>.*?)">''')
result = obj.finditer(str(div))
lst2 = [url_index + i.group("href") for i in result]


def list_index():
    for i in url_list:
        resp = requests.get(i, headers=headers)
        page = BeautifulSoup(resp.text, "html.parser")
        div = page.find("div", attrs={"class": "wenzhang_box_article"})
        with open("test.txt", "a+") as f:
            f.write('\n'.join(str(its.text).rstrip().lstrip() for its in div))

        # print("ok")


from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor
from time import time

if __name__ == '__main__':
    with ThreadPoolExecutor(50) as th:
        url_list = []
        print("now")
        start = time()
        for i in lst2:
            resp = requests.get(i, headers=headers)
            obj = re.compile('''<a class="base_list_box_title_a" href="(?P<href>.*?)"''')
            result = obj.finditer(resp.text)
            url_list = [url_index + it.group("href") for it in result]
            th.submit(list_index)
            print("ok")
        end = time()
        print("finish", end - start)
    print("over") # 线程栈极速记录页面内所有的超链接对应页面的所有文本 4.02……
