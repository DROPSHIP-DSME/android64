import { connect } from 'react-redux';
import { RegistrationShop } from '../../screens/auth';
import {shoplogin,updatestripedata,signInwithsocial} from '../../redux/actions/Auth'



const mapStateToProps = (state) => ({
    loginLoader:state.auth.loginLoader,
    loginuserid: state.auth.loginuserid,
    loginuserstatus: state.auth.loginuserstatus,
    alertmessage:state.auth.alertmessage,
});

const mapDispatchToProps = {
    shoplogin,
    updatestripedata,
    signInwithsocial
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationShop);