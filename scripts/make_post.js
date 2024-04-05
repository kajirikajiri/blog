const fs = require('fs');
const path = require('path');

const today = new Date();
const formattedDate = today.getFullYear() + "-" 
    + String(today.getMonth() + 1).padStart(2, '0') + "-" 
    + String(today.getDate()).padStart(2, '0') + " " 
    + String(today.getHours()).padStart(2, '0') + ":" 
    + String(today.getMinutes()).padStart(2, '0') + ":" 
    + String(today.getSeconds()).padStart(2, '0');

const content = `\
---
title: "title"
excerpt: "みなさんこんにちは、かじりです。概要"
created_at: "${formattedDate}"
updated_at: "${formattedDate}"
tags: [a, b]
---

みなさんこんにちは、かじりです。本文`;

fs.writeFile(path.join('_posts', '0.md'), content, (err) => {
  if (err) throw err;
  console.log('File created successfully.');
});

