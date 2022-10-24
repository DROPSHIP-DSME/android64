 import { connect } from 'react-redux';
import { Accountfollow } from '../../../screens/customer/account';
import { getselldeshboard,gettopsell,getincomingtlist,liveeventdetail,getfollowproductlist,getAllproduct } from '../../../redux/actions/Auth'


const mapStateToProps = (state) => ({
    vendorRequestLoader: state.auth.vendorRequestLoader,
    vendorRequestedInfo: state.auth.vendorRequestedInfo,
    loginuserid: state.auth.loginuserid,
    loginuserstatus: state.auth.loginuserstatus,
    getlistselldeshboard: state.auth.getlistselldeshboard,
    gettopsellproduct: state.auth.gettopsellproduct,
    getinconeorderlist: state.auth.getinconeorderlist,
    getlistproduct:state.auth.getlistproduct,
    getfollowproduct:state.auth.getfollowproduct,
});

const mapDispatchToProps = {
   getselldeshboard,
   gettopsell,
   getincomingtlist,
   liveeventdetail,
   getfollowproductlist,
   getAllproduct
   // signup

};

export default connect(mapStateToProps, mapDispatchToProps)(Accountfollow);

