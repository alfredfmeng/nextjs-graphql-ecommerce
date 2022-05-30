import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import 'dotenv/config';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { CartItem } from './schemas/CartItem';
import { insertSeedData } from './seed-data';
import { sendPasswordResetEmail } from './lib/mail';

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360,
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
  },
  passwordResetLink: {
    async sendToken(args) {
      await sendPasswordResetEmail(args.token, args.identity);
    },
  },
});

export default withAuth({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  },
  db: {
    adapter: 'mongoose',
    url: databaseURL,
    async onConnect(keystone) {
      console.log('Connected to the database!');
      if (process.argv.includes('--seed-data')) {
        await insertSeedData(keystone);
      }
    },
  },
  lists: createSchema({
    User,
    Product,
    ProductImage,
    CartItem,
  }),
  ui: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    isAccessAllowed: ({ session }) => !!session?.data,
  },
  session: withItemData(statelessSessions(sessionConfig), {
    User: 'id name email',
  }),
});

// import { createAuth } from '@keystone-next/auth';
// import { config, createSchema } from '@keystone-next/keystone/schema';
// import {
//   withItemData,
//   statelessSessions,
// } from '@keystone-next/keystone/session';
// import { ProductImage } from './schemas/ProductImage';
// import { Product } from './schemas/Product';
// import { User } from './schemas/User';
// import { CartItem } from './schemas/CartItem';
// import 'dotenv/config';
// import { insertSeedData } from './seed-data';
// import { sendPasswordResetEmail } from './lib/mail';

// function check(name: string) {}

// const databaseURL =
//   process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

// const sessionConfig = {
//   maxAge: 60 * 60 * 24 * 360, // How long they stay signed in?
//   secret: process.env.COOKIE_SECRET,
// };

// const { withAuth } = createAuth({
//   listKey: 'User',
//   identityField: 'email',
//   secretField: 'password',
//   initFirstItem: {
//     fields: ['name', 'email', 'password'],
//     // TODO: Add in inital roles here
//   },
//   passwordResetLink: {
//     async sendToken(args) {
//       // send the email
//       await sendPasswordResetEmail(args.token, args.identity);
//     },
//   },
// });

// export default withAuth(
//   config({
//     // @ts-ignore
//     server: {
//       cors: {
//         origin: [process.env.FRONTEND_URL],
//         credentials: true,
//       },
//     },
//     db: {
//       adapter: 'mongoose',
//       url: databaseURL,
//       async onConnect(keystone) {
//         console.log('Connected to the database!');
//         if (process.argv.includes('--seed-data')) {
//           await insertSeedData(keystone);
//         }
//       },
//     },
//     lists: createSchema({
//       // Schema items go in here
//       User,
//       Product,
//       ProductImage,
//       CartItem,
//     }),
//     ui: {
//       // Show the UI only for poeple who pass this test
//       isAccessAllowed: ({ session }) =>
//         // console.log(session);
//         !!session?.data,
//     },
//     session: withItemData(statelessSessions(sessionConfig), {
//       // GraphQL Query
//       User: 'id name email',
//     }),
//   })
// );
