import { connect } from 'react-redux';
import { Verificationsteps } from '../../../screens/seller/verification';
import { getAllshop,getuseraddress,deleteaddress,createbrand,saveaddress } from '../../../redux/actions/Auth';

const mapStateToProps = (state) => ({
    loginuserid: state.auth.loginuserid,
    loginuserstatus: state.auth.loginuserstatus,
    vendorRequestLoader: state.auth.vendorRequestLoader,
    loginCredentials:state.auth.loginCredentials,
    getlistshop: state.auth.getlistshop,
    getuseraddresslist: state.auth.getuseraddresslist,
    deleteaddresslioder: state.auth.deleteaddresslioder,
});


const mapDispatchToProps = {
    // signup
    getAllshop,
    getuseraddress,
    deleteaddress,
    createbrand,
    saveaddress
};

export default connect(mapStateToProps, mapDispatchToProps)(Verificationsteps);

