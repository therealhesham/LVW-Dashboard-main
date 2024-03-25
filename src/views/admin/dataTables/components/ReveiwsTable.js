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



  export default function ReveiwsTable(props) {
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
      nextPage,
      previousPage,
      canNextPage,
      canPreviousPage,
      state: { pageIndex },
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
                    if (cell.column.Header === "USERNAME") {
                        data = (
                              <Text
                                color={textColor}
                                fontSize='sm'
                                fontWeight='600'>
                                {row.values["book"].user?.name}
                              </Text>
                          );
                    } else if (cell.column.Header === "TOUR") {
                      data = (
                        <Flex align='center'>
                          <Text
                            me='10px'
                            color={textColor}
                            fontSize='sm'
                            fontWeight='700'>
                            {row.values["book"].tour?.title}
                          </Text>
                        </Flex>
                      );
                    } 
                    else if (cell.column.Header === "RATE") {
                      data = (
                        <Flex align='center'>
                          <Text
                            me='10px'
                            color={textColor}
                            fontSize='sm'
                            fontWeight='700'>
                            {(cell.value * 20).toFixed(1)}%
                          </Text>
                        </Flex>
                      );
                    } 
                    else if (cell.column.Header === "TOUR COMMENT") {
                      data = (
                        <Flex align='center'>
                          <Text
                            w='150px'
                            me='10px'
                            color={textColor}
                            fontSize='sm'
                            fontWeight='700'>
                            {cell.value}
                          </Text>
                        </Flex>
                      );
                    } 
                    else if (cell.column.Header === "GUESTS") {
                      data = (
                        <Flex align='center'>
                          <Text
                            w='150px'
                            me='10px'
                            color={textColor}
                            fontSize='sm'
                            fontWeight='700'>
                            {row.values["book"].numberOfGuests}
                          </Text>
                        </Flex>
                      );
                    } 
                    else if (cell.column.Header === "PRICE") {
                      data = (
                        <Flex align='center'>
                          <Text
                            w='150px'
                            me='10px'
                            color={textColor}
                            fontSize='sm'
                            fontWeight='700'>
                            {row.values["book"].price}
                          </Text>
                        </Flex>
                      );
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
                                          {row.values["book"].language === "Arabic" &&
                                          <>
                                            <Tr>
                                              <Td>tour  Guide name</Td>
                                              <Td>{row.values["book"].tour?.arabicTourGuide?.name}</Td>
                                            </Tr>
                                            <Tr>
                                              <Td>tour  Guide rate</Td>
                                              <Td>{(row.values["tourGideRate"] * 20).toFixed(1)}%</Td>
                                            </Tr>
                                            <Tr>
                                              <Td>tour  Guide comment</Td>
                                              <Td>{row.values["tourGideComment"]}</Td>
                                            </Tr>
                                            <Tr>
                                              <Td>Camera Operator name</Td>
                                              <Td>{row.values["book"].tour?.arabicCameraOperator?.name}</Td>
                                            </Tr>
                                            <Tr>
                                              <Td>Camera Operator rate</Td>
                                              <Td>{(row.values["cameraOperatorRate"] * 20).toFixed(1)}%</Td>
                                            </Tr>
                                            <Tr>
                                              <Td>Camera Operator comment</Td>
                                              <Td>{row.values["cameraOperatorComment"]}</Td>
                                            </Tr>
                                            <Tr>
                                              <Td>Director name</Td>
                                              <Td>{row.values["book"].tour?.arabicDirector?.name}</Td>
                                            </Tr>
                                            <Tr>
                                              <Td>Director rate</Td>
                                              <Td>{(row.values["directorRate"] * 20).toFixed(1)}%</Td>
                                            </Tr>
                                            <Tr>
                                              <Td>Director comment</Td>
                                              <Td>{row.values["directorComment"]}</Td>
                                            </Tr>
                                            </>
                                              }
                                          {row.values["book"].language === "English" &&
                                          <>
                                            <Tr>
                                              <Td>tour  Guide name</Td>
                                              <Td>{row.values["book"].tour?.englishTourGuide?.name}</Td>
                                            </Tr>
                                            <Tr>
                                              <Td>tour  Guide rate</Td>
                                              <Td>{row.values["tourGuideRate"]}</Td>
                                            </Tr>
                                            <Tr>
                                              <Td>tour  Guide comment</Td>
                                              <Td>{row.values["tourGuideComment"]}</Td>
                                            </Tr>
                                            <Tr>
                                              <Td>Camera Operator name</Td>
                                              <Td>{row.values["book"].tour?.englishCameraOperator?.name}</Td>
                                            </Tr>
                                            <Tr>
                                              <Td>Camera Operator rate</Td>
                                              <Td>{row.values["cameraOperatorRate"]}</Td>
                                            </Tr>
                                            <Tr>
                                              <Td>Camera Operator comment</Td>
                                              <Td>{row.values["cameraOperatorComment"]}</Td>
                                            </Tr>
                                            <Tr>
                                              <Td>Director name</Td>
                                              <Td>{row.values["book"].tour?.englishDirector?.name}</Td>
                                            </Tr>
                                            <Tr>
                                              <Td>Director rate</Td>
                                              <Td>{row.values["directorRate"]}</Td>
                                            </Tr>
                                            <Tr>
                                              <Td>Director comment</Td>
                                              <Td>{row.values["directorComment"]}</Td>
                                            </Tr>
                                            </>
                                              }
                                          {row.values["book"].language === "Italian" &&
                                          <>
                                            <Tr>
                                              <Td>tour  Guide name</Td>
                                              <Td>{row.values["book"].tour?.italianTourGuide?.name}</Td>
                                            </Tr>
                                            <Tr>
                                              <Td>tour  Guide rate</Td>
                                              <Td>{row.values["tourGuideRate"]}</Td>
                                            </Tr>
                                            <Tr>
                                              <Td>tour  Guide comment</Td>
                                              <Td>{row.values["tourGuideComment"]}</Td>
                                            </Tr>
                                            <Tr>
                                              <Td>Camera Operator name</Td>
                                              <Td>{row.values["book"].tour?.italianCameraOperator?.name}</Td>
                                            </Tr>
                                            <Tr>
                                              <Td>Camera Operator rate</Td>
                                              <Td>{row.values["cameraOperatorRate"]}</Td>
                                            </Tr>
                                            <Tr>
                                              <Td>Camera Operator comment</Td>
                                              <Td>{row.values["cameraOperatorComment"]}</Td>
                                            </Tr>
                                            <Tr>
                                              <Td>Director name</Td>
                                              <Td>{row.values["book"].tour?.italianDirector?.name}</Td>
                                            </Tr>
                                            <Tr>
                                              <Td>Director rate</Td>
                                              <Td>{row.values["directorRate"]}</Td>
                                            </Tr>
                                            <Tr>
                                              <Td>Director comment</Td>
                                              <Td>{row.values["directorComment"]}</Td>
                                            </Tr>
                                            </>
                                              }
                                          
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
        <Flex justify="center">
        <Button onClick={previousPage} disabled={!canPreviousPage}>
          Previous
        </Button>
        <Button onClick={nextPage} disabled={!canNextPage}>
          Next
        </Button>
      </Flex>
      </Card>
    );
  }
  