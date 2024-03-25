// Chakra imports
import { Text, useColorModeValue } from "@chakra-ui/react";
// Assets
import Project1 from "assets/img/profile/Project1.png";
import Project2 from "assets/img/profile/Project2.png";
import Project3 from "assets/img/profile/Project3.png";
// Custom components
import Card from "components/card/Card.js";
import React , { useState, useEffect } from "react";
import Project from "views/admin/profile/components/Project";
import axios from "axios";

export default function Projects(props) {
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
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
  if(adminRole === "superAdmin"){

  return (
    <Card mb={{ base: "0px", "2xl": "20px" }}>
      <Text
        color={textColorPrimary}
        fontWeight='bold'
        fontSize='2xl'
        mt='10px'
        mb='4px'>
        Add Tour
      </Text>
     
      <Project
        boxShadow={cardShadow}
        mb='20px'
        image={Project1}
        ranking='1'
        link='#'
        title='Technology behind the Blockchain'
      />
     
    </Card>
  );
} else {
  return null;
}
}
