import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

function TeddyImage() {
  return (
    <Box sx={{ marginTop: "auto", marginBottom: "auto" }}>
      <Card sx={{ alignItems: "center" }}>
        <img src="https://image.shutterstock.com/image-photo/cute-teddy-bear-isolated-on-600w-2022108608.jpg" alt="Teddy Bear" loading="lazy" />
      </Card>
    </Box>
  );
}

export default TeddyImage;
