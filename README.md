![](./src/images/logo.opacity.png)
# Valine  
[![version](https://img.shields.io/github/release/MHuiG/Valine.svg?style=flat-square)](https://github.com/MHuiG/Valine/releases) [![npm downloads](https://img.shields.io/npm/dt/valine.svg?style=flat-square)](https://www.npmjs.com/package/valine) [![GPL Licence](https://cdn.jsdelivr.net/gh/MHuiG/imgbed/github/gpl.svg)](https://opensource.org/licenses/GPL-2.0/) [![Build Status](https://travis-ci.com/MHuiG/Valine.svg?branch=master)](https://travis-ci.com/MHuiG/Valine) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
> A simple comment system based on Leancloud.  
------------------------------
**[Live Demo](https://mhuig.github.io/Valine/index.html)**

- High speed.
- Safe by default.
- Easy to customize.
- No server-side implementation.
- Support markdown.
- Support lazy loading picture emoji.
- Support for code highlighting.
- Support for MathJax.

## Installation
**1. Quick Installation**   

```html
<script src="https://cdn.jsdelivr.net/gh/MHuiG/Valine/dist/Valine.min.js"></script>
```
**2. Get `App ID`/`App Key` from LeanCloud**  
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
    <title>Valine - A simple comment system based on Leancloud.</title>
    <script src="https://cdn.jsdelivr.net/gh/MHuiG/Valine/dist/Valine.min.js"></script>
</head>
<body>
    <div class="comment"></div>
    <script>
      new Valine({
          el: '.comment',
          emoticon_url: 'https://cdn.jsdelivr.net/gh/MHuiG/mhuig.github.io/libs/valine/alu',
          emoticon_list: ["高兴.png","黑线.png","鼓掌.png","不出所料.png","亲亲.png","狂汗.png","献花.png","赞一个.png","击掌.png","脸红.png","得意.png","惊喜.png","想一想.png","蜡烛.png","装大款.png","观察.png","口水.png","吐.png","吐舌.png","吐血倒地.png","不说话.png","不高兴.png","中刀.png","中枪.png","呲牙.png","咽气.png","哭泣.png","喜极而泣.png","喷水.png","中指.png","喷血.png","坐等.png","害羞.png","小眼睛.png","尴尬.png","愤怒.png","扇耳光.png","投降.png","抠鼻.png","抽烟.png","无奈.png","无所谓.png","无语.png","暗地观察.png","期待.png","欢呼.png","汗.png","深思.png","献黄瓜.png","便便.png","内伤.png","皱眉.png","看不见.png","看热闹.png","瞅你.png","肿包.png","邪恶.png","锁眉.png","长草.png","阴暗.png"],
          app_id: 'Your App ID',
          app_key: 'Your Key',
          placeholder: '老司机来一发吧 O(∩_∩)O~~'
      });
    </script>
</body>
</html>
```

## Features
- Fix bugs
- And more...

## License

[GPL-2.0](https://github.com/MHuiG/Valine/blob/master/LICENSE)
