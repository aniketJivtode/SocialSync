import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
 let backendUrl= process.env.REACT_APP_ENV === "prod" ? process.env.REACT_APP_BACKEND_URL : process.env.REACT_APP_LOCALHOST_BACKEND_URL;
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`${backendUrl}/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;