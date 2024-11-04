const path = require('path');
const fs = require('fs');

const newFilePath = path.join(__dirname, 'a3', 'b3','c4', 'c5');
console.log(newFilePath, path.parse(newFilePath).dir,path.parse(newFilePath).base);

fs.mkdirSync('/a2/file.txt', "content");
// fpath = "a2/b2/c2/3.txt", "a3/b3/c4/4.txt", "a3/b2/c4/c5"
// const makeFile = (fpath, content) => {
//     const patharr = fpath.split('/');
//     const filename = patharr.pop();
//     const dirname = patharr.join('/');
//     fs.mkdirSync(dirname, {recursive: true})
//     fs.writeFileSync(fpath, content);
// }

const makeFile2 = (fpath, content) => {
    const filename = path.parse(fpath).base
    if(filename.includes(".")) {
        const dirname = path.parse(fpath).dir // extract dirname from fpath
        fs.mkdirSync(dirname, {recursive:true})
        fs.writeFileSync(fpath, content);
    }    
}

// makeFile2(newFilePath, "test2")
