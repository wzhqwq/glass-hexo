const fs = require("hexo-fs");

hexo.on("generateAfter", function () {
  var posts = hexo.locals.get("posts");
  var out = {};
  var y_start = 0;
  posts.forEach(post => {
    var y = post.date.year(), m = post.date.month() + 1;
    if (!y_start) y_start = y;
    y -= y_start;
    if (!out[y]) out[y] = {};
    out[y][m] = true;
  });
  hexo.route.set('data/dates.json', JSON.stringify({start: y_start, ava: out}));
});