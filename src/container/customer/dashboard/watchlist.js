import { connect } from 'react-redux';
import { watchlist } from '../../../screens/customer/dashboard';
import { support,cartdata,Brandslist,getAllproduct,getbrandName,getnotificationcount,getfavoriteproductlist,getAllshop,getsupportlist,getcurrentevent,getwatchlistproduct,getchanneltoken,getAllcategory } from '../../../redux/actions/Auth'


const mapStateToProps = (state) => ({
    vendorRequestLoader: state.auth.vendorRequestLoader,
    getlistcategory: state.auth.getlistcategory,
    getlistproduct: state.auth.getlistproduct,
    showwatchlistproduct: state.auth.getwatchlistproduct,
    loginuserid: state.auth.loginuserid,
    loginuserstatus: state.auth.loginuserstatus,
    getcurrenteventdata: state.auth.getcurrenteventdata,
    getchatsupportlist1: state.auth.getchatsupportlist1,
});

const mapDispatchToProps = {
    getAllcategory,
    getAllproduct,
    getcurrentevent,
    getwatchlistproduct,
    getchanneltoken,
    getsupportlist,
    support,
    getAllshop,
    Brandslist,
    getbrandName,
    cartdata,
    getnotificationcount,
    getfavoriteproductlist
};

export default connect(mapStateToProps, mapDispatchToProps)(watchlist);
