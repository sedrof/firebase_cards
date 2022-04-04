import React, { Fragment } from 'react'
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core";
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    // position: "fixed",
    bottom: 0,
    zIndex: 200,
    backgroundColor: "black",
    padding: "10px",
    marginRight: "26px",
    margin: "0 auto",

    color: "white",
    width: "100%",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

  },
  ul: {
    "& .MuiPaginationItem-root": {
      color: "yellow",
      borderColor: 'green',
    }
  }
}));

const AppPagination = ({ setPage, loading, prevSelectionModel, selectionModel, count }) => {
  const classes = useStyles();
  const numberOfPages = Math.ceil(count / 20)
  return (
    <div className={classes.container}>
      <div className={classes.root}>
        <Pagination
          classes={{ ul: classes.ul }}
          onChange={(event, val) => {
            //console.log(val)
            window.scroll(0, 0);
            setPage(val)

          }}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          shape="rounded"
          variant="outlined"
          count={numberOfPages}
          disabled={loading}
        />
      </div>
    </div>
  );
};
export default AppPagination;