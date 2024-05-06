const fs = require('fs');

const filename = process.argv[2].replace(/ /g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()
const newFilename = `_posts/${filename}`

fs.access(newFilename, fs.constants.F_OK, (err) => {
  if (err) {
    // ファイルが存在しない場合、名前の変更を実行
    fs.rename('_posts/0.md', newFilename, (err) => {
      if (err) throw err;
      console.log('ファイル名が正常に変更されました。');
    });
  } else {
    console.log('エラー: そのファイル名はすでに存在します。');
  }
});

