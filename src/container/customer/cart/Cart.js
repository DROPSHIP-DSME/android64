import { connect } from 'react-redux';
import { Cart } from '../../../screens/customer/cart';
import { cartlist,cartdata,increcartlist,chekout,cartPrice,deletedata,getprofileuser,getuseraddress } from '../../../redux/actions/Auth'


const mapStateToProps = (state) => ({
    cartlistdata1: state.auth.cartlistdata1,
    incrementcartlioder: state.auth.incrementcartlioder,
    deletedatalioder: state.auth.deletedatalioder,
    loginuserid: state.auth.loginuserid,
    loginuserstatus: state.auth.loginuserstatus,
    loginCredentials:state.auth.loginCredentials,
    totalcartprice:state.auth.totalcartprice,
});

const mapDispatchToProps = {   
    cartlist,
   cartdata,
   increcartlist,
   deletedata,
   getprofileuser,
   getuseraddress,
   cartPrice,
   chekout
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Cart);