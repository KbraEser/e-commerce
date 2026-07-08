import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FooterComponent from '../layout/Footer'
import { Header } from '../layout/Header'
import Breadcrumb from '../components/Breadcrumb'
import BrandLogos from '../components/Brands'
import CartSummary from '../components/cart/CartSummary'
import CartTable from '../components/cart/CartTable'
import type { AppDispatch, RootState } from '../store'
import { toggleAllCartItems } from '../store/slice/shoppingCartSlice'
import {
  formatCartPrice,
  getCartTotalCount,
  getSelectedCartTotal,
} from '../utils/cartUtils'

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const cart = useSelector((state: RootState) => state.shoppingCart.cart)

  const totalCount = getCartTotalCount(cart)
  const selectedItems = cart.filter((item) => item.checked)
  const selectedCount = getCartTotalCount(selectedItems)
  const selectedTotal = getSelectedCartTotal(cart)
  const shippingFee = selectedCount > 0 ? 29.99 : 0
  const discount = selectedTotal >= 150 ? shippingFee : 0
  const grandTotal = selectedTotal + shippingFee - discount
  const allChecked = cart.length > 0 && cart.every((item) => item.checked)

  const handleToggleAll = () => {
    dispatch(toggleAllCartItems(!allChecked))
  }

  return (
    <>
      <Header greenBackground={true} constrained mobileVariant="shop" />
      <Breadcrumb
        title="Shopping Cart"
        items={[
          { label: 'Home', to: '/' },
          { label: 'Shop', to: '/shop' },
          { label: 'Shopping Cart' },
        ]}
      />

      <section className="w-full bg-text-gray py-10">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 md:px-9">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-bold text-primary">
              Sepetim ({totalCount} Ürün)
            </h1>
            {cart.length > 0 && (
              <p className="text-sm font-bold text-gray-light">
                Seçili tutar: {formatCartPrice(selectedTotal)}
              </p>
            )}
          </div>

          {cart.length === 0 ? (
            <div className="rounded-md border border-light-open-gray bg-white px-6 py-16 text-center shadow-sm">
              <p className="text-lg font-bold text-primary">Sepetiniz boş</p>
              <p className="mt-2 text-sm text-gray-light">
                Alışverişe devam etmek için ürün ekleyin.
              </p>
              <Link
                to="/shop"
                className="mt-6 inline-flex items-center justify-center rounded-md bg-secondary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#1b8ecf]"
              >
                Alışverişe Devam Et
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px] xl:items-start">
              <CartTable
                items={cart}
                allChecked={allChecked}
                onToggleAll={handleToggleAll}
              />
              <div className="xl:sticky xl:top-6">
                <CartSummary
                  productsTotal={selectedTotal}
                  shippingFee={shippingFee}
                  discount={discount}
                  grandTotal={grandTotal}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <BrandLogos />
      <FooterComponent whiteTopBar />
    </>
  )
}

export default CartPage
