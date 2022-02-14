import {
  Box,
  Button
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useRegisterMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";

interface registerProps {}


const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  // 2nd paramter of const [,register] -> 'register' is our function (any name we want)
  const [,register] = useRegisterMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        // take note: 'username' and 'password' must match to REGISTER_MUT
        onSubmit={async (values, {setErrors}) => {
          // console.log("submit-values:", values);
          const response = await register(values);
          // .data?. means that it can be 'undefined' and typscript handles it
          if(response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if(response.data?.register.user) {
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
              register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
