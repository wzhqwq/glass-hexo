hexo.extend.filter.register('after_post_render', function (data) {
  data.content = data.content.replace(/(<pre>[\S\s]*<\/pre>)/, '<div class="code-block-wrap"><div class="code-top"></div><div class="code-block"><div class="gults"></div><div class="codes">$1</div></div></div>');
  return data;
});