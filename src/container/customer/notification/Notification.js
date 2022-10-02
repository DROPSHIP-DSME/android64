import { connect } from 'react-redux';
import { Notification } from '../../../screens/customer/notification';
import { getallnotification,getprofileuser,checkeventvalidity,markallread,getnotificationcount } from '../../../redux/actions/Auth'


const mapStateToProps = (state) => ({
    vendorRequestLoader: state.auth.vendorRequestLoader,
    getlistnotification: state.auth.getlistnotification,
    getprofileuserlist: state.auth.getprofileuserlist,
    loginuserid: state.auth.loginuserid,
    loginuserstatus: state.auth.loginuserstatus,
    alertmessage:state.auth.alertmessage,
});

const mapDispatchToProps = {
    getallnotification,
    getprofileuser,
    checkeventvalidity,
    markallread,
    getnotificationcount
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
