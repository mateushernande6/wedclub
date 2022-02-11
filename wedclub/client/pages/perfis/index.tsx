import axios from "axios";
import { useEffect, useState, Dispatch, SetStateAction, useRef } from "react";
// import Image from "next/image";
import { Box, Text, Flex, Image, Button, Input } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { api } from "../api";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRecoilState } from "recoil";
import { userInfo } from "../../src/atom/userAtom";
import { InputControl } from "formik-chakra-ui";
import { useRouter } from "next/router";

interface IUser {
  email: string;
  id: number;
  img: string;
  img_name: string;
  name: string;
}

const Perfis = () => {
  const [srcProfile, setSrcProfile] = useState(
    "https://meetanentrepreneur.lu/wp-content/uploads/2019/08/profil-linkedin.jpg"
  );
  const [users, setUsers] = useState<IUser[]>([] as IUser[]);
  const [deleted, setDeleted] = useState<boolean>(false);
  const [userData, setUserData] = useRecoilState(userInfo);

  const router = useRouter();

  const handleDelete = async (id: number) => {
    await api
      .delete(`/user/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setDeleted(true);
  };

  useEffect(() => {
    if (userData.img) {
      setSrcProfile(userData.img);
    }
    console.log("userData=>", userData);
  }, []);

  useEffect(() => {
    api
      .get("/user")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));

    setDeleted(false);
  }, [deleted, srcProfile, userData]);

  return (
    <Box>
      <Flex marginTop="20px" justify="center">
        <Box width="40vw" height="500px" bgColor="#9c8ec7">
          <Flex justify="center"></Flex>

          <Box>
            <Formik
              initialValues={{ name: "", profile: null }}
              onSubmit={async (values, actions) => {
                console.log(values.profile);

                if (values.profile) {
                  const data = new FormData();

                  data.append("profile", values.profile);

                  await api
                    .put(`/user/upload/${userData.id}`, data)
                    .then((res) => setSrcProfile(res.data.img))
                    .catch((err) => console.log(err));
                }

                if (values.name) {
                  api
                    .put(`/user/${userData.id}`, { name: values.name })
                    .then((res) => setUserData(res.data))
                    .catch((err) => console.log(err));
                }
              }}
            >
              {({ setFieldValue }) => (
                <Form>
                  <Flex justify="space-around" alignItems="center">
                    <Image
                      borderRadius="50%"
                      w="200px"
                      h="200px"
                      src={srcProfile}
                      alt="profile"
                      marginTop="15px"
                    />

                    <Flex direction="column">
                      <label htmlFor="profile">Alterar Foto de perfil</label>
                      <Input
                        maxW="120px"
                        name="profile"
                        id="profile"
                        type="file"
                        formEncType="multipart/form-data"
                        onChange={(e) => {
                          setFieldValue("profile", e.currentTarget.files[0]);
                        }}
                        border="none"
                        _focus={{ outline: "none" }}
                      />
                    </Flex>
                    <Button type="submit">Enviar</Button>
                  </Flex>

                  <Box padding="0 10px">
                    <Box marginBottom="15px">
                      <Text>Nome: {userData.name}</Text>
                    </Box>

                    <Box marginBottom="15px">
                      <Text>Email: {userData.email}</Text>
                    </Box>
                  </Box>

                  <Flex padding="0 10px" direction="column">
                    <InputControl color="#fff" name="name" label="Nome" />

                    <Flex justify="space-around">
                      <Button marginTop="15px" w="200px" type="submit">
                        Alterar
                      </Button>
                      <Button
                        marginTop="15px"
                        w="200px"
                        onClick={() => router.push("/")}
                      >
                        Voltar
                      </Button>
                    </Flex>
                  </Flex>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>

        <Box width="40vw" bgColor="#b9baa8">
          <Flex direction="column">
            {!!users &&
              users.map((user, index) => (
                <>
                  <Flex
                    key={index}
                    justify="space-between"
                    align="center"
                    bgColor="#d5f"
                    marginBottom="3px"
                    padding="5px 0"
                  >
                    <Image
                      w="50px"
                      h="50px"
                      borderRadius="50%"
                      src={user.img ? user.img : srcProfile}
                      alt={user.img_name}
                      marginLeft="10px"
                    />
                    <Box>
                      <Text>Nome: {user.name}</Text>
                    </Box>

                    <Box>
                      <Text>Email: {user.email} </Text>
                    </Box>

                    <DeleteIcon
                      marginRight="10px"
                      onClick={() => handleDelete(user.id)}
                    />
                  </Flex>
                </>
              ))}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Perfis;
