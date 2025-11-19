// Blog removed — redirect users to home page.
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function RemovedBlogIndex() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/");
  }, [router]);
  return null;
}
