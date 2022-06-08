import React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { initialFormValues } from "../Helpers/Constants";
import Card from '../Assets/Card.png'
import { cadastroSorteio } from "../Services/sorteios";
import { DateTimePicker } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../Context/AppContext";

function FormSorteio() {
  const validationCadastroAS = yup.object({
    name: yup
      .string('Digite um nome válido')
      .required('O nome é obrigatório.'),
    event_date: yup
      .string('Digite uma data válida')
      .required('O data é obrigatória.'),
    gift_value: yup
      .string('Digite um valor válido')
      .required('O valor é obrigatório.'),
    cep: yup
      .string('Digite um CEP válido')
      .required('O CEP é obrigatório.'),
    street: yup
      .string('Digite uma rua válida')
      .required('A rua é obrigatória.'),
    neighborhood: yup
      .string('Digite um número válido')
      .required('O número é obrigatório.'),
    city: yup
      .string('Digite uma cidade válida')
      .required('A cidade é obrigatória.'),
    state: yup
      .string('Digite um estado válido')
      .required('O estado é obrigatório.'),
  });
  const navigate = useNavigate();
  const { setIsVisible, setFeedbackMessage } = React.useContext(AppContext)
  const userData = JSON.parse(sessionStorage.getItem('user'))
  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: validationCadastroAS,
    onSubmit: (values) => {
      cadastroSorteio(values, userData.tokenBearer)
        .then(() => {
          setFeedbackMessage('Cadastro efetuado com sucesso!')
          setIsVisible(true)
          formik.setValues(initialFormValues)
            formik.setTouched({}, false)
          navigate("/dashboard")
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
    <Grid item xs={12} component={Paper} elevation={6} padding="40px 40px" width='80%'>
      <Typography color="#147A12"
        variant="h4"
        gutterBottom
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}
      >
        <b>Cadastre o seu Amigo Secreto!</b> <img src={Card} alt="Card" />
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={1} padding="20px" >
          <Grid item xs={12} sm={6}>
            <TextField
              variant="standard"
              margin="normal"
              fullWidth
              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              label="Nome do Amigo Secreto *"
              name="name"
              autoComplete="name"
              autoFocus
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DateTimePicker
              id="event_date"
              name="event_date"
              error={formik.touched.event_date && Boolean(formik.errors.event_date)}
              helperText={formik.touched.event_date && formik.errors.event_date}
              label="Data do Amigo Secreto *"
              value={formik.values.event_date}
              onChange={(event) => formik.setFieldValue('event_date', event)}
              renderInput={(params) => <TextField {...params} variant="standard" margin="normal" fullWidth/>}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="standard"
              margin="normal"
              fullWidth
              id="gift_value"
              value={formik.values.gift_value}
              onChange={formik.handleChange}
              label="Valor Máximo do Sorteio *"
              name="gift_value"
              autoComplete="gift_value"
              autoFocus
              error={formik.touched.gift_value && Boolean(formik.errors.gift_value)}
              helperText={formik.touched.gift_value && formik.errors.gift_value}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="standard"
              margin="normal"
              fullWidth
              id="cep"
              value={formik.values.cep}
              onChange={formik.handleChange}
              label="CEP *"
              name="cep"
              autoComplete="cep"
              autoFocus
              error={formik.touched.cep && Boolean(formik.errors.cep)}
              helperText={formik.touched.cep && formik.errors.cep}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
            variant="standard"
              margin="normal"
              fullWidth
              id="street"
              value={formik.values.street}
              onChange={formik.handleChange}
              label="Rua *"
              name="street"
              autoComplete="street"
              autoFocus
              error={formik.touched.street && Boolean(formik.errors.street)}
              helperText={formik.touched.street && formik.errors.street}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
          <TextField
            variant="standard"
              margin="normal"
              fullWidth
              id="neighborhood"
              value={formik.values.neighborhood}
              onChange={formik.handleChange}
              label="Número *"
              name="neighborhood"
              autoComplete="neighborhood"
              autoFocus
              error={formik.touched.neighborhood && Boolean(formik.errors.neighborhood)}
              helperText={formik.touched.neighborhood && formik.errors.neighborhood}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
          <TextField
            variant="standard"
              margin="normal"
              fullWidth
              id="complement"
              value={formik.values.complement}
              onChange={formik.handleChange}
              label="Complemento"
              name="complement"
              autoComplete="complement"
              autoFocus
              error={formik.touched.complement && Boolean(formik.errors.complement)}
              helperText={formik.touched.complement && formik.errors.complement}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="standard"
              margin="normal"
              fullWidth
              id="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              label="Cidade *"
              name="city"
              autoComplete="city"
              autoFocus
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="standard"
              margin="normal"
              fullWidth
              id="state"
              value={formik.values.state}
              onChange={formik.handleChange}
              label="Estado *"
              name="state"
              autoComplete="state"
              autoFocus
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="standard"
              margin="normal"
              fullWidth
              id="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              label="Descrição"
              name="description"
              autoComplete="description"
              autoFocus
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              type="submit"
              style={{ backgroundColor:"#147A12" }}
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  )
}

export default function CadastroSorteio () {
  return <FormSorteio />
}
