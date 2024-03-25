import {
    Avatar,
    Flex,
    Table,
    Checkbox,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    Button,
    useColorModeValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Select,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from "react-table";

// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";


export default function AdminsTable(props) {
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

    const [isRoleModalOpen, setIsRoleModalOpen] = useState(new Array(data.length).fill(false));

    const handleOpenRoleModal = (rowIndex) => {
        const updatedModalState = [...isRoleModalOpen];
        updatedModalState[rowIndex] = true;
        setIsRoleModalOpen(updatedModalState);
    };

    const handleCloseRoleModal = (rowIndex) => {
        const updatedModalState = [...isRoleModalOpen];
        updatedModalState[rowIndex] = false;
        setIsRoleModalOpen(updatedModalState);
    };

    const [adminRole, setAdminRole] = useState(""); // State for selected admin role


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
                            {headerGroup.headers.map((column, index) => (
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
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {page.map((row, index) => {
                        prepareRow(row);
                        return (
                            <Tr {...row.getRowProps()} key={index}>
                                {row.cells.map((cell, index) => {
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
                                    } else if (cell.column.Header === "PHONE") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value ? cell.value : "not asigned yet"}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "ADDRESS") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value ? cell.vlaue : "not assigned yet"}
                                            </Text>
                                        );
                                    }
                                    else if (cell.column.Header === "ROLE") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    }
                                    else if (cell.column.Header === "JOINED AT") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {(cell.value).slice(0, 10)}
                                            </Text>
                                        );
                                    }
                                    else if (cell.column.Header === "ACCTION") {
                                        data = (
                                            <Button colorScheme="blue">
                                                Remove
                                            </Button>
                                        );
                                    }
                                    else if (cell.column.Header === "CHANGE ROLE") {
                                        data = (
                                            <>
                                                <Button onClick={() => handleOpenRoleModal(index)} colorScheme="blue">
                                                    Change Role
                                                </Button>
                                                <Modal isOpen={isRoleModalOpen[index]} onClose={() => handleCloseRoleModal(index)}>
                                                    <ModalOverlay />
                                                    <ModalContent minW="500px">
                                                        <ModalHeader>Change Role</ModalHeader>
                                                        <ModalCloseButton />
                                                        <ModalBody>
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
                                                            <Button colorScheme="blue" mr={3} onClick={() => handleCloseRoleModal(index)}>
                                                                Close
                                                            </Button>
                                                            <Button colorScheme="blue" mr={3}>
                                                                Save
                                                            </Button>
                                                        </ModalFooter>
                                                    </ModalContent>
                                                </Modal>
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
