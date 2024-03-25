

// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";

import ContactUsTable from "views/admin/dataTables/components/ContactUsTable"
import { AllContactUsData } from "views/admin/dataTables/variables/columnsData";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ContactUs() {
  const [contactUs ,setContactUs] =useState([])
useEffect(()=>{
    axios.get("http://localhost:5000/admin/allcontactus").then((res)=>{
      setContactUs(res.data.data)
    })
  },[])
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}>
            <ContactUsTable columnsData={AllContactUsData} tableData={contactUs} />
      </SimpleGrid>
    </Box>
  );
}
