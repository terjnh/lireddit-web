# README 
- Following Ben Awad's FullStack Tut:
  - https://www.youtube.com/watch?v=I6ypD7qv3Z8
  - [5:22:16] - Completed 'forgot password' flow
- Github Link: https://github.com/benawad/lireddit


## Instructions
1. Create next-app
- $ yarn create next-app --example with-chakra-ui lireddit-web

2. Install typescript dependencies:
- $ yarn add --dev typescript @types/node
  - if we run $ yarn dev
    - tsconfig.json will be created for us

3. Add formik (FormControl):
- $ yarn add formik

4. Install urql and graphql (to use graphql):
- $ yarn add urql graphql

5. Use GraphQL Code Generator
- $ yarn add -D @graphql-codegen/cli
-> Create folder .../lireddit-web/src/generated
- $ yarn graphql-codegen init
    ? What type of application are you building? Application built with React
    ? Where is your schema?: (path or url) http://localhost:4000/graphql
    ? Where are your operations and fragments?: src/graphql/**/*.graphql
    ? Pick plugins: TypeScript (required by other typescript plugins), TypeScript Operations (operations and fragments), TypeScript React Apollo (typed components and HOCs)
    ? Where to write the output: src/generated/graphql.tsx
    ? Do you want to generate an introspection file? No
    ? How to name the config file? codegen.yml
    ? What script in package.json should run the codegen? gen
  -> After this `codegen.yml` should be created
    - Inside `codegen.yml`, replace "typescript-react-apollo" with "typescript-urql"
  -> In `package.json`, remove "@graphql-codegen/typescript-react-apollo": "3.2.5" from "devDependencies"
- Install TypeScript Urql (Graphql Code Generator)
  [https://www.graphql-code-generator.com/plugins/typescript-urql]
  - $ yarn add -D @graphql-codegen/typescript-urql


6. After adding code into a `.graphql` file, make sure server is up, then run
  - $ yarn gen
    - this runs graphql-code-generator, creating ../src/generated/graphql.tsx
    - (refer to codegen.yml)
    - in ../generated/graphql.tsx, a hook called
      - useRegisterMutation is created (for 'Register' mutation in `register.graphql`)

** Remember to run `yarn gen` after modifying .graphql files

7. Therefore, each time we want to add a graphql query/mutation:
  - Create a .graphql file in /src/graphql/
  - run `$ yarn gen`
  - it will generate hooks, at the bottom, and we should use the hooks
  
8. Use graphcache (urql)
  - $ yarn add @urql/exchange-graphcache

9. Setup server-side-rendering (SSR)
  - https://formidable.com/open-source/urql/docs/advanced/server-side-rendering/
  - $ yarn add next-urql react-is isomorphic-unfetch
    - Use SSR if the content of the page is important to SEO
    - SSR will load the contents from the server before page refresh



### Notes:
- Using src/graphql/fragments
  - When we need more fields in a particular object, we can change it in fragments, rather than change all the queries in all `.graphql` files
