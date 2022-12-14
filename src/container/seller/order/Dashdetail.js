 import { connect } from 'react-redux';
import { Dashdetail } from '../../../screens/seller/order';
import { getselldeshboard,gettopsell,getincomingtlist,liveeventdetail,getorderdetail,updateorderdetail,createshippingorder,createshippinglabel } from '../../../redux/actions/Auth'


const mapStateToProps = (state) => ({
    vendorRequestLoader: state.auth.vendorRequestLoader,
    vendorRequestedInfo: state.auth.vendorRequestedInfo,
    loginuserid: state.auth.loginuserid,
    loginuserstatus: state.auth.loginuserstatus,
    getlistselldeshboard: state.auth.getlistselldeshboard,
    gettopsellproduct: state.auth.gettopsellproduct,
    getinconeorderlist: state.auth.getinconeorderlist,
    getorderlist: state.auth.getorderlist,
});

const mapDispatchToProps = {
   getselldeshboard,
   gettopsell,
   getincomingtlist,
   liveeventdetail,
   getorderdetail,
   updateorderdetail,
   createshippingorder,
   createshippinglabel
   // signup
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashdetail);

