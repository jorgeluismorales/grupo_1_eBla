import { TextField, MenuItem, Grid, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { DialogBase } from "../../DialogBase";
import CustomFileUpload from "../../common/CustomFileUpload";
import { useUser, useUserMutation } from "../../../hooks";

const DialogCreateUser = ({ onClose, open, id }) => {
    const [image, setImage] = useState(null);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [error, setError] = useState(null);
    const { create, update } = useUserMutation();
    const { data: userData, refetch } = useUser(id, { enabled: false });

    useEffect(() => {
        if (id) {
            refetch();
        }
    }, [id]);

    useEffect(() => {
        if (userData) {
            setEmail(userData.data.email);
            setFirstname(userData.data.firstname);
            setLastname(userData.data.lastname);
        }
    }, [userData]);

    const createNewUser = async () => {
        if (!firstname || !lastname || !email || !password || !image) {
            setError("Please fill all fields");
            return;
        }

        const formData = new FormData();

        formData.append("image", image);
        formData.append("firstname", firstname);
        formData.append("lastname", lastname);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("role", role);

        setError(null);

        create(
            { data: formData },
            {
                onSuccess: () => {
                    handleClose();
                },
                onError: () => {
                    setError("Error creating user");
                },
            }
        );
    };

    const updateUser = async () => {
        const formData = new FormData();
        if (image) {
            formData.append("image", image);
        }
        if (firstname) {
            formData.append("firstname", firstname);
        }
        if (lastname) {
            formData.append("lastname", lastname);
        }
        if (email) {
            formData.append("email", email);
        }
        if (password) {
            formData.append("password", password);
        }
        if (role) {
            formData.append("role", role);
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
        setFirstname("");
        setLastname("");
        setEmail("");
        setPassword("");
        setRole("user");
    };

    const handleMutate = () => {
        if (Boolean(id)) {
            updateUser();
        } else {
            createNewUser();
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
            title={Boolean(id) ? "Update User" : "Create User"}
        >
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        label='First name'
                        value={firstname}
                        type='text'
                        fullWidth
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label='Last name'
                        value={lastname}
                        type='text'
                        fullWidth
                        onChange={(e) => setLastname(e.target.value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label='Email'
                        value={email}
                        type='email'
                        fullWidth
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label='Password'
                        value={password}
                        type='password'
                        fullWidth
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label='Select role'
                        select
                        size='small'
                        color='secondary'
                        fullWidth
                        helperText='Please select the role'
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <MenuItem value='user'>User</MenuItem>
                        <MenuItem value='admin'>Admin</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={6}>
                    <CustomFileUpload onFileSelect={(file) => setImage(file)} />
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

export default DialogCreateUser;
