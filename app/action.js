"use server";
import {
  createSession,
  deleteSession,
  hashPassword,
  setSessionCookie,
  verifySession,
} from "@/lib/auth";
import { createUser, getUserByEmail } from "@/lib/db";
import { redirect } from "next/navigation";

export async function register(prevState, formData) {
  const name = formData.get("name");
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  //validationnnnn

  if (!name || !username || !email || !password) {
    return { error: "All fields are required!" };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters.." };
  }

  const existing = getUserByEmail(email);
  if (existing) {
    return {
      error: "Emaily already in use. Login in if you've created an account",
    };
  }

  //hash password
  const hashedPassword = await hashPassword(password);
  createUser({ name, username: username, email, password: hashedPassword });

  //get the new user and create session

  const user = getUserByEmail(email);
  const token = await createSession(user.id);
  await setSessionCookie(token);

  redirect("/home");
}

//login

export async function login(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { error: "All fields required!" };
  }

  //getting user

  const user = getUserByEmail(email);

  if (!user) {
    return { error: "Invalid email or password" };
  }

  //validationnnn

  const valid = await verifySession(password, user.password);

  if (!valid) {
    return { error: "Invalid email or password!" };
  }

  const token = await createSession(user.id);

  await setSessionCookie(token);

  redirect("/home");
}

export async function logout() {
  await deleteSession();

  redirect("/login");
}
