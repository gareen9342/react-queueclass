# react-queueclass

**React.js 관련 발표하기 위해 만든 발표자료입니다.**
재밌는 기능이 떠올라서 추가하고 싶은 점을 개인적으로 연락주시면 열심히 추가하겠습니다 ❤️   
이슈가 있으면 이슈 추가해주세요! 언제나 환영입니다 🥳   
함께 공부하고 싶은 내용이 있으시면 말씀해주세요 같이 공부하고 싶습니다 🥸     

## 사용법
client 에서 npm i, server 에서 npm i 후 각자 본인의 로컬 몽고 디비 서버 주소 + / + db 이름을 적어서    
server > index.js 에 있는 mongodb 커넥션 코드의 db server url에 넣고 run~    

**frontend server run** : cd client -> npm run start   
**backend server run** : cd server -> npm run dev

## 디렉토리 설명

### client (frontend server)    

src 폴더 밑으로 설명

- components
    재사용 가능한 컴포넌트들
    
- config
    설정

- hoc
    HOC(Higher Order Component)

- pages
    Page들 

- service
    API를 이용할 코드


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
