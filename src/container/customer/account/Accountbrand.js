 import { connect } from 'react-redux';
import { Accountbrand } from '../../../screens/customer/account';
import { getselldeshboard,gettopsell,getincomingtlist,liveeventdetail,Brandslist } from '../../../redux/actions/Auth'


const mapStateToProps = (state) => ({
    vendorRequestLoader: state.auth.vendorRequestLoader,
    vendorRequestedInfo: state.auth.vendorRequestedInfo,
    loginuserid: state.auth.loginuserid,
    loginuserstatus: state.auth.loginuserstatus,
    getlistselldeshboard: state.auth.getlistselldeshboard,
    gettopsellproduct: state.auth.gettopsellproduct,
    getinconeorderlist: state.auth.getinconeorderlist,
    Brandlistdata: state.auth.Brandlistdata,
});
 
const mapDispatchToProps = {
   getselldeshboard,
   gettopsell,
   getincomingtlist,
   liveeventdetail,
   Brandslist,
   // signup

};

export default connect(mapStateToProps, mapDispatchToProps)(Accountbrand);

