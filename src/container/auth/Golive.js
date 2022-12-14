import { connect } from 'react-redux';
import { Golive } from '../../screens/auth';
import { signup,shopsignupphone,countrylist,signInwithsocial,updatestripedata } from '../../redux/actions/Auth'


const mapStateToProps = (state) => ({
    vendorRequestLoader: state.auth.vendorRequestLoader,
    vendorRequestedInfo: state.auth.vendorRequestedInfo,
    countrylistdata: state.auth.countrylistdata,
    signupphoneLoader: state.auth.signupphoneLoader,
});

const mapDispatchToProps = {
    signup,
    shopsignupphone,
    countrylist,
    signInwithsocial,
    updatestripedata
};

export default connect(mapStateToProps, mapDispatchToProps)(Golive);