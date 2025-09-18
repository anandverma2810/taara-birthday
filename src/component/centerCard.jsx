import { Box, Stack } from '@mui/material';
import BirthdayCounter from './birthdayCounter';

const CenterCard = () => {
    return (
        <Stack direction={"column"}>
            <Box
                sx={{
                    width: "42rem",
                    height: "16rem",
                    background: "rgba(255, 255, 255, 0.2)", // semi-transparent
                    backdropFilter: "blur(6px)", // blur effect
                    WebkitBackdropFilter: "blur(8px)", // Safari support
                    border: "0.1rem solid rgba(255, 255, 255, 0.3)", // optional frosted border
                    borderRadius: "2rem",
                    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    py:"5rem"
                }}
            >
                <BirthdayCounter />
            </Box>
        </Stack>
    )
}

export default CenterCard;