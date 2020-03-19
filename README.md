# MiniValine
[![version](https://img.shields.io/github/release/MHuiG/MiniValine.svg?style=flat-square)](https://github.com/MHuiG/Valine/releases) [![GPL Licence](https://cdn.jsdelivr.net/gh/MHuiG/imgbed/github/gpl.svg)](https://opensource.org/licenses/GPL-3.0/) [![Build Status](https://travis-ci.com/MHuiG/MiniValine.svg?branch=master)](https://travis-ci.com/MHuiG/MiniValine) [![Build Status](https://github.com/MHuiG/MiniValine/workflows/Node.js%20CI/badge.svg)](https://github.com/MHuiG/MiniValine/actions) [![Coverage Status](https://coveralls.io/repos/github/MHuiG/MiniValine/badge.svg?branch=master)](https://coveralls.io/github/MHuiG/MiniValine?branch=master)
> MiniValine is a simple and minimalist comment system based on Leancloud.  
------------------------------
**[Live Demo](https://minivaline.github.io)**

## Features

- High speed.
- Safe by default.
- Easy to customize.
- No server-side implementation.
- Support markdown.
- Support lazy loading picture emoji.
- Support code highlighting.
- Support MathJax.
- Support multiple languages [en, zh-CN, zh-TW, es-ES, fr, ru].

## Install

Two ways.

- links

```html
<script src="https://cdn.jsdelivr.net/gh/MiniValine/MiniValine/dist/MiniValine.min.js"></script>

<!-- or -->

<script src="https://unpkg.com/minivaline/dist/MiniValine.min.js"></script>
```

- npm install

``` bash
# Install leancloud's js-sdk
npm install leancloud-storage --save

# Install minivaline
npm install minivaline --save
```

``` js
// Register AV objects to the global
window.AV = require('leancloud-storage');

// Use import
import MiniValine from 'minivaline';
// or Use require
const MiniValine = require('minivaline');

new MiniValine({
    el:'#vcomments',
    // other config
})
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
    <script src="https://cdn.jsdelivr.net/gh/MiniValine/MiniValine/dist/MiniValine.min.js"></script>
</head>
<body>
    <div class="comment"></div>
    <script>
      new MiniValine({
          el: '.comment',
          appId: 'Your App ID',
          appKey: 'Your Key',
          placeholder: 'Write a Comment O(∩_∩)O~~'
      });
    </script>
</body>
</html>
```

## Options

- **el** `String`

  **Required**. [object HTMLDivElement]
  
- **appId** `String`

  **Required**. Your App ID

- **appKey** `String`

  **Required**. Your App Key

- **placeholder** `String`

  Input Placeholder

- **pathname** `String`

  Default: `location.pathname.replace(/\/$/, '')`
  
  The pathname of the page.

- **adminEmailMd5** `String`

  The MD5 of Admin Email to show Admin Flag.

- **math** `Boolean`

  Default: `false`
  
  Support MathJax.

- **lang** `String`

  Default: `navigator.language || navigator.userLanguage`.

  Localization language key, `en` and `zh-CN`  are currently available.

- **emoticonUrl** `String`

  Default: `'https://cdn.jsdelivr.net/gh/MHuiG/mhuig.github.io/libs/alu'`
  
  Expression Url.

- **emoticonList** `Array`

  Default: `['高兴.png', '黑线.png', '鼓掌.png', '不出所料.png', '亲亲.png', '狂汗.png', '献花.png', '赞一个.png', '击掌.png', '脸红.png', '得意.png', '惊喜.png', '想一想.png', '蜡烛.png', '装大款.png', '观察.png', '口水.png', '吐.png', '吐舌.png', '吐血倒地.png', '不说话.png', '不高兴.png', '中刀.png', '中枪.png', '呲牙.png', '咽气.png', '哭泣.png', '喜极而泣.png', '喷水.png', '中指.png', '喷血.png', '坐等.png', '害羞.png', '小眼睛.png', '尴尬.png', '愤怒.png', '扇耳光.png', '投降.png', '抠鼻.png', '抽烟.png', '无奈.png', '无所谓.png', '无语.png', '暗地观察.png', '期待.png', '欢呼.png', '汗.png', '深思.png', '献黄瓜.png', '便便.png', '内伤.png', '皱眉.png', '看不见.png', '看热闹.png', '瞅你.png', '肿包.png', '邪恶.png', '锁眉.png', '长草.png', '阴暗.png']`

  Expression List.

- **maxNest** `Number`

  Default: `3`

  Nest size.

- **pageSize** `Number`

  Default: `6`
  
  Pagination size.

## Contributing

1. [Fork the repository](https://github.com/MiniValine/MiniValine/fork) and create your branch from master
2. If you've added code that should be tested, add tests!
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes (npm test).
5. Make sure your code lints (npm run check).
6. Commit your changes (git commit) [Commit Message Format Reference](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines)


## License

[GPL-3.0](https://github.com/MiniValine/MiniValine/blob/master/LICENSE)
