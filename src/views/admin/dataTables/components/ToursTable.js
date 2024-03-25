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
import { useDisclosure } from "@chakra-ui/react";

import React, { useMemo, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Custom components
import Card from "components/card/Card";

export default function ToursTable(props) {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

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
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex px="25px" justify="space-between" mb="20px" align="center">
      </Flex>
      <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => {
  if (column.Header) {
    return (
      <Th
        {...column.getHeaderProps(column.getSortByToggleProps())}
        pe="10px"
        key={index}
        borderColor={borderColor}
      >
        <Flex
          justify="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          {column.render("Header")}
        </Flex>
      </Th>
    );
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
                {row.cells.map((cell, cellIndex) => {
                  if (cell.column.Header) {
                    let data = "";

                    if (cell.column.Header === "TITLE") {
                      data = (
                        <Flex align="center">
                          <Text
                            color={textColor}
                            fontSize="sm"
                            fontWeight="600"
                          >
                            {cell.value}
                          </Text>
                        </Flex>
                      );
                    } else if (cell.column.Header === "LOCATION") {
                      data = (
                        <Flex align="center">
                          <Text
                            me="10px"
                            color={textColor}
                            fontSize="sm"
                            fontWeight="700"
                          >
                            {cell.value}
                          </Text>
                        </Flex>
                      );
                    } else if (cell.column.Header === "PRICE") {
                      data = (
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value}$
                        </Text>
                      );
                    } else if (cell.column.Header === "AVGRATE") {
                      data = (
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value ? `${(cell.value * 20).toFixed(1)}%` : '0%'}
                        </Text>
                      );
                    } else if (cell.column.Header === "TOUR GUIDE") {
                      data = (
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value.name}
                        </Text>
                      );
                    } else if (cell.column.Header === "CAMERA OPERATOR") {
                      data = (
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "DIRECTOR") {
                      data = (
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "CATEGORY") {
                      data = (
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "DATE") {
                      data = (
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {(cell.value).slice(0, 10)}
                        </Text>
                      );
                    } else if (cell.column.Header === "TIME") {
                      const dataValue = row.values["date"];
                      data = (
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {dataValue.slice(11, 16)}
                        </Text>
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
                                        {row.values["arabicTourGuide"] && (
                                          <Tr>
                                            <Td>Arabic Tour Guide</Td>
                                            <Td>{row.values["arabicTourGuide"].name}</Td>
                                          </Tr>
                                        )}
                                        {row.values["arabicCameraOperator"] && (
                                          <Tr>
                                            <Td>Arabic Camera Operator</Td>
                                            <Td>{row.values["arabicCameraOperator"].name}</Td>
                                          </Tr>
                                        )}
                                        {row.values["arabicDirector"] && (
                                          <Tr>
                                            <Td>Arabic Director</Td>
                                            <Td>{row.values["arabicDirector"].name}</Td>
                                          </Tr>
                                        )}
                                        {row.values["englishTourGuide"] && (
                                          <Tr>
                                            <Td>English Tour Guide</Td>
                                            <Td>{row.values["englishTourGuide"].name}</Td>
                                          </Tr>
                                        )}
                                        {row.values["englishCameraOperator"] && (
                                          <Tr>
                                            <Td>English Camera Operator</Td>
                                            <Td>{row.values["englishCameraOperator"].name}</Td>
                                          </Tr>
                                        )}
                                        {row.values["englishDirector"] && (
                                          <Tr>
                                            <Td>English Director</Td>
                                            <Td>{row.values["englishDirector"].name}</Td>
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
                        borderColor="var(--chakra-colors-gray-200)"
                      >
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
