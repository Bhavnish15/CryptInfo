import React from "react";
import { Alert, AlertIcon } from "@chakra-ui/react";

const ErrorComponent = ({ message }) => {
  return (
    <Alert
      status={"error"}
      position={"fixed"}
      justifyContent={"center"}
      top={"60"}
      left={"50%"}
      transform={"translateX(-50%)"}
      w={"container.lg"}
    >
      <AlertIcon />
      {message}
    </Alert>
  );
};

export default ErrorComponent;
