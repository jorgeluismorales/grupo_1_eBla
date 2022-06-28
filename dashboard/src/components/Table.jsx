import { Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";


const options = {
    filter: false,
    search: false,
    download: false,
    print: false,
    selectableRows: 'none',
    viewColumns: false,
    rowsPerPageOptions: [10],
    sort: false
}

const Table = ({columns, data,title}) => {
    return (
        <MUIDataTable
            title={<Typography variant="h5">{title}</Typography>}
            data={data}
            columns={columns}
            options={options}
        />
    )
}

export default Table