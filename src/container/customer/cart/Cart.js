import { connect } from 'react-redux';
import { Cart } from '../../../screens/customer/cart';
import { cartlist,cartdata,increcartlist,cartPrice,deletedata,getprofileuser,getuseraddress } from '../../../redux/actions/Auth'


const mapStateToProps = (state) => ({
    cartlistdata1: state.auth.cartlistdata1,
    incrementcartlioder: state.auth.incrementcartlioder,
    deletedatalioder: state.auth.deletedatalioder,
    loginuserid: state.auth.loginuserid,
    loginuserstatus: state.auth.loginuserstatus,
    totalcartprice:state.auth.totalcartprice,
});

const mapDispatchToProps = {   
    cartlist,
   cartdata,
   increcartlist,
   deletedata,
   getprofileuser,
   getuseraddress,
   cartPrice
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Cart);