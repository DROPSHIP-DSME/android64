 import { connect } from 'react-redux';
import { Overview } from '../../../screens/seller/dashboard';
import { getselldeshboard,gettopsell,getincomingtlist,getsalesanalytics,liveeventdetail,Brandslist } from '../../../redux/actions/Auth'


const mapStateToProps = (state) => ({
    vendorRequestLoader: state.auth.vendorRequestLoader,
    vendorRequestedInfo: state.auth.vendorRequestedInfo,
    loginuserid: state.auth.loginuserid,
    loginuserstatus: state.auth.loginuserstatus,
    getlistselldeshboard: state.auth.getlistselldeshboard,
    gettopsellproduct: state.auth.gettopsellproduct,
    getinconeorderlist: state.auth.getinconeorderlist,
    Brandlistdata: state.auth.Brandlistdata,
    getgraphData: state.auth.getgraphData,
});
 
const mapDispatchToProps = {
   getselldeshboard,
   gettopsell,
   getincomingtlist,
   liveeventdetail,
   Brandslist,
   getsalesanalytics
   // signup

};

export default connect(mapStateToProps, mapDispatchToProps)(Overview);