import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import bitmust from "../assets/btc.png";
import Footer from "./Footer";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <>
      <Box bgColor={"blackAlpha.800"} w={"full"} h={"85vh"} p={"4"}>
        <motion.div
          style={{ height: "80vh" }}
          animate={{ translateY: "30px" }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
        >
          <Image
            background={"transparent"}
            w={"100%"}
            h={"full"}
            objectFit={"contain"}
            pb={"5"}
            src={bitmust}
            filter={"grayscale(0)"}
          />
        </motion.div>
        <Text
          fontSize={"6xl"}
          textAlign={"center"}
          fontWeight={"thin"}
          color={"whiteAlpha.700"}
          mt={"-20"}
        >
          CryptInfo
        </Text>
      </Box>
      <Footer />
    </>
  );
};

export default Home;
