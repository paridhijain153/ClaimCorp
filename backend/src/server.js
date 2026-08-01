import app from "./app.js";
import env from "./config/env.js";

app.listen(env.PORT, () => {
  console.log(`
=================================
🚀 ClaimCorp Server Started
🌐 Environment : ${env.NODE_ENV}
📦 Port        : ${env.PORT}
link : http://localhost:${env.PORT}
=================================
`);
});