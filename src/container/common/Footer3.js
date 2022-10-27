import { connect } from 'react-redux';
import { Footer3 } from '../../screens/common';
import { signup,Brandslist } from '../../redux/actions/Auth'


const mapStateToProps = (state) => ({
    vendorRequestLoader: state.auth.vendorRequestLoader,
    vendorRequestedInfo: state.auth.vendorRequestedInfo,
    loginuserid: state.auth.loginuserid,
    loginuserstatus: state.auth.loginuserstatus,
    Brandlistdata: state.auth.Brandlistdata,
});

const mapDispatchToProps = {
    signup,
    Brandslist
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer3);
