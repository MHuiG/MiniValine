import { GravatarBaseUrl, DefaultEmailHash } from '../const'
import format from 'string-format'
const ele = function (root) {
    const HTML = '<div id="vinputs-placeholder">' +
                      '<div class="vinputs-wrap">' +
                       `<p class="vcancel-comment-reply" href="#" rel="nofollow" style="display:none">${root.i18n.t('cancelReply')}</p>` +
                                '<div class="vinputs-area">' +
                                    '<div class="textarea-wrapper">' +
                                        '<div class="commentTrigger">' +
                                            `<div class="avatar"><img class="visitor_avatar lazyload" data-src="${`${GravatarBaseUrl + DefaultEmailHash}?size=80`}"></div>` +
                                            `<div class="trigger_title">${root.placeholder}</div>` +
                                        '</div>' +
                                        '<div class="veditor-area">' +
                                            '<textarea placeholder="" class="veditor"></textarea>' +
                                            '<div class="btn-wrap">' +
                                                `<div class="vpreview-btn vfunction-btn" title="${root.i18n.t('preview')}">` +
												'<svg t="1551146416896" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2051" xmlns:xlink="http://www.w3.org/1999/xlink" width="1.5em" height="1.5em"><defs><style type="text/css"></style></defs><path d="M862.516 161.07l44.62 44.38-286.303 288.866-45.668-45.615L862.516 161.07z m1.233 1.233" p-id="2052"></path><path d="M832.162 959.558H128.025V191.784h512.099v64.169H192.037V895.64h576.112V512.127h64.012v447.431z m0.833 0.533" p-id="2053"></path><path d="M256.05 703.994h384.075v63.919H256.05v-63.919z m0-127.769l320.062-0.069v63.919H256.05v-63.85z m0-128.317h192.037v63.891l-192.037 0.028v-63.919z m0 0" p-id="2054"></path></svg></div>' +
                                                `<div class="vemoji-btn vfunction-btn" title="${root.i18n.t('emoji')}">` +
												'<svg t="1551146424708" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2169" xmlns:xlink="http://www.w3.org/1999/xlink" width="1.5em" height="1.5em"><defs><style type="text/css"></style></defs><path d="M513.028 63.766c-247.628 0-448.369 200.319-448.369 447.426S265.4 958.617 513.028 958.617s448.369-200.319 448.369-447.426S760.655 63.766 513.028 63.766z m-0.203 823.563c-207.318 0-375.382-167.71-375.382-374.592s168.064-374.592 375.382-374.592 375.382 167.71 375.382 374.592-168.064 374.592-375.382 374.592z" p-id="2170"></path><path d="M514.029 767.816c-99.337 0-188.031-54.286-251.889-146.146-10.647-16.703-7.1-33.399 7.094-45.93 14.192-12.529 28.384-8.349 39.025 8.349 49.67 75.164 124.174 116.92 205.77 116.92s163.199-45.93 209.316-125.268c10.647-16.703 24.833-16.703 39.025-8.349 14.194 12.524 14.194 29.227 7.094 45.93-60.312 96.035-152.553 154.494-255.435 154.494zM464.292 402.959l-45.151-45.151-0.05 0.05-90.45-90.45-45.15 45.15 90.45 90.45-90.45 90.451 45.15 45.15 90.45-90.45 0.05 0.05 45.151-45.151-0.05-0.05zM556.611 402.959l45.151-45.151 0.05 0.05 90.45-90.45 45.15 45.15-90.45 90.45 90.45 90.451-45.15 45.15-90.45-90.45-0.05 0.05-45.151-45.151 0.05-0.05z" p-id="2171"></path></svg></div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="vextra-area">' +
                                            '<div class="vsmile-icons" style="display:none"></div>' +
                                            '<div class="vpreview-text" style="display:none"></div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<section class="auth-section" style="display:none;">' +
                                        `<div class="input-wrapper"><input type="text" name="author" class="vnick" placeholder="${root.i18n.t('nick')}" value=""></div>` +
                                        `<div class="input-wrapper"><input type="email" name="email" class="vmail" placeholder="${root.i18n.t('mail')}" value=""></div>` +
                                        `<div class="input-wrapper"><input type="text" name="website" class="vlink" placeholder="${root.i18n.t('link')}" value=""></div>` +
                                        `<div class="post-action"><button type="button" class="vsubmit">${root.i18n.t('reply')}</button></div>` +
                                    '</section>' +
                                    '<div style="display:none;" class="vmark"></div>' +
                                '</div>' +
                                '<div class="vsubmitting" style="display:none;"></div>' +
                            '</div>' +
                           '</div>' +
                           '<div class="info">' +
                                `<div class="col"> ${format(root.i18n.t('commentCount'), '<span class="count">0</span>')}</div>` +
                           '</div>' +
                           '<ul class="vlist"><li class="vempty"></li></ul>' +
                           '<div class="vloading"></div>' +
                           '<div class="vpage txt-center"></div>'
	return HTML
}
module.exports = ele