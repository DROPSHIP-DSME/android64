 import { connect } from 'react-redux';
import { Dashsetting } from '../../../screens/seller/setting';
import { getselldeshboard,gettopsell,getincomingtlist,liveeventdetail,getbrandName,deleteUseraccount } from '../../../redux/actions/Auth'


const mapStateToProps = (state) => ({
    vendorRequestLoader: state.auth.vendorRequestLoader,
    vendorRequestedInfo: state.auth.vendorRequestedInfo,
    loginuserid: state.auth.loginuserid,
    loginuserstatus: state.auth.loginuserstatus,
    getlistselldeshboard: state.auth.getlistselldeshboard,
    gettopsellproduct: state.auth.gettopsellproduct,
    getinconeorderlist: state.auth.getinconeorderlist,
    brandName:state.auth.brandName
});

const mapDispatchToProps = {
   getselldeshboard,
   gettopsell,
   getincomingtlist,
   liveeventdetail,
   getbrandName,
   deleteUseraccount
   // signup

};

export default connect(mapStateToProps, mapDispatchToProps)(Dashsetting);

