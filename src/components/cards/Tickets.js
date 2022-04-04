
import React from 'react'
import { useHistory } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@material-ui/core';
import { Paper, Typography } from "@mui/material";




const useStyles = makeStyles(theme => ({

    balancePaper: {
        backgroundColor: 'black',
        color: 'yellow',
        padding: '25px',
        display: 'inline-block',
        position: 'flex',
        // marginLeft: '25%',
        marginBottom: '50px',
        // maxWidth: '50%'
    },
    add: {
        padding: "15px"
    }

}));


const Tickets = () => {
    const [results, setResults] = React.useState({})
    const [results1, setResults1] = React.useState()
    const [card_ids, setCardIds] = React.useState([])

    const classes = useStyles();
    let history = useHistory();
    const columns = [
        {
            field: 'id', headerName: 'id',
            hide: true
        },
        {
            field: 'title', headerClassName: 'super-app-theme--header', headerAlign: 'center', headerName: 'Title', width: 300,
            renderCell: (cellValues) => {
                return (
                    <div
                        style={{
                            color: "blue",
                            fontSize: 12,
                            width: "100%",
                            textAlign: "center"
                        }}
                    >
                        {cellValues.value}
                    </div>
                );
            }
        },
        // {
        //     field: 'description', felx: 1, headerClassName: 'super-app-theme--header', headerAlign: 'center', headerName: 'Description', width: 500,
        //     renderCell: (cellValues) => {
        //         return (
        //             <div
        //                 style={{
        //                     color: "blue",
        //                     fontSize: 12,
        //                     width: "100%",
        //                     textAlign: "center"
        //                 }}
        //             >
        //                 {cellValues.value}
        //             </div>
        //         );
        //     }
        // },
        {
            field: 'status', headerClassName: 'super-app-theme--header', headerAlign: 'center', headerName: 'Status', width: 100,
            renderCell: (cellValues) => {
                return (
                    <div
                        style={{
                            color: "blue",
                            fontSize: 12,
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
            field: 'requested_amount', headerClassName: 'super-app-theme--header', headerAlign: 'center', headerName: 'Requested Amount', width: 300,
            renderCell: (cellValues) => {
                return (
                    <div
                        style={{
                            color: "green",
                            fontSize: 12,
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
            field: 'closed_date', headerClassName: 'super-app-theme--header', headerAlign: 'center', headerName: 'closed_date', width: 150,
            renderCell: (cellValues) => {
                return (
                    <div
                        style={{
                            color: "blue",
                            fontSize: 12,
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
            field: 'created',
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            headerName: 'Created Date',
            type: 'date',
            width: 150,
            align: "right",
            renderCell: (cellValues) => {
                return (
                    <div
                        style={{
                            color: "blue",
                            fontSize: 12,
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
            width: 400,
            align: "center",
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
                const handleClick = (e) => {
                    e.stopPropagation();
                    //console.log(cellValues, ' this oook')
                    const api = cellValues.api;
                    const thisRow = {};

                    api
                        .getAllColumns()
                        .filter((c) => c.field !== '__check__' && !!c)
                        .forEach(
                            (c) => (thisRow[c.field] = cellValues.getValue(cellValues.id, c.field)),
                        );

                    history.push({
                        pathname: '/' + thisRow.id + '/tiket-detail',
                    });
                };
                const onDelete = (e) => {
                    //console.log('wee')
                    setResults1(Math.random())
                    e.stopPropagation();
                    const api = cellValues.api;
                    const thisRow = {};

                    api
                        .getAllColumns()
                        .filter((c) => c.field !== '__check__' && !!c)
                        .forEach(
                            (c) => (thisRow[c.field] = cellValues.getValue(cellValues.id, c.field)),
                        );
                    setCardIds(thisRow.id)

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
                            const res = await axios.put(`${process.env.REACT_APP_API_URL}/support/delete-tickets/`, body, config);


                        }
                        catch (err) {

                        }
                    }
                    fetchData()
                };
                return <div>
                    <Button style={{
                        color: "red",
                        fontSize: 16,
                        width: "50%",
                        textAlign: "left"
                    }} onClick={onDelete}>Remove</Button>

                    <Button style={{
                        color: "blue",
                        fontSize: 16,
                        width: "50%",
                        textAlign: "right"
                    }} onClick={handleClick}>OPEN</Button>
                </div>
            }
        },

    ]

    const count1 = results.length
    //console.log(results, 'reeeeees')
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
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/support/user-tickets/`, config);
                setResults(res.data['results'])
            }
            catch (err) {
                //console.log('err in tickets API')
            }
        })();

    }, [count1, results1]);

    const data = {
        columns: columns,
        rows: results
    }
    const addTicket = () => {
        history.push('/add-ticket')
    }
    const message = `You will find the BTC address in the description below. Once we recieve your payment, Credit will be added to your account and the ticket 'Status' will be closed. `;
    return (
        <Paper sx={{ p: 8, margin: 'auto', maxWidth: '90%', flexGrow: 2 }}>
            <div className={classes.add}>
                <Button style={{
                    color: "red",
                    fontSize: 16,
                    width: "100%",
                    backgroundColor: 'yellow',
                    padding: '10px'
                }}
                    variant="dark"
                    onClick={addTicket}

                >Start New Ticket</Button>{' '}
            </div>
            <Grid className={classes.balancePaper} container spacing={1}>
                <Typography sx={{ fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>{message}</Typography>
            </Grid>
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
                            fontSize: 12,
                        },

                    }}
                    autoHeight

                    rows={data.rows}
                    columns={columns}
                    hideFooterPagination={true}
                    // checkboxSelection

                    onSelectionModelChange={(ids) => {
                        // const selectedIDs = new Set(ids);
                        // const selectedRows = data.rows.filter((row) =>
                        //     selectedIDs.has(row.id)
                        // );


                    }}
                // onPageChange={(e) => { //console.log(e, 'eeee') }}


                />

            </Grid>
        </Paper>
    );
}
export default Tickets;
