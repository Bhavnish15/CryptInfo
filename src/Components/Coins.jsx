import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../index";
import { Link } from "react-router-dom";
import {
  Container,
  Image,
  Text,
  Heading,
  HStack,
  VStack,
  Button,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import Footer from "./Footer";

const Exchanges = () => {
  const [Coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  let changePage = (page) => {
    setPage(page);
    setLoading(true);
  };

  const btns = new Array(132).fill(1);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(true);
      }
    };

    fetchCoins();
  }, [currency, page]);

  if (error)
    return <ErrorComponent message={"Error While Fetching Exchanges"} />;

  return (
    <>
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
            <HStack spacing={"4"}>
              <Radio value={"inr"}>₹ INR</Radio>
              <Radio value={"eur"}>€ EUR</Radio>
              <Radio value={"usd"}>$ USD</Radio>
            </HStack>
          </RadioGroup>

          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {Coins.map((i) => (
              <CoinCard
                key={i.id}
                id={i.id}
                name={i.name}
                image={i.image}
                Price={i.current_price}
                Symbol={i.symbol}
                Rank={i.market_cap_rank}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>

          <HStack w={"full"} overflow={"auto"} p={"8"}>
            {btns.map((item, index) => (
              <Button
                key={index}
                bgColor={"blackAlpha.600"}
                color={"white"}
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>

          
        </>
      )}
    </Container>
    <Footer />
    </>
  );
};

const CoinCard = ({
  id,
  name,
  image,
  Price,
  Rank,
  Symbol,
  currencySymbol = "₹",
}) => (
  <Link to={`/coin/${id}`}>
    <VStack
      w={"52"}
      shadow={"lg"}
      p={"8"}
      borderRadius={"lg"}
      transition={"all .3s"}
      m={"4"}
      css={{
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <Image
        src={image}
        w={"10"}
        h={"10"}
        objectFit={"contain"}
        alt={"Exchange"}
      />
      <Heading size={"md"} noOfLines={1}>
        {name}
      </Heading>
      <Text noOfLines={1}>{Symbol}</Text>
      <Text noOfLines={1}>Rank {Rank}</Text>
      <Text fontSize={12} noOfLines={1}>
        Current Price {Price ? `${currencySymbol}${Price}` : "NA"}
      </Text>
      <Text></Text>
    </VStack>
  </Link>
);

export default Exchanges;
