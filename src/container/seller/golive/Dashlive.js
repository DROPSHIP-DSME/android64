import { connect } from 'react-redux';
import { Dashlive } from '../../../screens/seller/golive';
import { getselldeshboard,gettopsell,getincomingtlist,Brandslist,
  getchanneltoken,liveeventdetail,getAllproduct,schuleEventstart,getbrandName } from '../../../redux/actions/Auth'


const mapStateToProps = (state) => ({
    vendorRequestLoader: state.auth.vendorRequestLoader,
    vendorRequestedInfo: state.auth.vendorRequestedInfo,
    loginuserid: state.auth.loginuserid,
    loginuserstatus: state.auth.loginuserstatus,
    loginCredentials:state.auth.loginCredentials,
    getlistselldeshboard: state.auth.getlistselldeshboard,
    gettopsellproduct: state.auth.gettopsellproduct,
    getinconeorderlist: state.auth.getinconeorderlist,
    getlistproduct: state.auth.getlistproduct,
    livedetail: state.auth.livedetail,
    removedatalioder: state.auth.removedatalioder,
    brandName:state.auth.brandName,
    Brandlistdata: state.auth.Brandlistdata,
}); 

const mapDispatchToProps = {
   getselldeshboard,
   gettopsell,
   getincomingtlist,
   liveeventdetail,
   getAllproduct,
   schuleEventstart,
   getchanneltoken,
   getbrandName, 
   Brandslist
   // signup

};

export default connect(mapStateToProps, mapDispatchToProps)(Dashlive);

