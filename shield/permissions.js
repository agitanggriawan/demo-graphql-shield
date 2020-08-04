const { rule, shield, chain } = require('graphql-shield');

const isAuthenticated = rule({ cache: 'contextual' })(
  (parent, args, context) => !!context.user
);
const isAdmin = rule({ cache: 'contextual' })((parent, args, context) =>
  context.user.roles.includes('ADMIN')
);
const isMessageParticipant = rule({ cache: 'strict' })(
  (parent, args, context) => {
    const participantIds = context.Message.getParticipantIds(args.id);

    return participantIds.includes(context.user.id);
  }
);

const permissions = shield({
  User: {
    roles: chain(isAuthenticated, isAdmin),
    message: chain(isAuthenticated, isMessageParticipant),
  },
  Query: {
    currentUser: isAuthenticated,
  },
});

module.exports = permissions;
