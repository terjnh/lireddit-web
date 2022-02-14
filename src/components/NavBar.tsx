import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();
  let body = null;

  // data is loading
  if (fetching) {
    body = null;
  }
  // user not logged in
  if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2} color="black">
            login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="black">register</Link>
        </NextLink>
      </>
    );
  }
  // user is logged in
  else {
    body = (
      <Flex>
        <Box mr={2}>{data.me.username}</Box>
        <Button
          onClick={() => {
            logout();
          }}
          // Disable button while loading logout
          isLoading={logoutFetching}
          variant="link"
        >
          logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex bg="tan" p={4} ml={"auto"}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
