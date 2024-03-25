
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

import AllAdminsTable from "views/admin/dataTables/components/AdminsTable"
import { AllAdminsData } from "views/admin/dataTables/variables/columnsData";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ToursTable() {
  const [isRowModalOpen, setIsRowModalOpen] = useState(false);
  const [admins, setAdmins] = useState([])
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [adminRole, setAdminRole] = useState(""); // State for selected admin role

  // Chakra Color Mode
  useEffect(() => {
    axios.get("http://localhost:5000/admin/allAdmins").then((res) => {
      setAdmins(res.data.data)
    })
  }, [])
  const handleOpenModal = () => {
    setIsRowModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsRowModalOpen(false);
  };

  const handleSave = () => {

    console.log(name, email, password, adminRole)
    axios.post(`http://localhost:5000/admin/addAdmin`, {
      name: name,
      email: email,
      password: password,
      role: adminRole,
    })
      .then((res) => {
        handleCloseModal();
        console.log("Admin added successfully:", res.data);
        axios.get("http://localhost:5000/admin/allAdmins").then((res) => {
          setAdmins(res.data.data)
        })
      })
      .catch((error) => {
        console.error("Error addiding Admin data:", error);
      });
  };
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <>
        <div className="add__admin__button" style={{ alignItems: 'center', textAlign: 'center', marginBottom: '20px' }}>
          <Button onClick={handleOpenModal} colorScheme="blue">
            Add Admin
          </Button>
        </div>
        <Modal isOpen={isRowModalOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent minW="500px">
            <ModalHeader>Add Admin</ModalHeader>
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

              <Select
                placeholder="Select Admin Role"
                mb="24px"
                mr="10px"
                name="adminRole"
                value={adminRole}
                onChange={(e) => setAdminRole(e.target.value)}

              >
                <option value="admin">Admin</option>
                <option value="headAdmin">Head Admin</option>
                <option value="superAdmin">Super Admin</option>

              </Select>

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
        <AllAdminsTable columnsData={AllAdminsData} tableData={admins} />
      </SimpleGrid>
    </Box>
  );
}
