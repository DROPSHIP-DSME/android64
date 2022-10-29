import { connect } from 'react-redux';
import { SearchProduct } from '../../../screens/seller/golive';
import { getAllproduct,addproducttoevent,selectAllproduct } from '../../../redux/actions/Auth'


const mapStateToProps = (state) => ({
    vendorRequestLoader: state.auth.vendorRequestLoader,
    loginuserid: state.auth.loginuserid,
    loginuserstatus: state.auth.loginuserstatus,
    livedetail: state.auth.livedetail,
    Brandlistdata: state.auth.Brandlistdata,
    getlistproduct:state.auth.getlistproduct
});

const mapDispatchToProps = {
    getAllproduct,
    addproducttoevent,
    selectAllproduct
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchProduct);
