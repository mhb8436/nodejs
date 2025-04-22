curl http://jsonplaceholder.typicode.com/posts

curl -X POST -H "Content-Type: application/json" -d '{"title":"foo","body":"bar","userId":1}' \ 
http://jsonplaceholder.typicode.com/posts

curl -X PUT -H "Content-Type: application/json" -d '{"id":1,"title":"foo","body":"bar","userId":1}' \
http://jsonplaceholder.typicode.com/posts/1

curl -X DELETE http://jsonplaceholder.typicode.com/posts/1

curl -H "Authorization: Bearer <token>" http://jsonplaceholder.typicode.com/protected





curl -X GET "http://localhost:3000/todos"


curl -X GET "http://localhost:3000/todos?page=1"

curl -X GET "http://localhost:3000/todos/1"

curl -X POST "http://localhost:3000/todos" \
-H "Content-Type: application/json" \
-d '{
    "task": "새로운 할 일",
    "description": "할 일 설명",
    "priority": 2
}'

curl -X PUT "http://localhost:3000/todos/1" \
-H "Content-Type: application/json" \
-d '{
    "task": "수정된 할 일",
    "description": "수정된 설명",
    "completed": true,
    "priority": 3
}'

curl -X DELETE "http://localhost:3000/todos/1"