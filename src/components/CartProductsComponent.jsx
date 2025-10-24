import { useCartContext } from "../context/Cart.context"
import { useProductContext } from "../context/Products.context";
import { useWishlistsContext } from "../context/Wishlists.context"

export default function CartProductsComponent(){
  const { cart,cartLoading,cartError, removeFromCart, cartQuantity } = useCartContext();
  
  const { wishlistLoading, isWishlisted, wishlistError, wishlistHandler } = useWishlistsContext();

  const { navigate } = useProductContext();
  
  const totalPrice = cart?.data?.reduce((acc,curr)=> acc + curr.productId.price * curr.quantity,0);

  const discount = totalPrice > 50 ? 25 : 15  ;
  const deliveryCharge = totalPrice > 50 ? 0 : 20;
  const totalAmount = totalPrice - discount + deliveryCharge

  if(cartLoading){
    return(
      <>
      <main className="container vh-100 d-flex flex-column justify-content-center align-items-center text-center">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>

          <p className="mt-4 fs-4 fw-semibold">Loading your cart...</p>
      </main>
      </>
    )
  }

  if(cartError){
    return (
      <>
      <main className="container py-5 text-center">
        <div className="alert alert-danger">
          An error occurred while loading your cart
        </div>
      </main>
      </>
    )
  }

  // console.log(cart?.data?.map((item)=>item.productId.name))

  return (
    <>
      <main className="container py-4 mb-5">
        <div className="py-2 mb-3">
          <h2 className="text-center text-md-start" style={{color:"#f11c58ff"}}>
            My Cart
          </h2>

          <hr className="mx-autowhy" style={{ borderTop:"1px solid #f11c58ff" }} />
        </div>

        <div className="row mt-4">
          <div className="col-12">
            <h3 className="mb-5 py-2 border-bottom">
              Cart Products ({cart?.data?.length || 0})
            </h3>

            {cart?.data && cart?.data?.length > 0 ? (
              <div>

              </div>
            ) : (
              <div>
                <p>Your Cart is Empty!</p>
                <button onClick={()=>navigate("/products")}>Continue Shopping</button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}