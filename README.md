# Book Management System with NestJS and GraphQL

이 프로젝트는 NestJS와 GraphQL을 사용하여 구현된 도서 관리 시스템입니다.

## 기능

- 도서 관리 (등록, 조회, 수정, 삭제)
- 저자 관리 (등록, 조회, 수정, 삭제)
- 카테고리 관리 (등록, 조회, 수정, 삭제)
- 리뷰 관리 (등록, 조회, 수정, 삭제)

## 기술 스택

- NestJS
- GraphQL
- TypeORM
- PostgreSQL
- TypeScript

## 설치 방법

1. 저장소 클론
```bash
git clone [repository-url]
cd book-management-system
```

2. 의존성 설치
```bash
npm install
```

3. 환경 변수 설정
`.env` 파일을 생성하고 다음 내용을 추가합니다:
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=book_management
```

4. 데이터베이스 생성
```sql
CREATE DATABASE book_management;
```

5. 애플리케이션 실행
```bash
npm run start:dev
```

## GraphQL API 사용법

GraphQL Playground는 `http://localhost:3000/graphql`에서 접근할 수 있습니다.

### 도서 관련 쿼리

#### 도서 목록 조회
```graphql
query {
  books {
    id
    title
    isbn
    price
    publishedDate
    author {
      name
    }
    category {
      name
    }
    reviews {
      rating
    }
  }
}
```

#### 도서 상세 정보 조회
```graphql
query {
  book(id: 1) {
    id
    title
    isbn
    price
    publishedDate
    author {
      name
      email
      biography
    }
    category {
      name
      description
    }
    reviews {
      id
      reviewerName
      rating
      comment
    }
  }
}
```

#### 도서 등록
```graphql
mutation {
  createBook(createBookInput: {
    title: "The Great Gatsby"
    isbn: "978-0743273565"
    price: 9.99
    publishedDate: "1925-04-10"
    authorId: 1
    categoryId: 1
  }) {
    id
    title
    author {
      name
    }
    category {
      name
    }
  }
}
```

### 저자 관련 쿼리

#### 저자 목록 조회
```graphql
query {
  authors {
    id
    name
    email
    biography
    books {
      title
    }
  }
}
```

#### 저자 등록
```graphql
mutation {
  createAuthor(createAuthorInput: {
    name: "F. Scott Fitzgerald"
    email: "fitzgerald@example.com"
    biography: "American novelist and short story writer"
  }) {
    id
    name
    email
  }
}
```

### 카테고리 관련 쿼리

#### 카테고리 목록 조회
```graphql
query {
  categories {
    id
    name
    description
    books {
      title
    }
  }
}
```

#### 카테고리 등록
```graphql
mutation {
  createCategory(createCategoryInput: {
    name: "Fiction"
    description: "Fictional literature"
  }) {
    id
    name
    description
  }
}
```

### 리뷰 관련 쿼리

#### 도서별 리뷰 조회
```graphql
query {
  reviewsByBook(bookId: 1) {
    id
    reviewerName
    reviewerEmail
    rating
    comment
    createdAt
  }
}
```

#### 리뷰 등록
```graphql
mutation {
  createReview(createReviewInput: {
    reviewerName: "John Doe"
    reviewerEmail: "john@example.com"
    rating: 5
    comment: "A masterpiece!"
    bookId: 1
  }) {
    id
    reviewerName
    rating
    comment
  }
}
```

## 데이터 모델

### Book
- id: ID
- title: String
- isbn: String
- price: Float
- publishedDate: Date
- author: Author
- category: Category
- reviews: [Review]
- createdAt: Date
- updatedAt: Date

### Author
- id: ID
- name: String
- email: String
- biography: String
- books: [Book]
- createdAt: Date
- updatedAt: Date

### Category
- id: ID
- name: String
- description: String
- books: [Book]
- createdAt: Date
- updatedAt: Date

### Review
- id: ID
- reviewerName: String
- reviewerEmail: String
- rating: Int
- comment: String
- book: Book
- createdAt: Date
- updatedAt: Date

## 주의사항

1. 데이터베이스 연결 설정을 확인하세요.
2. TypeORM의 `synchronize: true` 옵션은 개발 환경에서만 사용하세요.
3. 프로덕션 환경에서는 적절한 보안 설정이 필요합니다.

## 라이선스

MIT
