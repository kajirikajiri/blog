//https://stackoverflow.com/questions/70201172/this-getattribute-not-working-in-web-component-while-violating-the-spec

customElements.define('blog-name', class extends HTMLElement {
  constructor() {
    super();
    const template = document.getElementById(
      "blog-name-template",
    ).content;
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.cloneNode(true));
  }
});

customElements.define('blog-author', class extends HTMLElement {
  constructor() {
    super();
    const template = document.getElementById(
      "blog-author-template",
    ).content;
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.cloneNode(true));
  }
});

customElements.define('post-link', class extends HTMLElement {
  constructor() {
    super();
    const template = document.getElementById(
      "post-link-template",
    ).content;
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.cloneNode(true));
  }
});

customElements.define('post-link-content', class extends HTMLElement {
  constructor() {
    super();
    const template = document.getElementById(
      "post-link-content-template",
    ).content;
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.cloneNode(true));
  }
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

customElements.define('hint-box', class extends HTMLElement {
  constructor() {
    super();
    const template = document.getElementById(
      "hint-box-template",
    ).content;
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.cloneNode(true));
  }
});

