import React, { useEffect } from "react";
import {
  Container,
  Box,
  Text,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Tabs,
} from "@chakra-ui/react";
import { px } from "framer-motion";
import Login from "../Components/Authantication/Login";
import Signup from "../Components/Authantication/Signup";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    console.log(user);
    if (user) {
      navigate("/chats");
    }
  }, [navigate]);

  return (
    <>
      <Container maxW="xl" centerContent mt={"1.5rem"}>
        <Box
          display="flex"
          justifyContent="center"
          padding={3}
          bg={"white"}
          w={"100%"}
          borderRadius={"lg"}
          borderWidth={"1px"}
        >
          <Text fontSize={"4xl"} fontFamily={"Work sans"}>
            Talk-A-Tive
          </Text>
        </Box>
        <Box
          bg={"white"}
          w={"100%"}
          p={4}
          borderRadius={"lg"}
          borderWidth={"1px"}
          mt={"1rem"}
        >
          <Tabs variant="soft-rounded" colorScheme="green">
            <TabList>
              <Tab width="50%">Login</Tab>
              <Tab width="50%">SignUp</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
