# <div align="center">MiniValine FAQs</div>

## How to join the development of MiniValine?

We welcome you to join the development of MiniValine. Please see [contributing document](https://github.com/MiniValine/MiniValine/blob/master/.github/CONTRIBUTING.md). 🤗

Also, we welcome Issue or PR to MiniValine.

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
* Only Replace A,B,C with your emoji picture file name. Note the file extension.

* Please note that commas, colons, brackets, braces, quotes use English half-width.

* Please note that the file name of index.json must be index.json.

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
      emoticonUrl: 'https://cdn.jsdelivr.net/gh/MiniValine/alus'
  });

```

### 6.Try it.

The author uses a `Python` script to generate index.json here. The friends who have the ability to try it.

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
    print(S)
    with open("./index.json","wb") as ff:
        ff.write(S.encode("utf-8"))

if __name__=="__main__":
    
    FilePath="./alus"
    walkFile(FilePath)
```
