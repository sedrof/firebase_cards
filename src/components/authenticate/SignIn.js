import React from 'react'
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Paper, makeStyles, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { login } from '../../state/actions/auth'
import Captcha from './Captcha'


const useStyles = makeStyles(theme => ({
    root: {
        marginTop: '10%',
    },
    color: {
        backgroundColor: 'red'
    }

}));
const Login = ({ handleChange, isAuthenticated, login }) => {
    let history = useHistory();
    const [captchaValue, setCaptchaValue] = React.useState(false)


    const classes = useStyles();
    const paperStyle = { padding: 20, height: '73vh', width: 600, margin: "0 auto", marginTop: "5 auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }

    const initialValues = {
        username: '',
        password: '',
        remember: false,
        captcha: ''
    }
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3, 'please enter valid username').required("Required"),
        password: Yup.string().required("Required"),
        captcha: Yup.string().required("Required").test('test_length_greater_than_40', 'captcha vlidation', function (value) {
            // your condition
            if (value != captchaValue) {
                // setting the error message using the value's length
                return this.createError({
                    message: `someErrorMessage`,
                    path: "captcha"
                })
            }
            return true
        }),
    })
    const onSubmit = (values, props) => {
        //console.log(values)
        const datas = values
        login(datas.username, datas.password)
        setTimeout(() => {
            props.resetForm()
            props.setSubmitting(false)
            history.push({
                pathname: '/'
            })
        }, 1000)
    }

    // //console.log(captchaValue, 'vlll')
    return (
        <Grid className={classes.root}>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {(props) => (
                        <Form>
                            <Field as={TextField} label='Username' name="username"
                                placeholder='Enter username' fullWidth required
                                helperText={
                                    <ErrorMessage className={classes.color} name="username" />}
                            />
                            <Field as={TextField} label='Password' name="password"
                                placeholder='Enter password' type='password' fullWidth required
                                helperText={<ErrorMessage name="password" />} />
                            <Field as={FormControlLabel}
                                name='remember'
                                control={
                                    <Checkbox
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <Captcha getCaptchaValue={(v) => setCaptchaValue(v)} />
                            <Field as={TextField} label='Captcha' name="captcha"
                                placeholder='Enter chars on image' fullWidth required
                                helperText={
                                    <ErrorMessage className={classes.color} name="username" />}
                            />
                            <Button type='submit' color='primary' variant="contained" disabled={props.isSubmitting}
                                style={btnstyle} fullWidth>{props.isSubmitting ? "Loading" : "Sign in"}</Button>

                        </Form>
                    )}
                </Formik>
                <Typography >
                </Typography>

                <Typography > Dont have an account ?
                    <Link href="/SignUp">
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { login })(Login);
// export default Login