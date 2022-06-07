import React from "react";
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useFormik } from 'formik';
import * as yup from 'yup';
import loginUser from "../Services/login";
import Modal from '@mui/material/Modal'
import { AppContext } from '../Context/AppContext'
import Typography from '@mui/material/Typography';

function LoginUsuario() {
  const { showLogin, setShowLogin } = React.useContext(AppContext)
  const navigate = useNavigate();
  const validationLogin = yup.object({
    email: yup
      .string('Digite um email')
      .email('Digite um email válido')
      .required('O email é obrigatório'),
    password: yup
      .string('Digite sua senha')
      .required('A senha é obrigatória'),
  });

  const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: validationLogin,
      onSubmit: (values) => {
        loginUser({
          email: values.email,
          password: values.password
        })
        .then(() => {
          navigate("/dashboard")
        })
        .catch((error) => {
          console.log(error)
        })
    },
  })

  return (
    <Modal 
      open={showLogin}
      onClose={() => setShowLogin(false)}
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        borderRadius: '10px',
        border: 'none'
      }} 
    >
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '600px',
        }}
        backgroundColor="#fff"
        padding="40px 20px"
        borderRadius="10px"
      >
        <Typography component="h5" variant="h6">
          <b>Faça o login e gerencie seus Amigo Secreto</b>
        </Typography>
        <Box padding="8% 10%" textAlign="center" sx={{ mt: 1 }}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              variant="contained"
              type="submit"
              onClick={() => console.log('entrar')}
              style={{ backgroundColor:"#147A12" }}
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
          </form>
        </Box>
      </Box>
    </Modal>
  )
}

export default function Login () {
  return <LoginUsuario />
}
