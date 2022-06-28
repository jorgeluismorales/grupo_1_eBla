import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function LastProduct({ image, title, description }) {
    const handleImageError = (e) => {
        e.target.onerror = null;
        e.target.src = "https://via.placeholder.com/380x200";
    };

    return (
        <Card elevation={0} sx={{ maxWidth: 400, backgroundColor: "white", border: "1px solid #ccc" }}>
            <CardMedia
                component='img'
                alt={title}
                height='200'
                image={image}
                sx={{ objectFit: "contain" }}
                onError={handleImageError}
            />
            <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                    {title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
}
