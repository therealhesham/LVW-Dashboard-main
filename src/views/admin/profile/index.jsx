

// Chakra imports
import { Box, Grid, Flex, Text, Button, useColorModeValue} from "@chakra-ui/react";
import SuccessandEroorModal from "../../../views/admin/SuccessandErorrModals/SuccessandErrorModals"
// Custom components
import Banner from "views/admin/profile/components/Banner";
import Projects from "views/admin/profile/components/Projects";
import Calender from 'components/calendar/MiniCalendar'
import HistoryItem from 'views/admin/marketplace/components/HistoryItem'
import Card from "components/card/Card.js";


// Assets
import banner from "assets/img/auth/banner.png";
import avatar from "assets/img/avatars/avatar4.png";
import Nft1 from "assets/img/nfts/Nft1.png";
import Nft2 from "assets/img/nfts/Nft2.png";
import Nft5 from "assets/img/nfts/Nft5.png";


import React, { useEffect , useState } from "react";
import axios from "axios";

export default function Overview() {
  
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [adminData, setAdminData] = useState()
  const [adminRole, setAdminRole] = useState(""); // State to store admin role
  console.log(adminRole)

  useEffect(() => {
    axios.get(`http://localhost:5000/admin/oneAdmin/${JSON.parse(localStorage.getItem('admin'))}`).then((res) => {
      setAdminData(res.data)
      setAdminRole(res.data?.role); // Update the adminRole state
      console.log(res.data)
    })
  }, [])

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      

      
      
      {/* Main Fields */}
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "1.34fr 1fr 1.62fr",
        }}
        templateRows={{
          base: "repeat(3, 1fr)",
          lg: "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}>
        <Banner
          gridArea='1 / 1 / 2 / 2'
          banner={banner}
          avatar={adminData?.img}
          name={adminData?.name}
          email={adminData?.email}
          Role={adminData?.role}
          
        />
        <Calender
          gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
          used={25.6}
          total={50}
          pb='53px'
          pt='30px'
        />
        <Box
  gridArea={{
    base: "3 / 1 / 4 / 2",
    lg: "1 / 3 / 2 / 4",
  }}
  minH={{ base: "auto", lg: "420px", "2xl": "365px" }}
  pe='20px'
  pb={{ base: "100px", lg: "20px" }}
>
  <Card p='4px'>
    <Flex
      align={{ sm: "flex-start", lg: "center" }}
      justify='space-between'
      w='100%'
      px='22px'
      py='18px'
    >
      <Text color={textColor} fontSize='xl' fontWeight='600'>
        History
      </Text>
    </Flex>

    <HistoryItem
      name='Colorful Heaven'
      location='Paris, France'
      date='OCT 22, 2022'
      image={Nft5}
      price='100'
    />
    <HistoryItem
      name='Abstract Colors'
      location='Cairo, Egypt'
      date='OCT 22, 2022'
      image={Nft1}
      price='100'
    />
    <HistoryItem
      name='Old Museum'
      location='Milano, Italy'
      date='OCT 22, 2022'
      image={Nft2}
      price='100'
    />
  </Card>
</Box>
      </Grid>
      <Grid
        mb='20px'
        columns={{ sm: 1, md: 1 }}
        templateRows={{
          base: "1fr",
          lg: "repeat(2, 1fr)",
          "2xl": "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}>
        <Projects
          gridArea='1 / 2 / 2 / 2'
          banner={banner}
          avatar={avatar}
          name='Adela Parkson'
          email='example@mail.com'
          phone='011111111111'
        />
      </Grid>
    </Box>
  );
}
