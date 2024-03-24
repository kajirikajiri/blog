const path = require('path');
const fs = require('fs-extra');
const fm = require('front-matter');
const { markedHighlight } = require("marked-highlight");
const hljs = require('highlight.js');
const { Marked } = require('marked');
const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
);
const [html1, html2, html3] = fs.readFileSync('public/template.html', 'utf8').split('<!---->\n')
const links = []
const directoryPath = '_posts';
const convertDate = (str) => new Date(str).toISOString().split('T')[0].replace(/-/g, '/');

;(async () => {
  fs.rmSync('dist', { recursive: true, force: true });
  fs.mkdirSync('dist');
  fs.readdirSync(directoryPath).forEach(file => {
    if (path.extname(file) !== '.md') return
    // file名から拡張子を除いた部分を取得してmdとして読み込む
    const fname = file.replace(/^.*\/|\..*$/g, '');

    // front-matterを取得
    const { attributes, body } = fm(fs.readFileSync(`_posts/${fname}.md`, 'utf8'))

    // rootページに追加する各postへのリンクを作成
    const postLink = `<post-link>
      <a slot="link" href="${fname}.html">
        <post-link-content>
          <span slot="title">${attributes.title}</span>
          <span slot="excerpt">${attributes.excerpt}</span>
          <span slot="date">${convertDate(attributes.updated_at)}</span>
        </post-link-content>
      </a>
    </post-link>`

    // rootページに追加するためにリンクを配列に追加
    links.push([attributes.updated_at, postLink]);

    // titleをh1タグにする。更新日と作成日を作成する。これらをmarkdownの先頭に追加
    const html = marked.parse(`# ${attributes.title}
<div style='text-align:end; color:#9E9E9E;font-size:12px;margin-bottom:16px;'>
  更新: ${convertDate(attributes.updated_at)}, 作成: ${convertDate(attributes.created_at)}
</div>

${body}`);

    // metaタグのdescriptionを追加
    const metaDescription = `<meta name="description" content="${attributes.excerpt}">`

    // distディレクトリにhtmlファイルを作成
    fs.writeFileSync(`dist/${fname}.html`, html1+metaDescription+html2+html+html3);
  });
  fs.copy('public', 'dist', {
    recursive: true,
    overwrite: true,
    filter: (src) => !path.basename(src).match(/^template\.html$/),
  })

  // 更新日で降順に並び替え
  links.sort((a,b)=>a[0]<b[0]?1:-1);
  const metaDescription = `<meta name="description" content="みなさんこんにちは、かじりです。このブログは中村 一貴(かじり）が作成しています！">`

  // rootページを作成
  fs.writeFileSync('dist/index.html', html1+metaDescription+html2+links.map(l=>l[1]).join('')+html3);
})();

