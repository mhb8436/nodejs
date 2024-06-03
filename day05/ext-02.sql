INSERT INTO students(name, age, gender) VALUES(‘이지훈’, 18, ‘MAN’);
INSERT INTO students(name, age, gender) VALUES(‘나개발’, 18, ‘MAN’);
INSERT INTO students(name, age, gender) VALUES(‘나피엠’, 18, ‘MAN’);
INSERT INTO students(name, age, gender) VALUES(‘나테스’, 18, ‘MAN’);

SELECT id, name, age, gender FROM students WHERE age > 10;

UPDATE students SET age = 29, gender=’WOMEN’ WHERE id = 1;

DELETE FROM students WHERE id = 1;