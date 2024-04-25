import { Box } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import ChatProvider from "./Context/ChatProvider";

const App = () => {
  return (
    <Box
      w="100vw"
      h="100vh"
      backgroundImage="linear-gradient(to right, #ff6ec4, #4592fb)"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <ChatProvider>
        <Outlet />
      </ChatProvider>
    </Box>
  );
};

export default App;
