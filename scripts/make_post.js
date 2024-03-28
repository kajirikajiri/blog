const fs = require('fs');
const path = require('path');

const content = `\
---
title: "title"
excerpt: "みなさんこんにちは、かじりです。概要"
created_at: "2024-03-28 21:07:53"
updated_at: "2024-03-28 21:07:53"
tags: [a, b]
---

みなさんこんにちは、かじりです。本文`;

fs.writeFile(path.join('_posts', '0.md'), content, (err) => {
  if (err) throw err;
  console.log('File created successfully.');
});

