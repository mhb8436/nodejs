// 8. Extract<T,U>
type T2 = Extract<"a" | "b" | "c", "a" | "f">;
type T3 = Extract<string | number | (() => void), Function>;

// T2 타입의 실제 예시
const exampleT2: T2 = "a";
console.log("Example of T2 type:", exampleT2);
console.log("Type of exampleT2:", typeof exampleT2);

// T3 타입의 실제 예시
const exampleT3: T3 = () => {
  console.log("This is a function of type T3");
};
console.log("Example of T3 type:", exampleT3.toString());
