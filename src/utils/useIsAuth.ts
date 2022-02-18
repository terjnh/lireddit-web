import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

export const useIsAuth = () => {
  // check if you are logged-in using useMeQuery()
  const [{ data, fetching }] = useMeQuery();
  const router = useRouter();
  console.log("router:", router);
  useEffect(() => {
    console.log("data2:", data);
    if (!fetching && !data?.me) {
      router.replace("/login?next=" + router.pathname);
    }
  }, [fetching, data, router]);
};
