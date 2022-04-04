import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import {
  Card,
  CardContent,
  Grid,
  Typography, Paper, makeStyles
} from '@material-ui/core';
import parse from 'html-react-parser'



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
}));
export default function AutoGridNoWrap() {

  const [results, setResults] = React.useState([])

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${localStorage.getItem('access')}`,
      'Accept': 'application/json'
    }
  };

  React.useEffect(() => {

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/home/home/`, config);
      setResults(res.data)
    }
    catch (e) {
      //console.log(e)
    }
  }

  //console.log(results)

  return (
    <div style={{ paddingLeft: 60, paddingRight: 60, paddingTop: 100, paddingBottom: 100 }}>
      <Paper sx={{ maxWidth: '80%', my: 20, mx: 'auto', p: 25, maxHeight: '80%', flexGrow: 10 }}>
        <div style={{ paddingLeft: 60, paddingRight: 60 }}>
          {results.length > 0 ? parse(results[0]['body']) : ''}
        </div>
      </Paper>
    </div>
  );
}