import { redirect } from "next/navigation";
import { auth } from "../api/auth/[...nextauth]/route";
export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (session?.user) {
    redirect("/discover");
  }
  return (
    <div className="bg-[#131316] min-h-screen container bg-[url('../assets/landingPage/MaskGroup.png')] bg-cover bg-center">
      {children}
    </div>
  );
}
