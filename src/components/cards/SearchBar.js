import React, { Fragment } from 'react'
import SearchBar from 'material-ui-search-bar';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    // position: "fixed",
    // bottom: 0,
    marginTop:'20px',
    zIndex: 200,
    backgroundColor: "white",
    padding: "10px 80px",
    color: "red",
    width: "50%",
  },
  container: {
    // position: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    padding: '25px 50px '
  },
}));
const SearchBarComponent = (props) => {
  const classes = useStyles();
    return (
      <div className={classes.container}>
        <div className={classes.root}>
            <SearchBar
              value={props.newSearch}
              onChange={(newValue) => props.setSearch(newValue)}
              onCancelSearch={() => props.setSearch('')}
              sx={{ maxWidth: '100%', my: 11, mx: 'auto', p: 10, borderColor: 'primary.black', }}
              style={{
                // display: "flex",
              }}
            />
    </div>
    </div>

      );
};
export default SearchBarComponent;