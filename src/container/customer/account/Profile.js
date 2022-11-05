import { connect } from 'react-redux';
import { Profile } from '../../../screens/customer/account/Profile';
import { support,getAllshop,getprofileuser,getselldeshboard,getmenucounts,getuseraddress,deleteUseraccount,getusercard,getsupportlist,branddetails,Brandslist } from '../../../redux/actions/Auth'


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
    brandName:state.auth.brandName,
    getlistbranddetails: state.auth.getlistbranddetails,
    Brandlistdata: state.auth.Brandlistdata,
    getlistselldeshboard:state.auth.getlistselldeshboard,
    menucount: state.auth.menucount,
    
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
    deleteUseraccount,
    getselldeshboard,
    getmenucounts
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);