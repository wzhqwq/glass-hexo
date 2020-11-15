window.addEventListener('load', () => {
  // Visual effect reduction on experimental funcitons
  var OS = navigator.userAgent.match(/Windows NT|Sun OS|Mac OS X|Linux|FreeBSD|iPhone|Android/);
  var brsr = navigator.userAgent.match(/Firefox|Opera|Edge|Chrome|Safari/);
  var crVer = parseInt((navigator.userAgent.match(/(?<=Chrome\/)[0-9]*/) || ["89"])[0]);
  if (!(
    // Firefox dosen't support 'backdrop-filter'
    (brsr[0] == 'Firefox') ||
    // Browsers for Windows except Edge display 'backdrop-filter:blur()' incorrectly.
    (OS[0] == 'Windows NT' && brsr[brsr.length - 1] != 'Edg') ||
    // Chrome 76 & 77 for Android display 'backdrop-filter:blur()' incorrectly.
    (crVer < 83)
  ))
    document.body.className = 'blur-enabled';
  
  // archive support
  if (typeof archive_info == 'object') {
    let base_url = location.href.match(/[/S]*archives\//);
    $.getJSON('/data/dates.json', data => {
      var inner_nav = document.getElementById('inner-nav');
      var inner = ''; 
      if (archive_info.year) {
        let choose_year = document.getElementById('year-select');
        let years = '';
        for (let y in data.ava) {
          let year = parseInt(y);
          years += `<option value="${year + data.start}"${year + data.start == archive_info.year ? ' selected' : ''}>${year + data.start}年</option>`;
        }
        choose_year.innerHTML = years;
        choose_year.onchange = () => {
          location.href = base_url + `${choose_year.value}/`;
        }
        let base = data.ava[archive_info.year - data.start];
        if (archive_info.month) {
          let choose_month = document.getElementById('month-select');
          let months = '';
          for (let m in base) {
            let month = parseInt(m);
            if (month < 10) m = '0' + m;
            months += `<option value="${m}"${month == archive_info.month ? ' selected' : ''}>${month}月</option>`;
          }
          choose_month.innerHTML = months;
          choose_month.onchange = () => {
            location.href = base_url + `${archive_info.year}/${choose_month.value}/`;
          }
        }
        else {
          for (let m in base) {
            let month = parseInt(m);
            if (month < 10) m = '0' + m;
            inner += `<a href="${base_url}${archive_info.year}/${m}/">${month}月</a>`;
          }
          inner_nav.innerHTML = inner;
        }
      }
      else {
        inner = `<a href="${base_url}" class="link-active">全部</a>`;
        for (let y in data.ava) {
          let year = parseInt(y);
          inner += `<a href="${base_url}${year + data.start}/">${year + data.start}年</a>`;
        }
        inner_nav.innerHTML = inner;
      }
    });
  }
  // posts support
  var post_image_not_loaded = true;
  if (document.body.clientWidth > 500) {
    post_image_not_loaded = false;
    Array.prototype.forEach.call(document.getElementsByClassName('post-image'), el => {
      el.style.backgroundImage = `url('${el.getAttribute('background')}')`;
    });
  }
  // navigation collapse support
  (() => {
    var open = false;
    var coll = document.getElementById('nav-collapse'),
      links = document.getElementById('navbar-links');
    var height = links.children.length * 37;
    $(coll).click(e => {
      e.stopPropagation();
      links.style.height = open ? '' : `${height}px`;
      coll.className = open ? '' : 'active';
      open = !open;
    });
    const close = () => {
      if (open) {
        open = false;
        links.style.height = '';
        coll.className = '';
      }
    }; // 关掉，关掉，一定要关掉！
    $(document.body).click(e => {
      if (e.target.id == 'year-select' || e.target.id == 'month-select') return;
      close();
    });
    window.addEventListener('resize', () => {
      if (document.body.clientWidth > 500) {
        close();
        if (post_image_not_loaded) {
          post_image_not_loaded = false;
          Array.prototype.forEach.call(document.getElementsByClassName('post-image'), el => {
            el.style.backgroundImage = `url('${el.getAttribute('background')}')`;
          });
        }
      }
    });
  })();

  // code highlighter support
  if (hljs) {
    $('.code-block').each((i, el) => {
      var codeEl = el.getElementsByTagName('code')[0];
      var lineCount = (codeEl.innerHTML.match(/\n/g) || []).length + 1;
      var lineNums = '';
      for (let i = 1; i <= lineCount; i++)
        lineNums += `${i}<br />`;
      el.children[0].innerHTML = lineNums;
      hljs.highlightBlock(codeEl);
    });
  }
});