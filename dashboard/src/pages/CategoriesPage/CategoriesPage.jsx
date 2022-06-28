import React, { useState } from "react";
import Table from "../../components/Table";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Button, Stack } from "@mui/material";
import { DialogCreateCategory } from "../../components/DialogsCategory/DialogCreateCategory";
import Spinner from "../../components/common/Spinner";
import { useCategories, useCategoryMutation } from "../../hooks";
import { DialogDelete } from "../../components/DialogDelete";

const CategoriesPage = () => {
    const [openDeleteModel, setOpenDeleteModel] = useState(false);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [categoryId, setCategoryId] = useState(null);

    const { data, isLoading } = useCategories();
    const { deleteById } = useCategoryMutation();

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
            name: "categoryName",
            label: "Category",
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
                                    onClick={() => {
                                        editCategory(dataIndex);
                                    }}
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
                                        getCategoryId(dataIndex);
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

    async function getCategoryId(id) {
        setCategoryId(id.rowData[0]);
        setOpenDeleteModel(true);
    }

    function createCategory() {
        setOpenCreateModal(true);
    }

    async function editCategory(id) {
        setCategoryId(id.rowData[0]);
        setOpenUpdateModal(true);
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
                    onClick={createCategory}
                    startIcon={<AddCircleIcon style={{ fontSize: 24 }} />}
                >
                    Create
                </Button>
            </Box>

            <Table data={data.categories} columns={columns} title='Categories' />

            {openDeleteModel && Boolean(categoryId) && (
                <DialogDelete
                    open={openDeleteModel}
                    id={categoryId}
                    onClose={() => setOpenDeleteModel(false)}
                    onDelete={deleteById}
                    title='category'
                />
            )}

            {openCreateModal && (
                <DialogCreateCategory open={openCreateModal} onClose={() => setOpenCreateModal(!openCreateModal)} />
            )}

            {openUpdateModal && Boolean(categoryId) && (
                <DialogCreateCategory
                    open={openUpdateModal}
                    id={categoryId}
                    onClose={() => setOpenUpdateModal(false)}
                />
            )}
        </>
    );
};

export default CategoriesPage;
