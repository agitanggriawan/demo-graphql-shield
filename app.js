const express = require('express');
const {
  ApolloServer,
  gql,
  makeExecutableSchema,
} = require('apollo-server-express');
const { applyMiddleware } = require('graphql-middleware');
const User = require('./shield/User');
const Message = require('./shield/Message');
const permissions = require('./shield/permissions');

const app = express();

const typeDefs = gql`
  enum Role {
    ADMIN
    USER
  }

  type Message {
    id: ID
    receiverId: ID
    senderId: ID
    text: String
  }

  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
    roles: [Role]
    message(id: ID!): Message
  }

  type Query {
    currentUser: User
  }
`;

const resolvers = {
  User: {
    message: (user, args, context) => context.Message.getById(args.id),
  },
  Query: {
    currentUser: (parent, args, context) => context.user,
  },
};

const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
  permissions
);

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    const token = req.headers.authorization;
    const currentUser = User.getUserByToken(token);

    return { user: currentUser, User, Message };
  },
});
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
