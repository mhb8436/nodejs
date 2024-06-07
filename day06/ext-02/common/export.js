// 1. 
// function add(x, y) {
//     return x+y;
// }

// function minus(x, y) {
//     return x-y;
// }

// module.exports = {add, minus};
// exports.add = add;
// exports.minus = minus;

// console.log(module);
// 2. 
module.exports = {
    add : function(x, y)  {
        return x+y;
    },
    minus: function(x, y) {
        return x-y;
    }
}