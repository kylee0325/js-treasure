export default {
  title: 'js-code',
  base: '/js-code/',
  lang: 'ZH-CN',
  description: 'Collection of JavaScript functions',
  header: [],
  themeConfig: {
    repo: 'kylee0325/js-code',
    docsRepo: 'kylee0325/js-code',
    docsBranch: 'master',
    docsDir: 'docs',
    editLinks: true,
    nav: [
      {
        text: 'ChangeLog',
        link: 'https://github.com/kylee0325/js-code/blob/master/CHANGELOG.md'
      }
    ],
    sidebar: {
      '/': [
        { text: '概述', link: '/' },
        {
          text: 'Tree结构相关',
          children: [{ text: 'arrayToTree', link: '/tree/array-to-tree' }]
        }
      ]
    }
  }
}
