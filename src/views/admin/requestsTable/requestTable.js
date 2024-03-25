

// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";

import AllRequestsTable from "views/admin/dataTables/components/RequestsTable"
import { AllRequestsData } from "views/admin/dataTables/variables/columnsData";

import tableAllUsers from "views/admin/dataTables/variables/tableAllUsers.json"
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function RequestsTable() {
  const [requests,setRequests] =useState([])
useEffect(()=>{
    axios.get("http://localhost:5000/admin/allRequests").then((res)=>{
      console.log(res)
      setRequests(res.data.data)
    })
  },[])
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}>
            <AllRequestsTable columnsData={AllRequestsData} tableData={requests} />
      </SimpleGrid>
    </Box>
  );
}
