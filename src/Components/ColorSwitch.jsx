import React from "react";
import { useColorMode, useColorModeValue, IconButton } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

const ColorSwitch = (props) => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
      variant="ghost"
      color="white"
      pos={"fixed"}
      top={2}
      right={4}
      zIndex={"overlay"}
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
    />
  );
};

export default ColorSwitch;
