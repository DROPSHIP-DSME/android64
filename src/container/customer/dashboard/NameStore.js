import { connect } from 'react-redux';
import { NameStore } from '../../../screens/customer/dashboard';
import { shopproduct,cartdata,shopsellcount,getAllproduct,managefavorite,getfavoriteproductlist,getAllproductdetails,getAllshop,cartadd,getpostrating } from '../../../redux/actions/Auth'



const mapStateToProps = (state) => ({
    vendorRequestLoader: state.auth.vendorRequestLoader,
    vendorRequestedInfo: state.auth.vendorRequestedInfo,
    getshopproductlist: state.auth.getshopproductlist,
    getshopselllist: state.auth.getshopselllist,
    loginuserid: state.auth.loginuserid,
    loginuserstatus: state.auth.loginuserstatus,
    getlistproductdetails: state.auth.getlistproductdetails,
    getlistshop: state.auth.getlistshop,
    addcartLoader: state.auth.addcartLoader,
    getlistproduct: state.auth.getlistproduct,
    getfavproduct: state.auth.getfavproduct,
});

const mapDispatchToProps = {
    shopproduct,
    shopsellcount,
    getAllproductdetails,
    getAllshop,
    cartadd,
    getAllproduct,
    cartdata,
    getpostrating,
    managefavorite,
    getfavoriteproductlist
};
 
export default connect(mapStateToProps, mapDispatchToProps)(NameStore);
