const fs = require('fs');

const result = fs.readFileSync('test.json', 'utf-8');

const data = JSON.parse(result);

data['result'].forEach(x=> {
    console.log(x['title'], x['content']);
});



