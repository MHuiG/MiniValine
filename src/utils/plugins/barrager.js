export function barrager () {
  const checkjq = setInterval(function () {
    if (typeof jQuery == 'undefined') return
    clearInterval(checkjq);
    (function ($) {
      $.fn.barrager = function (barrage) {
        barrage = $.extend({
          close: true,
          bottom: 0,
          max: 10,
          speed: 20,
          color: '#fff',
          old_ie_color: '#000000'
        }, barrage || {})
        const time = new Date().getTime()
        const barragerId = 'barrage_' + time
        const id = '#' + barragerId
        const divBarrager = $("<div class='barrage' id='" + barragerId + "'></div>").appendTo($(this))
        const windowHeight = $(window).height() - 100
        const thisHeight = (windowHeight > this.height()) ? this.height() : windowHeight
        const windowWidth = $(window).width() + 500
        const thisWidth = (windowWidth > this.width()) ? this.width() : windowWidth
        const bottom = (barrage.bottom === 0) ? Math.floor(Math.random() * thisHeight + 40) : barrage.bottom
        divBarrager.css('bottom', bottom + 'px')
        const divBarragerBox = $("<div class='barrage_box cl'></div>").appendTo(divBarrager)
        if (barrage.img) {
          divBarragerBox.append("<a class='portrait z' href='javascript:;'></a>")
          const img = $("<img src='' >").appendTo(id + ' .barrage_box .portrait')
          img.attr('src', barrage.img)
        }
        divBarragerBox.append(" <div class='z p'></div>")
        if (barrage.close) {
          divBarragerBox.append(" <div class='close z'></div>")
        }
        const content = $("<a title='' href='' ></a>").appendTo(id + ' .barrage_box .p')
        content.attr({
          href: barrage.href,
          id: barrage.id
        }).empty().append(barrage.info)
        if (navigator.userAgent.indexOf('MSIE 6.0') > 0 || navigator.userAgent.indexOf('MSIE 7.0') > 0 || navigator.userAgent.indexOf('MSIE 8.0') > 0) {
          content.css('color', barrage.old_ie_color)
        } else {
          content.css('color', barrage.color)
        }
        divBarrager.css('margin-right', 0)
        $(id).animate({ right: thisWidth }, barrage.speed * 1000, function () {
          $(id).remove()
        })
        divBarragerBox.mouseover(function () {
          $(id).stop(true)
        })
        divBarragerBox.mouseout(function () {
          $(id).animate({ right: thisWidth }, barrage.speed * 1000, function () {
            $(id).remove()
          })
        })
        $(id + '.barrage .barrage_box .close').click(function () {
          $(id).remove()
        })
      }
      $.fn.barrager.removeAll = function () {
        $('.barrage').remove()
      }
    })(jQuery)
  }, 5)
}
