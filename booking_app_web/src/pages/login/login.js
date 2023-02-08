import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { NavLink as RouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
//   import jwt_decode from "jwt-decode";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    console.log("show Password");
    setPasswordShown(passwordShown ? false : true);
  };

  const { user, loading, error, dispatch } = useContext(AuthContext);
  console.log("user", user);
  console.log("error", error);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    // validationSchema: Yup.object({
    //   email: Yup.string().email("Invalid email address").required("Required"),
    //   password: Yup.string()
    //     .required("No password provided.")
    //     .min(8, "Password is too short - should be 8 chars minimum."),
    // }),

    onSubmit: async (values, { resetForm }) => {
      //   console.log("values", values);

      dispatch({ type: "LOGIN_START" });

      try {
        const res = await axios.post(
          "http://localhost:8000/api/auth/login",
          values
        );
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navigate("/");
        console.log("res", res);
      } catch (error) {
        dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
      }

      //   alert(JSON.stringify(values, null, 2));
      //   axios
      //     .post("https://blogwheel.herokuapp.com/login", values)
      //     .then((res) => {
      //       console.log(res, " then");
      //       window.localStorage.setItem("token", res.data.token);
      //       var decoded = jwt_decode(res.data.token);
      //       console.log(decoded, "token");
      //       if (decoded.role === "admin") {
      //         toast({
      //           title: "Login Successfully",
      //           description: "We've created your account for you.",
      //           status: "success",
      //           duration: 2000,
      //           isClosable: true,
      //         });
      //         // admin page
      //         history("/home");
      //       } else {
      //         toast({
      //           title: "Login Successfully",
      //           description: "We've created your account for you.",
      //           status: "success",
      //           duration: 2000,
      //           isClosable: true,
      //         });
      //         // user page
      //         history("/home");
      //       }
      //       resetForm({ values: "" });
      //     })
      //     .catch((res) => {
      //       console.log(res, " catch");
      //       !res.response.data.success &&
      //         toast({
      //           title: "Login Failed",
      //           description: "Entered Credentials is wrong",
      //           status: "error",
      //           duration: 2000,
      //           isClosable: true,
      //         });
      //     });
    },
  });

  return (
    <>
      <SimpleGrid columns={2} spacing={0}>
        <Box bg="#e3e3e3"></Box>
        <Flex h="100vh" justifyContent="center">
          <Center>
            <Container>
              <Text fontSize="3xl" textAlign="center">
                Login
              </Text>
              <form onSubmit={formik.handleSubmit}>
                <label htmlFor="username">Email Address</label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                />
                {formik.touched.username && formik.errors.username ? (
                  <div style={{ color: "red" }}>{formik.errors.username}</div>
                ) : null}
                <label htmlFor="username">Password</label>
                <InputGroup>
                  <Input
                    id="password"
                    name="password"
                    type={passwordShown ? "text" : "password"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  <InputRightElement
                    children={
                      passwordShown ? (
                        <AiFillEye
                          fontSize="22px"
                          cursor="pointer"
                          onClick={() => togglePassword()}
                        />
                      ) : (
                        <AiFillEyeInvisible
                          fontSize="22px"
                          cursor="pointer"
                          onClick={() => togglePassword()}
                        />
                      )
                    }
                  />
                </InputGroup>
                {formik.touched.password && formik.errors.password ? (
                  <div style={{ color: "red" }}>{formik.errors.password}</div>
                ) : null}
                <Box textAlign="right" mt="2">
                  Don't have an account ?
                  <Link
                    pl="2"
                    as={RouterLink}
                    to="/signup"
                    color="#2c5282"
                    textDecoration="underline"
                  >
                    Signup
                  </Link>
                </Box>
                <Box textAlign="center">
                  <Button
                    disabled={loading}
                    colorScheme="blue"
                    justifyContent="center"
                    mt="5"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Box>
                {error && <span>{error}</span>}
              </form>
            </Container>
          </Center>
        </Flex>
      </SimpleGrid>
    </>
  );
};

export default Login;
