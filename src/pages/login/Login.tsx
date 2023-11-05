import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserApi } from "../../hooks/api/useUserApi";
import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
} from "@mui/material";

// test, Test!2345678

export default function Login() {
  const { Login, isSuccess, isLoading } = useUserApi();
  const navigate = useNavigate();

  const handleLogin = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    Login({
      username: data.get("username") as string,
      password: data.get("password") as string,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

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
