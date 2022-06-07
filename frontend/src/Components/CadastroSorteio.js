import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { initialFormValues } from "../Helpers/Constants";

function FormSorteio() {
  const validationCadastroAS = yup.object({
    nomeSorteio: yup
      .string('Digite um nome válido')
      .required('O nome é obrigatório.'),
    dataRealizacao: yup
      .string('Digite uma data válida')
      .required('O data é obrigatória.'),
    valorMaximo: yup
      .number('Digite um valor válido')
      .required('O valor é obrigatório.'),
    cep: yup
      .number('Digite um CEP válido')
      .required('O CEP é obrigatório.'),
    rua: yup
      .string('Digite uma rua válida')
      .required('A rua é obrigatória.'),
    numero: yup
      .number('Digite um número válido')
      .required('O número é obrigatório.'),
    cidade: yup
      .string('Digite uma cidade válida')
      .required('A cidade é obrigatória.'),
    estado: yup
      .string('Digite um estado válido')
      .required('O estado é obrigatório.'),
  });

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: validationCadastroAS,
    onSubmit: (values) => {
      console.log(values, 'valores')
    },
  })

  return (
    <Grid item xs={12} component={Paper} elevation={6} padding="40px 40px" width='80%'>
      <Typography color="#147A12" variant="h4" gutterBottom>
        <b>Cadastre o seu Amigo Secreto!</b>
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3} padding="60px" >
          <Grid item xs={12} sm={6}>
            <TextField
              variant="standard"
              margin="normal"
              fullWidth
              id="nomeSorteio"
              value={formik.values.nomeSorteio}
              onChange={formik.handleChange}
              label="Nome do Amigo Secreto *"
              name="nomeSorteio"
              autoComplete="nomeSorteio"
              autoFocus
              error={formik.touched.nomeSorteio && Boolean(formik.errors.nomeSorteio)}
              helperText={formik.touched.nomeSorteio && formik.errors.nomeSorteio}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="standard"
              margin="normal"
              fullWidth
              id="dataRealizacao"
              value={formik.values.dataRealizacao}
              onChange={formik.handleChange}
              label="Data do Amigo Secreto *"
              name="dataRealizacao"
              autoComplete="dataRealizacao"
              autoFocus
              error={formik.touched.dataRealizacao && Boolean(formik.errors.dataRealizacao)}
              helperText={formik.touched.dataRealizacao && formik.errors.dataRealizacao}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="standard"
              margin="normal"
              fullWidth
              id="valorMaximo"
              value={formik.values.valorMaximo}
              onChange={formik.handleChange}
              label="Valor Máximo do Sorteio *"
              name="valorMaximo"
              autoComplete="valorMaximo"
              autoFocus
              error={formik.touched.valorMaximo && Boolean(formik.errors.valorMaximo)}
              helperText={formik.touched.valorMaximo && formik.errors.valorMaximo}
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
              id="rua"
              value={formik.values.rua}
              onChange={formik.handleChange}
              label="Rua *"
              name="rua"
              autoComplete="rua"
              autoFocus
              error={formik.touched.rua && Boolean(formik.errors.rua)}
              helperText={formik.touched.rua && formik.errors.rua}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
          <TextField
            variant="standard"
              margin="normal"
              fullWidth
              id="numero"
              value={formik.values.numero}
              onChange={formik.handleChange}
              label="Número *"
              name="numero"
              autoComplete="numero"
              autoFocus
              error={formik.touched.numero && Boolean(formik.errors.numero)}
              helperText={formik.touched.numero && formik.errors.numero}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
          <TextField
            variant="standard"
              margin="normal"
              fullWidth
              id="complemento"
              value={formik.values.complemento}
              onChange={formik.handleChange}
              label="Complemento"
              name="complemento"
              autoComplete="complemento"
              autoFocus
              error={formik.touched.complemento && Boolean(formik.errors.complemento)}
              helperText={formik.touched.complemento && formik.errors.complemento}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="standard"
              margin="normal"
              fullWidth
              id="cidade"
              value={formik.values.cidade}
              onChange={formik.handleChange}
              label="Cidade *"
              name="cidade"
              autoComplete="cidade"
              autoFocus
              error={formik.touched.cidade && Boolean(formik.errors.cidade)}
              helperText={formik.touched.cidade && formik.errors.cidade}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="standard"
              margin="normal"
              fullWidth
              id="estado"
              value={formik.values.estado}
              onChange={formik.handleChange}
              label="Estado *"
              name="estado"
              autoComplete="estado"
              autoFocus
              error={formik.touched.estado && Boolean(formik.errors.estado)}
              helperText={formik.touched.estado && formik.errors.estado}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="standard"
              margin="normal"
              fullWidth
              id="descricao"
              value={formik.values.descricao}
              onChange={formik.handleChange}
              label="Descrição"
              name="descricao"
              autoComplete="descricao"
              autoFocus
              error={formik.touched.descricao && Boolean(formik.errors.descricao)}
              helperText={formik.touched.descricao && formik.errors.descricao}
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
