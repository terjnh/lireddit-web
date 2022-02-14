import React from "react";
import { Formik, Form } from "formik";
import {
  Box,
  Button
} from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useMutation } from "urql";
import { useLoginMutation, useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";


const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  // 2nd paramter of const [,register] -> 'register' is our function (any name we want)
  const [,login] = useLoginMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        // take note: 'username' and 'password' must match to REGISTER_MUT
        onSubmit={async (values, {setErrors}) => {
          // console.log("submit-values:", values);
          const response = await login({options: values});
          // .data?. means that it can be 'undefined' and typscript handles it
          if(response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if(response.data.login.user) {
            // worked
            router.push("/");
          }
        }}
      >
        {(props) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={props.isSubmitting}
              colorScheme="teal"
            >
              login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
