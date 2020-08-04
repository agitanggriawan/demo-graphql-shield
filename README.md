# demo-graphql-shield
This is an simple example GraphQL Authorization with graphql-shield. 

## How to install
```
npm install or yarn install
npm start or yarn start
```
Open http://localhost:4000/graphql
Set header authorization, you can see token value in file `User.js`
```
{
  "Authorization": "sample-token"
}
```
Then run query
```
{
  currentUser {
    id
    firstName
    lastName
    role
    message(id: "2") {
      senderId
      receiverId
      text
    }
  }
}
```
