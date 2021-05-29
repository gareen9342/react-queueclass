# react-queueclass

**React.js 관련 발표하기 위해 만든 발표자료입니다.**    
Hoxy 이런 기능이 있으면 어떨까...? 싶은게 있으시다면... 연락주시면 가넝한 열심히 추가하겠습니다 ❤️       
이슈가 있으면 이슈 추가해주세요! 언제나 환영입니다 😃   
함께 공부하고 싶은 내용이 있으시면 말씀해주세요 같이 공부하고 싶습니다 🥸     

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
