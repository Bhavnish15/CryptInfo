import React from "react";
import Loader from "./Loader";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import {
  Container,
  Box,
  RadioGroup,
  HStack,
  Radio,
  VStack,
  Text,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
  Progress,
} from "@chakra-ui/react";
import { server } from "../index";
import { Button } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ErrorComponent from "./ErrorComponent";
import Chart from "./Chart";

const CoinDetails = () => {
  const [Coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [days, setDays] = useState("24h");
  const [currency, setCurrency] = useState("inr");
  const [chartArray, setChartArray] = useState([]);

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "14d":
        setDays("14d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "60d":
        setDays("60d");
        setLoading(true);
        break;
      case "200d":
        setDays("200d");
        setLoading(true);
        break;
      case "1y":
        setDays("365d");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        break;

      default:
      case "24h":
        setDays("24h");
        break;
    }
  };

  const params = useParams();

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );

        setCoin(data);
        setChartArray(chartData.prices);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(true);
      }
    };

    fetchCoin();
  }, [params.id, currency, days]);

  if (error)
    return <ErrorComponent message={"Error While Fetching Coin Details"} />;

  return (
    <>
      <Container maxW={"container.xl"}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Box width={"full"} borderWidth={"4"}>
              <Chart arr={chartArray} currency={currencySymbol} days={days} />
            </Box>

            <HStack p="4" wrap={"wrap"}>
              {btns.map((i) => (
                <Button key={i} onClick={() => switchChartStats(i)}>
                  {i}
                </Button>
              ))}
            </HStack>

            <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
              <HStack spacing={"4"}>
                <Radio value={"inr"}>₹ INR</Radio>
                <Radio value={"eur"}>€ EUR</Radio>
                <Radio value={"usd"}>$ USD</Radio>
              </HStack>
            </RadioGroup>

            <VStack spacing={"4"} p="16" alignItems={"flex-start"}>
              <Text fontSize={"small"} alignSelf="center" opacity={0.7}>
                {" "}
                Last Updated On{" "}
                {Date(Coin.market_data.last_updated).split("G")[0]}
              </Text>
              <Image
                src={Coin.image.large}
                w={"16"}
                h={"16"}
                objectFit={"contain"}
              />

              <Stat>
                <StatLabel>{Coin.name}</StatLabel>
                <StatNumber>
                  {currencySymbol}
                  {Coin.market_data.current_price[currency]}
                </StatNumber>
                <StatHelpText>
                  <StatArrow
                    type={
                      Coin.market_data.price_change_percentage_24h > 0
                        ? "increase"
                        : "decrease"
                    }
                  />
                  {Coin.market_data.price_change_percentage_24h}%
                </StatHelpText>
              </Stat>

              <Badge
                fontSize={"2xl"}
                bgColor={"blackAlpha.800"}
                color={"white"}
              >
                {`#${Coin.market_cap_rank}`}
              </Badge>

              <CustomBar
                high={`${currencySymbol} ${Coin.market_data.high_24h[currency]}`}
                low={`${currencySymbol} ${Coin.market_data.low_24h[currency]}`}
              />

              <Box w={"full"} p="4">
                <Item
                  title={"Max Supply"}
                  value={Coin.market_data.max_supply}
                />
                <Item
                  title={"Circulating Supply"}
                  value={Coin.market_data.circulating_supply}
                />
                <Item
                  title={"Market Cap"}
                  value={`${currency} ${Coin.market_data.market_cap[currency]}`}
                />
                <Item
                  title={"All Time Low"}
                  value={`${currency} ${Coin.market_data.atl[currency]}`}
                />
                <Item
                  title={"All Time high"}
                  value={`${currency} ${Coin.market_data.ath[currency]}`}
                />
              </Box>
            </VStack>
          </>
        )}
      </Container>
      <Footer />
    </>
  );
};

const Item = ({ title, value }) => {
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"sans-serif"} letterSpacing={"widest"}>
      {title}
    </Text>
    <Text>{value}</Text>
  </HStack>;
};

const CustomBar = ({ high, low }) => {
  <VStack w={"full"}>
    <Progress value={50} colorScheme={"teal"} w={"full"} />
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme={"red"} />
      <Text fontSize={"sm"}>24H range</Text>
      <Badge children={high} colorScheme={"green"} />
    </HStack>
  </VStack>;
};

export default CoinDetails;
