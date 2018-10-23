require('./Valine.scss');
import marked from 'marked';

var crypto = require('blueimp-md5');

var GRAVATAR_BASE_URL = 'https://gravatar.loli.net/avatar/';
var EMPTY_EMAIL_HASH = 'd41d8cd98f00b204e9800998ecf8427e';
var DEFAULT_EMAIL_HASH = '9e63c80900d106cbbec5a9f4ea433a3e';


const defaultComment = {
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
        _root.version = '1.1.7';
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
        let av = option.av || _root.v;
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
                                    <div>
                                        <textarea placeholder="" class="veditor"></textarea>
                                        <div class="comment-smiles">
                                            <div class="vsmile-btn-wrap"><svg class="vsmile-btn" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2372" xmlns:xlink="http://www.w3.org/1999/xlink" width="1.6em" height="1.6em"><defs><style type="text/css"></style></defs><path d="M16 512c0 274 222 496 496 496s496-222 496-496S786 16 512 16 16 238 16 512z m400-96c0 35.4-28.6 64-64 64s-64-28.6-64-64 28.6-64 64-64 64 28.6 64 64z m317 33c-29.6-26.4-92.4-26.4-122 0L592 466c-16.6 14.8-43.2 0.8-39.6-21.6 8-50.4 68.4-84.2 119.8-84.2S784 394 792 444.4c3.4 22.2-22.8 36.6-39.6 21.6l-19.4-17zM331.6 651.6C376.4 705.4 442 736 512 736s135.6-30.8 180.4-84.4c27.2-32.4 76.2 8.4 49.2 41C684.6 760.8 601 800 512 800s-172.6-39.2-229.6-107.6c-27-32.6 22.4-73.4 49.2-40.8z" fill="" p-id="2373"></path></svg></div>
                                            <div class="vsmile-icons" style="display:none"></div>
                                        </div>
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
            let smile_names = option.emoticon_list || ["mrgreen", "neutral", "twisted", "arrow", "eek", "smile", "confused", "cool", "evil", "biggrin", "idea", "redface", "razz", "rolleyes", "wink", "cry", "surprised", "lol", "mad", "sad", "exclaim", "question"];
            for(let i in smile_names) {
                let img = document.createElement('img');
                img.setAttribute('src', `${option.emoticon_url}/${smile_names[i]}`);
                _smile_wrapper.appendChild(img) ;
            }
            av.init({
                appId: option.app_id || option.appId,
                appKey: option.app_key || option.appKey
            });
            _root.v = av;

        } catch (ex) {
            let issue = 'https://github.com/panjunwen/Valine/issues';
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
        let smile_btn = _root.el.querySelector('.vsmile-btn');
        let smile_icons = _root.el.querySelector('.vsmile-icons');
        Event.on('click', smile_btn, (e)=>{
            if (smile_icons.getAttribute('triggered')) {
                smile_icons.setAttribute('style', 'display:none;');
                smile_icons.removeAttribute('triggered');
            }
            else {
                smile_icons.removeAttribute('style');
                smile_icons.setAttribute('triggered', 1);
            }
        });

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
            let emailHash = ret.get('emailHash') == EMPTY_EMAIL_HASH ? DEFAULT_EMAIL_HASH : ret.get('emailHash')
            let gravatar_url = GRAVATAR_BASE_URL + emailHash + '?size=80';
            // language=HTML
            _vcard.innerHTML = `<img class="vavatar" src="${gravatar_url}"/>
                                        <section class="text-wrapper">
                                            <div class="vhead" >
                                                <a href="${ret.get('link') || 'javascript:void(0);'}" target="_blank" rel="nofollow" > ${ret.get("nick")}</a>
                                                <span class="spacer">•</span>
                                                <span class="vtime">${timeAgo(ret.get("createdAt"))}</span>
                                            </div>
                                            <div class="vcomment">${ret.get('comment')}</div>
                                            
                                        </section>
                                        <div class="vfooter">
                                        <a rid='${ret.id}' at='@${ret.get('nick')}' class="vat">回复</a>`;
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
                    defaultComment[_v] = HtmlUtil.encode(_el.value.replace(/(^\s*)|(\s*$)/g, ""));
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
                    el.setAttribute('src', GRAVATAR_BASE_URL + crypto(s['mail'].toLowerCase().trim()) + '?size=80');
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
            defaultComment['nick'] = '小可爱';
            getCache();
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
                defaultComment['nick'] = '小调皮';
            }
            // replace smiles
            defaultComment.comment = defaultComment.comment.replace(/!\(:(.*?\.\w+):\)/g, `![](${option.emoticon_url}/$1)`);
            defaultComment.comment = marked(defaultComment.comment);
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
                    type: 1,
                    text: '您的网址和邮箱格式不正确, 将导致无法正确显示头像和接收回复通知邮件。是否继续提交?',
                    cb() {
                        commitEvt()
                    }
                })
            } else if (!mailRet.k) {
                _root.alert.show({
                    type: 1,
                    text: '您的邮箱格式不正确, 将导致无法正确显示头像和接收回复通知邮件。是否继续提交?',
                    cb() {
                        commitEvt();
                    }
                })
            } else if (!linkRet.k) {
                _root.alert.show({
                    type: 1,
                    text: '您的网址格式不正确, 是否继续提交?',
                    cb() {
                        commitEvt();
                    }
                })
            } else {
                commitEvt();
            }
        }

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
