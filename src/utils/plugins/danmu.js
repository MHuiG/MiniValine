export function danmu () {
  var checkjq = setInterval(function () {
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
        var time = new Date().getTime()
        var barragerId = 'barrage_' + time
        var id = '#' + barragerId
        var divBarrager = $("<div class='barrage' id='" + barragerId + "'></div>").appendTo($(this))
        var windowHeight = $(window).height() - 100
        var thisHeight = (windowHeight > this.height()) ? this.height() : windowHeight
        var windowWidth = $(window).width() + 500
        var thisWidth = (windowWidth > this.width()) ? this.width() : windowWidth
        var bottom = (barrage.bottom == 0) ? Math.floor(Math.random() * thisHeight + 40) : barrage.bottom
        divBarrager.css('bottom', bottom + 'px')
        var divBarragerBox = $("<div class='barrage_box cl'></div>").appendTo(divBarrager)
        if (barrage.img) {
          divBarragerBox.append("<a class='portrait z' href='javascript:;'></a>")
          var img = $("<img src='' >").appendTo(id + ' .barrage_box .portrait')
          img.attr('src', barrage.img)
        }
        divBarragerBox.append(" <div class='z p'></div>")
        if (barrage.close) {
          divBarragerBox.append(" <div class='close z'></div>")
        }
        var content = $("<a title='' href='' ></a>").appendTo(id + ' .barrage_box .p')
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
