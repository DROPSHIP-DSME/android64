 import { connect } from 'react-redux';
import { Accountfav1 } from '../../../screens/customer/account';
import { getselldeshboard,gettopsell,getincomingtlist,getAllproduct,liveeventdetail,getfavoriteproductlist } from '../../../redux/actions/Auth'


const mapStateToProps = (state) => ({
    vendorRequestLoader: state.auth.vendorRequestLoader,
    vendorRequestedInfo: state.auth.vendorRequestedInfo,
    loginuserid: state.auth.loginuserid,
    loginuserstatus: state.auth.loginuserstatus,
    getlistselldeshboard: state.auth.getlistselldeshboard,
    gettopsellproduct: state.auth.gettopsellproduct,
    getinconeorderlist: state.auth.getinconeorderlist,
    getfavproduct: state.auth.getfavproduct,
    getlistproduct:state.auth.getlistproduct
});

const mapDispatchToProps = {
   getselldeshboard,
   gettopsell,
   getincomingtlist,
   liveeventdetail,
   getfavoriteproductlist,
   getAllproduct
   // signup

};

export default connect(mapStateToProps, mapDispatchToProps)(Accountfav1);

