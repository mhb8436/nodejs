const fs = require('fs')

const content = 'this is content'

fs.writeFile('content.txt', content, err => {});

// fs.writeFileSync('content.txt', content);