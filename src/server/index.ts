import express from "express";
import { routeAdapter } from "./adapters/routeAdapter";

import { makeSignUpController } from "../factories/makeSignUpController";
import { makeSignInController } from "../factories/makeSignInController";
import { makeListLeadsController } from "../factories/makeListaLeadsController";
import { makeAuthenticationMiddleware } from "../factories/makeAuthenticationMiddleware";
import { middlewareAdapter } from "./adapters/middlewareAdapter";
import { makeAuthorizationMiddleware } from "../factories/makeAuthorizationMiddleware";

const app = express();
app.use(express.json());

app.post("/sign-up", routeAdapter(makeSignUpController()));
app.post("/sign-in", routeAdapter(makeSignInController()));

app.get(
  "/leads",
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeListLeadsController())
);

app.post(
  "/leads",
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(["ADMIN"])),
  async (req, res) => {
    res.json({ created: true });
  }
);

app.listen(3000, () => {
  console.log("🔥 Server started at http://localhost:3000");
});
