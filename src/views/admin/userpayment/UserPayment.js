

// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";

import AllUserPaymentTable from "views/admin/dataTables/components/UserPayment"
import { AllUserPaymentData } from "views/admin/dataTables/variables/columnsData";

import tableUserPayment from "views/admin/dataTables/variables/tableUserPayment.json"
import CreditCard from 'components/card/Mastercard'
import Member from "components/card/Member"
import React from "react";

export default function UserPaymentTable() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Box mx="auto" width={{ base: "100%", md: "50%" }}>
        <CreditCard mb='20px' mt='20px' width='50%' height='300px'/>
      </Box>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}>
            <AllUserPaymentTable columnsData={AllUserPaymentData} tableData={tableUserPayment} />
      </SimpleGrid>
    </Box>
  );
}
