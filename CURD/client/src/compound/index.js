import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";

function Create() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:4000/", {
      name,
      email,
    });
    setName("");
    setEmail("");
  };

  useEffect(() => {
    axios.get("http://localhost:4000/").then((res) => setData(res.data));
  }, [data]);

  const handleUpdate = (id) => {
    axios
      .put(`http://localhost:4000/update/${id}`, {
        name: updatedName,
        email: updatedEmail,
      })
      .then((res) => {
        setData([...data, res.data]);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/delete/${id}`);
  };

  const handleEdit = (id, name, email) => {
    setUpdateId(id);
    setUpdatedName(name);
    setUpdatedEmail(email);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom color="primary" align="center">
        User Management
      </Typography>

      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            alignItems: "center",
          }}
        >
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ minWidth: "150px" }}
          >
            Submit
          </Button>
        </Box>
      </form>

      <Typography variant="h5" gutterBottom color="secondary" align="left">
        User List
      </Typography>

      <Grid container spacing={3}>
        {data.map((value, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              variant="outlined"
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: updateId === value._id ? "#f9fbe7" : "#ffffff",
              }}
            >
              <CardContent>
                {updateId === value._id ? (
                  <>
                    <TextField
                      label="Name"
                      variant="outlined"
                      value={updatedName}
                      onChange={(e) => setUpdatedName(e.target.value)}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Email"
                      variant="outlined"
                      value={updatedEmail}
                      onChange={(e) => setUpdatedEmail(e.target.value)}
                      fullWidth
                      margin="normal"
                    />
                    <CardActions>
                      <Button
                        variant="contained"
                        color="success"
                        fullWidth
                        onClick={() => handleUpdate(value._id)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        onClick={() => setUpdateId("")}
                      >
                        Cancel
                      </Button>
                    </CardActions>
                  </>
                ) : (
                  <>
                    <Typography variant="h6" color="text.primary">
                      {value.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {value.email}
                    </Typography>
                    <CardActions>
                      <Button
                        variant="contained"
                        color="info"
                        fullWidth
                        onClick={() =>
                          handleEdit(value._id, value.name, value.email)
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        onClick={() => handleDelete(value._id)}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Create;
