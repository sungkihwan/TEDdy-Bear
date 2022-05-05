import CardMedia from "@mui/material/CardMedia";

function LoginImage() {
  return (
    <CardMedia
      component="img"
      sx={{ marginTop: "auto", marginBottom: "auto" }}
      image="/loginImage.jpg"
      alt="Teddy Bear for Login Page"
    />
  );
}

export default LoginImage;
