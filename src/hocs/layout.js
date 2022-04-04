import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import StickyFooter from '../components/base/Footer';
import Navbar from '../components/base/Navbar';
import { checkAuthenticated, load_user } from '../state/actions/auth';

const Layout = ({ checkAuthenticated, load_user, children }) => {
    
    useEffect(() => {
        checkAuthenticated();
        load_user();
    }, []);
    return (
        <div>
            {<Navbar/>}
            {children}
            <StickyFooter/>
        </div>
    );
};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(null, { checkAuthenticated, load_user })(Layout);