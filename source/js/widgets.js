window.addEventListener('load', () => {
  $('#load-live2d-btn').click(async function (e) {
    e.stopPropagation();
    $('#load-live2d-btn').blur();
    $('#live2d-loading')[0].className = 'show';
    $('#live2d-msg1').text('正在加载Live2D');
    $('#live2d-msg2').text('下载支持程序(268KB)');
    // await $.getScript('/js/live2d.js').promise;
    var scriptLoader = document.createElement('script');
    scriptLoader.src = '/js/live2d.js';
    document.head.appendChild(scriptLoader);
    var coreLoader = document.createElement('script');
    coreLoader.src = '/js/live2d.core.js';
    document.head.appendChild(coreLoader);
    const next = () => {
      if (typeof loadLive2d == 'undefined') {
        setTimeout(next, 500);
        return;
      }
      loadLive2d(
        $('#live2d').css('display', 'block')[0],
        live2d_path,
        msg => $('#live2d-msg2').text(msg)
      ).then(() => {
        $('#live2d-not-loaded').css('display', 'none');
        $('#live2d-loading')[0].className = '';
        init();
      });
    };
    const init = () => {
    }
    setTimeout(next, 500);
  });
});