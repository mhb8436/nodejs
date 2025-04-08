// moment.js와 dayjs 예제
const moment = require("moment");
const dayjs = require("dayjs");
require("dayjs/locale/ko"); // 한국어 로케일 추가
dayjs.locale("ko");

console.log("\n=== moment.js 예제 ===");

// 1. 현재 시간
const nowMoment = moment();
console.log("현재 시간 (moment):", nowMoment.format("YYYY-MM-DD HH:mm:ss"));

// 2. 날짜 포맷팅
const dateMoment = moment("2024-03-20");
console.log("날짜 포맷팅 (moment):", dateMoment.format("YYYY년 MM월 DD일"));

// 3. 시간 더하기/빼기
const nextWeekMoment = moment().add(7, "days");
console.log("일주일 후 (moment):", nextWeekMoment.format("YYYY-MM-DD"));

// 4. 시간 차이 계산
const startMoment = moment("2024-01-01");
const endMoment = moment("2024-12-31");
const diffDays = endMoment.diff(startMoment, "days");
console.log("날짜 차이 (moment):", diffDays, "일");

// 5. 요일 확인
console.log("오늘 요일 (moment):", moment().format("dddd"));

console.log("\n=== dayjs 예제 ===");

// 1. 현재 시간
const nowDayjs = dayjs();
console.log("현재 시간 (dayjs):", nowDayjs.format("YYYY-MM-DD HH:mm:ss"));

// 2. 날짜 포맷팅
const dateDayjs = dayjs("2024-03-20");
console.log("날짜 포맷팅 (dayjs):", dateDayjs.format("YYYY년 MM월 DD일"));

// 3. 시간 더하기/빼기
const nextWeekDayjs = dayjs().add(7, "day");
console.log("일주일 후 (dayjs):", nextWeekDayjs.format("YYYY-MM-DD"));

// 4. 시간 차이 계산
const startDayjs = dayjs("2024-01-01");
const endDayjs = dayjs("2024-12-31");
const diffDaysDayjs = endDayjs.diff(startDayjs, "day");
console.log("날짜 차이 (dayjs):", diffDaysDayjs, "일");

// 5. 요일 확인
console.log("오늘 요일 (dayjs):", dayjs().format("dddd"));

// 6. 상대적 시간 표시
const relativeTime = dayjs("2024-03-15").fromNow();
console.log("상대적 시간 (dayjs):", relativeTime);

// 7. 시간대 변환
const utcTime = dayjs().utc();
console.log("UTC 시간 (dayjs):", utcTime.format());

// 8. 날짜 유효성 검사
const isValid = dayjs("2024-13-45").isValid();
console.log("날짜 유효성 (dayjs):", isValid);

// 9. 날짜 비교
const isAfter = dayjs("2024-03-20").isAfter("2024-03-19");
console.log("날짜 비교 (dayjs):", isAfter);

// 10. 날짜 범위 생성
const start = dayjs("2024-01-01");
const end = dayjs("2024-01-05");
const range = [];
for (
  let date = start;
  date.isBefore(end) || date.isSame(end, "day");
  date = date.add(1, "day")
) {
  range.push(date.format("YYYY-MM-DD"));
}
console.log("날짜 범위 (dayjs):", range);
