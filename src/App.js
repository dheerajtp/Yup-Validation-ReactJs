import { Container, Box } from "@mui/material";
import { useState } from "react";
import "./App.css";
import { userValidationSchema } from "./Validation/FormValidation";

function App() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    setError(null);
    setSuccess(null);
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const createUser = async (e) => {
    e.preventDefault();
    try {
      await userValidationSchema.validate(input);
      setSuccess("Success");
    } catch (Err) {
      const { errors } = Err;
      setError(errors);
    }
  };
  return (
    <Container>
      <form onSubmit={createUser}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            margin: "1rem",
          }}
        >
          <input
            type="text"
            placeholder="name"
            name="name"
            value={input?.name}
            onChange={inputHandler}
          />
          <input
            type="email"
            placeholder="email"
            name="email"
            value={input?.email}
            onChange={inputHandler}
          />
          <input
            type="text"
            placeholder="password"
            name="password"
            value={input?.password}
            onChange={inputHandler}
          />
          <button>Submit</button>
          {error && <p style={{ color: "red", text: "center" }}>{error}</p>}
          {success && (
            <p style={{ color: "green", text: "center" }}>{success}</p>
          )}
        </Box>
      </form>
    </Container>
  );
}

export default App;
