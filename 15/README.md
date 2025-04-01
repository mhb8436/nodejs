# NestJS + GraphQL + Prisma Todo Example

이 프로젝트는 NestJS, GraphQL, Prisma를 사용한 간단한 Todo 리스트 예제입니다.

## 기술 스택

- NestJS
- GraphQL (Apollo)
- Prisma
- SQLite

## 설치 방법

```bash
# 의존성 설치
npm install

# Prisma 클라이언트 생성
npx prisma generate

# 데이터베이스 마이그레이션
npx prisma migrate dev
```

## 실행 방법

```bash
# 개발 모드로 실행
npm run start:dev
```

서버가 실행되면 http://localhost:3000/graphql 에서 GraphQL Playground에 접속할 수 있습니다.

## GraphQL API

### Queries

1. Todo 목록 조회

```graphql
query {
  todos {
    id
    title
    description
    completed
    createdAt
    updatedAt
  }
}
```

2. 특정 Todo 조회

```graphql
query {
  todo(id: 1) {
    id
    title
    description
    completed
    createdAt
    updatedAt
  }
}
```

### Mutations

1. Todo 생성

```graphql
mutation {
  createTodo(title: "새로운 할 일", description: "할 일 설명") {
    id
    title
    description
    completed
    createdAt
    updatedAt
  }
}
```

2. Todo 수정

```graphql
mutation {
  updateTodo(id: 1, title: "수정된 할 일", completed: true) {
    id
    title
    description
    completed
    createdAt
    updatedAt
  }
}
```

3. Todo 삭제

```graphql
mutation {
  deleteTodo(id: 1) {
    id
    title
    description
    completed
    createdAt
    updatedAt
  }
}
```
