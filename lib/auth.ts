import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db("better-auth-db2");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  basePath: "/api/auth",
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});






// import { betterAuth } from "better-auth";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";
// import clientPromise from "./db";

// const client = await clientPromise;
// const db = client.db();

