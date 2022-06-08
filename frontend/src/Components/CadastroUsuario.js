import React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useFormik } from 'formik';
import * as yup from 'yup';
import newUser from "../Services/cadastro";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { DatePicker } from '@mui/x-date-pickers';
import { initialCadastroUsuario } from "../Helpers/Constants";
import { AppContext } from "../Context/AppContext";

//TODO: COLOCAR MASCARA NO NASCIMENTO
function FormUsuario() {
  const validationLogin = yup.object({
    email: yup
      .string('Digite um email')
      .email('Digite um email válido')
      .required('O email é obrigatório'),
    password: yup
      .string('Digite sua senha')
      .required('A senha é obrigatória'),
    birthdayData: yup
      .string('Digite sua data de nascimento')
      .required('A data de nascimento é obrigatória'),
    name: yup
      .string('Digite seu nome')
      .required('O nome é obrigatório'),
  });
  const { setIsVisible, setFeedbackMessage } = React.useContext(AppContext)
  const formik = useFormik({
      initialValues: initialCadastroUsuario,
      validationSchema: validationLogin,
      onSubmit: (values) => {
        newUser({
          name: values.name,
          email: values.email,
          password: values.password
        })
          .then(() => {
            setFeedbackMessage('Cadastro efetuado com sucesso!')
            setIsVisible(true)
            formik.setValues(initialCadastroUsuario)
            formik.setTouched({}, false)
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
    <Grid item xs={12} component={Paper} elevation={6} padding="0 20px" marginRight="80px" >
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
      <Typography component="h5" variant="h6" padding="20px 0 0 0">
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
          <DatePicker
            id="birthdayData"
            name="birthdayData"
            error={formik.touched.birthdayData && Boolean(formik.errors.birthdayData)}
            helperText={formik.touched.birthdayData && formik.errors.birthdayData}
            label="Data Nascimento"
            value={formik.values.birthdayData}
            onChange={(event) => formik.setFieldValue('birthdayData', event)}
            renderInput={(params) => <TextField {...params} margin="normal" fullWidth/>}
          />
          <TextField
            margin="normal"
            fullWidth
            value={formik.values.giftList}
            onChange={formik.handleChange}
            name="giftList"
            label="Lista de Presente"
            helperText="Conta pra gente o que você adoraria ganhar!"
            type="giftList"
            id="giftList"
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
