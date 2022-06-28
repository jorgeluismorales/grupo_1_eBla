import { Grid, Typography } from "@mui/material";
import Graph from "../../components/Graph";
import { BoxInfo } from "../../components/BoxInfo";
import LastProduct from "../../components/LastProduct";
import LastUser from "../../components/LastUser";
import { useCategories, useProducts, useUsers } from "../../hooks";
import Spinner from "../../components/common/Spinner";

const HomePage = () => {
    const { data: categories, isLoading: isLoadingCategories } = useCategories();
    const { data: products, isLoading: isLoadingProducts } = useProducts();
    const { data: users, isLoading: isLoadingUsers } = useUsers();

    if (isLoadingCategories || isLoadingProducts || isLoadingUsers) {
        return <Spinner />;
    }

    return (
        <>
            <Grid container spacing={5}>
                {/* Bloque Estadisticas */}
                <Grid item xs={6}>
                    <Grid container spacing={3}>
                        <Grid item xs={4} rowSpacing={2} columnSpacing={2}>
                            <BoxInfo title='Products' value={products.count} color='#053F5C' />
                        </Grid>

                        <Grid item xs={4}>
                            <BoxInfo title='Users' value={users.count} color='#F3AA20' />
                        </Grid>

                        <Grid item xs={4}>
                            <BoxInfo title='Categories' value={categories.count} color='#841E62' />
                        </Grid>
                    </Grid>
                </Grid>

                {/* Bloque Gráfico */}
                <Grid item xs={6}>
                    <Graph />
                </Grid>
            </Grid>

            <Grid container spacing={5} sx={{ marginTop: 5 }}>
                {/* Bloque Últimos Productos */}
                <Grid item xs={12} md={6}>
                    <Typography variant='h4' gutterBottom>
                        Last product created
                    </Typography>

                    <LastProduct
                        title={products.lastProduct.name}
                        image={products.lastProduct.image}
                        description={products.lastProduct.description}
                    />
                </Grid>

                {/* Bloque Último Usuario */}
                <Grid item xs={12} md={6}>
                    <Typography variant='h4' gutterBottom>
                        Last user created
                    </Typography>
                    <LastUser
                        firstname={users.lastUser.firstname}
                        lastname={users.lastUser.lastname}
                        image={users.lastUser.image}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default HomePage;
