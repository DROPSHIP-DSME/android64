import { connect } from 'react-redux';
import { shop } from '../../../screens/customer/shop';
import { getAllshop,getAllproduct,getAllcategory,getfilterproduct } from '../../../redux/actions/Auth'


const mapStateToProps = (state) => ({
    vendorRequestLoader: state.auth.vendorRequestLoader,
    getlistshop: state.auth.getlistshop,
    getlistproduct:state.auth.getlistproduct,
    getlistcategory:state.auth.getlistcategory,
    loginuserid: state.auth.loginuserid,
    loginuserstatus: state.auth.loginuserstatus,
});

const mapDispatchToProps = {
    getAllshop,
    getAllproduct,
    getfilterproduct,
    getAllcategory
};

export default connect(mapStateToProps, mapDispatchToProps)(shop);
