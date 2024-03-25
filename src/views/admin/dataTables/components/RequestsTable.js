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
  Select,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

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

export default function RequestsTable(props) {
  const { columnsData, tableData } = props;
  const [reqData, setReqData] = useState(tableData);

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
  const [isRowModalOpen, setIsRowModalOpen] = useState(
    new Array(data.length).fill(false)
  );
  const [acceptModalOpen, setAcceptModalOpen] = useState(
    new Array(data.length).fill(false)
  );
  const [arabicTourGuide, setArabicTourGuide] = useState([]);
  const [arabicCameraOperator, setArabicCameraOperators] = useState([]);
  const [arabicDirectors, setArabicDirectors] = useState([]);
  const [englishTourGuide, setEnglishTourGuide] = useState([]);
  const [englishCameraOperator, setEnglishCameraOperators] = useState([]);
  const [englishDirector, setEnglishDirector] = useState([]);
  const [italianTourGuide, setItalianTourGuide] = useState([]);
  const [italianCameraOperator, setItalianCameraOperators] = useState([]);
  const [italianDirectors, setItalianDirectors] = useState([]);
  const [tourGuide, setTourGuide] = useState("")
  const [cameraOperator, setCameraOperator] = useState("")
  const [director, setDirector] = useState("")

  useEffect(() => {
    axios.get("http://localhost:5000/admin/arabicTourGuides").then((res) => {
      console.log(res.data.data);
      setArabicTourGuide(res.data.data);
      // console.log(arabicTourGuides);
    });
    axios
      .get("http://localhost:5000/admin/arabicCameraOperators")
      .then((res) => {
        setArabicCameraOperators(res.data.data);
      });
    axios.get("http://localhost:5000/admin/arabicDierctors").then((res) => {
      setArabicDirectors(res.data.data);
    });
    axios.get("http://localhost:5000/admin/englishTourGuides").then((res) => {
      setEnglishTourGuide(res.data.data);
    });
    axios
      .get("http://localhost:5000/admin/englishCameraOperator")
      .then((res) => {
        setEnglishCameraOperators(res.data.data);
      });
    axios.get("http://localhost:5000/admin/englishDirectors").then((res) => {
      setEnglishDirector(res.data.data);
    });
    axios.get("http://localhost:5000/admin/italianoTourGuides").then((res) => {
      setItalianTourGuide(res.data.data);
    });
    axios
      .get("http://localhost:5000/admin/italianoCameraOperator")
      .then((res) => {
        setItalianCameraOperators(res.data.data);
      });
    axios.get("http://localhost:5000/admin/italianoDirectors").then((res) => {
      setItalianDirectors(res.data.data);
    });
  }, []);

  const handleOpenModal = (rowIndex) => {
    const updatedModalState = [...isRowModalOpen];
    updatedModalState[rowIndex] = true;
    setIsRowModalOpen(updatedModalState);
  };
  const handleOpenAcceptModal = (rowIndex) => {
    const updatedModalState = [...acceptModalOpen];
    updatedModalState[rowIndex] = true;
    setAcceptModalOpen(updatedModalState);
  };

  const handleCloseModal = (rowIndex) => {
    const updatedModalState = [...isRowModalOpen];
    updatedModalState[rowIndex] = false;
    setIsRowModalOpen(updatedModalState);
  };
  const handleCloseAcceptModal = (rowIndex) => {
    const updatedModalState = [...acceptModalOpen];
    updatedModalState[rowIndex] = false;
    setAcceptModalOpen(updatedModalState);
  };

  function submit(id) {
    axios.get("http://localhost:5000/admin/requestById", { params: { id: id } }).then((res) => {
      console.log(res.data)
      axios.post("http://localhost:5000/admin/acceptRequest", {
        tour: res.data.data.tour,
        language: res.data.data.language,
        emails: res.data.data.emails,
        startTime: res.data.data.startTime,
        tourGuide: tourGuide,
        cameraOperator: cameraOperator,
        director: director,
        user: res.data.data.user,
        Request: id
      }).then((result) => {
        if(result.data.status == 200 ){
          window.location.reload();
        } else{
          console.log(result)
        }
      })
    })
    console.log(id)
  }

  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex px="25px" justify="space-between" mb="20px" align="center"></Flex>
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
                    let tData = "";

                    if (cell.column.Header === "User") {
                      tData = (
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
                    } else if (cell.column.Header === "Country") {
                      tData = (
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
                    } else if (cell.column.Header === "City") {
                      tData = (
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
                      tData = (
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value}$
                        </Text>
                      );
                    } else if (cell.column.Header === "AVGRATE") {
                      tData = (
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value
                            ? `${(cell.value * 20).toFixed(1)}%`
                            : "0%"}
                        </Text>
                      );
                    } else if (cell.column.Header === "TOUR GUIDE") {
                      tData = (
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value.name}
                        </Text>
                      );
                    } else if (cell.column.Header === "CAMERA OPERATOR") {
                      tData = (
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "DIRECTOR") {
                      tData = (
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "CATEGORY") {
                      tData = (
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "Date") {
                      const dataValue = row.values["startTime"] || "";
                      tData = (
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {dataValue?.slice(0, 10)}
                        </Text>
                      );
                    } else if (cell.column.Header === "TIME") {
                      const dataValue = row.values["startTime"] || "";
                      const localTime = new Date(dataValue).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                      tData = (
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {localTime}
                        </Text>
                      );
                    } else if (cell.column.Header === "Language") {
                      tData = (
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
                    } else if (cell.column.Header === "More Details") {
                      tData = (
                        <>
                          {" "}
                          <Button
                            onClick={() => handleOpenModal(index)}
                            colorScheme="blue"
                          >
                            More Details
                          </Button>{" "}
                          <Modal
                            isOpen={isRowModalOpen[index]}
                            onClose={() => handleCloseModal(index)}
                          >
                            <ModalOverlay />
                            <ModalContent minW="500px">
                              <ModalHeader>Modal Title</ModalHeader>
                              <ModalCloseButton />
                              <ModalBody>
                                <TableContainer>
                                  <Box
                                    borderWidth="1px"
                                    borderRadius="lg"
                                    overflow="hidden"
                                  >
                                    <Table variant="simple">
                                      <Tbody>
                                        {row.values["emails"] && (
                                          <Tr>
                                            <Td>Number Of Guests</Td>
                                            <Td>
                                              {row.values["emails"].length}
                                            </Td>
                                          </Tr>
                                        )}
                                        {row.values["tour"] && (
                                          <Tr>
                                            <Td>price</Td>
                                            <Td>
                                              {row.values["tour"].price * 5}$
                                            </Td>
                                          </Tr>
                                        )}
                                        {row.values["tour"] && (
                                          <Tr>
                                            <Td>Tour Title</Td>
                                            <Td>{row.values["tour"].title}</Td>
                                          </Tr>
                                        )}
                                        {row.values["tour"] && (
                                          <Tr>
                                            <Td>Tour Hours</Td>
                                            <Td>{row.values["tour"].hours}</Td>
                                          </Tr>
                                        )}
                                      </Tbody>
                                    </Table>
                                  </Box>
                                </TableContainer>
                              </ModalBody>

                              <ModalFooter>
                                <Button
                                  colorScheme="blue"
                                  mr={3}
                                  onClick={() => handleCloseModal(index)}
                                >
                                  Close
                                </Button>
                              </ModalFooter>
                            </ModalContent>
                          </Modal>{" "}
                        </>
                      );
                    } else if (cell.column.Header === "action") {
                      tData = (
                        <>
                          {" "}
                          <Button
                            onClick={() => handleOpenAcceptModal(index)}
                            colorScheme="blue"
                          >
                            Accept Request
                          </Button>{" "}
                          <Modal
                            isOpen={acceptModalOpen[index]}
                            onClose={() => handleCloseAcceptModal(index)}
                          >
                            <ModalOverlay />
                            <ModalContent minW="500px">
                              <ModalHeader>Accept</ModalHeader>
                              <ModalCloseButton />
                              <ModalBody>
                                <TableContainer>
                                  <Box
                                    borderWidth="1px"
                                    borderRadius="lg"
                                    overflow="hidden"
                                  >
                                    <Table variant="simple">
                                      <Tbody>
                                        {row.values["language"] === "arabic" && (
                                          <Tr>
                                            <Td>Select Tour Guide</Td>
                                            <Td>
                                              <Select
                                                placeholder="Select tour guide"
                                                mb="24px"
                                                mr="10px"
                                                onChange={(e) =>
                                                  setTourGuide(e.target.value)
                                                }
                                              >
                                                {arabicTourGuide &&
                                                  arabicTourGuide.map(
                                                    (value, index) => {
                                                      return (
                                                        <option
                                                          key={value._id}
                                                          value={value._id}
                                                        >
                                                          {value.name}
                                                        </option>
                                                      );
                                                    }
                                                  )}
                                              </Select>
                                            </Td>
                                          </Tr>
                                        )}
                                        {row.values["language"] === "english" && (
                                          <Tr>
                                            <Td>Select Tour Guide</Td>
                                            <Td>
                                              <Select
                                                placeholder="Select tour guide"
                                                mb="24px"
                                                mr="10px"
                                                onChange={(e) =>
                                                  setTourGuide(e.target.value)
                                                }
                                              >
                                                {englishTourGuide &&
                                                  englishTourGuide.map(
                                                    (value, index) => {
                                                      return (
                                                        <option
                                                          key={value._id}
                                                          value={value._id}
                                                        >
                                                          {value.name}
                                                        </option>
                                                      );
                                                    }
                                                  )}
                                              </Select>
                                            </Td>
                                          </Tr>
                                        )}
                                        {row.values["language"] === "italian" && (
                                          <Tr>
                                            <Td>Select Tour Guide</Td>
                                            <Td>
                                              <Select
                                                placeholder="Select tour guide"
                                                mb="24px"
                                                mr="10px"
                                                onChange={(e) =>
                                                  setTourGuide(e.target.value)
                                                }
                                              >
                                                {italianTourGuide &&
                                                  italianTourGuide.map(
                                                    (value, index) => {
                                                      return (
                                                        <option
                                                          key={value._id}
                                                          value={value._id}
                                                        >
                                                          {value.name}
                                                        </option>
                                                      );
                                                    }
                                                  )}
                                              </Select>
                                            </Td>
                                          </Tr>
                                        )}
                                        {row.values["language"] === "arabic" && (
                                          <Tr>
                                            <Td>Select cameraOperator</Td>
                                            <Td>
                                              <Select
                                                placeholder="Select Camera Operator"
                                                mb="24px"
                                                mr="10px"
                                                onChange={(e) =>
                                                  setCameraOperator(e.target.value)
                                                }
                                              >
                                                {arabicCameraOperator &&
                                                  arabicCameraOperator.map(
                                                    (value, index) => {
                                                      return (
                                                        <option
                                                          key={value._id}
                                                          value={value._id}
                                                        >
                                                          {value.name}
                                                        </option>
                                                      );
                                                    }
                                                  )}
                                              </Select>
                                            </Td>
                                          </Tr>
                                        )}
                                        {row.values["language"] === "english" && (
                                          <Tr>
                                            <Td>Select Camera Operator</Td>
                                            <Td>
                                              <Select
                                                placeholder="Select camera operator"
                                                mb="24px"
                                                mr="10px"
                                                onChange={(e) =>
                                                  setTourGuide(e.target.value)
                                                }
                                              >
                                                {englishCameraOperator &&
                                                  englishCameraOperator.map(
                                                    (value, index) => {
                                                      return (
                                                        <option
                                                          key={value._id}
                                                          value={value._id}
                                                        >
                                                          {value.name}
                                                        </option>
                                                      );
                                                    }
                                                  )}
                                              </Select>
                                            </Td>
                                          </Tr>
                                        )}
                                        {row.values["language"] === "italian" && (
                                          <Tr>
                                            <Td>Select cameraOperator</Td>
                                            <Td>
                                              <Select
                                                placeholder="Select Camera Operator"
                                                mb="24px"
                                                mr="10px"
                                                onChange={(e) =>
                                                  setCameraOperator(e.target.value)
                                                }
                                              >
                                                {italianCameraOperator &&
                                                  italianCameraOperator.map(
                                                    (value, index) => {
                                                      return (
                                                        <option
                                                          key={value._id}
                                                          value={value._id}
                                                        >
                                                          {value.name}
                                                        </option>
                                                      );
                                                    }
                                                  )}
                                              </Select>
                                            </Td>
                                          </Tr>
                                        )}
                                        {row.values["language"] === "arabic" && (
                                          <Tr>
                                            <Td>Select director</Td>
                                            <Td>
                                              <Select
                                                placeholder="Select Director"
                                                mb="24px"
                                                mr="10px"
                                                onChange={(e) =>
                                                  setDirector(e.target.value)
                                                }
                                              >
                                                {arabicDirectors &&
                                                  arabicDirectors.map(
                                                    (value, index) => {
                                                      return (
                                                        <option
                                                          key={value._id}
                                                          value={value._id}
                                                        >
                                                          {value.name}
                                                        </option>
                                                      );
                                                    }
                                                  )}
                                              </Select>
                                            </Td>
                                          </Tr>
                                        )}
                                        {row.values["language"] === "english" && (
                                          <Tr>
                                            <Td>Select Director</Td>
                                            <Td>
                                              <Select
                                                placeholder="Select director"
                                                mb="24px"
                                                mr="10px"
                                                onChange={(e) =>
                                                  setTourGuide(e.target.value)
                                                }
                                              >
                                                {englishDirector &&
                                                  englishDirector.map(
                                                    (value, index) => {
                                                      return (
                                                        <option
                                                          key={value._id}
                                                          value={value._id}
                                                        >
                                                          {value.name}
                                                        </option>
                                                      );
                                                    }
                                                  )}
                                              </Select>
                                            </Td>
                                          </Tr>
                                        )}
                                        {row.values["language"] === "italian" && (
                                          <Tr>
                                            <Td>Select Director</Td>
                                            <Td>
                                              <Select
                                                placeholder="Select Director"
                                                mb="24px"
                                                mr="10px"
                                                onChange={(e) =>
                                                  setDirector(e.target.value)
                                                }
                                              >
                                                {italianDirectors &&
                                                  italianDirectors.map(
                                                    (value, index) => {
                                                      return (
                                                        <option
                                                          key={value._id}
                                                          value={value._id}
                                                        >
                                                          {value.name}
                                                        </option>
                                                      );
                                                    }
                                                  )}
                                              </Select>
                                            </Td>
                                          </Tr>
                                        )}

                                      </Tbody>
                                    </Table>
                                  </Box>
                                </TableContainer>
                              </ModalBody>

                              <ModalFooter>
                                <Button
                                  colorScheme="blue"
                                  mr={3}
                                  onClick={() => handleCloseModal(index)}
                                >
                                  Close
                                </Button>
                                <Button
                                  colorScheme="blue"
                                  mr={3}
                                  onClick={() => submit(row.values["_id"])}
                                >
                                  Accept
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
                        {tData}
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
