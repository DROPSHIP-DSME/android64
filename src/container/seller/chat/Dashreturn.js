 import { connect } from 'react-redux';
import { Dashreturn } from '../../../screens/seller/chat';
import { getselldeshboard,gettopsell,getincomingtlist,liveeventdetail } from '../../../redux/actions/Auth'


const mapStateToProps = (state) => ({
    vendorRequestLoader: state.auth.vendorRequestLoader,
    vendorRequestedInfo: state.auth.vendorRequestedInfo,
    loginuserid: state.auth.loginuserid,
    loginuserstatus: state.auth.loginuserstatus,
    getlistselldeshboard: state.auth.getlistselldeshboard,
    gettopsellproduct: state.auth.gettopsellproduct,
    getinconeorderlist: state.auth.getinconeorderlist,
});

const mapDispatchToProps = {
   getselldeshboard,
   gettopsell,
   getincomingtlist,
   liveeventdetail
   // signup

};

export default connect(mapStateToProps, mapDispatchToProps)(Dashreturn);

