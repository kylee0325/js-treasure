export default {
  title: 'js-treasure',
  base: '/js-treasure/',
  lang: 'ZH-CN',
  description: 'Collection of JavaScript functions',
  header: [],
  themeConfig: {
    repo: 'kylee0325/js-treasure',
    docsRepo: 'kylee0325/js-treasure',
    docsBranch: 'master',
    docsDir: 'docs',
    editLinks: true,
    nav: [
      {
        text: 'ChangeLog',
        link: 'https://github.com/kylee0325/js-treasure/blob/master/CHANGELOG.md'
      }
    ],
    sidebar: {
      '/': [
        { text: '概述', link: '/' },
        {
          text: 'Tree结构相关',
          children: [
            { text: 'arrayToTree', link: '/tree/array-to-tree' },
            { text: 'traverseTree', link: '/tree/traverse-tree' }
          ]
        }
      ]
    }
  }
}
