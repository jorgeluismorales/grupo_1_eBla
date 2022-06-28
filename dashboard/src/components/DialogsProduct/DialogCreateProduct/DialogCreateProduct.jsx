import { TextField, MenuItem, Grid, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { DialogBase } from "../../DialogBase";
import CustomFileUpload from "../../common/CustomFileUpload";
import { useCategories, useProduct, useProductMutation } from "../../../hooks";

const DialogCreateProduct = ({ onClose, open, id }) => {
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setcategoryId] = useState(null);
    const [categories, setCategories] = useState([]);
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [error, setError] = useState(null);

    const { data: categoryData } = useCategories();
    const { data: productData, refetch } = useProduct(id, { enabled: false });
    const { create, update } = useProductMutation();

    useEffect(() => {
        if (id) {
            refetch();
        }
    }, [id]);

    useEffect(() => {
        if (productData) {
            setDescription(productData.data.description);
            setName(productData.data.name);
            setDiscount(productData.data.discount);
            setPrice(productData.data.price);
        }
    }, [productData]);

    useEffect(() => {
        if (categoryData) {
            if (productData) {
                const categoryName = productData.data.category.categoryName;
                const category = categoryData.categories.find((c) => c.categoryName === categoryName);

                if (category) {
                    setcategoryId(category.id);
                }
            }

            setCategories(categoryData.categories);
        }
    }, [productData, categoryData]);

    const createNewProduct = async () => {
        if (!name || !description || !categoryId || !price || !discount || !image) {
            setError("Please fill all fields");
            return;
        }

        const formData = new FormData();

        formData.append("image", image);
        formData.append("name", name);
        formData.append("description", description);
        formData.append("categoryId", categoryId);
        formData.append("price", price);
        formData.append("discount", discount);

        setError(null);

        create(
            { data: formData },
            {
                onSuccess: () => {
                    handleClose();
                },
                onError: () => {
                    setError("Error creating product");
                },
            }
        );
    };

    const updateProduct = async () => {
        const formData = new FormData();
        const priceInt = parseInt(price);
        const discountInt = parseInt(discount);

        if (image) {
            formData.append("image", image);
        }
        if (name) {
            formData.append("name", name);
        }
        if (description) {
            formData.append("description", description);
        }
        if (categoryId) {
            formData.append("categoryId", categoryId);
        }
        if (price) {
            formData.append("price", priceInt);
        }
        if (discount) {
            formData.append("discount", discountInt);
        }

        setError(null);

        update(
            { id: id, data: formData },
            {
                onSuccess: () => {
                    handleClose();
                },
                onError: () => {
                    setError("Error updating product");
                },
            }
        );
    };

    const handleClose = () => {
        onClose();
        setImage(null);
        setName("");
        setDescription("");
        setcategoryId(null);
        setPrice(0);
        setDiscount(0);
    };

    const handleMutate = () => {
        if (Boolean(id)) {
            updateProduct();
        } else {
            createNewProduct();
        }
    };

    return (
        <DialogBase
            onClose={onClose}
            open={open}
            actions={[
                {
                    text: "Cancel",
                    onClick: handleClose,
                },
                {
                    text: Boolean(id) ? "Update" : "Create",
                    default: true,
                    onClick: handleMutate,
                },
            ]}
            title={Boolean(id) ? "Update Product" : "Create Product"}
        >
            <Grid container spacing={2}>
                <Grid item xs={7}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label='Product name'
                                value={name}
                                type='text'
                                fullWidth
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label='Product description'
                                value={description}
                                type='text'
                                multiline
                                rows={5}
                                fullWidth
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={5}>
                    <Grid container direction='column' spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label='Select category'
                                select
                                size='small'
                                fullWidth
                                color='secondary'
                                helperText='Please select the category'
                                value={categoryId}
                                InputLabelProps={{
                                    shrink: Boolean(categoryId),
                                }}
                                onChange={(e) => setcategoryId(e.target.value)}
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.categoryName}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        label='Discount'
                                        value={discount}
                                        type='number'
                                        fullWidth
                                        onChange={(e) => setDiscount(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label='Price'
                                        value={price}
                                        type='number'
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <CustomFileUpload onFileSelect={(file) => setImage(file)} />
                        </Grid>
                    </Grid>
                </Grid>

                {Boolean(error) && (
                    <Grid item xs={12}>
                        <Alert severity='error'>{error}</Alert>
                    </Grid>
                )}
            </Grid>
        </DialogBase>
    );
};

export default DialogCreateProduct;
