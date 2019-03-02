require('./Valine.scss');
var md = require('marked');
var xss = require('xss');
var crypto = require('blueimp-md5');

var GRAVATAR_BASE_URL = 'https://gravatar.loli.net/avatar/';
var DEFAULT_EMAIL_HASH = '9e63c80900d106cbbec5a9f4ea433a3e';


var defaultComment = {
    ip: '',
    comment: '',
    rid: '',
    at: '',
    nick: '访客',
    mail: '',
    link: '',
    ua: navigator.userAgent,
    url: location.pathname,
    pin: 0
};

var disable_av_init = false;

const toString = {}.toString;
const store = localStorage;

class Valine {
    /**
     * Valine constructor function
     * @param {Object} option
     * @constructor
     */
    constructor(option) {
        let _root = this;
        // version
        _root.version = '1.1.8';
        getIp();
        // Valine init
        !!option && _root.init(option);
    }

    /**
     * Valine Init
     * @param {Object} option
     */
    init(option) {
        let _root = this;
        let av = option.av || AV;
        // disable_av_init = option.disable_av_init || false;
        defaultComment['url'] = option.url || location.pathname;
        try {
            let el = toString.call(option.el) === "[object HTMLDivElement]" ? option.el : document.querySelectorAll(option.el)[0];
            if (toString.call(el) != '[object HTMLDivElement]') {
                throw `The target element was not found.`;
            }
            _root.el = el;
            _root.el.classList.add('valine');
            let placeholder = option.placeholder || '';
            let eleHTML = `<div class="vwrap">
                                <div class="textarea-wrapper">
                                    <div class="comment_trigger">
                                        <div class="avatar"><img class="visitor_avatar" src="${GRAVATAR_BASE_URL + DEFAULT_EMAIL_HASH + '?size=80'}"></div>
                                        <div class="trigger_title">${placeholder}</div>
                                    </div>
                                    <div class="veditor-area">
                                        <textarea placeholder="" class="veditor"></textarea>
                                        <div class="btn-wrap">
                                            <div class="vpreview-btn vfunction-btn" title="预览"><svg t="1551146416896" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2051" xmlns:xlink="http://www.w3.org/1999/xlink" width="1.5em" height="1.5em"><defs><style type="text/css"></style></defs><path d="M862.516 161.07l44.62 44.38-286.303 288.866-45.668-45.615L862.516 161.07z m1.233 1.233" p-id="2052"></path><path d="M832.162 959.558H128.025V191.784h512.099v64.169H192.037V895.64h576.112V512.127h64.012v447.431z m0.833 0.533" p-id="2053"></path><path d="M256.05 703.994h384.075v63.919H256.05v-63.919z m0-127.769l320.062-0.069v63.919H256.05v-63.85z m0-128.317h192.037v63.891l-192.037 0.028v-63.919z m0 0" p-id="2054"></path></svg></div>
                                            <div class="vemoji-btn vfunction-btn" title="表情"><svg t="1551146424708" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2169" xmlns:xlink="http://www.w3.org/1999/xlink" width="1.5em" height="1.5em"><defs><style type="text/css"></style></defs><path d="M513.028 63.766c-247.628 0-448.369 200.319-448.369 447.426S265.4 958.617 513.028 958.617s448.369-200.319 448.369-447.426S760.655 63.766 513.028 63.766z m-0.203 823.563c-207.318 0-375.382-167.71-375.382-374.592s168.064-374.592 375.382-374.592 375.382 167.71 375.382 374.592-168.064 374.592-375.382 374.592z" p-id="2170"></path><path d="M514.029 767.816c-99.337 0-188.031-54.286-251.889-146.146-10.647-16.703-7.1-33.399 7.094-45.93 14.192-12.529 28.384-8.349 39.025 8.349 49.67 75.164 124.174 116.92 205.77 116.92s163.199-45.93 209.316-125.268c10.647-16.703 24.833-16.703 39.025-8.349 14.194 12.524 14.194 29.227 7.094 45.93-60.312 96.035-152.553 154.494-255.435 154.494zM464.292 402.959l-45.151-45.151-0.05 0.05-90.45-90.45-45.15 45.15 90.45 90.45-90.45 90.451 45.15 45.15 90.45-90.45 0.05 0.05 45.151-45.151-0.05-0.05zM556.611 402.959l45.151-45.151 0.05 0.05 90.45-90.45 45.15 45.15-90.45 90.45 90.45 90.451-45.15 45.15-90.45-90.45-0.05 0.05-45.151-45.151 0.05-0.05z" p-id="2171"></path></svg></div>
                                        </div>
                                    </div>
                                    <div class="vextra-area">
                                        <div class="vsmile-icons" style="display:none"></div>
                                        <div class="vpreview-text" style="display:none"></div>
                                    </div>
                                </div>
                                <section class="auth-section" style="display:none;">
                                    <div class="input-wrapper"><input type="text" name="author" class="vnick" placeholder="昵称" value=""></div>
                                    <div class="input-wrapper"><input type="email" name="email" class="vmail" placeholder="邮箱" value=""></div>
                                    <div class="input-wrapper"><input type="text" name="website" class="vlink" placeholder="网站 (可选)" value=""></div>
                                    <div class="post-action"><button type="button" class="vsubmit">提交</button></div>
                                </section>
                                <div style="display:none;" class="vmark"></div>
                           </div>
                           <div class="info">
                                <div class="col">已有 <span class="count">0</span> 条评论</div>
                                <div class="col power float-right">
                                    <a href="https://segmentfault.com/markdown" target="_blank"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z"></path></svg></a>
                                </div>
                           </div>
                           <div class="vsubmitting" style="display:none;"></div>
                           <ul class="vlist"><li class="vempty"></li></ul>
                           <div class="vloading"></div>
                           <div class="vpage txt-center"></div>`;
            _root.el.innerHTML = eleHTML;
            // Empty Data
            let vempty = _root.el.querySelector('.vempty');
            _root.nodata = {
                show(txt) {
                    vempty.innerHTML = txt || `还没有评论哦，快来抢沙发吧!`;
                    vempty.setAttribute('style', 'display:block;');
                },
                hide() {
                    vempty.setAttribute('style', 'display:none;');
                }
            }
            _root.nodata.show();

            // load smiles image
            let _smile_wrapper = _root.el.querySelector('.vsmile-icons');            
            let smile_names = option.emoticon_list || [];
            for(let i in smile_names) {
                let img = document.createElement('img');
                img.setAttribute('src', `${option.emoticon_url}/${smile_names[i]}`);
                _smile_wrapper.appendChild(img) ;
            }
            if (!disable_av_init) {
                av.init({
                    appId: option.app_id || option.appId,
                    appKey: option.app_key || option.appKey
                });
                disable_av_init = true;
            }
            _root.v = av;

        } catch (ex) {
            let issue = 'https://github.com/DesertsP/Valine/issues';
            if (_root.el) _root.nodata.show(`<pre style="color:red;text-align:left;">${ex}<br>Valine:<b>${_root.version}</b><br>反馈：${issue}</pre>`);
            else console && console.log(`%c${ex}\n%cValine%c${_root.version} ${issue}`, 'color:red;', 'background:#000;padding:5px;line-height:30px;color:#fff;', 'background:#456;line-height:30px;padding:5px;color:#fff;');
            return;
        }

        // loading
        let _spinner = `<div class="spinner"><div class="r1"></div><div class="r2"></div><div class="r3"></div><div class="r4"></div><div class="r5"></div></div>`;
        let vloading = _root.el.querySelector('.vloading');
        vloading.innerHTML = _spinner;
        // loading control
        _root.loading = {
            show() {
                vloading.setAttribute('style', 'display:block;');
                _root.nodata.hide();
            },
            hide() {
                vloading.setAttribute('style', 'display:none;');
                _root.el.querySelectorAll('.vcard').length === 0 && _root.nodata.show();
            }
        };

        let vsubmitting = _root.el.querySelector('.vsubmitting');
        vsubmitting.innerHTML = _spinner;
        _root.submitting = {
            show() {
                vsubmitting.setAttribute('style', 'display:block;');
            },
            hide() {
                vsubmitting.setAttribute('style', 'display:none;');
                _root.nodata.hide();
            }
        };

        let _mark = _root.el.querySelector('.vmark');
        // alert
        _root.alert = {
            /**
             * {
             *  type:0/1,
             *  text:'',
             *  ctxt:'',
             *  otxt:'',
             *  cb:fn
             * }
             *
             * @param {Object} o
             */
            show(o) {
                _mark.innerHTML = `<div class="valert txt-center"><div class="vtext">${o.text}</div><div class="vbtns"></div></div>`;
                let _vbtns = _mark.querySelector('.vbtns');
                let _cBtn = `<button class="vcancel vbtn">${ o && o.ctxt || '我再看看' }</button>`;
                let _oBtn = `<button class="vsure vbtn">${ o && o.otxt || '继续提交' }</button>`;
                _vbtns.innerHTML = `${_cBtn}${o.type && _oBtn}`;
                _mark.querySelector('.vcancel').addEventListener('click', function (e) {
                    _root.alert.hide();
                });
                _mark.setAttribute('style', 'display:block;');
                if (o && o.type) {
                    let _ok = _mark.querySelector('.vsure');
                    Event.on('click', _ok, (e) => {
                        _root.alert.hide();
                        o.cb && o.cb();
                    });
                }
            },
            hide() {
                _mark.setAttribute('style', 'display:none;');
            }
        }

        _root.loading.show();
        var query = new _root.v.Query('Comment');
        query.equalTo('url', defaultComment['url']);
        query.count().then(function (count) {
            _root.el.querySelector('.count').innerHTML = `${count}`;
            _root.bind(option);
        }, function (error) {
            console.log(error);
        });
    }

