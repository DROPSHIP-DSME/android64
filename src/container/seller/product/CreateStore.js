import { connect } from 'react-redux';
import { CreateStore } from '../../../screens/seller/product';
import { createshop,updatebrand,getbrandName } from '../../../redux/actions/Auth'


const mapStateToProps = (state) => ({
    vendorRequestLoader: state.auth.vendorRequestLoader,
    vendorRequestedInfo: state.auth.vendorRequestedInfo,
    loginuserid: state.auth.loginuserid,
    loginuserstatus: state.auth.loginuserstatus,
    brandName: state.auth.brandName
});

const mapDispatchToProps = {
    createshop,
    updatebrand,
    getbrandName
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateStore);
