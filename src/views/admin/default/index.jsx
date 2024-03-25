
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
import React ,{useState, useEffect} from "react";
import { MdAttachMoney,MdAccountCircle, MdGroup, MdCameraEnhance, MdControlCamera, MdLocationOn, MdSupervisedUserCircle, } from "react-icons/md";
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
import axios from 'axios';

export default function UserReports() {
  const [earnings,setEarnings] = useState(0)
  const [tours,setTours]=useState(0)
  const [users,setUsers]=useState(0)
  const [tourGuides,setTourGuides]=useState(0)
  const [cameraOperators,setCameraOperators]=useState(0)
  const [directors,setDirectors]=useState(0)
  const [topTourGuides,setTopTourGuides] = useState([])
  const [topDirectors,setTopDirectors] = useState([])
  const [topCameraOperators,setTopCameraOperators] = useState([])
  const [topTours,setTopTours] = useState([])



  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  useEffect(() => {
    axios.get("http://localhost:5000/admin/allRevenue").then((res)=>{
    setEarnings(res.data)
    })
    axios.get("http://localhost:5000/admin/allTours").then((res)=>{
      if(res.data.status === 400){
      setTours(res.data.data.length)}
      else{
        setTours(0)
      }
    })
    axios.get("http://localhost:5000/admin/allUsers").then((res)=>{
      if(res.data.status === 400){
        setUsers(res.data.data.length)}
        else{
          setUsers(0)
        }
    })
    axios.get("http://localhost:5000/admin/allCameraOperators").then((res)=>{
      if(res.data.status === 400){
        setCameraOperators(res.data.data.length)}
        else{
          setCameraOperators(0)
        }
    })
    axios.get("http://localhost:5000/admin/allDirectors").then((res)=>{
      if(res.data.status === 400){
        setDirectors(res.data.data.length)}
        else{
          setDirectors(0)
        }
    })
    axios.get("http://localhost:5000/admin/topFiveTourGuides").then((res)=>{
      setTopTourGuides(res.data)
      console.log(res.data)
    })
    axios.get("http://localhost:5000/admin/topFiveDirectors").then((res)=>{
      setTopDirectors(res.data)
      console.log(res.data)
    })
    axios.get("http://localhost:5000/admin/topFiveCameraOperators").then((res)=>{
      setTopCameraOperators(res.data)
    })
    axios.get("http://localhost:5000/admin/topFiveTours").then((res)=>{
      setTopTours(res.data)
    })
    axios.get("http://localhost:5000/admin//allTourGuides").then((res)=>{
      if(res.data.status === 400){
        setTourGuides(res.data.data.length)}
        else{
          setTourGuides(0)
        }
    })
    

  }, []);
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
          value={"$"+earnings}
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
          value={tours}
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
          value={users}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdSupervisedUserCircle} color={brandColor} />
              }
            />
          }
          name='Total Tour Guides'
          value={tourGuides}
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
          value={cameraOperators}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={<Icon w='28px' h='28px' as={MdControlCamera} color={brandColor} />}
            />
          }
          name='Total Directors'
          value={directors}
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
        
        <TopTourGuides columnsData={columnsTourGuides} tableData={topTourGuides} />
        

        <TopTours columnsData={columnsTourData} tableData={topTours} />
      </SimpleGrid>
      
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <TopDirectors
          columnsData={columnsDirectors} tableData={topDirectors}
        />


        <TopCameraOperators
          columnsData={columnsCameraOperator}
          tableData={topCameraOperators}
        />
        </SimpleGrid>


    </Box>
  );
}
