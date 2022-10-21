import { connect } from 'react-redux';
import { Account } from '../../../screens/customer/account';
import { support,getAllshop,getprofileuser,getuseraddress,deleteUseraccount,getusercard,getsupportlist,branddetails,Brandslist } from '../../../redux/actions/Auth'


const mapStateToProps = (state) => ({
    vendorRequestLoader: state.auth.vendorRequestLoader,
    getlistshop: state.auth.getlistshop,
    loginuserid: state.auth.loginuserid,
    loginuserstatus: state.auth.loginuserstatus,
    loginCredentials:state.auth.loginCredentials,
    getprofileuserlist: state.auth.getprofileuserlist,
    getuseraddresslist: state.auth.getuseraddresslist,
    getusercardlist: state.auth.getusercardlist,
    getchatsupportlist1: state.auth.getchatsupportlist1,
    getBranddetails: state.auth.getBranddetails,
    getlistbranddetails: state.auth.getlistbranddetails,
    Brandlistdata: state.auth.Brandlistdata,
});

const mapDispatchToProps = {
    getAllshop,
    getprofileuser,
    getuseraddress,
    getusercard,
    getsupportlist,
    support,
    branddetails,
    Brandslist,
    deleteUseraccount
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
