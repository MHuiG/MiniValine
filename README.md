
# MiniValine will be abandoned soon, refactoring plan has started. ~[MHuiG/ohhho](https://github.com/MHuiG/ohhho)~ [CoPoKo/Maxwell](https://github.com/CoPoKo/Maxwell)
# MiniValine 即将废弃 已开启重构计划 ~[MHuiG/ohhho](https://github.com/MHuiG/ohhho)~ [CoPoKo/Maxwell](https://github.com/CoPoKo/Maxwell)


<img src='https://cdn.jsdelivr.net/gh/MiniValine/MiniValine@master/.github/img/minivaline.png' width='120' align="right" />

# This is MiniValine version 6.x

------------------------------

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
[![DeepScan grade](https://deepscan.io/api/teams/11674/projects/14601/branches/275411/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=11674&pid=14601&bid=275411)
[![](https://img.shields.io/badge/jsdelivr-purge-green)](https://purge.jsdelivr.net/npm/minivaline)

> MiniValine is a simple and minimalist comment system
------------------------------

**[Demo](https://minivaline.js.org)** | **[Docs](https://minivaline.js.org/docs/)** | **[Awesome](https://github.com/MiniValine/AWESOME-MiniValine)**

MiniValine 自 version 6.x 起回归极简主义！ 因此 6.x 移除了 5.x 的全部功能特性，只保留了基础评论功能！！！

> Less is More
------------------------------

## Features

> 基于 CloudFlareWorker 和 CloudFlareKV/IPFS 技术的极简风评论系统

* 使用 Cloudflare Workers 构建无服务器应用程序并部署到Cloudflare的边缘网络
* 使用 Cloudflare Workers KV 全球分布式键值存储构建高度动态API
* 使用 IPFS 分布式文件系统实现去中心化分布式存储

# 参数和指标

- 前端 JS 脚本完整版共计一个（MiniValine.min.js） 文件大小约为 80 KB，gzip 压缩后约为 25 KB。
- 前端 JS 脚本无样式版共计一个（MiniValine.o.min.js） 文件大小约为 45 KB。
- 系统关键请求共计 ~3个~ 1个(websocket)。
- ~~中国地区使用 CloudFlareAnycast 技术和 DNSPOD 智能解析技术 以及 优选 CloudFlare节点 IP 负载均衡的方法，~~ 系统关键请求时间可在 200-500ms 左右。


## Install

> **More Install Info** [here](https://minivaline.js.org/docs/cn/#/Install)

## Options

> **More Option Info** [here](https://minivaline.js.org/docs/cn/#/Options)

## Feedback

* Visit the [AWESOME MiniValine](https://github.com/MiniValine/AWESOME-MiniValine) list to share plugins and tutorials with other users.
* [Add or improve translation](https://crowdin.com/project/minivaline) in few seconds.
* Join our [Gitter][gitter-url] chats.
* Report a bug in [GitHub Issues][issues-bug-url].
* Request a new feature on [GitHub][issues-feat-url].
* Vote for [popular feature requests][feat-req-vote-url].


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

感谢 [@ZanderZhao](https://github.com/ZanderZhao) 提供的文档建设支持，[@zane-ng](https://github.com/zane-ng) 提供的文档翻译校对支持。

Thanks to [CloudFlare](https://www.cloudflare.com) for their support.

<img src="https://www.cloudflare.com/img/logo-web-badges/cf-logo-on-white-bg.svg" width="300">

<a href="https://github.com"><img align="center" width="100" src="https://cdn.jsdelivr.net/gh/MiniValine/MiniValine@master/.github/img/GitHub-Logo.png" title="Powered by GitHub" /></a>
<a href="https://travis-ci.com"><img align="center" width="140" src="https://cdn.jsdelivr.net/gh/MiniValine/MiniValine@master/.github/img/TravisCI-Full-Color.png" title="Powered by TravisCI" /></a>
<a href="https://crowdin.com"><img align="center" width="180" src="https://cdn.jsdelivr.net/gh/MiniValine/MiniValine@master/.github/img/crowdin-logo1-small.png" title="Powered by Crowdin" /></a>
<a href="https://codacy.com"><img align="center" width="155" src="https://cdn.jsdelivr.net/gh/MiniValine/MiniValine@master/.github/img/codacy.png" title="Powered by Codacy" /></a>
<a href="https://app.bundle-analyzer.com"><img align="center" width="180" src="https://cdn.jsdelivr.net/gh/MiniValine/MiniValine@master/.github/img/bundle-analyzer.png" title="Powered by Bundle Analyzer" height="48px"/></a>
<a href="https://jsxss.com"><img align="center" src="https://cdn.jsdelivr.net/gh/MiniValine/MiniValine@master/.github/img/xss.png" title="Powered by JsXSS" height="48px"/></a>
<a href="https://highlightjs.org"><img align="center" src="https://cdn.jsdelivr.net/gh/MiniValine/MiniValine@master/.github/img/highlightjs.png" title="Powered by highlightjs" height="48px"/></a>

## License

[GPL V3 or later](https://github.com/MiniValine/MiniValine/blob/master/LICENSE)


## Copyright Notice

```
    MiniValine
    Copyright (C) 2019-present  MiniValine Team

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

## 授权链

MiniValine version 6.x 基于 ohhho kernel 开发

[MiniValine](https://github.com/MiniValine/MiniValine) [2021.4.18](https://github.com/MiniValine/MiniValine/tree/f2c5b97ed1571fc34b18f44b1db303089061388a)-present [GPLV3 or later](https://github.com/MiniValine/MiniValine/blob/master/LICENSE)

[ohhho kernel](https://github.com/MHuiG/ohhho) [2021.3.7](https://github.com/MHuiG/ohhho/tree/f8896843ee3dfb5c0b4213a0f7a57fa96b4d10ee)-present [GPL-3.0 Only](https://github.com/MHuiG/ohhho/blob/master/LICENSE)

[MiniValine](https://github.com/MiniValine/MiniValine) [2020.3.10](https://github.com/MiniValine/MiniValine/tree/c572885421f5818b13931ba3023689897d41df16)-[2021](https://github.com/MiniValine/MiniValine/tree/e006726baf526478d890429b50c376b9e7c534a2) [GPLV3 or later](https://github.com/MiniValine/MiniValine/blob/e006726baf526478d890429b50c376b9e7c534a2/LICENSE)

[Valine-Ex](https://github.com/DesertsP/Valine) [2017.8.13](https://github.com/DesertsP/Valine/tree/80caa2600f4cf92b84ec1b9815077748dd16dcbf)-[2019.5.28](https://github.com/DesertsP/Valine/tree/71090fed6e336ffded7d3e56f0909c8443c2bf8a)  [GPL-2.0 Only](https://github.com/DesertsP/Valine/blob/71090fed6e336ffded7d3e56f0909c8443c2bf8a/LICENSE)

[Valine](https://github.com/xCss/Valine) [2017.8.3](https://github.com/xCss/Valine/tree/e1fb38559efa085866f531b473f4050001b97b83)-[2017.8.13](https://github.com/xCss/Valine/tree/cefd272eacdea665f20bc1eeeb18780984896eb2) [GPL-2.0 Only](https://github.com/xCss/Valine/blob/cefd272eacdea665f20bc1eeeb18780984896eb2/LICENSE)

向以上开源项目以及贡献者致敬！


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

