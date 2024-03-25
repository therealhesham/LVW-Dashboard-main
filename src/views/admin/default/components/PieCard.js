// Chakra imports
import { Box, Flex, Text, Select, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import PieChart from "components/charts/PieChart";
import { pieChartData, pieChartOptions } from "variables/charts";
import { VSeparator } from "components/separator/Separator";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Conversion(props) {
  const { ...rest } = props;
  const [publicData,setPublicData] = useState(0)
  const [tours,setTours] = useState(0)
  const [vip,setVip] = useState(0)
  const [charts, setCharts] = useState([]);
  const [loading, setLoading] = useState(true); 
  
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const cardColor = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vipResponse, publicResponse, allToursResponse] = await Promise.all([
          axios.get("http://localhost:5000/admin/vip"),
          axios.get("http://localhost:5000/admin/public"),
          axios.get("http://localhost:5000/admin/allTours"),
        ]);

        setVip(vipResponse.data.length);
        setPublicData(publicResponse.data.length);
        setTours(allToursResponse.data.data.length);
        // setCharts([publicResponse.data.length,vipResponse.data.length])
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(()=>{
    if (publicData !== 0 && vip !== 0) {
      setCharts([publicData, vip])
      console.log("Charts updated:", [publicData, vip]);
    }
  },[publicData,vip])
  
  return (
    <Card p='20px' align='center' direction='column' w='100%' {...rest}>
      <Flex
        px={{ base: "0px", "2xl": "10px" }}
        justifyContent='space-between'
        alignItems='center'
        w='100%'
        mb='8px'>
        <Text color={textColor} fontSize='md' fontWeight='600' mt='4px'>
          Your Tours Chart
        </Text>
        
      </Flex>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <PieChart
          h="100%"
          w="100%"
          chartData={charts.length === 2 ? charts : [1, 1]}
          chartOptions={pieChartOptions}
        />
      )}
      <Card
        bg={cardColor}
        flexDirection='row'
        boxShadow={cardShadow}
        w='100%'
        p='15px'
        px='23px'
        mt='15px'
        mx='auto'>
        <Flex direction='column' py='5px'>
          <Flex align='center'>
            <Box h='8px' w='8px' bg='brand.500' borderRadius='50%' me='5px' marginBottom='4px'/>
            <Text onClick={()=>{
              console.log(publicData,"pub")
              console.log(vip,"vip")
              console.log(tours,"vip")
            }}
              fontSize='xs'
              color='secondaryGray.600'
              fontWeight='700'
              mb='5px'>
              Public
            </Text>
          </Flex>
          <Text fontSize='lg' color={textColor} fontWeight='700'>
          {(publicData / tours * 100).toFixed(1)}%
          </Text>
        </Flex>
        <VSeparator mx={{ base: "60px", xl: "30px", "2xl": "60px" }} />
        <Flex direction='column' py='5px' me='10px'>
          <Flex align='center'>
            <Box h='8px' w='8px' bg='#6AD2FF' borderRadius='50%' me='3px' marginBottom='4px'/>
            <Text
              fontSize='xs'
              color='secondaryGray.600'
              fontWeight='700'
              mb='5px'>
              VIP
            </Text>
          </Flex>
          <Text fontSize='lg' color={textColor} fontWeight='700'>
            {(vip / tours * 100).toFixed(1)}%
          </Text>
        </Flex>
      </Card>
    </Card>
  );
}
