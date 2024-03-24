//https://stackoverflow.com/questions/70201172/this-getattribute-not-working-in-web-component-while-violating-the-spec

['blog-name', 'blog-author', 'post-link', 'post-link-content', 'hint-box'].forEach(tag => {
  customElements.define(tag, class extends HTMLElement {
    constructor() {
      super();
      const template = document.getElementById(tag+"-template").content;
      const shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(template.cloneNode(true));
    }
  });
});

customElements.define('my-link', class extends HTMLElement {
  connectedCallback() {
    // https://stackoverflow.com/a/53813523
    setTimeout(() => {
      const text = this.innerHTML
      this.innerHTML = ""

      const a = document.createElement('a')
      const div = document.createElement('div')
      this.appendChild(a)
      a.appendChild(div)

      a.href = this.getAttribute('href')

      div.innerHTML = text
      div.style.margin = "8px 0px"
      div.style.padding = "8px 0px"
    })
  }
});

