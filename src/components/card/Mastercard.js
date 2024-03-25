import React from "react";

// Chakra imports
import { Flex, Box, Icon, Text, Spacer, Image } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";

// Assets
import bgMastercard from "assets/img/dashboards/Debit.png";
import { RiMastercardFill } from "react-icons/ri";

//chip image
import chip from "assets/img/chip.png"

export default function Banner(props) {
  const { exp, cvv, number, ...rest } = props;

  // Chakra Color Mode
  return (
    <Card
      backgroundImage={bgMastercard}
      backgroundRepeat='no-repeat'
      bgSize='cover'
      alignSelf='center'
      w={{ base: "100%", md: "60%", xl: "99%" }}
      bgPosition='10%'
      mx='auto'
      p='20px'
      {...rest}>
      <Flex direction='column' color='white' h='100%' w='100%'>
        <Flex justify='space-between' align='center' mb='37px'>
        <Box position='relative' w='56px' h='56px'>
        <Image src={chip} alt='Gold chip' position='absolute' top='0' left='0' right='0' bottom='0' objectFit='cover' />
      </Box>
          <Icon as={RiMastercardFill} w='50px' h='auto' color='gray.400' />
        </Flex>
        <Spacer />
        <Flex direction='column'>
          <Box alignItems='center' textAlign='center'>
            <Text fontSize='30px' fontWeight='bold'mb='30px'letterSpacing='0.2em'>
              4553  2312  6789  4567
            </Text>
          </Box>
          <Flex mt='14px' justifyContent='space-between'>
            <Flex direction='column' me='34px'>
              <Text fontSize='50px' fontFamily='Consolas'>Alice Mark</Text>
            </Flex>
            <Flex direction='column' mt='30px'>
              <Text fontSize='xs'>VALID THRU</Text>
              <Text fontSize='sm' fontWeight='500' textAlign='center'>
                20/24
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
