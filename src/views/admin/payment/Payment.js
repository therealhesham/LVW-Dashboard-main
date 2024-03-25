

// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";

import AllPaymentTable from "views/admin/dataTables/components/PaymentTable"
import { AllPaymentData } from "views/admin/dataTables/variables/columnsData";

import tableAllPayment from "views/admin/dataTables/variables/tableAllPayment.json"
import React from "react";

export default function PaymentTable() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}>
            <AllPaymentTable columnsData={AllPaymentData} tableData={tableAllPayment} />
      </SimpleGrid>
    </Box>
  );
}
