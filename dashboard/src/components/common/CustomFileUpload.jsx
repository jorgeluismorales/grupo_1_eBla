import { Button } from "@mui/material";
import { useRef } from "react";

const CustomFileUpload = ({ onFileSelect }) => {
    const fileInput = useRef(null);

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        onFileSelect(file);
    };

    return (
        <Button
            variant='contained'
            component='label'
            fullWidth
            onClick={(e) => fileInput.current && fileInput.current.click()}
        >
            Upload File
            <input type='file' hidden onChange={handleFileInput} />
        </Button>
    );
};

export default CustomFileUpload;
