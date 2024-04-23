const path = require('path');
const fs = require('fs-extra');
const fm = require('front-matter');
const { markedHighlight } = require("marked-highlight");
const hljs = require('highlight.js');
const { Marked } = require('marked');
const markedFootnote = require('marked-footnote')

// myPreを作りたかったので、markedのpreを拡張した
// https://github.com/markedjs/marked/blob/f0fb744f5ee3d8b683c9ce87abde4f8fdcfb9bda/src/Renderer.ts#L17-L33
const escapeTest = /[&<>"']/;
const escapeReplace = new RegExp(escapeTest.source, 'g');
const escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
const escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, 'g');
const escapeReplacements = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};
const getEscapeReplacement = (ch) => escapeReplacements[ch];
export function escape(html, encode) {
  if (encode) {
    if (escapeTest.test(html)) {
      return html.replace(escapeReplace, getEscapeReplacement);
    }
  } else {
    if (escapeTestNoEncode.test(html)) {
      return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
    }
  }

  return html;
}
const myPreRenderer = { renderer: {code : (code, infostring, escaped) => {
  const lang = (infostring || '').match(/^\S*/)?.[0];

  code = code.replace(/\n$/, '') + '\n';

  if (!lang) {
    return '<my-pre><pre><code>'
      + (escaped ? code : escape(code, true))
      + '</code></pre></my-pre>\n';
  }

  return '<my-pre><pre><code class="language-'
    + escape(lang)
    + '">'
    + (escaped ? code : escape(code, true))
    + '</code></pre></my-pre>\n';
}}};

const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
).use(markedFootnote({description: '脚注'}))
  .use(myPreRenderer)
const [html1, html2, html3, html4] = fs.readFileSync('public/template.html', 'utf8').split('<!---->\n')
const links = []
const directoryPath = '_posts';
const convertDate = (str) => new Date(str).toISOString().split('T')[0].replace(/-/g, '/');
const webComponentTemplate = fs.readFileSync('public/web_component_templates.html', 'utf8');

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
    fs.writeFileSync(`dist/${fname}.html`, html1+metaDescription+html2+webComponentTemplate+html3+html+html4);
  });
  fs.copy('public', 'dist', {
    recursive: true,
    overwrite: true,
    filter: (src) => !path.basename(src).match(/^(template|web_component_templates)\.html$/),
  })

  // 更新日で降順に並び替え
  links.sort((a,b)=>a[0]<b[0]?1:-1);
  const metaDescription = `<meta name="description" content="みなさんこんにちは、かじりです。このブログは中村 一貴(かじり）が作成しています！">`

  // rootページを作成
  fs.writeFileSync('dist/index.html', html1+metaDescription+html2+webComponentTemplate+html3+links.map(l=>l[1]).join('')+html4);
})();

