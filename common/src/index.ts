import z from "zod";

export const signupInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});
export const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export const createBloginput = z.object({
  title: z.string().email(),
  content: z.string().min(6),
});
export const updateBloginput = z.object({
  title: z.string().email(),
  content: z.string().min(6),
  id: z.string(),
});
export type SignupInput = z.infer<typeof signupInput>;
export type signinInput = z.infer<typeof signinInput>;
export type CreateBloginput = z.infer<typeof createBloginput>;
export type updateBloginput = z.infer<typeof updateBloginput>;
