
import React from 'react'
import { DataGrid } from '@mui/x-data-grid';

import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@material-ui/core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';



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
        backgroundColor: 'black',
        color: 'yellow',
        padding: '20px',
        position: 'flex',
        marginLeft: '50%',
        marginBottom: '20px'
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
    }
}));

const MyCart = () => {
    const [open, setOpen] = React.useState(false);
    const [results, setResults] = React.useState({})
    const [results2, setResults2] = React.useState({})
    const [totalPrice, setTotalPrice] = React.useState()
    const [balance, setBalance] = React.useState()
    const [results1, setResults1] = React.useState()
    const [card_ids, setCardIds] = React.useState([])
    // const [payout, setPayOut] = React.useState([])
    let history = useHistory();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        (async () => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            };
            const body = JSON.stringify({ results })
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/orders/orders/payout/`, body, config);
                // setPayOut(res['status'])


            }
            catch (err) {

            }
            history.push('/my-cards')

        })();
    };

    const classes = useStyles();

    const columns = [
        { field: 'id', headerName: 'id', hide: true },
        {
            field: 'card_type', headerClassName: 'super-app-theme--header', headerAlign: 'center', headerName: 'Card Type', width: 200,
            renderCell: (cellValues) => {
                return (
                    <div
                        style={{
                            color: "blue",
                            fontSize: 18,
                            width: "100%",
                            textAlign: "center"
                        }}
                    >
                        {cellValues.value}
                    </div>
                );
            }
        },
        { field: 'card_id', headerName: 'card_id', hide: true },
        {
            field: 'card_type', headerClassName: 'super-app-theme--header', headerAlign: 'center', headerName: 'Card Type', width: 200,
            renderCell: (cellValues) => {
                return (
                    <div
                        style={{
                            color: "blue",
                            fontSize: 18,
                            width: "100%",
                            textAlign: "center"
                        }}
                    >
                        {cellValues.value}
                    </div>
                );
            }
        },
        {
            field: 'card_first_chars', headerClassName: 'super-app-theme--header', headerAlign: 'center', headerName: 'Card Number', width: 200,
            renderCell: (cellValues) => {
                return (
                    <div
                        style={{
                            color: "green",
                            fontSize: 18,
                            width: "100%",
                            textAlign: "center"
                        }}
                    >
                        {cellValues.value}
                    </div>
                );
            }
        },
        {
            field: 'country', headerClassName: 'super-app-theme--header', headerAlign: 'center', headerName: 'Country', width: 400,
            renderCell: (cellValues) => {
                return (
                    <div
                        style={{
                            color: "blue",
                            fontSize: 18,
                            width: "100%",
                            textAlign: "center"
                        }}
                    >
                        {cellValues.value}
                    </div>
                );
            }
        },
        {
            field: 'price',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            headerName: 'Price',
            type: 'number',
            width: 500,
            align: "right",
            renderCell: (cellValues) => {
                return (
                    <div
                        style={{
                            color: "blue",
                            fontSize: 18,
                            width: "100%",
                            textAlign: "center"
                        }}
                    >
                        {cellValues.value}
                    </div>
                );
            }
        },
        {
            field: 'action',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            headerName: 'Action',
            type: 'number',
            width: 500,
            align: "right",
            renderCell: (cellValues) => {
                const onClick = (e) => {
                    e.stopPropagation();
                    setResults1(Math.random())

                    const api = cellValues.api;
                    const thisRow = {};

                    api
                        .getAllColumns()
                        .filter((c) => c.field !== '__check__' && !!c)
                        .forEach(
                            (c) => (thisRow[c.field] = cellValues.getValue(cellValues.id, c.field)),
                        );
                    setCardIds(thisRow.card_id)
                    const fetchData = async () => {
                        const config = {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `JWT ${localStorage.getItem('access')}`,
                                'Accept': 'application/json'
                            }
                        };
                        const body = JSON.stringify({ card_ids })
                        try {
                            const res = await axios.post(`${process.env.REACT_APP_API_URL}/orders/orders/remove/`, body, config);

                            // setResults1(Math.random())
                        }
                        catch (err) {

                        }
                    }
                    fetchData()
                };
                return <Button style={{
                    color: "red",
                    fontSize: 16,
                    width: "100%",
                    textAlign: "center"
                }} onClick={onClick}>Remove</Button>;
            }
        },

    ]

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
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/orders/my-orders/`, config);
                setResults(res.data['results'])

                var newArr = results.map(price => (price.price))
                var sum = newArr.reduce((partialSum, a) => partialSum + a, 0);
                setTotalPrice(sum)


            }
            catch (err) {

            }
        })();

    }, [results1, totalPrice, count1]);

    //console.log(totalPrice, 'this istotal')

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
                setResults2(res.data['results'])
                var newArr = results2.map(credit => (credit))
                setBalance(newArr);

            }
            catch (err) {

            }
        })();

    }, [totalPrice, count1]);

    // //console.log(balance[0]['credit'], ' new balancee')
    // //console.log(balance.length, 'bbbbbbb')

    const check_balance = (balance) => {
        if (!balance?.length) {
            return 0
        } else {
            return balance[0]['credit']
        }
    }

    const check_auth = (balance, total_price) => {
        if (balance?.length) {

            if (balance[0]['credit'] < total_price) {
                return true
            } else {
                return false
            }
        } else {
            return true
        }

    }

    const data = {
        columns: columns,
        rows: results
    }

    return (
        <div>
            {totalPrice > check_balance(balance) && <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="warning">
                    <AlertTitle>Warning</AlertTitle>
                    You dont have enough balance to complete this transaction. — <strong>Your current balance is {check_balance(balance)} </strong>
                </Alert>
            </Stack>}

            <Box sx={{ flexGrow: 3, overflow: 'hidden', px: 1, borderColor: 'primary.black', border: 4, }}>
                <Paper sx={{ maxWidth: '5000px', my: 11, mx: 'auto', p: 10, borderColor: 'primary.black', }}>
                    <Button
                        disabled={check_auth(balance, totalPrice)}
                        className={classes.button}
                        // onClick={() => {
                        //     // handleClick()
                        //     handleClickOpen()
                        // }}
                        onClick={handleClickOpen}
                        variant="contained">Check Out
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Please confirm below to finish order."}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Agree and " {totalPrice} " will be deducted from your balance "
                                {check_balance(balance)}", And your new balance will be " {check_balance(balance) - totalPrice} ".
                                {/* {balance[0]['credit']?balance[0]['credit']: 0}", Your new balance will be "  ". */}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Disagree</Button>
                            <Button onClick={handleConfirm} autoFocus>
                                Agree
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Grid container wrap="nowrap" spacing={2}>

                        <DataGrid
                            disableMultipleSelection={true}
                            className={classes.root}
                            sx={{
                                boxShadow: 25,
                                border: 10,
                                borderColor: 'primary.black',
                                '& .super-app-theme--header': {
                                    backgroundColor: '#030303',
                                    color: "Yellow",
                                    fontSize: 18,
                                },

                            }}
                            autoHeight

                            rows={data.rows}
                            columns={columns}
                            hideFooterPagination={true}
                            // checkboxSelection

                            onSelectionModelChange={(ids) => {
                                const selectedIDs = new Set(ids);
                                const selectedRows = data.rows.filter((row) =>
                                    selectedIDs.has(row.id)
                                );


                            }}
                        // onPageChange={(e) => { //console.log(e, 'eeee') }}


                        />

                    </Grid>
                </Paper>
            </Box>
        </div>
    );
}
export default MyCart;
