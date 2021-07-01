hexo.extend.generator.register('tags', (locals) => {
  return [
    {
      path: 'tags/index.html',
      data: {
        path: locals.path,
        tags: locals.tags
      },
      layout: ['tag']
    }
  ].concat(
    locals.tags.map(tag => {
      return {
        path: `tags/${tag.name}/index.html`,
        data: {
          path: locals.path,
          tag: tag
        },
        layout: ['tag-page']
      };
    })
  );
});