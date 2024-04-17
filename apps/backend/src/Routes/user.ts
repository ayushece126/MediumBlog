import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signupInput, signinInput } from "@repo/zodtypes/types";
const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    secretKey: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const parsedBody = signupInput.safeParse(body);
    if (!parsedBody.success) {
      return c.json({ error: "wrong inputs" });
    }
    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name
      },
    });

    const jwt = await sign({ id: newUser.id }, c.env?.secretKey);
    return c.json({ jwt });
  } catch (error: any) {
    c.status(403);
    return c.json({ error: error.message });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body = await c.req.json();
    const parsedBody = signinInput.safeParse(body);
    if (!parsedBody.success) {
      return c.json({ error: "wrong inputs" });
    }
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "user not found" });
    }
    const jwt = await sign({ id: user.id }, c.env.secretKey);
    return c.json({ jwt });
  } catch (error: any) {
    return c.json({ error: error.message });
  }
});

export { userRouter };
