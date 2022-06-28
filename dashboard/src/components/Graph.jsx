import { Box } from "@mui/material";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useQueryClient } from "react-query";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Number of products by category",
        },
    },
};

export default function Graph() {
    const queryClient = useQueryClient();
    const graphData = queryClient.getQueryData("categories");

    return (
        <Box sx={{ width: "100%", backgroundColor: "white", border: "1px solid #ccc", padding: 1 }}>
            <Bar options={options} data={graphData.data} />
        </Box>
    );
}
