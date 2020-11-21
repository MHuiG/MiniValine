export function Vbarrager (root) {
  return (root, m, gravatarUrl) => {
    try {
      if (window.MV.barrager.enable) {
        if (typeof window.MV.barrager.bottom == 'undefined') {
          window.MV.barrager.bottom = $(window).height()
        }
        if (window.MV.barrager.bottom < 60) {
          window.MV.barrager.bottom = $(window).height() - 60
        } else {
          window.MV.barrager.bottom = window.MV.barrager.bottom - 60
        }
        const item = {
          img: gravatarUrl,
          info: m.get('comment').replace(/<[^>]+>/g, '').replace(/\n/g, '').replace(/\r\n/g, '').slice(0, 25).trim(),
          href: '#' + m.id,
          bottom: window.MV.barrager.bottom,
          close: true,
          speed: Math.random() * Math.random() * 60 + 20,
          color: '#ffffff',
          old_ie_color: '#ffffff'
        }
        $('body').barrager(item)
      }
    } catch (e) {}
  }
}
