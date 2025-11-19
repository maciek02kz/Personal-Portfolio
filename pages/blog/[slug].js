// Blog post page removed — redirect to home.
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function RemovedBlogPost() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/");
  }, [router]);
  return null;
}
