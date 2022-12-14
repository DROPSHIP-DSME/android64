import { connect } from 'react-redux';
import { createselleraccount } from '../../screens/stripe';
import { updateprofile,getprofileuser,getusercard,deletecardaddress } from '../../redux/actions/Auth'


const mapStateToProps = (state) => ({
    vendorRequestLoader: state.auth.vendorRequestLoader,
    updateprofileLoader: state.auth.updateprofileLoader,
    getprofileuserlist: state.auth.getprofileuserlist,
    getusercardlist: state.auth.getusercardlist,
    deletecardlioder: state.auth.deletecardlioder,
    loginuserid: state.auth.loginuserid,
    loginuserstatus: state.auth.loginuserstatus,
});


const mapDispatchToProps = {

};

export default (createselleraccount);
