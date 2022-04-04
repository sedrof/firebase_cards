import * as React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import Box from '@mui/material/Box';
import { makeStyles, TextField, Button } from '@material-ui/core'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
// import { useHistory } from "react-router-dom";
import { Paper, Typography } from "@mui/material";


const useStyles = makeStyles(theme => ({
    paperRoot: {
        backgroundColor: 'yellow'
    },
    root: {
        width: '500px'
    },
    bool: {
        width: '100%',
        textAlign: 'center',
    },
    reason: {
        textAlign: 'center',
    },
    button: {
        backgroundColor: theme.palette.common.drawer,
        // backgroundColor: "#37474f !important",
        color: 'yellow',
        // borderRadius: '5%'

    },
    cart: {
        color: 'black',
        // marginBottom: '50px',
        // marginLeft: '90%',
        cursor: 'pointer',
        size: 'large',
        position: 'fixed',
        // z-index: '100',
        right: '20px',
        // top: '20px',
    },
}));

export default function Deposite() {
    const [results, setResults] = React.useState({})
    const [balance, setBalance] = React.useState()
    const [redirect, setRedirect] = React.useState(false)
    // const history = useHistory();

    const classes = useStyles();
    const btnstyle = { margin: '8px 0' }

    const initialValues = {
        Amount: '',

    }
    const validationSchema = Yup.object().shape({
        Amount: Yup.number('please enter an integer amount.').integer('only whole numbers are accepted.').min(20, '20 is minimum to deposite.').max(2000, '2000 is maximum to deposite.').required("Required."),

    })
    const check_balance = (balance) => {
        if (!balance?.length) {
            return 0
        } else {
            return balance[0]['credit']
        }
    }

    const onSubmit = (values, props) => {
        //console.log(values, 'vvvvvv')
        const datas = values
        setTimeout(() => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            };
            const body = JSON.stringify({ values })
            try {
                const res = axios.post(`${process.env.REACT_APP_API_URL}/support/request-credit/`, body, config);


            }
            catch (err) {

            }
            setRedirect(true)
        }, 1000)
    }
    const count1 = results.length
    React.useEffect(() => {

        (async () => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            };

            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/orders/my-credit/`, config);
                setResults(res.data['results'])
                var newArr = results.map(credit => (credit))
                setBalance(newArr);

            }
            catch (err) {

            }
        })();

    }, [count1]);
    //console.log(balance, ' reeeeeeesul');



    const message = `Your current balance is ${check_balance(balance)}$ `;

    if (redirect) {

        return <Redirect to='/user-tickets' />
    }



    return (
        <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
            <Paper variant="outlined" square className={classes.button} sx={{ maxWidth: 800, my: 11, mx: 'auto', p: 10 }}>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Avatar>N1</Avatar>
                    </Grid>
                    <Grid item xs>
                        <Typography sx={{ fontWeight: 'bold', fontSize: 24 }}>{message}</Typography>
                    </Grid>
                </Grid>
            </Paper>

            <h1 className={classes.reason}>Add More Credit. </h1>
            <Paper square variant="outlined" className={classes.paperRoot} sx={{ maxWidth: 800, my: 11, mx: 'auto', p: 10 }}>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {(props) => (
                        <Form>
                            <Field as={TextField} label='Amount' name="Amount"
                                placeholder='Enter Amount' fullWidth required
                                helperText={
                                    <ErrorMessage className={classes.color} name="Amount" />}
                            />
                            <Button type='submit' color='primary' variant="contained" disabled={props.isSubmitting}
                                style={btnstyle} fullWidth>{props.isSubmitting ? "Loading" : "Request Payment"}</Button>

                        </Form>
                    )}
                </Formik>
            </Paper>
        </Box>
    );
}