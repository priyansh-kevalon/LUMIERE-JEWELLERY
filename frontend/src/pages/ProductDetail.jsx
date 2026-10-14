import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import ProductGallery from '../components/product/ProductGallery';
import ProductInfo from '../components/product/ProductInfo';
import ProductAccordions from '../components/product/ProductAccordions';
import ProductStory from '../components/product/ProductStory';
import ReviewsSection from '../components/product/ReviewsSection';
import BenefitsBar from '../components/common/BenefitsBar';
import { useCart, mergeBagLines } from '../context/CartContext';
import { startCheckout } from '../services/checkout';
import {
  useStorefrontProducts,
  discountPercent,
  getGallery,
  getRelated,
  describeProduct,
  reviewCount,
  categoryLabelOf,
  materialOf,
  sizesOf,
  finishesOf,
  sampleReviewSummary,
} from '../data/products';

const CARE_TEXT =
  'Keep your jewellery away from harsh chemicals and store it separately in a soft pouch. Clean gently using a suitable jewellery cloth and follow the care instructions supplied with your piece.';

function NotFound() {
  return (
    <main className="bg-[#0D0D0D]">
      <div className="mx-auto flex min-h-[70vh] w-full max-w-shell flex-col items-center justify-center px-6 pt-24 text-center">
        <Sparkles size={28} strokeWidth={1.2} className="text-[#C6A16A]" aria-hidden="true" />
        <h1 className="mt-4 font-serif text-2xl text-[#f2ece8]">Piece not found</h1>
        <p className="mt-3 max-w-sm text-[12px] font-light leading-relaxed text-[#a7a19b]">
          The piece you are looking for may have moved or is no longer part of the collection.
        </p>
        <a
          href="#/collections"
          className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#C6A16A]/60 px-7 py-3 text-[10px] font-medium uppercase tracking-[0.18em] text-[#C6A16A] transition-colors hover:bg-[#C6A16A] hover:text-[#0D0D0D]"
        >
          Back to Collections
          <ArrowRight size={14} strokeWidth={1.6} />
        </a>
      </div>
    </main>
  );
}

