import {
  Avatar,
  Flex,
  Table,
  Box,
  Checkbox,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  TableContainer,
} from "@chakra-ui/react";
  import React, { useEffect, useMemo, useState } from "react";
  import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
  } from "react-table";
  
  // Custom components
  import Card from "components/card/Card";
import axios from "axios";

  export default function CameraOperatorsTable(props) {
    const { columnsData, tableData } = props;
  
    const columns = useMemo(() => columnsData, [columnsData]);
    const [data, setData] = useState(tableData);
    // const data = useMemo(() => tableData, [tableData]);
    useEffect(()=>{
      setData(tableData);
    },[tableData])
    const tableInstance = useTable(
      {
        columns,
        data,
      },
      useGlobalFilter,
      useSortBy,
      usePagination
    );
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      initialState,
    } = tableInstance;
    initialState.pageSize = 5;
  
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
    const [isRowModalOpen, setIsRowModalOpen] = useState(new Array(data.length).fill(false));

  const handleOpenModal = (rowIndex) => {
    const updatedModalState = [...isRowModalOpen];
    updatedModalState[rowIndex] = true;
    setIsRowModalOpen(updatedModalState);
  };

  const handleCloseModal = (rowIndex) => {
    const updatedModalState = [...isRowModalOpen];
    updatedModalState[rowIndex] = false;
    setIsRowModalOpen(updatedModalState);
  };
    return (
      <Card
        direction='column'
        w='100%'
        px='0px'
        overflowX={{ sm: "scroll", lg: "hidden" }}>
        <Flex px='25px' justify='space-between' mb='20px' align='center'>

        </Flex>
        <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
          <Thead>
            {headerGroups.map((headerGroup, index) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => {
                  if(column.Header){
                    return(
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    pe='10px'
                    key={index}
                    borderColor={borderColor}>
                    <Flex
                      justify='space-between'
                      align='center'
                      fontSize={{ sm: "10px", lg: "12px" }}
                      color='gray.400'>
                      {column.render("Header")}
                    </Flex>
                  </Th>
                    )
                  }
  })}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, xellIndex) => {
                    if (cell.column.Header) {
                    let data = "";
                    if (cell.column.Header === "NAME") {
                        data = (
                            <Flex align='center'>
                              <Avatar
                                src={cell.value[1]}
                                w='30px'
                                h='30px'
                                me='8px'
                              />
                              <Text
                                color={textColor}
                                fontSize='sm'
                                fontWeight='600'>
                                {cell.value}
                              </Text>
                            </Flex>
                          );
                    } else if (cell.column.Header === "EMAIL") {
                      data = (
                        <Flex align='center'>
                          <Text
                            me='10px'
                            color={textColor}
                            fontSize='sm'
                            fontWeight='700'>
                            {cell.value}
                          </Text>
                        </Flex>
                      );
                    } 
                    else if (cell.column.Header === "status") {
                      data = (
                        <Flex align='center'>
                          <Text
                            me='10px'
                            color={textColor}
                            fontSize='sm'
                            fontWeight='700'>
                            {cell.value}
                          </Text>
                        </Flex>
                      );
                    } 
                      else if (cell.column.Header === "cv") {
                        const pdfUrl = `http://localhost:5000/${cell.value}`;
                        let fileName = pdfUrl.substring(pdfUrl.lastIndexOf('/') + 1);
                        fileName = fileName.replace(/^\d+/, '');
                        data = (
                          <div>
                                <a href={pdfUrl} target="_blank">{fileName}</a>
                          </div>
                        );
                      }
                      else if (cell.column.Header === "Licence") {
                        const pdfUrl = `http://localhost:5000/${cell.value}`;
                        let fileName = pdfUrl.substring(pdfUrl.lastIndexOf('/') + 1);
                        fileName = fileName.replace(/^\d+/, '');
                        data = (
                          <div>
                                <a href={pdfUrl} target="_blank">{fileName}</a>
                          </div>
                        );
                      }
                      else if (cell.column.Header === "action") {
                        data = row.values["status"] === "pending" ? (
                          <Button onClick={() => {
                            axios.put("http://localhost:5000/admin/accept", {
                              id: row.values["_id"],
                            }).then((res)=>{
                              axios.get("http://localhost:5000/admin/allCameraOperators").then((res)=>{
                                setData(res.data.data)
                              })
                            })
                          }} colorScheme="blue">accept</Button>
                        ) : row.values["status"] === "accepted" ? (
                          <Button onClick={() => {
                            axios.put("http://localhost:5000/admin/block", {
                              id: row.values["_id"]
                            }).then((res)=>{
                              axios.get("http://localhost:5000/admin/allCameraOperators").then((res)=>{
                                setData(res.data.data)
                              })
                            })
                          }} colorScheme="blue">block</Button>
                        ) : row.values["status"] === "blocked" ? (
                          <Button onClick={() => {
                            axios.put("http://localhost:5000/admin/unblock", {
                              id: row.values["_id"]
                            }).then((res)=>{
                              axios.get("http://localhost:5000/admin/allCameraOperators").then((res)=>{
                                setData(res.data.data)
                              })
                            })
                          }} colorScheme="blue">unblock</Button>
                        ) : null;
                      }
                      else if (cell.column.Header === "More Details") {
                        data = (
                          <>
                            {" "}
                            <Button onClick={() => handleOpenModal(index)} colorScheme="blue">
                              More Details
                            </Button>{" "}
                            <Modal isOpen={isRowModalOpen[index]} onClose={() => handleCloseModal(index)}>
                              <ModalOverlay />
                              <ModalContent minW="500px">
                                <ModalHeader>Modal Title</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                  <TableContainer>
                                    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
                                      <Table variant="simple">
                                        <Tbody>
                                          
                                            <Tr>
                                              <Td>Email</Td>
                                              <Td>{row.values["email"]}</Td>
                                            </Tr>
                                        
                                          {row.values["phone"] && (
                                            <Tr>
                                              <Td>Phone</Td>
                                              <Td>{row.values["phone"]}</Td>
                                            </Tr>
                                          )}
                                          
                                            <Tr>
                                              <Td>Number Of Tours</Td>
                                              <Td>{row.values["tours"].length}</Td>
                                            </Tr>
                                          
                                            <Tr>
                                              <Td>Number Of Reviews</Td>
                                              <Td>{row.values["reviews"].length}</Td>
                                            </Tr>
                                            <Tr>
                                              <Td>Average Rate</Td>
                                              <Td>{(row.values["avgRate"] * 20).toFixed(1)}%</Td>
                                            </Tr>
                                        
                                          {row.values["languages"] && (
                                            <Tr>
                                              <Td>languages</Td>
                                              <Td>{row.values["languages"].join("/")}</Td>
                                            </Tr>
                                          )}
                                          {row.values["italianTourGuide"] && (
                                            <Tr>
                                              <Td>Italian Tour Guide</Td>
                                              <Td>{row.values["italianTourGuide"].name}</Td>
                                            </Tr>
                                          )}
                                          {row.values["italianCameraOperator"] && (
                                            <Tr borderColor="var(--chakra-colors-gray-200)">
                                              <Td borderColor="var(--chakra-colors-gray-200)">
                                                Italian Camera Operator
                                              </Td>
                                              <Td borderColor="var(--chakra-colors-gray-200)">
                                                {row.values["italianCameraOperator"].name}
                                              </Td>
                                            </Tr>
                                          )}
                                          {row.values["italianDirector"] && (
                                            <Tr>
                                              <Td borderColor="var(--chakra-colors-gray-200)">
                                                Italian Director
                                              </Td>
                                              <Td borderColor="var(--chakra-colors-gray-200)">
                                                {row.values["italianDirector"].name}
                                              </Td>
                                            </Tr>
                                          )}
                                        </Tbody>
                                      </Table>
                                    </Box>
                                  </TableContainer>
                                </ModalBody>
  
                                <ModalFooter>
                                  <Button colorScheme="blue" mr={3} onClick={() => handleCloseModal(index)}>
                                    Close
                                  </Button>
                                </ModalFooter>
                              </ModalContent>
                            </Modal>{" "}
                          </>
                        );
                      }
                      
                    return (
                      <Td
                        {...cell.getCellProps()}
                        key={index}
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor='transparent'>
                        {data}
                      </Td>
                    );
                  }
                    
                  })}
                </Tr>
  
              );
                              
            })}
          </Tbody>
        </Table>
      </Card>
    );
  }
  