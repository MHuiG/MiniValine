# <div align="center">MiniValine FAQs</div>

## How to improve the security of MiniValine?

MiniValine version 4.x makes incompatible modification on the basis of MiniValine version 3.x to improve the security of MiniValine.

Since the QQ avatar API exposes the user's mailbox, the function of QQ avatar is deleted in MiniValine version 4.x.

Thanks to the idea of [imaegoo](https://github.com/imaegoo), [it](https://github.com/imaegoo/Valine) enhances the protection of users' privacy.

MiniValine version 4.x adds a visible field (mailmd5) to store mail MD5.

Here I offer an idea:

**Try to use cloudflare workers edge computing to improve the security of MiniValine.**

Since **appid** and **appkey** are required to call the database API:

![](https://cdn.jsdelivr.net/gh/MHuiG/imgbed/data/2020831194318.png)

However, it is a security risk to write them directly on the front-end page. Therefore, the author directly writes the database API key in cloudflare worker.

Insert a Fake API key into the front page to confusion.  The figure below shows that it is a Fake Key. 

![](https://cdn.jsdelivr.net/gh/MHuiG/imgbed/data/2020831194331.png)

We intercept user requests at the edge of the network and judge the validity of the requests. Edge computing is used to dynamically change the request header and replace it with the real API key to forward the request to the back-end database to hide the API key during data interaction.

Specific implementation can refer to [related documents](https://developers.cloudflare.com/workers/runtime-apis/request)

You can implement your own security policy by running JavaScript at the edge with [Cloudflare Workers](https://workers.cloudflare.com).

[@MiniValine/CF-LC](https://github.com/MiniValine/CF-LC)

## How to join the development of MiniValine?

We welcome you to join the development of MiniValine. Please see [contributing document](https://github.com/MiniValine/MiniValine/blob/master/.github/CONTRIBUTING.md). 🤗

Also, we welcome Issue or PR to MiniValine.

## How to Set Visitor Flag Cloud Option For xCss Style mode?

cloudflag : true

If `cloudflag` is turned on, the setting of [Visitor Flag Local Options](https://github.com/MiniValine/MiniValine#visitor-flag-local-options) is invalid.

Create Class `Roles` and `Users`.

![](https://cdn.jsdelivr.net/gh/MiniValine/MiniValine@master/.github/img/v1.png)

Create column `name` , `nick` , `color` in `Roles`.

![](https://cdn.jsdelivr.net/gh/MiniValine/MiniValine@master/.github/img/v2.png)

Create column `emailhash` , `role` in `Users`.

![](https://cdn.jsdelivr.net/gh/MiniValine/MiniValine@master/.github/img/v3.png)

Notice the correspondence between `name` in `Roles` and `role` in `Users`.

## How to Add Dark Mode?

Assume that the trigger class of Dark Mode is `.darkmode`

Just add the following style：

```
.darkmode .commentTrigger{
	background-color: #403e3e !important;
  }
.darkmode .MiniValine .vpage .more{
	background: #21232F
}
.darkmode img{
      filter: brightness(30%)
}
.darkmode .MiniValine .vlist .vcard .vcomment-body .text-wrapper .vcomment.expand:before{
	background: linear-gradient(180deg, rgba(246,246,246,0), rgba(0,0,0,0.9))
}
.darkmode .MiniValine .vlist .vcard .vcomment-body .text-wrapper .vcomment.expand:after{
	background: rgba(0,0,0,0.9)
}
.darkmode .MiniValine .vlist .vcard .vcomment-body .text-wrapper .vcomment pre{
	background: #282c34
	border: 1px solid #282c34
}
.darkmode .MiniValine .vinputs-area .vextra-area .vsmile-icons{
	background: transparent;
}
```

## How to Add or Improve translation?

-  Go to https://crowdin.com/project/minivaline

-  Create a new account.

-  Submit your request or Get in contact with us.

`
If you do not see your language listed, contact us and we will publish it.
`

## How to customize emoticons?

For example:

[alus](https://github.com/MiniValine/alus): MiniValine's default emoji.

### 1.Create a GitHub repository named [alus](https://github.com/MiniValine/alus).

### 2.Add custom emoji picture files in GitHub Repository.

### 3.The most important is that you need to add [index.json](https://github.com/MiniValine/alus/blob/master/index.json) in the root directory.

[index.json](https://github.com/MiniValine/alus/blob/master/index.json) must obey such rules:

``` json
{"0":['A','B','C']}
```
* Only Replace `A`,`B`,`C` with your emoji picture file name. Note the file extension.

* Please note that commas, colons, brackets, braces, quotes use English half-width.

* Please note that the file name of index.json must be `index.json`.

* For example:

``` json
{"0":['emoticonA.png','emoticonB.gif','emoticonC.jpeg','emoticonD.jpg']}
```

### 4.Get CDN link

jsdelivr CDN link : https://cdn.jsdelivr.net/gh/[YourGitHubUsername]/[GitHubRepositoryName]

Be careful not to have `/` at the end of the URL

For example:

```
https://cdn.jsdelivr.net/gh/MiniValine/alus
```

### 5.Modify MiniValine configuration item `emoticonUrl`


```
  new MiniValine({
      el: '.comment',
      appId: 'Your App ID',
      appKey: 'Your Key',
      placeholder: 'Write a Comment',
      emoticonUrl: ['https://cdn.jsdelivr.net/gh/MiniValine/alus']
  });

```

or

```
  new MiniValine({
      el: '.comment',
      appId: 'Your App ID',
      appKey: 'Your Key',
      placeholder: 'Write a Comment',
      emoticonUrl: ['https://cdn.jsdelivr.net/gh/MiniValine/Bilibilis@master','https://cdn.jsdelivr.net/npm/alus']
  });

```

### 6.Try to be faster.

The author uses a `Python` script to generate `index.json` here. The friends who have the ability can try it.

Modify `FilePath` please.

``` python
#-*- coding: utf-8 -*-
import os

def walkFile(FilePath):
    S='''{"0":['''
    for root, dirs, files in os.walk(FilePath):
        for f in files:
            Path=os.path.join(root, f)
            S+="'"+f+"',"
    S+="]}"
    print("正在写入文件，这通常不会太久...")
    with open("./index.json","wb") as ff:
        ff.write(S.encode("utf-8"))
    print("恭喜，已成功完成")
if __name__=="__main__":
    print("请坐和放宽，我们正帮你搞定一切......")
    FilePath="./alus"
    try:
        walkFile(FilePath)
    except Exception as e:
        print("生成失败！我们都有不顺利的时候.")
        print(e)

```
