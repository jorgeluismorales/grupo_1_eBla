import { useEffect, useState } from "react";
import { DialogBase } from "../../DialogBase";
import { Alert, Grid, TextField } from "@mui/material";
import { createCategory } from "../../../services/categories";
import { useMutation, useQueryClient } from "react-query";
import { useCategory, useCategoryMutation } from "../../../hooks";

const DialogCreateCategory = ({ onClose, open, id }) => {
    const [category, setCategory] = useState("");
    const [error, setError] = useState(null);

    const { create, update } = useCategoryMutation();
    const { data: categoryData, refetch } = useCategory(id, { enabled: false });

    // const queryClient = useQueryClient();
    // const { mutate } = useMutation((categoryName) => createCategory(categoryName), {
    //     onSuccess: () => {
    //         queryClient.invalidateQueries(["categories"]);
    //         onClose();
    //         setCategory("");
    //     },
    // });

    useEffect(() => {
        if (id) {
            refetch();
        }
    }, [id]);

    useEffect(() => {
        if (categoryData) {
            setCategory(categoryData.data.categoryName);
        }
    }, [categoryData]);

    const createNewCategory = () => {
        if (!category) {
            setError("Please fill all fields");
            return;
        }

        setError(null);

        create(
            { data: category },
            {
                onSuccess: () => {
                    handleClose();
                },
                onError: () => {
                    setError("Error creating category");
                },
            }
        );
    };

    const updateCategory = () => {
        if (!category) {
            setError("Please fill all fields");
            return;
        }

        setError(null);

        update(
            { id: id, data: category },
            {
                onSuccess: () => {
                    handleClose();
                },
                onError: () => {
                    setError("Error updating category");
                },
            }
        );
    };

    const handleClose = () => {
        onClose();
        setCategory("");
    };

    const handleMutate = () => {
        if (Boolean(id)) {
            updateCategory();
        } else {
            createNewCategory();
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
            title={Boolean(id) ? "Update Category" : "Create Category"}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label='Category name'
                        value={category}
                        fullWidth
                        onChange={(e) => setCategory(e.target.value)}
                    />
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

export default DialogCreateCategory;
