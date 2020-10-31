<img src='./.github/minivaline.png' width='120' align="right" />

# This is MiniValine version 2.7.x Stable | [CHANGELOG](https://minivaline.js.org/docs/en/#/CHANGELOG)

The date of EOL: 2020-7-30
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
[![DeepScan grade](https://deepscan.io/api/teams/8202/projects/10351/branches/142143/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=8202&pid=10351&bid=142143)

> MiniValine is a simple and minimalist comment system based on Leancloud
------------------------------
**[Live Demo](https://minivaline.github.io)**

**[Awesome MiniValine](https://github.com/MiniValine/AWESOME-MiniValine)**

**[MiniValine FAQs](https://github.com/MiniValine/MiniValine/blob/master/.github/FAQ.md)**

## Features

- High speed.
- Easy to customize.
- [Safe by default](https://jsxss.com/en/try.html).
- [Always compatible with IE](https://polyfill.io/).
- [Simple and lightweight](https://app.bundle-analyzer.com/gh/MiniValine/MiniValine).
- Support [lazy loading](https://github.com/aFarkas/lazysizes) [picture emoji](https://github.com/MiniValine/alus).
- Support [code highlighting](https://highlightjs.org/static/demo/).
- Support [Markdown](https://guides.github.com/features/mastering-markdown/).
- Support [MathJax](https://www.mathjax.org/).
- Enter live preview.
- Support [paste and upload pictures](https://imgkr.com/).
- Support [multiple languages](https://crowdin.com/project/minivaline).

## Install

Two ways.

- links

```html
<script src="https://unpkg.com/minivaline@2/dist/MiniValine.min.js"></script>

<!-- or -->

<script src="https://cdn.jsdelivr.net/npm/minivaline@2/dist/MiniValine.min.js"></script>

<!-- or -->

<script src="https://cdn.jsdelivr.net/gh/MiniValine/MiniValine@2/dist/MiniValine.min.js"></script>
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

- **mode** `String`

  Default: `DesertsP`

  Options: 

  * `DesertsP` DesertsP Style mode.
  * `xCss`  xCss Style mode.

- **placeholder** `String`

  Input Placeholder

- **pathname** `String`

  Default: `location.pathname.replace(/\/$/, '')`
  
  The pathname of the page.

- **adminEmailMd5** `String` [ Just Only DesertsP Style mode]

  The MD5 of Admin Email to show Admin Flag.

- **master** `String Array` [ Just Only xCss Style mode]

   Default: `[]`
  
  The MD5 String Array of master Email to show master Flag.

- **friends** `String Array` [ Just Only xCss Style mode]

   Default: `[]`
  
  The MD5 String Array of friends Email to show friends Flag.

- **tagMeta** `String Array` [ Just Only xCss Style mode]

   Default: `[]`
  
  The String Array of Words to show Flag.
  
  For Example:
  `tagMeta: ["管理员", "小伙伴", "访客"]`

- **math** `Boolean`

  Default: `true`
  
  Options: 

  * `false` Close MathJax.
  * `true`  Support MathJax@3 initialization.

  The above is the initialization operation of integrating MathJax in MiniValine.
  If MathJax is loaded on the page, MiniValine will use the MathJax version on the page.

- **md** `Boolean`

  Default: `true`
  
  Support Markdown.

- **lang** `String`

  Default: `navigator.language || navigator.userLanguage`.

  Localization language key, en and zh-CN are currently available.
  
  More i18n info: [minivaline-i18n](https://github.com/MiniValine/minivaline-i18n)
  
  [How to Add or Improve translation?](https://github.com/MiniValine/MiniValine/blob/master/.github/FAQ.md#how-to-add-or-improve-translation)

- **emoticonUrl** `String Array`

  Default: `['https://cdn.jsdelivr.net/npm/alus@latest','https://cdn.jsdelivr.net/gh/MiniValine/qq@latest','https://cdn.jsdelivr.net/gh/MiniValine/Bilibilis@latest','https://cdn.jsdelivr.net/gh/MiniValine/tieba@latest','https://cdn.jsdelivr.net/gh/MiniValine/twemoji@latest','https://cdn.jsdelivr.net/gh/MiniValine/weibo@latest']`
  
  Expression Url.
    
  [How to customize emoticons?](https://github.com/MiniValine/MiniValine/blob/master/.github/FAQ.md#how-to-customize-emoticons)

- **NoRecordIP** `Boolean`

  Default: `false`
  
  Do not record commenter IP.

- **maxNest** `Number`

  Default: `6`

  Sub-comment maximum nesting depth.

- **pageSize** `Number`

  Default: `6`
  
  Pagination size.

- **enableQQ** `Boolean`

  Default: `false`
  
  Enable QQ avatar API.

- **visitor** `Boolean`

  Default: `true`
  
  仅提供`文章阅读量访问统计`和`全站访问统计`,如需其他功能,请设置为`false`,并自行配置`MiniValine Counter`.

  **[MiniValine Counter](https://github.com/MiniValine/minivaline-counter)**

- **serverURLs** `String`

  Default: `http[s]://[tab/us].avoscloud.com`
  
  This configuration is suitable for domestic custom domain name users, the overseas version will be automatically detected (no need to fill in manually).

## ToDo

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

## About

* This project is always open source and free.
* This project does not have any competitive relationship with any other project.
* This project is a collection of inspiration from the Valine family. Thanks to every developer for their inspiration and contribution.
* The project is open source only for sharing, developers are not obliged to provide after-sales service.

## Contributing

We welcome you to join the development of MiniValine. Please see [contributing document][contributing-document-url]. 🤗

Also, we welcome Issue or PR to MiniValine.

## Contributors

### Code Contributors

This project exists thanks to all the people who contribute. 

[![contributors-image]][contributors-url]

## Thanks

Tribute to excellent open source! Tribute to excellent sharers!

Tribute to [@xCss](https://github.com/xCss) and [@DesertsP](https://github.com/DesertsP)!

<a href="https://github.com"><img align="center" width="100" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png" title="Powered by GitHub" /></a>
<a href="https://travis-ci.com"><img align="center" width="140" src="https://raw.githubusercontent.com/travis-ci/travis-web/master/public/images/logos/TravisCI-Full-Color.png" title="Powered by TravisCI" /></a>
<a href="https://crowdin.com"><img align="center" width="180" src="https://support.crowdin.com/assets/logos/crowdin-logo1-small.png" title="Powered by Crowdin" /></a>
<a href="https://codacy.com"><img align="center" width="155" src="https://user-images.githubusercontent.com/16944225/55026017-623f8f00-5002-11e9-88bf-0d6a5884c6c2.png" title="Powered by Codacy" /></a>
<a href="https://www.leancloud.cn"><img align="center" width="180" src="https://imgkr.cn-bj.ufileos.com/cdb8f605-9759-48f5-882d-1dd9db1eddae.png" title="Powered by LeanCloud" /></a>
<a href="https://polyfill.io"><img align="center" width="180" src="https://imgkr.cn-bj.ufileos.com/7843ef58-ad2c-4e57-9779-7e467ba0a7dd.png" title="Powered by Polyfill.io" height="48px"/></a>
<a href="https://app.bundle-analyzer.com"><img align="center" width="180" src="https://imgkr.cn-bj.ufileos.com/0c8dcfad-194c-4caa-bc5a-905d3a91366a.png" title="Powered by Bundle Analyzer" height="48px"/></a>
<a href="https://www.mathjax.org"><img align="center" title="Powered by MathJax" src="https://www.mathjax.org/badge/mj_logo.png" border="0" alt="Powered by MathJax" height="48px"/></a>
<a href="https://imgkr.com"><img align="center" src="https://imgkr.cn-bj.ufileos.com/d3d0c549-cddc-4d5b-8154-ecb689a46eae.png" title="Powered by 图壳" height="48px"/></a>
<a href="https://jsxss.com"><img align="center" src="https://imgkr.cn-bj.ufileos.com/76bb3636-9a8b-4c6b-b0dd-fed3da99b7a8.png" title="Powered by JsXSS" height="48px"/></a>
<a href="https://highlightjs.org/"><img align="center" src="https://imgkr.cn-bj.ufileos.com/84668cd8-5d5a-444a-b8de-fd05f64241b1.png" title="Powered by highlightjs" height="48px"/></a>

## License

[GPL-3.0](https://github.com/MiniValine/MiniValine/blob/master/LICENSE)

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FMiniValine%2FMiniValine.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FMiniValine%2FMiniValine?ref=badge_large)



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
