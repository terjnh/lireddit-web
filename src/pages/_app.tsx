import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import theme from "../theme";
import { Provider, createClient, dedupExchange, fetchExchange } from "urql";
import { cacheExchange, Cache, QueryInput } from '@urql/exchange-graphcache';
import { LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation } from "../generated/graphql";
import { ResolveLayoutTransition } from "framer-motion";

function betterUpdateQuery<Result, Query> (
 cache: Cache,
 qi: QueryInput,
 result: any,
 fn: (r: Result, q: Query) => Query
 ) {
  return cache.updateQuery(qi, data => fn(result, data as any) as any);
}

// client url points to our graphql server
const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [
    dedupExchange, 
    // Update query after mutation executes
    cacheExchange({
    updates: {
      Mutation: {
        logout: (_result, args, cache, info) => {
          // acts like a listener, eg. LogoutMutation called -> triggers MeQuery
          betterUpdateQuery<LogoutMutation, MeQuery>(
            cache,
            {query: MeDocument},
            _result,
            () => ({ me: null })
          );
        },
        login: (_result, args, cache, info) => {
          betterUpdateQuery<LoginMutation, MeQuery>(
            cache, 
            {query: MeDocument},
            _result,
            (result, query) => {
              if(result.login.errors) {
                return query;
              } else {
                return {
                  me: result.login.user,
                };
              }
            }
          );
        },

        register: (_result, args, cache, info) => {
          betterUpdateQuery<RegisterMutation, MeQuery>(
            cache, 
            {query: MeDocument},
            _result,
            (result, query) => {
              if(result.register.errors) {
                return query;
              } else {
                return {
                  me: result.register.user,
                };
              }
            }
          );
        },
      },
    }
  }), fetchExchange],
});




function MyApp({ Component, pageProps }: any) {
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
