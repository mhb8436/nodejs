// 1. CommonJS 모듈 시스템
const math = require("./modules/math");
const { add, subtract } = require("./modules/math");
const user = require("./modules/user");

console.log("=== CommonJS 모듈 시스템 ===");
console.log("math.add(5, 3):", math.add(5, 3));
console.log("math.subtract(10, 4):", math.subtract(10, 4));
console.log("구조 분해 할당으로 가져온 add(7, 2):", add(7, 2));
console.log("user 정보:", user);

// 2. ES 모듈 시스템
import { sum, multiply } from "./modules/math.mjs";
import { formatDate } from "./modules/date.mjs";

console.log("\n=== ES 모듈 시스템 ===");
console.log("sum(1, 2, 3, 4, 5):", sum(1, 2, 3, 4, 5));
console.log("multiply(2, 3, 4):", multiply(2, 3, 4));
console.log("formatDate(new Date()):", formatDate(new Date()));
