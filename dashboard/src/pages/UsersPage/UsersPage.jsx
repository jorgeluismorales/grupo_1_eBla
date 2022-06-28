import React, { useState } from "react";
import Table from "../../components/Table";
import { deleteUserById } from "../../services/users";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Button, Stack } from "@mui/material";
import { DialogDelete } from "../../components/DialogDelete";
import { DialogCreateUser } from "../../components/DialogsUser/DialogCreateUser";
import { useUserMutation, useUsers } from "../../hooks";
import Spinner from "../../components/common/Spinner";

const UserPage = () => {
    const [openDeleteModel, setOpenDeleteModel] = useState(false);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [userId, setUserId] = useState(null);

    const { data, isLoading } = useUsers();
    const { deleteById } = useUserMutation();

    const [columns, setColumns] = useState([
        {
            name: "id",
            label: "Id",
            options: {
                setCellHeaderProps: (value) => {
                    return {
                        style: {
                            fontWeight: "bold",
                            fontSize: "1em",
                        },
                    };
                },
            },
        },
        {
            name: "firstname",
            label: "Name",
            options: {
                setCellHeaderProps: (value) => {
                    return {
                        style: {
                            fontWeight: "bold",
                            fontSize: "1em",
                        },
                    };
                },
            },
        },
        {
            name: "lastname",
            label: "Last name",
            options: {
                setCellHeaderProps: (value) => {
                    return {
                        style: {
                            fontWeight: "bold",
                            fontSize: "1em",
                        },
                    };
                },
            },
        },
        {
            name: "email",
            label: "Email",
            options: {
                setCellHeaderProps: (value) => {
                    return {
                        style: {
                            fontWeight: "bold",
                            fontSize: "1em",
                        },
                    };
                },
            },
        },
        {
            name: "Actions",
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRender: (rowIndex, dataIndex) => {
                    return (
                        <Stack spacing={2} direction='row' sx={{ justifyContent: "flex-end" }}>
                            <Tooltip title='Edit' arrow>
                                <IconButton
                                    variant='contained'
                                    color='info'
                                    onClick={() => editUser(dataIndex)}
                                    aria-label='edit'
                                    size='small'
                                >
                                    <EditIcon style={{ fontSize: 24 }} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title='Delete' arrow>
                                <IconButton
                                    variant='contained'
                                    color='error'
                                    onClick={() => {
                                        getUserId(dataIndex);
                                    }}
                                    aria-label='delete'
                                    size='small'
                                >
                                    <DeleteIcon style={{ fontSize: 24 }} />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    );
                },
                setCellHeaderProps: (value) => {
                    return {
                        style: {
                            fontWeight: "bold",
                            fontSize: "1em",
                            textAlign: "right",
                        },
                    };
                },
            },
        },
    ]);

    async function getUserId(id) {
        setUserId(id.rowData[0]);
        setOpenDeleteModel(true);
    }

    async function editUser(id) {
        setUserId(id.rowData[0]);
        setOpenUpdateModal(true);
    }

    function createUser() {
        setOpenCreateModal(true);
    }

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "flex-end", marginBottom: 2 }}>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={createUser}
                    startIcon={<AddCircleIcon style={{ fontSize: 24 }} />}
                >
                    Create
                </Button>
            </Box>

            <Table data={data.users} columns={columns} title='Users' />

            {openDeleteModel && Boolean(userId) && (
                <DialogDelete
                    open={openDeleteModel}
                    id={userId}
                    onClose={() => setOpenDeleteModel(false)}
                    onDelete={deleteById}
                    title='user'
                />
            )}

            {openCreateModal && <DialogCreateUser open={openCreateModal} onClose={() => setOpenCreateModal(false)} />}

            {openUpdateModal && Boolean(userId) && (
                <DialogCreateUser open={openUpdateModal} id={userId} onClose={() => setOpenUpdateModal(false)} />
            )}
        </>
    );
};

export default UserPage;
