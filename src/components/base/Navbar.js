
import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../state/actions/auth'
import { connect } from 'react-redux';
// import housingLogo from '../../images/Captures.PNG';
// import Cards from '../../images/cards.png';
// import cords from '../../images/cords.jpg';
import { useHistory } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    IconButton,
    makeStyles,
    Tabs,
    Tab,
} from "@material-ui/core";
import Box from '@mui/material/Box';
import ViewListIcon from '@mui/icons-material/ViewList';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DrawerComponent from './DrawerComponent';
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    openDrawer: {
        marginLeft: "auto",
        cursor: "pointer",
    },
    tabsInfo: {
        marginLeft: "40px",
        cursor: "pointer",
        marginTop: "15px"
    },
    left: {
        marginLeft: "10%",
        cursor: "pointer",
    },
    appBar: {
        minHeight: 150
    }
}));
const Navbar = ({ logout, isAuthenticated }) => {
    const classes = useStyles();
    // const [redirect, setRedirect] = React.useState(false);
    const [openDrawer, setOpenDrawer] = React.useState(true);
    const [value, setValue] = React.useState(10);

    const history = useHistory();

    const logout_user = () => {
        //console.log('hereeee')
        logout();
        history.push('/login')
    };

    const handleChange = (e, newValue) => {
        //console.log(newValue, 'newwwwww')
        setValue(newValue);
        // setValue(19);
    };

    React.useEffect(() => {
        if (value === 0) history.push("/list");
        if (value === 1) history.push("/my-cards");
        if (value === 2) history.push("/deposite");
        if (value === 3) history.push("/user-tickets");
    }, [value]);

    return (
        <Box sx={{ flexGrow: 10 }}>
            <AppBar className={classes.appBar} position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 20 }}
                    >
                        <Link onClick={() => setValue(11)} className='navbar-brand' to='/'><img
                        // src={housingLogo} 
                        />
                        </Link>
                    </IconButton>


                    <Tabs className={classes.tabsInfo} value={value} onChange={handleChange}>
                        {isAuthenticated && <Tab className={classes.tabsInfo} icon={<ViewListIcon />} label="All Cards" />}
                        {isAuthenticated && <Tab className={classes.tabsInfo} icon={<AddBoxIcon />} label="My Cards" />}
                        {isAuthenticated && <Tab className={classes.tabsInfo} icon={<AddBoxIcon />} label="Deposit" />}
                        {/* {isAuthenticated && <Tab className={classes.tabsInfo} icon={<ShoppingCartIcon color='info' fontSize='large' />} label="Cart" />} */}
                        {isAuthenticated && <Tab className={classes.tabsInfo} icon={<AddBoxIcon />} label="My Tickets" />}
                        {/* {!isAuthenticated && <Tab className={classes.openDrawer} icon={<LoginIcon fontSize ='large' />} label="Login" />} */}
                        {/* {isAuthenticated && <Tab className={classes.left}  icon={<LogoutIcon  fontSize= 'large' color='warning' />} label="Logout" />} */}
                    </Tabs>

                    {isAuthenticated && <MenuIcon onClick={setOpenDrawer} className={classes.openDrawer} />}
                </Toolbar>
            </AppBar>
            <DrawerComponent openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
        </Box>
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

// export default Navbar
export default connect(mapStateToProps, { logout })(Navbar);