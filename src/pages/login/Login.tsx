import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { Auth } from "aws-amplify";

// test, Test!2345678

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      setIsLoading(true);
      const userResponse = await Auth.signIn(
        data.get("username") as string,
        data.get("password") as string
      );
      if (userResponse.challengeName == "NEW_PASSWORD_REQUIRED") {
        // console.log("NEW_PASSWORD_REQUIRED", userResponse.challengeName);
        const userWithNewPassword = await Auth.completeNewPassword(
          userResponse,
          "oiP7*V5O1"
        );
        // console.log("userWithNewPassword", userWithNewPassword);
      }
      console.log("userResponse", userResponse);

      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "2.5rem", fontFamily: "inherit" }}>
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Box display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="outlined"
              sx={{
                mt: 3,
                mb: 2,
                width: "18rem",
                bgcolor: "white",
                color: "black",
                borderRadius: "9px",
                fontSize: "1rem",
                fontFamily: "inherit",
              }}
              disabled={isLoading}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