export default function ProductDetail({ productId }) {
  const products = useStorefrontProducts();
  const product = products.find((item) => item.id === productId);

  const { bag, addToBag, toggleWishlist, isWishlisted, openDrawer } = useCart();
  const [toast, setToast] = useState(null);
  const [activeImage, setActiveImage] = useState(product ? product.image : '');
  const [qty, setQty] = useState(1);
  const [finish, setFinish] = useState(null);
  const [size, setSize] = useState(null);
  const [adding, setAdding] = useState(false);
  const toastTimer = useRef(null);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  useEffect(() => {
    if (!product) return;
    const finishes = finishesOf(product);
    setActiveImage(product.image);
    setQty(1);
    setFinish(finishes && finishes.length ? finishes[0] : null);
    setSize(null);
  }, [productId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!product) return <NotFound />;

  const gallery = getGallery(product);
  const off = discountPercent(product);
  const reviews = reviewCount(product);
  const categoryLabel = categoryLabelOf(product);
  const sizes = sizesOf(product);
  const wishlisted = isWishlisted(product.id);
  const needsSize = Boolean(sizes) && !size;

  /* Related pieces, de-duplicated by image so the row never repeats a shot. */
  const related = (() => {
    const seen = new Set();
    const list = [];
    for (const candidate of getRelated(product, 8)) {
      if (seen.has(candidate.image)) continue;
      seen.add(candidate.image);
      list.push(candidate);
      if (list.length === 4) break;
    }
    return list;
  })();

  const showToast = (message) => {
    clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  };

  const handleToggleWishlist = (item) => {
    const has = isWishlisted(item.id);
    toggleWishlist(item);
    showToast(has ? `${item.name} removed from wishlist` : `${item.name} saved to wishlist`);
  };

  const handleAddToCart = () => {
    if (needsSize || adding) {
      if (needsSize) showToast('Please select a ring size first.');
      return;
    }
    setAdding(true);
    addToBag(product, { qty, size, metal: finish?.name });
    openDrawer('bag');
    window.setTimeout(() => setAdding(false), 500);
  };

  const handleBuyNow = async () => {
    if (needsSize || adding) {
      if (needsSize) showToast('Please select a ring size first.');
      return;
    }
    setAdding(true);
    const line = addToBag(product, { qty, size, metal: finish?.name });
    const cartForCheckout = mergeBagLines(bag, line);

    try {
      /* Integration point — forwards the cart when a checkout endpoint is
         configured, and otherwise reports honestly that it is not connected. */
      await startCheckout(cartForCheckout);
      showToast('Proceeding to secure checkout…');
    } catch (error) {
      showToast(
        error.message === 'checkout-not-configured'
          ? 'Checkout is not connected yet — your item has been saved to your bag.'
          : 'We could not start checkout right now — your item is saved in your bag.',
      );
    } finally {
      window.setTimeout(() => setAdding(false), 400);
    }
  };

  const goBack = () => {
    if (window.history.length > 1) window.history.back();
    else window.location.hash = '#/collections';
  };

  const details =
    product.details ||
    'Designed to celebrate timeless elegance, this piece combines refined craftsmanship with a delicate setting.';
  const about = product.about || details;

  const accordions = [
    { id: 'details', title: 'Product Details', content: details },
    {
      id: 'materials',
      title: 'Materials & Purity',
      content: `Crafted in ${materialOf(product)}${
        product.weight ? `, with an approximate weight of ${product.weight}` : ''
      }. Metal selection and finish reflect the option chosen above.`,
    },
    {
      id: 'diamond',
      title: 'Diamond Information',
      content: product.diamondType
        ? `${product.diamondType} diamonds${
            product.diamondShape ? `, ${product.diamondShape} cut` : ''
          }${product.diamondCarat ? `, ${product.diamondCarat}` : ''}. Certification details are shown from the product data whenever available.`
        : 'Diamond specifications, certification and stone details are displayed from the product data when available.',
    },
    {
      id: 'shipping',
      title: 'Shipping & Returns',
      content:
        'Shipping timelines, return eligibility and exchange conditions follow our store policy. Please contact our concierge for details specific to your order.',
    },
  ];

  const editorial = {
    image: '/images/about/Rectangle 34624211.png',
    tabs: [
      { id: 'about', label: 'About the Piece', content: about },
      { id: 'care', label: 'Jewellery Care', content: CARE_TEXT },
    ],
  };

  return (
    <main className="bg-[#0D0D0D]">
      <div className="mx-auto w-full max-w-[87.5rem] px-6 pb-14 pt-28 sm:px-10 sm:pt-32 lg:px-14 lg:pb-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-[11px] text-[#8f8a84]">
            <li>
              <a href="#home" className="transition-colors hover:text-[#C6A16A]">
                Home
              </a>
            </li>
            <li aria-hidden="true" className="text-[#4a4640]">
              /
            </li>
            <li>
              <a href="#/collections" className="transition-colors hover:text-[#C6A16A]">
                Collections
              </a>
            </li>
            <li aria-hidden="true" className="text-[#4a4640]">
              /
            </li>
            <li>
              <a
                href={`#/collections?category=${encodeURIComponent(product.category)}`}
                className="transition-colors hover:text-[#C6A16A]"
              >
                {product.category}
              </a>
            </li>
            <li aria-hidden="true" className="text-[#4a4640]">
              /
            </li>
            <li className="text-[#f2ece8]">{product.name}</li>
          </ol>
        </nav>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-10 xl:gap-12">
          <ProductGallery
            images={gallery}
            active={activeImage}
            onChange={setActiveImage}
            product={product}
            off={off}
            wishlisted={wishlisted}
            onToggleWishlist={toggleWishlist}
            onBack={goBack}
          />

          <div className="lg:sticky lg:top-28 lg:self-start">
            <ProductInfo
              product={product}
              categoryLabel={categoryLabel}
              off={off}
              reviews={reviews}
              description={describeProduct(product)}
              selectedFinish={finish}
              onSelectFinish={setFinish}
              selectedSize={size}
              onSelectSize={setSize}
              qty={qty}
              onQtyChange={setQty}
              wishlisted={wishlisted}
              onToggleWishlist={() => handleToggleWishlist(product)}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              adding={adding}
            />
          </div>
        </div>

        <div className="mt-14 lg:mt-20">
          <ProductAccordions accordions={accordions} editorial={editorial} />
        </div>
      </div>

      <ProductStory product={product} />

      <ReviewsSection summary={sampleReviewSummary} />

      {related.length > 0 && (
        <section aria-label="You may also like" className="bg-[#101010] py-16 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-[87.5rem] px-6 sm:px-10 lg:px-14">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#C6A16A]">
                  Complete the Look
                </p>
                <h2 className="mt-3 font-serif text-[26px] font-normal text-[#f2ece8] sm:text-[30px]">
                  You May Also Like
                </h2>
              </div>
              <a
                href="#/collections"
                className="group inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-[#C6A16A] transition-colors hover:text-[#e2c694]"
              >
                View All
                <ArrowRight
                  size={14}
                  strokeWidth={1.6}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 lg:mt-10 lg:grid-cols-4 lg:gap-y-14">
              {related.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  wishlisted={isWishlisted(item.id)}
                  onToggleWishlist={handleToggleWishlist}
                  onAddToBag={(target) => {
                    addToBag(target, { qty: 1 });
                    openDrawer('bag');
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <BenefitsBar />

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-[70] w-[92vw] max-w-sm -translate-x-1/2 rounded-full border border-[#C6A16A]/40 bg-[#1c1a18]/95 px-5 py-3 text-center text-[11px] font-light tracking-wide text-[#f2ece8] shadow-luxe backdrop-blur-md"
        >
          {toast}
        </div>
      )}
    </main>
  );
}
