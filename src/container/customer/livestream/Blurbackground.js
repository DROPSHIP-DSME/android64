import { connect } from 'react-redux';
import { Blurbackground } from '../../../screens/customer/livestream';
import { schuleEventstart,
    updateleftcount,
    updatediscount,
    getalleventlist,
    cartadd,
    postcomment,
    getLiveCustomer, 
    getbrandName,
    getchannelbrandName,
    updateaudiancecount,
    updatelikecount,
    getaudiancecount,getAllproduct,
    cartPrice,chekout, cartdata,updatewatchlist,getLivecommentCustomer} from '../../../redux/actions/Auth'
 
const mapStateToProps = (state) => ({
    vendorRequestLoader: state.auth.vendorRequestLoader,
    addcartLoader: state.auth.addcartLoader,
    commentLoder: state.auth.commentLoder,
    getliveeventlist: state.auth.getliveeventlist,
    showbrandName:state.auth.brandName,
    loginuserid: state.auth.loginuserid,
    loginuserstatus: state.auth.loginuserstatus,
    audiancecount: state.auth.audiancecount,
    getalleventdata: state.auth.getalleventdata,
    totalcartprice:state.auth.totalcartprice,
    chekoutLoder: state.auth.chekoutLoder,
    getcalltokendata: state.auth.getcalltokendata,
    getlistproduct: state.auth.getlistproduct,
    livecommentlist:state.auth.getlivecommentlist
});

const mapDispatchToProps = {
    cartadd,
    postcomment,
    getLiveCustomer,
    getbrandName,
    getchannelbrandName,
    updateaudiancecount,
    getaudiancecount,
    schuleEventstart,
    updateleftcount,
    updatediscount,
    getalleventlist,
    getAllproduct,
    cartPrice,
    chekout,
    cartdata,
    updatewatchlist,
    getLivecommentCustomer,
    updatelikecount
};

export default connect(mapStateToProps, mapDispatchToProps)(Blurbackground);
