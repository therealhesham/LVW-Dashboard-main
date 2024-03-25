// chakra imports
import { Box, Flex, Stack } from "@chakra-ui/react";
//   Custom components
import Brand from "components/sidebar/components/Brand";
import Links from "components/sidebar/components/Links";
import SidebarCard from "components/sidebar/components/SidebarCard";
import React , {useEffect, useState} from "react";
import axios from "axios";

// FUNCTIONS

function SidebarContent(props) {
  const [adminData , setAdminData] = useState()

  useEffect(()=> {
    axios.get(`http://localhost:5000/admin/oneAdmin/${JSON.parse(localStorage.getItem('admin'))}`).then((res)=>{
      setAdminData(res.data)
    })
  },[])
  const { routes } = props;
  // SIDEBAR
  return (
    <Flex direction='column' height='100%' pt='25px' px="16px" borderRadius='30px'>
      <Brand />
      <Stack direction='column' mb='auto' mt='8px'>
        <Box ps='20px' pe={{ md: "16px", "2xl": "1px" }}>
          <Links routes={routes} />
        </Box>
      </Stack>

      {/* <Box
        mt='60px'
        mb='40px'
        borderRadius='30px'>
        <SidebarCard />
      </Box> */}
    </Flex>
  );
}

export default SidebarContent;
