import { auth } from "@/lib/auth"; // path to your auth file
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);






// import { auth } from "@/lib/auth";

// import { betterAuth } from "better-auth";
// import { toNextJsHandler } from "better-auth/next-js";




// export const auth = betterAuth({
//   emailAndPassword: {
//     enabled: true,
//   },
//   socialProviders: {
//     google: {
//       clientId: process.env.GOOGLE_CLIENT_ID || "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
//     },
//     github: {
//       clientId: process.env.GITHUB_CLIENT_ID || "",
//       clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
//     },
//   },
// });

// export const { GET, POST } = toNextJsHandler(auth);