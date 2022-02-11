import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
// import Image from "next/image";
import { Box, Text, Flex, Image, Button, Input } from "@chakra-ui/react";
import { Formik, Form, ErrorMessage } from "formik";
import { InputControl } from "formik-chakra-ui";
import { api } from "./api";
import { useRouter } from "next/router";
import * as yup from "yup";
import { useRecoilState } from "recoil";
import { userInfo } from "../src/atom/userAtom";

interface IUser {
  email: string;
  id: number;
  img: string;
  img_name: string;
  name: string;
}

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email("Invalid mail").required(),
});

const Home = () => {
  const router = useRouter();

  const [err, setErr] = useState(false);
  const [user, setUser] = useRecoilState(userInfo);

  return (
    <Box>
      <Flex marginTop="20px" justify="center">
        <Box
          bgImage={
            "url('https://assets.wedclub.com.br/uploads/category_cards/gastronomia.jpg')"
          }
          width="40vw"
          height="500px"
        >
          <Flex
            direction={"column"}
            justifyContent="center"
            alignItems="center"
          >
            <Text
              color="#e3859a"
              fontSize="35px"
              fontFamily={"Righteous, cursive"}
              marginBottom="15px"
              sx={{
                "text-shadow":
                  "1px 0 0 #fff, -1px 0 0 #fff, 0 1px 0 #fff, 0 -1px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff",
              }}
            >
              Bem vindo a WedClub Users
            </Text>

            <Image
              alt="test"
              src={
                "https://wedclub.com.br/_next/image?url=%2Flogo.png&w=128&q=75"
              }
              width={"210px"}
              height={"60px"}
            />
          </Flex>
        </Box>

        <Box bgColor="#b9baa8" width="40vw">
          <Formik
            validationSchema={schema}
            initialValues={{ name: "", email: "" }}
            onSubmit={async (values, actions) => {
              actions.setStatus(undefined);
              actions.setSubmitting(false);

              try {
                await api
                  .post("/user", values)
                  .then((res) => {
                    console.log("res=>", res.data);
                    setErr(false);
                    setUser(res.data);
                  })
                  .catch((err) => {
                    console.log("erro =>", err);
                    throw err;
                  });

                router.push("/perfis");
              } catch (err) {
                // actions.setErrors({ name: "teste", email: "testando" });
                // console.log( err);
                setErr(true);
              }

              actions.resetForm();
            }}
          >
            {({ errors, touched, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Flex direction="column" justifyContent="space-around">
                  <InputControl marginBottom="15px" name="name" label="Nome" />

                  <InputControl
                    marginBottom="15px"
                    name="email"
                    label="Email"
                  />

                  {!!err ? <Box>Usuario Já cadastrado</Box> : null}

                  <Button type="submit">Cadastrar</Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </Box>
      </Flex>
    </Box>
  );
};

export default Home;
