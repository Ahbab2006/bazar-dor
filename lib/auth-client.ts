import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined"
    ? window.location.origin
    : (process.env.NEXT_PUBLIC_APP_URL || "https://bazar-dor-1zgd.vercel.app"),
});

export const { signIn, signUp, signOut, useSession } = authClient;




// import { createAuthClient } from "better-auth/react";

// export const authClient = createAuthClient({
//   baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
// });

// export const { signIn, signUp, useSession, signOut, updateUser } = authClient;