import React from 'react'
import { useHistory, Redirect, useParams } from "react-router-dom";
import axios from 'axios';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import {
    Button,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    TextField,
    Typography, Paper, makeStyles
} from '@material-ui/core';
import * as Yup from "yup";



const useStyles = makeStyles(theme => ({

    container: {
        // cursor: 'pointer',
        padding: ' 10px'
    },
    paper: {
        cursor: 'pointer',
        padding: ' 20vh',
        backgroundColor: 'red',
        height: '80vh'
    },
    typo: {
        alignItems: 'center',
        fontSize: '20px',
        font: 'bold',
        paddingBottom: '15px'
    },
    typo2: {
        alignItems: 'center',
        fontSize: '1em',
        font: 'bold',
        paddingBottom: '15px',
        color: 'red'

    },
    cont: {
        alignItems: 'center',
        textAlign: 'center',
        fontSize: '2.5em',
        font: 'bold',
        paddingBottom: '15px',
        backgroundColor: 'yellow'
    },
    cont1: {
        alignItems: 'center',
        textAlign: 'center',
        fontSize: '1.5em',
        font: 'bold',
        paddingBottom: '15px',
        backgroundColor: 'yellow'
    },
    cont2: {
        alignItems: 'center',
        textAlign: 'center',
        // fontSize: '1.5em',
        font: 'bold',
        paddingBottom: '15px',
        backgroundColor: 'black',
        color: 'white'
    },
    cont3: {
        alignItems: 'center',
        textAlign: 'center',
        // fontSize: '1.5em',
        font: 'bold',
        paddingBottom: '15px',
        backgroundColor: 'black',
        color: 'white'
    },
}));
function TicketDetail(user, access, isAuthenticated) {

    const [reply, setReply] = React.useState([])
    const [results, setResults] = React.useState({})
    const { id } = useParams();
    const [loading, setLoading] = React.useState(false);

    const classes = useStyles();

    const history = useHistory();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    React.useEffect(() => {
        fetchData(id);
        fetchReply(id);
    }, []);

    const fetchData = (objId) => {
        setLoading(true);
        fetch(`${process.env.REACT_APP_API_URL}/support/user-tickets/${objId}`, config)
            .then((response) => response.json())
            .then((data) => {
                setResults(data);
                setLoading(false);
            })
            .catch((error) => {
                //console.log(error);
                setLoading(false);
            });
    };

    const fetchReply = (objId) => {
        setLoading(true);
        fetch(`${process.env.REACT_APP_API_URL}/support/user-tickets/${objId}`, config)
            .then((response) => response.json())
            .then((data) => {
                setReply(data['reply']);
                setLoading(false);
            })
            .catch((error) => {
                //console.log(error);
                setLoading(false);
            });
    };

    const reply_map = reply.map(n => n)
    //console.log(reply_map, 'replies');


    const emptyReply = {
        message: "",
    }
    const initialValues = {
        id: results.id,
        title: results.title,
        created_at: results.created,
        description: results.description,
        reply: ''

    }

    const onSubmit = (values, props) => {
        axios.put(`${process.env.REACT_APP_API_URL}/support/add-reply/`, values, {
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
    const validationSchema = Yup.object({
        reply: Yup.string().required('required').min(4, 'at least 4 chars').max(50),
    })

    return (
        <Paper sx={{ p: 5, maxWidth: 700, flexGrow: 10 }}>
            <div style={{ paddingLeft: 60, paddingRight: 60 }}>
                <Grid container spacing={2} justify="center">
                    <Grid item xs={12}>
                        <Card className={classes.cont1}>
                            <CardContent className={classes.cont1}> Ticket</CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6} lg={1}>
                        <Card className={classes.cont2}>
                            <CardContent>Title</CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6} lg={11}>
                        <Card className={classes.cont3}>
                            <CardContent>{initialValues.title}</CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6} lg={1}>
                        <Card className={classes.cont2}>
                            <CardContent>Description</CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6} lg={11}>
                        <Card className={classes.cont3}>
                            <CardContent>{initialValues.description}</CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6} lg={1}>
                        <Card className={classes.cont2}>
                            <CardContent>CREATED AT</CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6} lg={11}>
                        <Card className={classes.cont3}>
                            <CardContent>{initialValues.created_at}</CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
            <div style={{ paddingLeft: 60, paddingRight: 60 }}>
                <Grid container spacing={2} justify="center">
                    <Grid item xs={12}>
                        <Card className={classes.cont1}>
                            <CardContent className={classes.cont1}>Replies</CardContent>
                        </Card>
                    </Grid>
                </Grid>
                {reply_map.map((item, index) => (
                    <div style={{ paddingLeft: 60, paddingRight: 60 }}>
                        <Grid container spacing={2} justify="center">
                            <Grid item xs={6} lg={2}>
                                <Card className={classes.cont2}>
                                    <CardContent>FROM:     {item.created_by} </CardContent>
                                    <CardContent></CardContent>
                                    <CardContent>At: {item.created_at}</CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={6} lg={10}>
                                <Card className={classes.cont3}>
                                    <CardContent>Message :</CardContent>
                                    <CardContent>{item.message}</CardContent>
                                    <CardContent></CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </div>

                ))}
            </div>
            <Formik enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ values, errors, isSubmitting }) => (
                    <div style={{ padding: 60 }}>
                        <Form autoComplete='off' >
                            <Field
                                fullWidth
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                as={TextField}
                                name="reply"
                                label='reply'
                                helperText={errors.reply ? <Typography className={classes.typo2} variant='body1'>Invalid inputs</Typography> : console.log('good')}
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
                        </Form>
                    </div>
                )}
            </Formik>
        </Paper>
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    access: state.auth.access,
    user: state.auth.user
});
export default connect(mapStateToProps, {})(TicketDetail);