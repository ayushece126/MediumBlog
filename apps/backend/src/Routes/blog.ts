import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode, sign, verify } from "hono/jwt";
import { createPostInput, updatePostInput } from "@repo/zodtypes/types";
const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    secretKey: string;
  };
  Variables: {
    userId: String;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const tokenToVerify = c.req.header("Authorization");

  const secretKey = c.env?.secretKey;
  if (!tokenToVerify) {
    c.status(401);
    return c.json({ message: "Authentication header is missing" });
  }
  const decodedPayload = await verify(tokenToVerify, secretKey);
  if (!decodedPayload) {
    c.status(401);
    return c.json({ message: "authentication failed" });
  }
  c.set("userId", decodedPayload.id);
  await next();
});

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  try {
    const parsedBody = createPostInput.safeParse(body);
    if (!parsedBody.success) {
      return c.json({ msg: "wrong inputs" });
    }
    const createdBlog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: c.get("userId") as string,
      },
    });
    c.status(201);
    return c.json({
      id: createdBlog.id,
    });
  } catch (error) {
    c.status(500);
    return c.json({ message: "Failed to create blog post" });
  }
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const bodyData = await c.req.json();

  const parsedBody = updatePostInput.safeParse(bodyData);
  if (!parsedBody.success) {
    return c.json({ msg: "wrong inputs" });
  }

  try {
    const updatedPost = await prisma.post.update({
      where: {
        id: bodyData.id,
        authorId: c.get("userId") as string,
      },
      data: {
        title: bodyData.title,
        content: bodyData.content,
      },
    });

    return c.json({
      message: "update successfull",
    });
  } catch (error) {
    c.status(500);
    return c.json({ message: "update failed" });
  }
});
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  console.log('hi from the bulk post')

  try {
    const allPost = await prisma.post.findMany({
      select: {
        content: true,
        createdAt: true,
        title: true,
        id: true,
        author: {
          select: {
            name:true
          }
        }
      }
    });
    return c.json(allPost);
  } catch (error) {
    c.status(500);
    return c.json({
      message: "request failed , no authorization",
    });
  }
});

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const reqPost = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    if (!reqPost) {
      c.status(404);
      return c.json({ message: "Blog was not found" });
    }
    c.status(200);
    return c.json({ reqPost });
  } catch (error) {
    c.status(500);
    return c.json({
      message: error,
    });
  }
});

export { blogRouter };
