import { connect } from 'react-redux';
import { Privacy } from '../../screens/auth';
import { shopsignup,updatestripedata } from '../../redux/actions/Auth'


const mapStateToProps = (state) => ({
    signupCredentials: state.auth.signupCredentials,
    signupSuccess: state.auth.signupSuccess,
    registrationLoader: state.auth.registrationLoader
});

const mapDispatchToProps = {
    shopsignup,
    updatestripedata
};

export default connect(mapStateToProps, mapDispatchToProps)(Privacy);