    /**
     * Bind Event
     */
    bind(option) {
        let _root = this;
        // Smile pictures
        let vsmiles = _root.el.querySelector('.vsmile-icons');
        Event.on('click', vsmiles, (e) => {
            var textField = _root.el.querySelector('.veditor');
            let imgSrc = e.target.src;
            if ( typeof imgSrc == 'undefined' ) return;
            // var tag = " ![](/" + imgSrc.replace(/^.*\/(.*\.gif)$/, '$1') + ") ";
            var tag = "!(:" + decodeURI(imgSrc).replace(/^.*\/(.*)$/, '$1') + ":)";
            if (document.selection) {
                textField.focus();
                sel = document.selection.createRange();
                sel.text = tag;
                textField.focus();
            } else if (textField.selectionStart || textField.selectionStart == '0') {
                var startPos = textField.selectionStart;
                var endPos = textField.selectionEnd;
                var cursorPos = endPos;
                textField.value = textField.value.substring(0, startPos) + tag + textField.value.substring(endPos, textField.value.length);
                cursorPos += tag.length;
                textField.focus();
                textField.selectionStart = cursorPos;
                textField.selectionEnd = cursorPos
            } else {
                textField.value += tag;
                textField.focus()
            }
            defaultComment["comment"] = textField.value;
            let submitBtn = _root.el.querySelector('.vsubmit');
            if (submitBtn.getAttribute('disabled')) submitBtn.removeAttribute('disabled');
        })
        let comment_trigger = _root.el.querySelector('.comment_trigger');
        Event.on('click', comment_trigger, (e) => {
            comment_trigger.setAttribute('style', 'display:none');
            _root.el.querySelector('.auth-section').removeAttribute('style');
            _root.el.querySelector('.veditor').focus();
        })

        // Query && show comment list

        let expandEvt = (el) => {
            if (el.offsetHeight > 180) {
                el.classList.add('expand');
                Event.on('click', el, (e) => {
                    el.setAttribute('class', 'vcomment');
                })
            }
        };

        let commonQuery = () => {
            let query = new _root.v.Query('Comment');
            query.select(['nick', 'comment', 'link', 'rid', 'emailHash']);
            query.notEqualTo('isSpam', true);
            query.equalTo('url', defaultComment['url']);
            query.addDescending('createdAt');
            return query;
        };

        var num = 1;
        let query = (n = 1) => {
            _root.loading.show();
            var size = 10;
            var count = Number(_root.el.querySelector('.count').innerText);
            let cq = commonQuery();
            cq.limit(size);
            cq.skip((n - 1) * size);
            cq.find().then(rets => {
                let len = rets.length;
                if (len) {
                    // _root.el.querySelector('.vlist').innerHTML = '';
                    for (let i = 0; i < len; i++) {
                        insertComment(rets[i], false)
                    }
                    var _vpage = _root.el.querySelector('.vpage');
                    _vpage.innerHTML = size * n < count ? `<div id="vmore" class="more">加载更多评论（剩余${count - size * n}/${count}条）</div>` : '';
                    var _vmore = _vpage.querySelector('#vmore');
                    if (_vmore) {
                        Event.on('click', _vmore, (e) => {
                            _vpage.innerHTML = '';
                            query(++num)
                        })
                    }
                }
                _root.loading.hide();
            }).catch(ex => {
                console.log(ex);
                _root.loading.hide();
            })
        }
        query();

        let insertComment = (ret, top=true) => {
            let _vcard = document.createElement('li');
            _vcard.setAttribute('class', 'vcard');
            _vcard.setAttribute('id', ret.id);
            let emailHash = ret.get('emailHash')
            let gravatar_url = GRAVATAR_BASE_URL + emailHash + '?size=80&d=https%3a%2f%2fgravatar.loli.net%2favatar%2f9e63c80900d106cbbec5a9f4ea433a3e.jpg%3fsize%3d80';
            // language=HTML
            _vcard.innerHTML = `<img class="vavatar" src="${gravatar_url}"/>
                                        <section class="text-wrapper">
                                            <div class="vhead" >
                                                ${ret.get('link') ? `<a class="vname" href="${ ret.get('link') }" target="_blank" rel="nofollow" > ${ret.get("nick")}</a>` : `<span class="vname">${ret.get("nick")}</span>`}
                                                <span class="spacer">•</span>
                                                <span class="vtime">${timeAgo(ret.get("createdAt"))}</span>
                                                <a rid='${ret.id}' at='@${ret.get('nick')}' class="vat">回复</a>
                                            </div>
                                            <div class="vcomment">${ret.get('comment')}</div>
                                        </section>`;
            let _vlist = _root.el.querySelector('.vlist');
            let _vlis = _vlist.querySelectorAll('li');
            let _vat = _vcard.querySelector('.vat');
            let _as = _vcard.querySelectorAll('a');
            for (let i = 0, len = _as.length; i < len; i++) {
                let item = _as[i];
                if (item && item.getAttribute('class') != 'at') {
                    item.setAttribute('target', '_blank');
                    item.setAttribute('rel', 'nofollow');
                }
            }
            if (!top) _vlist.appendChild(_vcard);
            else _vlist.insertBefore(_vcard, _vlis[0]);
            let _vcontent = _vcard.querySelector('.vcomment');
            expandEvt(_vcontent);
            bindAtEvt(_vat);
        }

        let mapping = {
            veditor: "comment",
            vnick: "nick",
            vlink: "link",
            vmail: 'mail'
        };
        let inputs = {};
        for (let i in mapping) {
            if (mapping.hasOwnProperty(i)) {
                let _v = mapping[i];
                let _el = _root.el.querySelector(`.${i}`);
                inputs[_v] = _el;
                Event.on('input', _el, (e) => {
                    // defaultComment[_v] = HtmlUtil.encode(_el.value.replace(/(^\s*)|(\s*$)/g, ""));
                    defaultComment[_v] = _el.value;
                });
            }
        }

        // cache
        let getCache = () => {
            let s = store && store.getItem('ValineCache');
            if (!!s) {
                s = JSON.parse(s);
                let m = ['nick', 'link', 'mail'];
                for (let i in m) {
                    let k = m[i];
                    _root.el.querySelector(`.v${k}`).value = s[k];
                    defaultComment[k] = s[k];
                }
                if (s['mail'] != '') {
                    let el = _root.el.querySelector('.visitor_avatar');
                    el.setAttribute('src', GRAVATAR_BASE_URL + crypto(s['mail'].toLowerCase().trim()) + '?size=80&d=https%3a%2f%2fgravatar.loli.net%2favatar%2f9e63c80900d106cbbec5a9f4ea433a3e.jpg%3fsize%3d80');
                }
            }
        }
        getCache();

        // reset form
        _root.reset = () => {
            for (let i in mapping) {
                if (mapping.hasOwnProperty(i)) {
                    let _v = mapping[i];
                    let _el = _root.el.querySelector(`.${i}`);
                    _el.value = "";
                    defaultComment[_v] = "";
                }
            }
            defaultComment['rid'] = '';
            defaultComment['nick'] = '访客';
            getCache();
            if (smile_icons.getAttribute('triggered')) {
                smile_icons.setAttribute('style', 'display:none;');
                smile_icons.removeAttribute('triggered');
            }
            if (preview_text.getAttribute('triggered')) {
                preview_text.setAttribute('style', 'display:none;');
                preview_text.removeAttribute('triggered');
            }
        }

        // submit
        let submitBtn = _root.el.querySelector('.vsubmit');
        let submitEvt = (e) => {
            if (submitBtn.getAttribute('disabled')) {
                _root.alert.show({
                    type: 0,
                    text: '再等等，评论正在提交中ヾ(๑╹◡╹)ﾉ"',
                    ctxt: '好的'
                })
                return;
            }
            if (defaultComment.comment == '') {
                inputs['comment'].focus();
                return;
            }
            if (defaultComment.nick == '') {
                defaultComment['nick'] = '访客';
            }
            // render markdown
            defaultComment.comment = xss(md(defaultComment.comment.replace(/!\(:(.*?\.\w+):\)/g, 
                                            `<img src="${option.emoticon_url}/$1" alt="$1" class="vemoticon-img">`)),
                                            {
                                                onIgnoreTagAttr: function (tag, name, value, isWhiteAttr) {
                                                if (name === 'class') {
                                                    return name + '="' + xss.escapeAttrValue(value) + '"';
                                                }
                                                }
                                            });
            let idx = defaultComment.comment.indexOf(defaultComment.at);
            if (idx > -1 && defaultComment.at != '') {
                let at = `<a class="at" href='#${defaultComment.rid}'>${defaultComment.at}</a>`;
                defaultComment.comment = defaultComment.comment.replace(defaultComment.at, at);
            }
            // veirfy
            let mailRet = check.mail(defaultComment.mail);
            let linkRet = check.link(defaultComment.link);
            defaultComment['mail'] = mailRet.k ? mailRet.v : '';
            defaultComment['link'] = linkRet.k ? linkRet.v : '';
            if (!mailRet.k && !linkRet.k) {
                _root.alert.show({
                    type: 0,
                    text: '您的网址和邮箱格式不正确，请修正后提交！',
                    ctxt: '返回修改'
                })
            } else if (!mailRet.k) {
                _root.alert.show({
                    type: 0,
                    text: '请认真评论并填写正确的邮箱地址！<br>已开启<a href="https://deserts.io/diy-a-comment-system/" target="_blank">隐私防护</a>不会泄露您的个人信息，<a href="https://akismet.com/privacy/" target="_blank">了解反垃圾系统如何处理您的数据。</a>',
                    ctxt: '返回修改'
                })
            } else if (!linkRet.k) {
                _root.alert.show({
                    type: 0,
                    text: '您的网址格式不正确，请修正后提交！',
                    ctxt: '返回修改'
                })
            } else {
                commitEvt();
            }
        }

        let smile_btn = _root.el.querySelector('.vemoji-btn');
        let smile_icons = _root.el.querySelector('.vsmile-icons');
        Event.on('click', smile_btn, (e)=>{
            if (preview_text.getAttribute('triggered')) {
                preview_text.setAttribute('style', 'display:none;');
                preview_text.removeAttribute('triggered');
            }
            if (smile_icons.getAttribute('triggered')) {
                smile_icons.setAttribute('style', 'display:none;');
                smile_icons.removeAttribute('triggered');
            }
            else {
                smile_icons.removeAttribute('style');
                smile_icons.setAttribute('triggered', 1);
            }
        });

        let preview_btn = _root.el.querySelector('.vpreview-btn');
        let preview_text = _root.el.querySelector('.vpreview-text');
        Event.on('click', preview_btn, (e)=>{
            if (smile_icons.getAttribute('triggered')) {
                smile_icons.setAttribute('style', 'display:none;');
                smile_icons.removeAttribute('triggered');
            }
            if (preview_text.getAttribute('triggered')) {
                preview_text.setAttribute('style', 'display:none;');
                preview_text.removeAttribute('triggered');
            }
            else {
                if (defaultComment.comment == '') {
                    inputs['comment'].focus();
                    return;
                }
                // render markdown
                preview_text.innerHTML = xss(md(defaultComment.comment.replace(/!\(:(.*?\.\w+):\)/g, 
                                                `<img src="${option.emoticon_url}/$1" alt="$1" class="vemoticon-img">`)),
                                                {
                                                    onIgnoreTagAttr: function (tag, name, value, isWhiteAttr) {
                                                      if (name === 'class') {
                                                        return name + '="' + xss.escapeAttrValue(value) + '"';
                                                      }
                                                    }
                                                  });
                preview_text.removeAttribute('style');
                preview_text.setAttribute('triggered', 1);
            }
        });

        // setting access
        let getAcl = () => {
            let acl = new _root.v.ACL();
            acl.setPublicReadAccess(true);
            acl.setPublicWriteAccess(false);
            return acl;
        }

        let commitEvt = () => {
            submitBtn.setAttribute('disabled', true);
            _root.submitting.show();
            // 声明类型
            let Ct = _root.v.Object.extend('Comment');
            // 新建对象
            let comment = new Ct();
            for (let i in defaultComment) {
                if (defaultComment.hasOwnProperty(i)) {
                    if (i === 'at')
                        continue;
                    let _v = defaultComment[i];
                    comment.set(i, _v);
                }
            }
            comment.set('emailHash', crypto(defaultComment.mail.toLowerCase().trim()));
            comment.setACL(getAcl());
            comment.save().then((commentItem) => {
                store && store.setItem('ValineCache', JSON.stringify({
                    nick: defaultComment['nick'],
                    link: defaultComment['link'],
                    mail: defaultComment['mail']
                }));
                let _count = _root.el.querySelector('.count');
                _count.innerText = Number(_count.innerText) + 1;
                insertComment(commentItem, true);
                submitBtn.removeAttribute('disabled');
                _root.submitting.hide();
                _root.nodata.hide();
                _root.reset();
            }).catch(ex => {
                _root.submitting.hide();
            })
        }

        // at event
        let bindAtEvt = (el) => {
            Event.on('click', el, (e) => {
                let at = el.getAttribute('at');
                let rid = el.getAttribute('rid');
                defaultComment['rid'] = rid;
                defaultComment['at'] = at;
                inputs['comment'].value = `${at} ，` + inputs['comment'].value;
                inputs['comment'].focus();
                // remove comment trigger
                _root.el.querySelector('.comment_trigger').setAttribute('style', 'display:none');
                _root.el.querySelector('.auth-section').removeAttribute('style');
                _root.el.querySelector('.veditor').focus();
            })
        }

        Event.off('click', submitBtn, submitEvt);
        Event.on('click', submitBtn, submitEvt);
    }
}

