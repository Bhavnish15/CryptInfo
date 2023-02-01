import { Heading, HStack } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";






import React from "react";

const Header = () => {

    return (
      <>
        <div className="header">
          <HStack p={"4"} shadow={"base"} bgColor={"blackAlpha.900"}>
            <Heading fontFamily={'Roboto'} size={"lg"} style={{ color: "#FFD700" }} mr={"3"}>
              CryptInfo
            </Heading>
            <Button variant={"unstyled"} color={"white"}>
              <Link to="/">Home</Link>
            </Button>

            <Button variant={"unstyled"} color={"white"}>
              <Link to="/exchanges">Exchanges</Link>
            </Button>

            <Button variant={"unstyled"} color={"white"}>
              <Link to="/coins">Coins</Link>
            </Button>
          </HStack>
        </div>
      </>
    );
  };
export default Header;
