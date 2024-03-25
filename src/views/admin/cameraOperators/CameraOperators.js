

// Chakra imports
import {
  Box, SimpleGrid, useColorModeValue,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  TableContainer,
  Input,
  Select,
} from "@chakra-ui/react";


import { FileUpload } from 'primereact/fileupload';

import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";


import AllCameraOperatorsTable from "views/admin/dataTables/components/CameraOperatorsTable"
import { AllCameraOperatorsData } from "views/admin/dataTables/variables/columnsData";

import tableAllCameraOperators from "views/admin/dataTables/variables/tableAllCameraOperators.json"
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CameraOperators() {


  const [isRowModalOpen, setIsRowModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cv, setCv] = useState(null)
  const [license, setLicense] = useState(null)

  const [cameraoperators, setCameraOperators] = useState([])
  useEffect(() => {
    axios.get("http://localhost:5000/admin/allCameraOperators").then((res) => {
      setCameraOperators(res.data.data)
    })
  }, [])
  const handleOpenModal = () => {
    setIsRowModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsRowModalOpen(false);
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("cv", cv);
    formData.append("license", license);

    axios.post("http://localhost:5000/admin/addCameraOperator", formData).then((res) => {
      if (res.data.status === 200) {
        console.log(res.data)
      }
    })
    axios.get("http://localhost:5000/admin/allCameraOperators").then((res) => {
      setCameraOperators(res.data.data)
    })
    
    handleCloseModal();
  };
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <>
        <div className="add__admin__button" style={{ alignItems: 'center', textAlign: 'center', marginBottom: '20px' }}>
          <Button onClick={handleOpenModal} colorScheme="blue">
            Add Camera Operator
          </Button>
        </div>
        <Modal isOpen={isRowModalOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent minW="500px">
            <ModalHeader>Add Camera Operator</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                mb='15px'
              />
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                mb='15px'
              />
              <Input
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                mb='15px'
              />

              <div className="card" style={{ display: 'flex' }}>
                <FileUpload mode="basic"
                  name="cv"
                  url="/api/upload"
                  customUpload
                  onSelect={(e) => {
                    setCv(e.files[0])
                  }}
                  style={{ marginRight: '10px' }}
                  chooseLabel="Upload CV"
                  chooseOptions={{ style: { backgroundColor: "#3965FF" } }}

                />

                <FileUpload mode="basic"
                  name="license"
                  url="/api/upload"
                  customUpload
                  onSelect={(e) => {
                    setLicense(e.files[0])
                  }}
                  chooseLabel="Upload License"
                  chooseOptions={{ style: { backgroundColor: "#3965FF" } }}
                />
              </div>

            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSave}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}>
        <AllCameraOperatorsTable columnsData={AllCameraOperatorsData} tableData={cameraoperators} />
      </SimpleGrid>
    </Box>
  );
}
