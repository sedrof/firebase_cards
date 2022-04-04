import React from 'react'
import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';
import './styles/Paginations.css';

import DataTable from './listTemplate';

const TransactionsListPage = ({ isAuthenticated }) => {

 

  if (!isAuthenticated) {
    return <Redirect to='/login' />
  }


  return (
    <React.Fragment>
      <DataTable
      />
      </React.Fragment>
  );
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  access: state.auth.access,
  user: state.auth.user,
  list: state.list.results,
  loading: state.list.loading

});
export default connect(mapStateToProps, {})(TransactionsListPage);
// export default TransactionsListPage
