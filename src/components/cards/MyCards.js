import React from 'react'
import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@material-ui/core'
import { DataGrid } from '@mui/x-data-grid';


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




const MyCards = () => {
    const [results, setResults] = React.useState({})

    const classes = useStyles();


    const columns = [
        { field: 'id', headerName: 'id', hide: true },
        {
            field: 'card_type', headerClassName: 'super-app-theme--header', headerAlign: 'center', headerName: 'Card Type',
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
            field: 'serial', headerName: 'serial', headerClassName: 'super-app-theme--header', headerAlign: 'center', width: 500,


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
            field: 'expiry_date', headerClassName: 'super-app-theme--header', headerAlign: 'center', headerName: 'expiry_date', width: 200,
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
            field: 'cvv',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            headerName: 'cvv',
            type: 'number',
            width: 300,
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
            field: 'price',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            headerName: 'Price',
            type: 'number',
            width: 250,
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


    ]



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
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/orders/my-cards/`, config);
                setResults(res.data['results'])


            }
            catch (err) {

            }
        })();

    }, []);


    const data = {
        columns: columns,
        rows: results
    }


    return (
        <div>

            <Box sx={{ flexGrow: 3, overflow: 'hidden', px: 1, borderColor: 'primary.black', border: 4, }}>
                <Paper sx={{ maxWidth: '5000px', my: 11, mx: 'auto', p: 10, borderColor: 'primary.black', }}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <DataGrid
                            showEmptyDataSourceMessage={true}
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

                        // onSelectionModelChange={(ids) => {
                        //     const selectedIDs = new Set(ids);
                        //     const selectedRows = data.rows.filter((row) =>
                        //         selectedIDs.has(row.id)
                        //     );


                        // }}
                        // onPageChange={(e) => { //console.log(e, 'eeee') }}


                        />

                    </Grid>
                </Paper>
            </Box>
        </div>
    )
}
export default MyCards;