import { currentUser } from "@/lib/currentUser";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await currentUser();

  if (user) {
    redirect("/");
  }
  return <div>{children}</div>;
}
