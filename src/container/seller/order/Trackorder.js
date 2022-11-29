 import { connect } from 'react-redux';
import { Trackorder } from '../../../screens/seller/order';
import { getselldeshboard,gettopsell,getincomingtlist,liveeventdetail,Brandslist,trackshippinglabel } from '../../../redux/actions/Auth';


const mapStateToProps = (state) => ({
    vendorRequestLoader: state.auth.vendorRequestLoader,
    vendorRequestedInfo: state.auth.vendorRequestedInfo,
    loginuserid: state.auth.loginuserid,
    loginuserstatus: state.auth.loginuserstatus,
    getlistselldeshboard: state.auth.getlistselldeshboard,
    gettopsellproduct: state.auth.gettopsellproduct, 
    getinconeorderlist: state.auth.getinconeorderlist,
    Brandlistdata: state.auth.Brandlistdata,
    getordertrackingDetail:state.auth.getordertrackingDetail
    
});

const mapDispatchToProps = {
   getselldeshboard,
   gettopsell,
   getincomingtlist,
   liveeventdetail,
   Brandslist,
   trackshippinglabel
};

export default connect(mapStateToProps, mapDispatchToProps)(Trackorder);

