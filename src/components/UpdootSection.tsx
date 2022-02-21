import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");
  const [{ fetching, operation }, vote] = useVoteMutation();
  console.log("operation:", operation);
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
      <IconButton
        aria-label="updoot post"
        icon={<ChevronUpIcon />}
        isLoading={loadingState === "updoot-loading"}
        onClick={async () => {
          if(post.voteStatus === 1) {
            // do nothing if user has already updooted it
            return;
          }
          setLoadingState("updoot-loading");
          await vote({
            postId: post.id,
            value: 1,
          });
          setLoadingState("not-loading");
        }}
        colorScheme={post.voteStatus === 1 ? "green" : undefined}
      />
      {post.points}
      <IconButton
        aria-label="downdoot post"
        icon={<ChevronDownIcon />}
        isLoading={loadingState === "downdoot-loading"}
        onClick={async () => {
          if(post.voteStatus === -1) {
            // do nothing if user has already downdooted it
            return;
          }
          setLoadingState("downdoot-loading");
          await vote({
            postId: post.id,
            value: -1,
          });
          setLoadingState("not-loading");
        }}
        colorScheme={post.voteStatus === -1 ? "red" : undefined}
      />
    </Flex>
  );
};
