import React from 'react'
import { useHistory, useParams } from "react-router-dom";
import axios from 'axios';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { makeStyles, Button, TextField, TypographyCard, CircularProgress, CardContent, Typography, Card } from '@material-ui/core'
import * as Yup from "yup";
import Paper from '@mui/material/Paper';
import Captcha from '../authenticate/Captcha';


const useStyles = makeStyles(theme => ({


    typo2: {
        // cursor: 'pointer',
        padding: ' 10px',
        // height: '80vh'
        color: 'red'
    },
    typo: {
        alignItems: 'right',
        fontSize: '25px',
        font: 'bold',
        paddingBottom: '25px',
        paddingLeft: '40%'
    },
    input: {
        height: 40,
        fontSize: "2em"
    },
    input2: {
        height: 200,
        paddingTop: 10,
        paddingBottom: 20,
        display: "table-cell",
        verticalAlign: "buttom",
        fontSize: "1em",
    },
    button: {
        height: 40
    },


}));
function AddTicket(user, access, isAuthenticated) {

    const [results, setResults] = React.useState({})
    const [captchaValue, setCaptchaValue] = React.useState(false)
    const { id } = useParams();
    const classes = useStyles();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    const history = useHistory();
    const handleCancel = () => {
        history.push('/user-tickets');
    }


    const initialValues = {
        title: '',
        description: '',
        captcha: '',
    }

    const validationSchema = Yup.object({
        title: Yup.string().required('required').min(4, 'at least 4 chars').max(50),
        description: Yup.string('required').min(4, 'at least 4 chars').max(50),
        captcha: Yup.string().required("Required").test('test_length_greater_than_40', 'captcha vlidation', function (value) {
            // your condition
            //console.log(value, captchaValue, 'this is valueeeeee');
            if (value != captchaValue) {
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
        axios.put(`${process.env.REACT_APP_API_URL}/support/add-ticket/`, values, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }).then(function (response) {
        }).catch(function (error) {
        });

        setTimeout(() => {
            props.resetForm()
            props.setSubmitting(false)
            history.push('/user-tickets')
        }, 1000)
    }

    return (

        <Formik
            initialValues={initialValues}
            validateOnChange={true}
            validateOnBlur={true}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ values, errors, isSubmitting }) => (
                <Paper sx={{ p: 8, margin: 'auto', maxWidth: 900, flexGrow: 1 }}>
                    <Form>
                        <Typography className={classes.typo} variant='body1'> New Ticket </Typography>
                        <Typography className={classes.typo2} variant='body1'>   </Typography>
                        <Field
                            as={TextField}
                            variant="outlined"
                            label="Title"
                            name="title"
                            color="success"
                            fullWidth
                            InputProps={{
                                className: classes.input
                            }}
                            InputLabelProps={{
                                shrink: true
                            }}
                            helperText={errors.title ? <Typography className={classes.typo2} variant='body1'>Error</Typography> : console.log('good')}
                                />


                                < Typography className={classes.typo2} variant='body1'>   </Typography>
                        <Typography className={classes.typo2} variant='body1'>   </Typography>
                        <Typography className={classes.typo2} variant='body1'>   </Typography>
                        <Field
                            as={TextField}
                            variant="outlined"
                            label="Message"
                            name="description"
                            fullWidth
                            color="red"
                            InputProps={{
                                className: classes.input2
                            }}
                            InputLabelProps={{
                                shrink: true
                            }}
                            helperText={errors.description ? <Typography className={classes.typo2} variant='body1'>Error</Typography> : console.log('good')}
                                />
                                < Typography className={classes.typo2} variant='body1'>   </Typography>
                        <Captcha getCaptchaValue={(v) => setCaptchaValue(v)} />
                        <Field as={TextField} label='captcha' name="captcha"
                            placeholder='Enter chars on image' fullWidth required
                            helperText={errors.captcha ? <Typography className={classes.typo2} variant='body1'>Error</Typography> : console.log('good')}
                                />
                                < Button
                            disabled={isSubmitting}
                            variant='contained'
                            color='primary'
                            type='submit'
                            startIcon={isSubmitting ? <CircularProgress size=".9rem" /> : undefined}
                        >
                            {isSubmitting ? 'Submitting' : 'Submit'}
                        </Button>
                        <Button
                            disabled={isSubmitting}
                            variant='contained'
                            color='secondary'
                            type='cancel'
                            onClick={handleCancel}
                        >
                            {isSubmitting ? 'Submitting' : 'Cancel'}
                        </Button>
                    </Form>
                </Paper>
            )}

        </Formik>

    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    access: state.auth.access,
    user: state.auth.user
});
// export default TicketDetail
export default connect(mapStateToProps, {})(AddTicket);