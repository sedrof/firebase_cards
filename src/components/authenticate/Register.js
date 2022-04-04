import * as React from 'react';
import { Grid, Avatar, Typography, TextField, Button, makeStyles, Tab } from '@material-ui/core'
import CssBaseline from '@mui/material/CssBaseline';
import { connect } from 'react-redux';
import Link from '@mui/material/Link';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { signup } from '../../state/actions/auth'
import * as Yup from 'yup'
import Captcha from './Captcha'

const useHelperTextStyles = makeStyles(() => ({
  root: {
    color: "red"
  }
}));
const useStyles = makeStyles(theme => ({
  paperRoot: {
    backgroundColor: 'yellow'
  },
  root: {
    width: '500px',
  },
  root1: {
    fontSize: '18',
    color: 'red'
  },
  error: {}
}));


const theme = createTheme();

const SignUp = ({ signup, isAuthenticated }) => {

  const [accountCreated, setAccountCreated] = React.useState(false);
  const [captchaValue, setCaptchaValue] = React.useState(false)
  let history = useHistory();
  const classes = useStyles();

  const initialValues = {
    username: '',
    email: '',
    password: '',
    password1: '',
    captcha: '',
  }
  // const textFieldStyles = useTextFieldStyles(false);
  const helperTextStyles = useHelperTextStyles();

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3, "It's too short").required("Required"),
    email: Yup.string().email("Enter valid email").required("Required"),
    password: Yup.string().min(8, "Password minimum length should be 8").required("Required"),
    password1: Yup.string().oneOf([Yup.ref('password')], "Password not matched").required("Required"),
    captcha: Yup.string().required("Required").test('test_length_greater_than_40', 'captcha vlidation', function (value) {
      // your condition
      if (value != captchaValue) {
        //console.log(value,captchaValue, 'this is valueeeeee');
        // setting the error message using the value's length
        return this.createError({
          message: `Wrong Captcha`,
          path: "captcha"
        })
      }
      return true
    }),
  })

  const onSubmit = (values, props) => {
    //console.log(values, ' v')
    // values.prvaluesDefault();
    // const data = new FormData(values.currentTarget);
    // eslint-disable-next-line no-console
    const datas = values


    if (datas.password === datas.password1) {
      //console.log('sdsd')
      signup(datas.username, datas.password1, datas.email);
      setTimeout(() => {
        props.resetForm()
        props.setSubmitting(false)
        history.push('/login')
      }, 1000)
      // setAccountCreated(true);
    }
  };

  // if(accountCreated){
  //   history.push('/login')
  // }

  const errorMessage = "Please enter your VolunteerHub ";
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
            {(props) => (
              <Form>
                {/* <div className={classes.root1}> */}
                <Field as={TextField} fullWidth name="username" label='username'
                  placeholder="Enter your username"
                  hhelperText={errorMessage}
                  FormHelperTextProps={{
                    classes: {
                      root: helperTextStyles.root
                    }
                  }}

                />
                <Field as={TextField} fullWidth name="email" label='Email'
                  placeholder="Enter your email" helperText={<ErrorMessage name="email" />} />
                <Field as={TextField} fullWidth name='password' type="password"
                  label='Password' placeholder="Enter your password"
                  helperText={<ErrorMessage name="password" />} />
                <Field as={TextField} fullWidth name="password1" type="password"
                  label='Confirm Password' placeholder="Confirm your password"
                  helperText={<ErrorMessage name="password1" />} />
                <Captcha getCaptchaValue={(v) => setCaptchaValue(v)} />
                <Field as={TextField} label='Captcha' name="captcha"
                  placeholder='Enter chars on image' fullWidth required
                  helperText={
                    <ErrorMessage name="captcha" />}
                />

                <Button type='submit' variant='contained' disabled={props.isSubmitting}
                  color='primary'>{props.isSubmitting ? "Loading" : "Sign up"}</Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
                {/* </div> */}
              </Form>
            )}
          </Formik>
        </Box>

      </Container>
    </ThemeProvider>
  );
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { signup })(SignUp);