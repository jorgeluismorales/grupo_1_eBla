import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Button, Stack } from "@mui/material";
import { DialogDelete } from "../../components/DialogDelete";
import { DialogCreateProduct } from "../../components/DialogsProduct/DialogCreateProduct";
import { useProductMutation, useProducts } from "../../hooks";
import Spinner from "../../components/common/Spinner";

const ProductsPage = () => {
    const [openDeleteModel, setOpenDeleteModel] = useState(false);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState(null);

    const { data, isLoading } = useProducts();
    const { deleteById } = useProductMutation();

    useEffect(() => {
        if (data) {
            setProducts(
                data.products.map((product) => {
                    return {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        discount: product.discount,
                        category: product.category.categoryName,
                    };
                })
            );
        }
    }, [data]);

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
            name: "name",
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
            name: "price",
            label: "Price",
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
            name: "discount",
            label: "Discount",
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
            name: "category",
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
                                    onClick={() => editProductId(dataIndex)}
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
                                    onClick={() => getProductId(dataIndex)}
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

    async function getProductId(id) {
        setProductId(id.rowData[0]);
        setOpenDeleteModel(true);
    }

    function createProduct() {
        setOpenCreateModal(true);
    }

    async function editProductId(id) {
        setProductId(id.rowData[0]);
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
                    onClick={createProduct}
                    startIcon={<AddCircleIcon style={{ fontSize: 24 }} />}
                >
                    Create
                </Button>
            </Box>

            <Table data={products} columns={columns} title='Products' />

            {openDeleteModel && Boolean(productId) && (
                <DialogDelete
                    open={openDeleteModel}
                    id={productId}
                    onClose={() => setOpenDeleteModel(false)}
                    onDelete={deleteById}
                    title='product'
                />
            )}

            {openCreateModal && (
                <DialogCreateProduct open={openCreateModal} onClose={() => setOpenCreateModal(false)} />
            )}

            {openUpdateModal && Boolean(productId) && (
                <DialogCreateProduct open={openUpdateModal} id={productId} onClose={() => setOpenUpdateModal(false)} />
            )}
        </>
    );
};

export default ProductsPage;
