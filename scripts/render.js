hexo.extend.filter.register('after_post_render', function (data) {
  data.content = data.content
    .replace(/(<pre>[\S\s]*?<\/pre>)/g, '<div class="code-block-wrap"><div class="code-top"></div><div class="code-block"><div class="gults"></div><div class="codes">$1</div></div></div>')
    .replace(/<h([1-9]{1}) id="([^"]*)">(.*)<\/h\1>/g, '<div class="hx-move"><div class="hx-anchor" id="$2"></div><h$1>$3</h$1></div>');
  return data;
});