const Event = {
    on(type, el, handler, capture) {
        if (el.addEventListener) el.addEventListener(type, handler, capture || false);
        else if (el.attachEvent) el.attachEvent(`on${type}`, handler);
        else el[`on${type}`] = handler;
    },
    off(type, el, handler, capture) {
        if (el.removeEventListener) el.removeEventListener(type, handler, capture || false);
        else if (el.detachEvent) el.detachEvent(`on${type}`, handler);
        else el[`on${type}`] = null;
    }
}

const check = {
    mail(m) {
        return {
            k: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(m),
            v: m
        };
    },
    link(l) {
        if (l.length > 0) {
            l = /^(http|https)/.test(l) ? l : `http://${l}`;
        }
        return {
            k: l.length > 0 ? /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/.test(l) : true,
            v: l
        };
    }
}

const HtmlUtil = {

    // /**
    //  *
    //  * 将str中的链接转换成a标签形式
    //  * @param {String} str
    //  * @returns
    //  */
    // transUrl(str) {
    //     let reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
    //     return str.replace(reg, '<a target="_blank" href="$1$2">$1$2</a>');
    // },
    /**
     * HTML转码
     * @param {String} str
     * @return {String} result
     */
    encode(str) {
        return !!str ? str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/ /g, "&nbsp;").replace(/\'/g, "&#39;").replace(/\"/g, "&quot;") : '';
    },
    /**
     * HTML解码
     * @param {String} str
     * @return {String} result
     */
    decode(str) {
        return !!str ? str.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/&#39;/g, "\'").replace(/&quot;/g, "\"") : '';
    }
};

