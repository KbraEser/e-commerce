export const scrollToShopProducts = () => {
  const anchor = document.getElementById('shop-products-top')
  if (anchor) {
    anchor.scrollIntoView({ behavior: 'auto', block: 'start' })
    return
  }

  document.scrollingElement?.scrollTo({ top: 0, left: 0 })
}
