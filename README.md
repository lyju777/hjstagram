# hjstagram

#### 🔗Site Link

➡️ https://d1r8boewvd8lv9.cloudfront.net

<br>

**💡프로젝트 설명**

hjstagram은 Instagram의 핵심 기능들을 토대로 개발한 소셜 네트워크 서비스 입니다. Node.js koa 기반의 REST API 서버를 구축하고 React router 기반의 컴포넌트 설계를 통해 데이터를 연동하여 SNS 기능을 구현하였습니다.

<br>

**🤝참여인원**

FrontEnd(1명) | BackEnd(1명)

<br>

**🛠️기술스택**

**Client : `JavaScript` `React` `scss` `axios` `Bootstrap` `s3-bucket` `cloudfront`**

**Server : `MongoDB` `Node.js` `bcrypt` `multer-s3`**

<br>

**💻담당파트**

- 로그인, 로그아웃, 회원 가입 기능 구현
- 비밀번호 변경, 이메일 발송을 통한 비밀번호 찾기 기능 구현
- 게시글 등록/삭제, 좋아요, 팔로잉/팔로우, 댓글 입력/삭제 기능 구현
- 다른 사용자의 프로필 방문을 통한 팔로잉/팔로우 끊기 기능 구현
- 개인 프로필 접속을 통한 팔로잉/팔로워 조회 기능 구현
- 프로필 사진 변경/수정 기능 구현

<br>

**🚀업데이트**

**기간 :** ~ 2024.09.14

- 사용자 Form 데이터 유효성 검증로직 개선과 관련 UI 수정
- API 비동기 요청 시 응답 데이터 지연에 대비한 React Spinner 적용
- react-route v6 기반 PrivateRoute 설정을 통한 비로그인 유저 접근권한 설정
- AWS s3-bucket과 cloudfront연동을 통한 이미지 파일 스토리지 업로드 구현

<br>

## 🪄 Install

### Backend

```sh
cd backend
npm install
```

```sh
npm start
```

### Environment variables

```sh
#default
URL
DB_URL

#Google Gmail
GMAIL_USER
GMAIL_PASS

#AWS S3 Bucket
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_REGION
S3_BUCKET_NAME
CLOUD_FRONT_URL
```

<br>

### Frontend

```sh
cd frontend
npm install
```

```sh
npm start
```

### Environment variables

```sh
#default
REACT_APP_API
```

### Requirements

```sh
node v16.15.0

npm install react-scripts --save
npm install -g node-gyp
```
