import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBloginput, updateBloginput } from "@pankaj1011m/medium-common";

export const blogRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRoute.use("/*", async (c, next) => {
  const auth = c.req.header("authorization") || " ";
  const token = auth.split(" ")[1];
  try {
    const user = await verify(token, c.env.JWT_SECRET);
    if (user) {
      c.set("userId", user.id as string);
      await next();
    } else {
      c.status(403);
      return c.json({ error: "unauthorized" });
    }
  } catch (err) {
    c.status(403);
    return c.json({ error: "Unauthorized" });
  }
});

blogRoute.post("/", async (c) => {
  const body = await c.req.json();

  const { success } = createBloginput.safeParse(body);
  console.log(success);

  if (!success) {
    c.status(411);
    return c.json({
      msg: "invalid inputs",
    });
  }
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const post = await prisma.posts.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId,
    },
  });
  return c.json({
    id: post.id,
  });
});

blogRoute.put("/", async (c) => {
  const body = await c.req.json();
  const { success } = updateBloginput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      msg: "invlid inputs",
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const post = await prisma.posts.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({
      id: post.id,
    });
  } catch (err) {
    return c.json("error while update");
  }
});

//pagination
blogRoute.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const posts = await prisma.posts.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json(posts);
  } catch (err) {
    c.status(403);
    return c.json({
      msg: "error while fetching",
    });
  }
});

blogRoute.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const post = await prisma.posts.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json({
      post,
    });
  } catch (err) {
    c.status(403);
    return c.json({
      message: "Error while fetching the data",
    });
  }
});
