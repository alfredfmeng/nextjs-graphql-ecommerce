import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import 'dotenv/config';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';

const cookieSecret = 'INeedThisToBeThirtyTwoCharactersLongSoHereIAmTypingAway';
const frontendURL = 'http://localhost:7777/';
const databaseURL =
  'mongodb+srv://alfredfmeng:oow0DTl6HxlwPqKL@cluster0.s1fsj.mongodb.net/?retryWrites=true&w=majority';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360,
  secret: cookieSecret,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
  },
});

export default withAuth({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  server: {
    cors: {
      origin: [frontendURL],
      credentials: true,
    },
  },
  db: {
    adapter: 'mongoose',
    url: databaseURL,
  },
  lists: createSchema({
    User,
    Product,
  }),
  ui: {
    isAccessAllowed: ({ session }) => !!session?.data,
  },
  session: withItemData(statelessSessions(sessionConfig), {
    User: 'id name email',
  }),
});
