# MiniValine
[![version](https://img.shields.io/github/release/MHuiG/MiniValine.svg?style=flat-square)](https://github.com/MHuiG/Valine/releases) [![GPL Licence](https://cdn.jsdelivr.net/gh/MHuiG/imgbed/github/gpl.svg)](https://opensource.org/licenses/GPL-3.0/) [![Build Status](https://travis-ci.com/MHuiG/MiniValine.svg?branch=master)](https://travis-ci.com/MHuiG/MiniValine) [![Build Status](https://github.com/MHuiG/MiniValine/workflows/Node.js%20CI/badge.svg)](https://github.com/MHuiG/MiniValine/actions)
> A simple comment system based on Leancloud.  
------------------------------
**[Live Demo](https://mhuig.github.io/MiniValine/index.html)**

- High speed.
- Safe by default.
- Easy to customize.
- No server-side implementation.
- Support markdown.
- Support lazy loading picture emoji.
- Support for code highlighting.
- Support for MathJax.

## Installation

### **1.Quick Installation**

**jsDelivr CDN**
```html
<script src="https://cdn.jsdelivr.net/gh/MHuiG/MiniValine/dist/MiniValine.min.js"></script>
```

or

**unpkg CDN**
```html
<script src="https://unpkg.com/MiniValine/dist/MiniValine.min.js"></script>
```

### **2.Npm Installation**
**Npm Package**
```bash
npm install minivaline
```

or

**Github Package**
```bash
npm install @mhuig/minivaline
```

## Get `App ID`/`App Key`
**Get `App ID`/`App Key` from LeanCloud**  
[Click here](https://leancloud.cn/dashboard/login.html#/signup) to register or login in `LeanCloud`.  
[Click here](https://leancloud.cn/dashboard/applist.html#/newapp) Create new application in `LeanCloud`, and you will get `appId`/`appKey`.

## Usage
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>MiniValine - A simple comment system based on Leancloud.</title>
    <!--Load js and insert it before </ body>-->
    <script src="https://cdn.jsdelivr.net/gh/MHuiG/MiniValine/dist/MiniValine.min.js"></script>
</head>
<body>
    <div class="comment"></div>
    <script>
      new MiniValine({
          el: '.comment',
          appId: 'Your App ID',
          appKey: 'Your Key',
          placeholder: '老司机来一发吧 O(∩_∩)O~~'
      });
    </script>
</body>
</html>
```
## Options

- el: "[object HTMLDivElement]"
- appId: "Your App ID"
- appKey: "Your Key"
- placeholder: "Input Placeholder"
- pathname: location.pathname
- adminEmailMd5: "Admin Email MD5"
- emoticonUrl: "Expression Url"
- emoticonList: "Expression List"
- maxNest: 3
- pageSize: 6
- lang: "en"

## Features
- Fix bugs
- And more...

## License

[GPL-3.0](https://github.com/MHuiG/MiniValine/blob/master/LICENSE)
