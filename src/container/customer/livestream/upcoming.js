import { connect } from 'react-redux';
import { upcoming } from '../../../screens/customer/livestream';
import { getalleventlist,getincomingtlist,getlivestreamrecap,deletelivestreamrecap,getcurrentevent,getupcomingevent } from '../../../redux/actions/Auth'


const mapStateToProps = (state) => ({
    vendorRequestLoader: state.auth.vendorRequestLoader,
    vendorRequestedInfo: state.auth.vendorRequestedInfo,
    getalleventdata: state.auth.getalleventdata,
    loginuserid: state.auth.loginuserid,
    loginuserstatus: state.auth.loginuserstatus,
    getinconeorderlist: state.auth.getinconeorderlist,
    livestreamrecaplist: state.auth.livestreamrecaplist,
    getcurrenteventdata: state.auth.getcurrenteventdata,
    getupcomingeventdata:state.auth.getupcomingeventdata
});

const mapDispatchToProps = { 
    getalleventlist,
    getincomingtlist,
    getlivestreamrecap,
    deletelivestreamrecap,
    getcurrentevent,
    getupcomingevent
};

export default connect(mapStateToProps, mapDispatchToProps)(upcoming);
