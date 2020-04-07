<img src='./.github/minivaline.png' width='120' align="right" />


# MiniValine

[![version](https://img.shields.io/github/release/MiniValine/MiniValine.svg?style=flat-square)](https://github.com/MiniValine/MiniValine/releases)
[![NPM][npm-version-image]][npm-version-url]
[![GPL Licence](https://cdn.jsdelivr.net/gh/MHuiG/imgbed/github/gpl.svg)](https://opensource.org/licenses/GPL-3.0/)
[![npm downloads](https://img.shields.io/npm/dm/minivaline.svg?style=flat-square)](https://www.npmjs.com/package/minivaline)
[![gzip-size][gzip-size]][gzip-url]

[![Build Status](https://travis-ci.com/MiniValine/MiniValine.svg?branch=master)](https://travis-ci.com/MiniValine/MiniValine)
[![Build Status](https://github.com/MiniValine/MiniValine/workflows/Node.js%20CI/badge.svg)](https://github.com/MiniValine/MiniValine/actions)
[![Mergify Status][mergify-status]][mergify]
[![codecov](https://codecov.io/gh/MiniValine/MiniValine/branch/master/graph/badge.svg)](https://codecov.io/gh/MiniValine/MiniValine)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9c203d6a0703457081c8d563a0b3b810)](https://www.codacy.com/gh/MiniValine/MiniValine?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=MiniValine/MiniValine&amp;utm_campaign=Badge_Grade)
[![DeepScan grade](https://deepscan.io/api/teams/8202/projects/10351/branches/142143/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=8202&pid=10351&bid=142143)

> MiniValine is a simple and minimalist comment system based on Leancloud
------------------------------
**[Live Demo](https://minivaline.github.io)**

**[Awesome MiniValine](https://github.com/MiniValine/AWESOME-MiniValine)**

## Features

- High speed.
- ~[Safe by default](https://jsxss.com/en/try.html).~ Front-end verification is all floating clouds.
- Easy to customize.
- ~[No server-side implementation](https://www.leancloud.cn/).~
- [Always compatible with IE](https://polyfill.io/).
- [Simple and lightweight (11.76 KB gzipped)](https://app.bundle-analyzer.com/gh/MiniValine/MiniValine).
- Support [lazy loading](https://github.com/aFarkas/lazysizes) [picture emoji](https://github.com/MiniValine/alus).
- Support [code highlighting](https://highlightjs.org/static/demo/).
- Support [Markdown](https://guides.github.com/features/mastering-markdown/).
- Support [MathJax](https://www.mathjax.org/).
- Support [paste and upload pictures](https://imgkr.com/).
- Support [multiple languages](https://crowdin.com/project/minivaline).

## Install

Two ways.

- links

```html
<script src="https://unpkg.com/minivaline/dist/MiniValine.min.js"></script>

<!-- or -->

<script src="https://cdn.jsdelivr.net/npm/minivaline/dist/MiniValine.min.js"></script>

<!-- or -->

<script src="https://cdn.jsdelivr.net/gh/MiniValine/MiniValine/dist/MiniValine.min.js"></script>
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
    <script src="https://unpkg.com/minivaline/dist/MiniValine.min.js"></script>
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

- **math** `Boolean` or `Number`

  Default: `true`
  
  Options: 

  * `false` or `0` Close MathJax.
  * `true` or `1`  Support MathJax@2 initialization.
  * `2` Support MathJax@2 initialization.
  * `3` Support MathJax@3 initialization.
  
  The above is the initialization operation of integrating MathJax in MiniValine.
  If MathJax is loaded on the page, MiniValine will use the MathJax version on the page.

- **md** `Boolean`

  Default: `true`
  
  Support Markdown.

- **lang** `String`

  Default: `navigator.language || navigator.userLanguage`.

  Localization language key, en and zh-CN are currently available.
  
  More i18n info: [minivaline-i18n](https://github.com/MiniValine/minivaline-i18n)

- **emoticonUrl** `String`

  Default: `'https://cdn.jsdelivr.net/npm/alus'`
  
  Expression Url.


- **maxNest** `Number`

  Default: `3`

  Nest size.

- **pageSize** `Number`

  Default: `6`
  
  Pagination size.

- **serverURLs** `String`

  Default: `http[s]://[tab/us].avoscloud.com`
  
  This configuration is suitable for domestic custom domain name users, the overseas version will be automatically detected (no need to fill in manually).

## TODO

- Extraction from the core library to reduce volume.

- Project engineering

- Component modularity

- And more.

## Feedback

* Visit the [AWESOME MiniValine](https://github.com/MiniValine/AWESOME-MiniValine) list to share plugins and tutorials with other users.
* Report a bug in [GitHub Issues][issues-bug-url].
* [Add or improve translation](https://crowdin.com/project/minivaline) in few seconds.
* Request a new feature on [GitHub][issues-feat-url].
* Join our [Gitter][gitter-url] chats.
* Vote for [popular feature requests][feat-req-vote-url].

## Contributing

We welcome you to join the development of MiniValine. Please see [contributing document][contributing-document-url]. 🤗

Also, we welcome Issue or PR to MiniValine.

## Contributors

[![contributors-image]][contributors-url]

## Thanks

<a href="https://github.com"><img align="center" width="100" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png" title="Powered by GitHub" /></a>
<a href="https://travis-ci.com"><img align="center" width="140" src="https://raw.githubusercontent.com/travis-ci/travis-web/master/public/images/logos/TravisCI-Full-Color.png" title="Powered by TravisCI" /></a>
<a href="https://crowdin.com"><img align="center" width="180" src="https://support.crowdin.com/assets/logos/crowdin-logo1-small.png" title="Powered by Crowdin" /></a>
<a href="https://codacy.com"><img align="center" width="155" src="https://user-images.githubusercontent.com/16944225/55026017-623f8f00-5002-11e9-88bf-0d6a5884c6c2.png" title="Powered by Codacy" /></a>
<a href="https://www.leancloud.cn"><img align="center" width="180" src="https://imgkr.cn-bj.ufileos.com/cdb8f605-9759-48f5-882d-1dd9db1eddae.png" title="Powered by LeanCloud" /></a>
<a href="https://www.mathjax.org"><img align="center" title="Powered by MathJax" src="https://www.mathjax.org/badge/mj_logo.png" border="0" alt="Powered by MathJax" height="48px"/></a>
<a href="https://polyfill.io"><img align="center" width="180" src="https://imgkr.cn-bj.ufileos.com/7843ef58-ad2c-4e57-9779-7e467ba0a7dd.png" title="Powered by Polyfill.io" height="48px"/></a>
<a href="https://app.bundle-analyzer.com"><img align="center" width="180" src="https://imgkr.cn-bj.ufileos.com/0c8dcfad-194c-4caa-bc5a-905d3a91366a.png" title="Powered by Bundle Analyzer" height="48px"/></a>
<a href="https://imgkr.com"><img align="center" src="https://imgkr.cn-bj.ufileos.com/d3d0c549-cddc-4d5b-8154-ecb689a46eae.png" title="Powered by 图壳" height="48px"/></a>
<a href="https://jsxss.com"><img align="center" src="https://imgkr.cn-bj.ufileos.com/76bb3636-9a8b-4c6b-b0dd-fed3da99b7a8.png" title="Powered by JsXSS" height="48px"/></a>
<a href="https://highlightjs.org/"><img align="center" src="https://imgkr.cn-bj.ufileos.com/84668cd8-5d5a-444a-b8de-fd05f64241b1.png" title="Powered by highlightjs" height="48px"/></a>

## License

[GPL-3.0](https://github.com/MiniValine/MiniValine/blob/master/LICENSE)


[npm-version-image]: https://img.shields.io/npm/v/minivaline.svg?style=flat-square
[npm-version-url]: https://www.npmjs.com/package/minivaline
[gzip-size]: https://img.badgesize.io/https://unpkg.com/minivaline@latest/dist/MiniValine.min.js?compression=gzip&style=flat-square
[gzip-url]: https://unpkg.com/minivaline@latest/dist/MiniValine.min.js
[gitter-url]: https://gitter.im/thebestminivaline
[issues-bug-url]: https://github.com/MiniValine/MiniValine/issues/new?assignees=&labels=Bug&template=bug-report.md
[issues-feat-url]: https://github.com/MiniValine/MiniValine/issues/new?assignees=&labels=Feature+Request&template=feature-request.md
[feat-req-vote-url]: https://github.com/MiniValine/MiniValine/issues?q=is%3Aopen+is%3Aissue+label%3A%22Feature+Request%22
[contributing-document-url]: https://github.com/MiniValine/MiniValine/blob/master/.github/CONTRIBUTING.md
[mergify]: https://mergify.io
[mergify-status]: https://img.shields.io/endpoint.svg?url=https://gh.mergify.io/badges/MiniValine/MiniValine&style=flat
[contributors-image]: https://opencollective.com/minivaline/contributors.svg?width=890
[contributors-url]: https://github.com/MiniValine/MiniValine/graphs/contributors
