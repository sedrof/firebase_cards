import React from "react";
import { useHistory } from "react-router-dom";
import {
  Drawer,
  List,
  ListItemText,
  ListItem,
  makeStyles,
  ListItemIcon,
} from "@material-ui/core";
import { connect } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import ViewListIcon from '@mui/icons-material/ViewList';


import { logout } from '../../state/actions/auth'

const useStyles = makeStyles(theme => ({
  drawer: {
    backgroundColor: theme.palette.common.drawer,
  },
  link: {
    color: "white",
    cursor: "pointer",
  },
  icon: {
    color: "yellow",
    cursor: "pointer",
  },
}));

const DrawerComponent = ({ openDrawer, setOpenDrawer, logout, isAuthenticated }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0)
  //history

  const history = useHistory();

  const logout_user = () => {
    logout();
    history.push("/login")
  };

  const navigation = link => {
    history.push(`/${link}`);
  };
  return (
    <Drawer
      classes={{ paper: classes.drawer }}
      open={openDrawer}
      onClose={() => setOpenDrawer(false)}
      anchor="right"
    >
      {isAuthenticated && <List className={classes.link}>
        <ListItem onClick={() => navigation("list")}>
          <ListItemIcon>
            <ViewListIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary="Cards List" />
        </ListItem>
        <ListItem onClick={() => {
          //console.log("clicked")
          logout_user();
        }}>
          <ListItemIcon>
            <LogoutIcon fontSize="large" className={classes.icon} />
          </ListItemIcon>
          <ListItemText
            primary="Log out"
          />
        </ListItem>
      </List>}
    </Drawer>
  );
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { logout })(DrawerComponent);
