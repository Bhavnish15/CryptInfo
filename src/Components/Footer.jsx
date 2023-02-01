import { Avatar, Box, Stack, VStack, Text } from "@chakra-ui/react";
import React from "react";
import bhavnish from "../assets/BhavnishImage1-modified.png"

const Footer = () => {
  return (
    <Box
      bgColor={"blackAlpha.800"}
      color={"whiteAlpha.700"}
      minH={"48"}
      px={"16"}
      py={["16", "8"]}
    >
      <Stack direction={["column", "row"]} h={"full"} alignItems={"center"}>
        <VStack w={"full"} alignItems={["center", "flex-start"]}>
          <Text fontWeight={"bold"}>About Us</Text>
          <Text
            fontSize={"sm"}
            letterSpacing={"widest"}
            textAlign={["center", "left"]}
          >
            Information About All Crypto Currencies at One place, You can Find
            all the important Information about any Crypto Currencies here.
          </Text>
          <Text fontSize='xs'> © 2023 All Right Reserved</Text>
        </VStack>
        <VStack>
          <Avatar boxSize={"28"} mt={["4", "0"]} src={bhavnish} />
          <Text>Our Founder</Text>
          <Text fontSize="xs" >Bhavnish Bhardwaj</Text>
          
        </VStack>
      </Stack>
    </Box>
  );
};

export default Footer;
