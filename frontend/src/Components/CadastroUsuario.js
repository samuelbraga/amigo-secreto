import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useFormik } from 'formik';
import * as yup from 'yup';
import newUser from "../Services/cadastro";
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { initialFormValues } from "../Helpers/Constants";

//TODO: COLOCAR MASCARA NO NASCIMENTO
function FormUsuario() {
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const validationLogin = yup.object({
    email: yup
      .string('Digite um email')
      .email('Digite um email válido')
      .required('O email é obrigatório'),
    password: yup
      .string('Digite sua senha')
      .required('A senha é obrigatória'),
    dataNascimento: yup
      .string('Digite sua data de nascimento')
      .required('A data de nascimento é obrigatória'),
    name: yup
      .string('Digite seu nome')
      .required('O nome é obrigatório'),
  });

  const formik = useFormik({
      initialValues: initialFormValues,
      validationSchema: validationLogin,
      onSubmit: (values) => {
        newUser({
          name: values.name,
          email: values.email,
          password: values.password
        })
          .then(() => {
            formik.setValues(initialFormValues)
            setFeedbackMessage('Cadastro efetuado com sucesso!')
            setIsVisible(true)
          })
          .catch((error) => {
            setFeedbackMessage('Não foi possível efetuar o cadastro')
            setIsVisible(true)
          })
          .finally(() => {
            setTimeout(function () {
              setIsVisible(false)
            }, 3500)
          })
    },
  })

  return (
    <Grid item xs={12} component={Paper} elevation={6} padding="10px 20px" marginRight="80px" >
    <Snackbar
      open={isVisible}
      message={feedbackMessage}
      anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
      key={'top' + 'center'}
    />
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      borderRadius="10px"
    >
      <Typography component="h5" variant="h6">
        <b>Cadastre-se agora e começe a participar dos sorteios!</b>
      </Typography>
      <Box padding="0 10%" sx={{ mt: 1 }}>
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
          <TextField
            margin="normal"
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            name="name"
            label="Nome Completo"
            type="name"
            id="name"
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            margin="normal"
            fullWidth
            value={formik.values.dataNascimento}
            onChange={formik.handleChange}
            name="dataNascimento"
            label="Data Nascimento"
            type="dataNascimento"
            id="dataNascimento"
            error={formik.touched.dataNascimento && Boolean(formik.errors.dataNascimento)}
            helperText={formik.touched.dataNascimento && formik.errors.dataNascimento}
          />
          <TextField
            margin="normal"
            fullWidth
            value={formik.values.listaPresentes}
            onChange={formik.handleChange}
            name="listaPresentes"
            label="Lista de Presente"
            helperText="Conta pra gente o que você adoraria ganhar!"
            type="listaPresentes"
            id="listaPresentes"
          />
          <Button
            variant="contained"
            type="submit"
            style={{ backgroundColor:"#147A12" }}
            sx={{ mt: 3, mb: 2 }}
          >
            Cadastrar
          </Button>
          </form>
        </Box>
      </Box>
    </Grid>
  )
}

export default function CadastroUsuario () {
  return <FormUsuario />
}
