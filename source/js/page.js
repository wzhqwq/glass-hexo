window.addEventListener('load', () => {
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
  if (document.body.clientWidth > 400) {
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
    $(document.body).click(close);
    window.addEventListener('resize', () => {
      if (document.body.clientWidth > 400) {
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
});