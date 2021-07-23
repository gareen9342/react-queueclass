# react-queueclass

**React.js 관련 발표하기 위해 만든 발표자료입니다.**    

## 사용법
1. client 에서 npm i, server 에서 npm i 
2. 각자 본인의 로컬 몽고 디비 서버 주소 + / + db 이름을 적어서    
3. server > index.js 에 있는 mongodb 커넥션 코드의 db server url에 넣고 run~    

> **frontend server run** : cd client -> npm run start   
> **backend server run** : cd server -> npm run dev

## 디렉토리 설명

### client (frontend server)    

src 폴더 밑으로 설명

- components    
    _재사용 가능한 컴포넌트들_

- config    
    _설정_

- hoc    
    _HOC(Higher Order Component)_

- pages    
    _Page들_ 

- service    
    _API를 이용할 코드_


### server (backend server)
   

## 사용 기술들
 
***frontend***

- React.js (Create-React-App 사용)
- SPA(Single Page Application) + CSR (Client Side Rendering)
- Axios, MaterialUI

***backend***
- Express.js
- Mongoose
- Passport
- JWTWebToken