const dateFormat = (date) => {
    var vDay = padWithZeros(date.getDate(), 2);
    var vMonth = padWithZeros(date.getMonth() + 1, 2);
    var vYear = padWithZeros(date.getFullYear(), 2);
    // var vHour = padWithZeros(date.getHours(), 2);
    // var vMinute = padWithZeros(date.getMinutes(), 2);
    // var vSecond = padWithZeros(date.getSeconds(), 2);
    return `${vYear}-${vMonth}-${vDay}`;
    // return `${vYear}-${vMonth}-${vDay} ${vHour}:${vMinute}:${vSecond}`;
}

const timeAgo = (date) => {
    try {
        var oldTime = date.getTime();
        var currTime = new Date().getTime();
        var diffValue = currTime - oldTime;

        var days = Math.floor(diffValue / (24 * 3600 * 1000));
        if (days === 0) {
            //计算相差小时数
            var leave1 = diffValue % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
            var hours = Math.floor(leave1 / (3600 * 1000));
            if (hours === 0) {
                //计算相差分钟数
                var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
                var minutes = Math.floor(leave2 / (60 * 1000));
                if (minutes === 0) {
                    //计算相差秒数
                    var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
                    var seconds = Math.round(leave3 / 1000);
                    return seconds + ' 秒前';
                }
                return minutes + ' 分钟前';
            }
            return hours + ' 小时前';
        }
        if (days < 0) return '刚刚';
        else if (days < 30) return days + ' 天前';
        else if (days < 365) return Math.floor(days / 30) + ' 月前';
        else return Math.floor(days / 365) + ' 年前';
        return dateFormat(date);
    } catch (error) {
        console.log(error)
    }
}

const padWithZeros = (vNumber, width) => {
    var numAsString = vNumber.toString();
    while (numAsString.length < width) {
        numAsString = '0' + numAsString;
    }
    return numAsString;
}

const loadJS = function (url, success) {
    var domScript = document.createElement('script');
    domScript.src = url;
    success = success || function () {
    };
    domScript.onload = domScript.onreadystatechange = function () {
        if (!this.readyState || 'loaded' === this.readyState || 'complete' === this.readyState) {
            success();
            this.onload = this.onreadystatechange = null;
            // this.parentNode.removeChild(this);
        }
    };
    document.getElementsByTagName('head')[0].appendChild(domScript);
};

const getIp = function(){
    $.getJSON("https://api.ipify.org/?format=json",
        function(json) {
            defaultComment['ip'] = json.ip;
        }
    );
};

module.exports = Valine;
