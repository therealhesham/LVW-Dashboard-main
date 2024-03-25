
import {
  Box,
  Icon,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import { MdAttachMoney,MdAccountCircle, MdGroup, MdCameraEnhance, MdControlCamera, MdLocationOn } from "react-icons/md";
import TopTourGuides from "views/admin/default/components/TopTourGuides";
import TopDirectors from "views/admin/default/components/TopDirectors";
import TopCameraOperators from "views/admin/default/components/TopCameraOperators";
import TopTours from "views/admin/default/components/TopTours";
import PieCard from "views/admin/default/components/PieCard";
import TotalSpent from "views/admin/default/components/TotalSpent";
import {
  columnsTourGuides,
  columnsDirectors,
  columnsTourData,
  columnsCameraOperator
} from "views/admin/default/variables/columnsData";
import tableTourGuides from "views/admin/default/variables/tableTourGuides.json";
import tableDirectors from "views/admin/default/variables/tableDirectors.json";
import tableTours from "views/admin/default/variables/tableTours.json";
import tableCameraOperators from "views/admin/default/variables/tableCameraOperators.json"


export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap='20px'
        mb='20px'>
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />
              }
            />
          }
          name='Earnings'
          value='$350.4'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdLocationOn} color={brandColor} />
              }
            />
          }
          name='Total Tours'
          value='2935'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdAccountCircle} color={brandColor} />
              }
            />
          }
          name='Total Users'
          value='642'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdGroup} color={brandColor} />
              }
            />
          }
          name='Total Tour Guides'
          value='298'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdCameraEnhance} color={brandColor} />
              }
            />
          }
          name='Total Camera Operators'
          value='642'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
              icon={<Icon w='28px' h='28px' as={MdControlCamera} color='white' />}
            />
          }
          name='Total Directors'
          value='154'
        />

      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <TotalSpent />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
        <PieCard />
          <MiniCalendar h='100%' minW='100%' selectRange={false} />
        </SimpleGrid>
        
      </SimpleGrid>


      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <TopTourGuides columnsData={columnsTourGuides} tableData={tableTourGuides} />

        <TopTours columnsData={columnsTourData} tableData={tableTours} />
      </SimpleGrid>
      
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <TopDirectors
          columnsData={columnsDirectors} tableData={tableDirectors}
        />


        <TopCameraOperators
          columnsData={columnsCameraOperator}
          tableData={tableCameraOperators}
        />
        </SimpleGrid>


    </Box>
  );
}
