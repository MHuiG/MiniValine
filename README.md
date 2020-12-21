<img src='https://cdn.jsdelivr.net/gh/MiniValine/MiniValine@master/.github/img/minivaline.png' width='120' align="right" />

# This is MiniValine version 5.x

------------------------------

[![version](https://img.shields.io/github/release/MiniValine/MiniValine.svg?style=flat-square)](https://github.com/MiniValine/MiniValine/releases)
[![NPM][npm-version-image]][npm-version-url]
[![GPL Licence](https://cdn.jsdelivr.net/gh/MHuiG/imgbed/github/gpl.svg)](https://opensource.org/licenses/GPL-3.0/)
[![npm downloads](https://img.shields.io/npm/dm/minivaline.svg?style=flat-square)](https://www.npmjs.com/package/minivaline)
[![gzip-size][gzip-size]][gzip-url]
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FMiniValine%2FMiniValine.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FMiniValine%2FMiniValine?ref=badge_shield)

[![Build Status](https://travis-ci.com/MiniValine/MiniValine.svg?branch=master)](https://travis-ci.com/MiniValine/MiniValine)
[![Build Status](https://github.com/MiniValine/MiniValine/workflows/Node.js%20CI/badge.svg)](https://github.com/MiniValine/MiniValine/actions)
[![Mergify Status][mergify-status]][mergify]
[![codecov](https://codecov.io/gh/MiniValine/MiniValine/branch/master/graph/badge.svg)](https://codecov.io/gh/MiniValine/MiniValine)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9c203d6a0703457081c8d563a0b3b810)](https://www.codacy.com/gh/MiniValine/MiniValine?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=MiniValine/MiniValine&amp;utm_campaign=Badge_Grade)
[![DeepScan grade](https://deepscan.io/api/teams/11674/projects/14601/branches/275411/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=11674&pid=14601&bid=275411)
[![](https://img.shields.io/badge/jsdelivr-purge-green)](https://purge.jsdelivr.net/npm/minivaline)

> MiniValine is a simple and minimalist comment system
------------------------------

**[Demo](https://minivaline.github.io)** | **[Docs](https://minivaline.js.org/docs/)** | **[FAQs](https://minivaline.js.org/docs/en/#/FAQ)** | **[Awesome](https://github.com/MiniValine/AWESOME-MiniValine)** | [CHANGELOG](https://minivaline.js.org/docs/en/#/CHANGELOG)




## Features

- High speed.
- Easy to customize.
- [Safe by default](https://jsxss.com/en/try.html).
- [Compatible](https://polyfill.io/).
- [Simple and lightweight](https://app.bundle-analyzer.com/gh/MiniValine/MiniValine).
- [Lazy loading](https://github.com/aFarkas/lazysizes) [picture emoji](https://github.com/MiniValine/alus).
- Emoticon category.
- [Code highlighting](https://highlightjs.org/static/demo/).
- [Markdown](https://guides.github.com/features/mastering-markdown/).
- [MathJax](https://www.mathjax.org/).
- Enter live preview.
- [Upload pictures](https://imgkr.com/) pasting or dragging.
- [Multiple languages](https://crowdin.com/project/minivaline).
- Integrated xCss and DesertsP Style mode.
- Admin Flag.
- [Browser and Operating System icon](https://github.com/MiniValine/svg).
- Comment barrage.

## Install

Two ways.

- links

```html

<script src="https://cdn.jsdelivr.net/npm/minivaline@latest/dist/MiniValine.min.js"></script>

```

- npm install

``` bash
# Install minivaline
npm install minivaline --save
```

``` js
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
[Click here](https://console.leancloud.app/login.html#/signup) to register or login in `LeanCloud`.  

[Click here](https://console.leancloud.app/applist.html#/newapp) Create new application in `LeanCloud`, and you will get `appId`/`appKey`.

>  [Detail](https://minivaline.js.org/docs/en/#/Options?id=get-app-idapp-key)

## Usage

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>MiniValine - A simple comment system.</title>
    <!--Load js and insert it before </ body>-->
    <script src="https://cdn.jsdelivr.net/npm/minivaline@latest/dist/MiniValine.min.js"></script>
</head>
<body>
    <div class="mvcomment"></div>
    <script>
      new MiniValine({
          el: '.mvcomment',
          appId: 'Your App ID',
          appKey: 'Your Key',
          placeholder: 'Write a Comment O(∩_∩)O~~'
      });
    </script>
</body>
</html>
```

> [Example](https://github.com/MiniValine/MiniValine.github.io/blob/master/index.html)

### The Smart Way with pjax

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>MiniValine - A simple comment system based.</title>
</head>
<body>
    <div class="mvcomment"></div>
    <script>
    function load_minivaline() {
        setTimeout(function() {
            var HEAD = document.getElementsByTagName('head')[0] || document.documentElement;
            var src = 'https://cdn.jsdelivr.net/npm/minivaline@latest/dist/MiniValine.min.js'
            var script = document.createElement('script')
            script.setAttribute('type','text/javascript')
            script.onload = function() {
               pjax_minivaline()
            }
            script.setAttribute('src', src)
            HEAD.appendChild(script)
        }, 1);
    };
    function pjax_minivaline() {
        if(!document.querySelectorAll(".mvcomment")[0])return;
        new MiniValine({
            el: '.mvcomment',
            appId: 'Your App ID',
            appKey: 'Your Key',
            placeholder: 'Write a Comment O(∩_∩)O~~'
        });
    }
    load_minivaline();
    document.addEventListener('pjax:complete', function () {
        pjax_minivaline();
    });
    </script>
</body>
</html>
```

## Options

> **More Option** and **Different Version** Support [here](https://minivaline.js.org/docs/en/#/Options)

## Feedback

* Visit the [AWESOME MiniValine](https://github.com/MiniValine/AWESOME-MiniValine) list to share plugins and tutorials with other users.
* [Add or improve translation](https://crowdin.com/project/minivaline) in few seconds.
* Join our [Gitter][gitter-url] chats.

<!--
* Report a bug in [GitHub Issues][issues-bug-url].
* Request a new feature on [GitHub][issues-feat-url].
* Vote for [popular feature requests][feat-req-vote-url].
-->

## About

* This project is always open source and free(freedom).
* This project does not have any competitive relationship with any other project.
* This project is a collection of inspiration from the Valine family. Thanks to every developer for their inspiration and contribution.
* The project is open source only for sharing, developers are not obliged to provide after-sales service.

## Contributing

We welcome you to join the development of MiniValine. Please see [contributing document][contributing-document-url]. 🤗

Also, we welcome PR to MiniValine.

### Install dependency package

```
npm i
```

### Code formatting

```
npm run format
```

### Development Preview

```
npm run dev
```

### Development Build

[CDN_PATH](https://github.com/MiniValine/MiniValine/blob/0ebc8ba03595633d1f39120c40f6d2d324dfd6ad/webpack.config.js#L6)

```
npm run build
```

## Contributors

### Code Contributors

This project exists thanks to all the people who contribute. 

[![contributors-image]][contributors-url]

## Thanks

Tribute to excellent open source! Tribute to excellent sharers!

Tribute to [@xCss](https://github.com/xCss) and [@DesertsP](https://github.com/DesertsP)!

<a href="https://github.com"><img align="center" width="100" src="https://cdn.jsdelivr.net/gh/MiniValine/MiniValine@master/.github/img/GitHub-Logo.png" title="Powered by GitHub" /></a>
<a href="https://travis-ci.com"><img align="center" width="140" src="https://cdn.jsdelivr.net/gh/MiniValine/MiniValine@master/.github/img/TravisCI-Full-Color.png" title="Powered by TravisCI" /></a>
<a href="https://crowdin.com"><img align="center" width="180" src="https://cdn.jsdelivr.net/gh/MiniValine/MiniValine@master/.github/img/crowdin-logo1-small.png" title="Powered by Crowdin" /></a>
<a href="https://codacy.com"><img align="center" width="155" src="https://cdn.jsdelivr.net/gh/MiniValine/MiniValine@master/.github/img/codacy.png" title="Powered by Codacy" /></a>
<a href="https://polyfill.io"><img align="center" width="180" src="https://cdn.jsdelivr.net/gh/MiniValine/MiniValine@master/.github/img/polyfill.png" title="Powered by Polyfill.io" height="48px"/></a>
<a href="https://app.bundle-analyzer.com"><img align="center" width="180" src="https://cdn.jsdelivr.net/gh/MiniValine/MiniValine@master/.github/img/bundle-analyzer.png" title="Powered by Bundle Analyzer" height="48px"/></a>
<a href="https://www.mathjax.org"><img align="center" title="Powered by MathJax" src="https://cdn.jsdelivr.net/gh/MiniValine/MiniValine@master/.github/img/mj_logo.png" border="0" alt="Powered by MathJax" height="48px"/></a>
<a href="https://jsxss.com"><img align="center" src="https://cdn.jsdelivr.net/gh/MiniValine/MiniValine@master/.github/img/xss.png" title="Powered by JsXSS" height="48px"/></a>
<a href="https://highlightjs.org"><img align="center" src="https://cdn.jsdelivr.net/gh/MiniValine/MiniValine@master/.github/img/highlightjs.png" title="Powered by highlightjs" height="48px"/></a>

## License

[GPL-3.0](https://github.com/MiniValine/MiniValine/blob/master/LICENSE)

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FMiniValine%2FMiniValine.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FMiniValine%2FMiniValine?ref=badge_large)

## Copyright Notice

```
    MiniValine
    Copyright (C) 2019-now  MiniValine Team

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
```

[npm-version-image]: https://img.shields.io/npm/v/minivaline.svg?style=flat-square
[npm-version-url]: https://www.npmjs.com/package/minivaline
[gzip-size]: https://img.badgesize.io/https://unpkg.com/minivaline@latest/dist/MiniValine.min.js?compression=gzip&style=flat-square
[gzip-url]: https://unpkg.com/minivaline@latest/dist/MiniValine.min.js
[gitter-url]: https://gitter.im/thebestminivaline
[issues-bug-url]: https://github.com/MiniValine/MiniValine/issues/new?assignees=&labels=Bug&template=bug-report.md
[issues-feat-url]: https://github.com/MiniValine/MiniValine/issues/new?assignees=&labels=Feature+Request&template=feature-request.md
[feat-req-vote-url]: https://github.com/MiniValine/MiniValine/issues?q=is%3Aopen+is%3Aissue+label%3A%22Feature+Request%22
[contributing-document-url]: https://minivaline.js.org/docs/en/#/Pre-Contribute
[mergify]: https://mergify.io
[mergify-status]: https://img.shields.io/endpoint.svg?url=https://gh.mergify.io/badges/MiniValine/MiniValine&style=flat
[contributors-image]: https://opencollective.com/minivaline/contributors.svg?width=890
[contributors-url]: https://github.com/MiniValine/MiniValine/graphs/contributors

