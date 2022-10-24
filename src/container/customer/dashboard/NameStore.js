import { connect } from 'react-redux';
import { NameStore } from '../../../screens/customer/dashboard';
import { shopproduct,cartdata,shopsellcount,getAllproduct,getfollowproductlist,managefollow,managefavorite,getfavoriteproductlist,getAllproductdetails,getAllshop,cartadd,getpostrating } from '../../../redux/actions/Auth'



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
    getfollowproduct: state.auth.getfollowproduct
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
    managefollow,
    getfavoriteproductlist,
    getfollowproductlist
};
 
export default connect(mapStateToProps, mapDispatchToProps)(NameStore);
