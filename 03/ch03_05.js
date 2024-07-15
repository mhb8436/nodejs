const fs = require('fs')

let result = []

for(i=1;i<11;i++){
    result.push({'title': 'This is Title ' +i, 
        'content':'This is Content ' + i});
}

const data = {
    'result': result
};

fs.writeFileSync('test.json', 
    JSON.stringify(data, null, 2), 'utf-8');



