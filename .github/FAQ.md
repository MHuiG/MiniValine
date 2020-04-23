# <div align="center">MiniValine FAQs</div>

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
* Replace A,B,C with your emoji picture file name,Note the file extension.

* Please note that commas, colons, brackets, braces, quotes use English half-width.

* Please note that the file name of index.json must be index.json.

* For example:

``` json
{"0":['emoticonA.png','emoticonB.gif','emoticonC.jpeg','emoticonD.jpg']}
```

### 4.Get CDN link

jsdelivr CDN link : https://cdn.jsdelivr.net/gh/[Your GitHub Username]/[GitHub repository name]

For example:

```
https://cdn.jsdelivr.net/gh/MiniValine/alus
```

### 5.Modify MiniValine configuration item `emoticonUrl`

For example:

```
  new MiniValine({
      el: '.comment',
      appId: 'Your App ID',
      appKey: 'Your Key',
      placeholder: 'Write a Comment',
      emoticonUrl: 'https://cdn.jsdelivr.net/npm/alus'
  });

```

### 6.Got it.

