
import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { connect, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@material-ui/core'
import AppPagination from './Pagination';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Paper, Typography } from "@mui/material";
import SearchBarComponent from './SearchBar'
import { useDebounce } from 'use-debounce';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


const useStyles = makeStyles(theme => ({
    paperRoot: {
        backgroundColor: 'yellow'
    },
    root: {
        width: '500px',
    },
    root1: {
        position: "fixed",
        display: "inline-block",
        justifyContent: "right",
        alignItems: "top",
        right: "15px",
        top: '15px'
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
    balancePaper: {
        backgroundColor: 'black',
        color: 'yellow',
        padding: '25px',
        // display: 'inline-block',
        position: 'flex',
        // marginLeft: '25%',
        marginBottom: '50px',
        maxWidth: '20%'
    },

    cart: {
        color: 'black',
        cursor: 'pointer',
        position: 'fixed',
        right: '10px',
        top: '300px',
    },
    myCredit: {
        color: 'white',
        backgroundColor: 'white',

        paddingTop: '10px',


    },
    typo: {
        position: "fixed",

    },
    links: {
        color: "red",
        paddingTop: '50px',
        display: 'inline-block',
        left: '1px',
        fontSize: "15px",
    },
    warrper: {
        color: "red",
        height: '10%',
        display: 'inline-block',

    },
    searchBar: {
        color: "red",
        // paddingTop: '50px',
    },
    radioButton: {
        color: "red",
        marginLeft: '40%',
        // paddingBottom:'50%'
        // paddingTop: '50px',
    },
}));

const DataTable = () => {
    const [page, setPage] = React.useState(1)
    const [count, setCount] = React.useState()
    const [count2, setCount2] = React.useState()
    const [loading, setLoading] = React.useState(false);

    const [loadingCart, setLoadingCart] = React.useState(false);
    const [results, setResults] = React.useState({})
    const [resultsBalance, setResultsBalance] = React.useState({})
    const [results1, setResults1] = React.useState({})
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [selectionData, setSelectionData] = React.useState([]);
    const [search, setSearch] = React.useState('')
    const [newSearch] = useDebounce(search, 500);
    const prevSelectionModel = React.useRef(selectionModel);
    const [balance, setBalance] = React.useState()
    const [value, setValue] = React.useState('');


    const classes = useStyles();

    let history = useHistory();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

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
            field: 'seller', headerAlign: 'center', headerClassName: 'super-app-theme--header', headerName: 'Seller', width: 300,
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
            width: 700,
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

    ]
    //console.log(balance, 'blaaan')
    const check_balance = (balance) => {
        if (!balance?.length) {
            return 0
        } else {
            return balance[0]['credit']
        }
    }
    const count1 = results1.length

    React.useEffect(() => {

        (async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/orders/my-credit/`, config);
                setResultsBalance(res.data['results'])
                var newArr = resultsBalance.map(credit => (credit))
                setBalance(newArr);

            }
            catch (err) {

            }
        })
            ();

    }, [count1]);

    React.useEffect(() => {

        //console.log(newSearch, 'this is search')
        // listView(page, newSearch);
        setSelectionModel(prevSelectionModel.current);
    }, [newSearch]);

    React.useEffect(() => {

        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/orders/my-orders/`, config);
                setResults1(res.data['results'])
                //console.log(results1, 'rrrrrrrrrr')



            }
            catch (err) {

            }
        }

        fetchData();
    }, [count1, page]);

    const handleClick = () => {

        if (selectionModel.length > 0) {
            const fetchData = async () => {
                setLoadingCart(true);
                const body = JSON.stringify({ selectionData })
                try {
                    const res = await axios.post(`${process.env.REACT_APP_API_URL}/orders/orders/`, body, config);
                    const res1 = await axios.get(`${process.env.REACT_APP_API_URL}/orders/my-orders/`, config);
                    setCount2(res1.data['results'].length)


                }
                catch (err) {

                }
            }
            fetchData()
            setLoadingCart(false);
        } else {
            //console.log('empty')
            // pass
        }

    }

    React.useEffect(() => {

        const fetchData = async () => {
            setLoading(true);
            try {
                // const res = await axios.get(`${process.env.REACT_APP_API_URL}/cards/coco/?page=${page}`, config);
                if (value === 'Country') {
                    const res = await axios.get(`${process.env.REACT_APP_API_URL}/cards/cards_country/?page=${page}&search=${newSearch}`, config);
                    setLoading(false);
                    setResults(res.data['results'])
                    setCount(res.data['count'])
                }
                else if (value === 'Price') {
                    const res = await axios.get(`${process.env.REACT_APP_API_URL}/cards/cards_price/?page=${page}&search=${newSearch}`, config);
                    setLoading(false);
                    setResults(res.data['results'])
                    setCount(res.data['count'])
                }
                else if (value === 'Serial') {
                    const res = await axios.get(`${process.env.REACT_APP_API_URL}/cards/cards_serial/?page=${page}&search=${newSearch}`, config);
                    setLoading(false);
                    setResults(res.data['results'])
                    setCount(res.data['count'])
                } else {
                    const res = await axios.get(`${process.env.REACT_APP_API_URL}/cards/cards_seller/?page=${page}&search=${newSearch}`, config);
                    setLoading(false);
                    setResults(res.data['results'])
                    setCount(res.data['count'])
                }

            }
            catch (err) {

            }
        }

        fetchData();
    }, [page, count2, newSearch, value]);

    const data = {
        columns: columns,
        rows: results
    }
    const message = ` You have ${check_balance(balance)}$ `;
    const message1 = `   Add More Credit`;

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    //console.log(value, 'vvvvvvaaa')

    return (
        <div className={classes.wrapper}>
            <div className={classes.myCredit}>
                <Grid className={classes.balancePaper} container wrap="nowrap" spacing={1}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: 15, }}>{message}</Typography>
                    {/* <div className={classes.links}> */}
                    <Link to='/deposite'>
                        <Typography sx={{ fontWeight: 'bold', fontSize: 10, color: 'red' }}>{message1}</Typography>
                    </Link>
                    {/* </div> */}
                </Grid>
            </div>
            {/* </div> */}
            {/* <div className={classes.wrapper}> */}
            <div className={classes.searchBar}>
                <SearchBarComponent
                    newSearch={newSearch}
                    setSearch={setSearch}
                />
            </div>
            <div className={classes.radioButton}>
                <FormControl>
                    <FormLabel color='warning' id="demo-row-radio-buttons-group-label">Search By</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={value}
                        onChange={handleChange}
                    >
                        <FormControlLabel value="Defult" control={<Radio />} label="default" />
                        <FormControlLabel value="Price" control={<Radio />} label="price" />
                        <FormControlLabel value="Seller" control={<Radio />} label="seller" />
                        <FormControlLabel value="Serial" control={<Radio />} label="serial" />
                        <FormControlLabel value="Country" control={<Radio />} label="country" />
                        {/* <FormControlLabel
                                value="disabled"
                                disabled
                                control={<Radio />}
                                label="other"
                            /> */}
                    </RadioGroup>
                </FormControl>
            </div>


            <Box sx={{ overflow: 'hidden', px: 1, borderColor: 'primary.black', border: 1, }}>
                <Paper sx={{ maxWidth: '100%', my: 11, mx: 'auto', p: 10, borderColor: 'primary.black', }}>
                    <Button
                        disabled={loadingCart}
                        className={classes.button}
                        onClick={() => {
                            handleClick()
                        }}
                        variant="contained">Add to Cart
                    </Button>
                    <div className={classes.root1}>
                        <ShoppingCartIcon
                            // component='span'
                            onClick={() => {
                                history.push('/my-cart')
                            }} className={classes.cart} color='info' style={{ fontSize: '82px' }} />
                        <Typography
                            component="span"
                            sx={{
                                borderRadius: '100px',
                                borderColor: 'primary.red',
                                color: 'red',
                                backgroundColor: 'white',
                                fontSize: '30px',
                                fontWeight: 'bold',
                                top: 250,
                                right: 40,
                                position: 'fixed'

                            }}
                        >
                            {count2 ? count2 : count1}
                        </Typography>
                    </div>
                    <Grid container wrap="nowrap" spacing={2}>
                        <DataGrid
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
                            selectionModel={selectionModel}
                            autoHeight
                            loading={loading}
                            rows={data.rows}
                            columns={columns}
                            hideFooterPagination={true}
                            checkboxSelection

                            onSelectionModelChange={(ids) => {
                                const selectedIDs = new Set(ids);
                                const selectedRows = data.rows.filter((row) =>
                                    selectedIDs.has(row.id)
                                );
                                setSelectionData(selectedRows)
                                //console.log(selectionData, 'rooooows')
                                setSelectionModel(ids);

                            }}
                            onPageChange={(e) => { 
                                console.log(e, 'eeee')
                             }}
                                pageSize = { 20}

                                    />

                    </Grid>
                    <AppPagination
                        setPage={setPage}
                        count={count}
                        page={page}
                        loading={loading}
                        selectionModel={selectionModel}
                        prevSelectionModel={prevSelectionModel}
                    />
                </Paper>
            </Box>
        </div>
    );
}
export default DataTable;
// export default connect(mapStateToProps, {})(DataTable);