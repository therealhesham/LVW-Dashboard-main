

// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";

import AllUsersTable from "views/admin/dataTables/components/UsersTable"
import { AllUsersData } from "views/admin/dataTables/variables/columnsData";

import tableAllUsers from "views/admin/dataTables/variables/tableAllUsers.json"
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UsersTable() {
  const [users,setUsers] =useState([])
useEffect(()=>{
    axios.get("http://localhost:5000/admin/allUsers").then((res)=>{
      setUsers(res.data.data)
    })
  },[])
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}>
            <AllUsersTable columnsData={AllUsersData} tableData={users} />
      </SimpleGrid>
    </Box>
  );
}
