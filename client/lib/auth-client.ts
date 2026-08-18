import { deviceAuthorizationClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
  baseURL: "https://orbital-cli-f83y.onrender.com",
  plugins: [
    deviceAuthorizationClient(),
  ],
});
