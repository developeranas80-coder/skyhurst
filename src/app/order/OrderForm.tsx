'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './order.module.css';

interface Artwork {
  id: string;
  title: string;
  img: string;
}

interface Size {
  id: string;
  label: string;
  basePrice: number;
}

interface Edition {
  id: string;
  label: string;
  extraPrice: number;
}

interface Props {
  artworks: Artwork[];
  sizes: Size[];
  editions: Edition[];
}

export default function OrderForm({ artworks, sizes, editions }: Props) {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork>(artworks[0]);
  const [selectedSize, setSelectedSize] = useState<Size>(sizes[1]); // Default 16x20
  const [selectedEdition, setSelectedEdition] = useState<Edition>(editions[0]);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [checkoutMode, setCheckoutMode] = useState<'instant' | 'manual'>('instant');
  const [manualSubmitted, setManualSubmitted] = useState(false);

  const unitPrice = selectedSize.basePrice + selectedEdition.extraPrice;
  const totalPrice = unitPrice * quantity;

  // Stripe / PayPal Direct Link Integration
  const handleStripeCheckout = () => {
    // If client provides a Stripe Payment Link URL, navigate there:
    const stripeBaseUrl =
      process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK ||
      'https://buy.stripe.com/test_eVaeVf4oR1Qh3gQ3cc'; // Fallback test link

    // Encode product details into URL params or redirect
    const params = new URLSearchParams({
      client_reference_id: `${selectedArtwork.title}__${selectedSize.label}__qty${quantity}`,
      prefilled_email: customerEmail,
    });

    window.open(`${stripeBaseUrl}?${params.toString()}`, '_blank', 'noopener,noreferrer');
  };

  const handlePayPalCheckout = () => {
    // PayPal.me or PayPal link direct checkout
    const paypalUser = process.env.NEXT_PUBLIC_PAYPAL_USER || 'skyhurststudios';
    const ppUrl = `https://www.paypal.com/paypalme/${paypalUser}/${totalPrice}USD`;
    window.open(ppUrl, '_blank', 'noopener,noreferrer');
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setManualSubmitted(true);
  };

  return (
    <div className={styles.layout}>

      {/* ── LEFT: Visual Artwork Preview & Details ── */}
      <div className={styles.previewCol}>
        <div className={styles.artworkCard}>
          <div className={styles.artworkImgWrap}>
            <Image
              src={selectedArtwork.img}
              alt={selectedArtwork.title}
              fill
              sizes="(max-width: 900px) 100vw, 420px"
              className={styles.artworkImg}
              priority
            />
            <div className={styles.artworkBadge}>Selected Artwork</div>
          </div>
          <div className={styles.artworkInfo}>
            <h3 className={styles.artworkTitle}>{selectedArtwork.title}</h3>
            <p className={styles.artworkMeta}>
              Archival Giclée Canvas · Heavyweight 380gsm Cotton · Gallery Stretched
            </p>
          </div>
        </div>

        {/* Archival guarantee note */}
        <div className={styles.guaranteeBox}>
          <div className={styles.guaranteeItem}>
            <span className={styles.guaranteeIcon}>✦</span>
            <div>
              <strong>Convention Direct Drop:</strong>
              <p>Hand-crafted with museum-grade UV-resistant pigment inks.</p>
            </div>
          </div>
          <div className={styles.guaranteeItem}>
            <span className={styles.guaranteeIcon}>✓</span>
            <div>
              <strong>Inspected by Gary &amp; Chris:</strong>
              <p>Each piece is examined, sealed, and prepared for safe shipping.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Configurator & Direct Payment ── */}
      <div className={styles.configCol}>

        {/* Artwork Selector Dropdown */}
        <div className={styles.fieldGroup}>
          <label className={styles.label}>1. Choose Artwork</label>
          <select
            value={selectedArtwork.id}
            onChange={(e) => {
              const found = artworks.find((a) => a.id === e.target.value);
              if (found) setSelectedArtwork(found);
            }}
            className={styles.select}
          >
            {artworks.map((a) => (
              <option key={a.id} value={a.id}>
                {a.title}
              </option>
            ))}
          </select>
        </div>

        {/* Size Selection */}
        <div className={styles.fieldGroup}>
          <label className={styles.label}>2. Select Canvas Size</label>
          <div className={styles.sizeOptions}>
            {sizes.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`${styles.optionBtn} ${selectedSize.id === s.id ? styles.activeOption : ''}`}
                onClick={() => setSelectedSize(s)}
              >
                <span className={styles.optionName}>{s.label}</span>
                <span className={styles.optionPrice}>${s.basePrice}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Edition Selection */}
        <div className={styles.fieldGroup}>
          <label className={styles.label}>3. Edition / Signing</label>
          <div className={styles.editionOptions}>
            {editions.map((ed) => (
              <button
                key={ed.id}
                type="button"
                className={`${styles.optionBtn} ${selectedEdition.id === ed.id ? styles.activeOption : ''}`}
                onClick={() => setSelectedEdition(ed)}
              >
                <span className={styles.optionName}>{ed.label}</span>
                <span className={styles.optionPrice}>
                  {ed.extraPrice > 0 ? `+$${ed.extraPrice}` : 'Included'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className={styles.qtyRow}>
          <label className={styles.label}>Quantity</label>
          <div className={styles.qtyControls}>
            <button
              type="button"
              className={styles.qtyBtn}
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              −
            </button>
            <span className={styles.qtyDisplay}>{quantity}</span>
            <button
              type="button"
              className={styles.qtyBtn}
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>

        {/* Order Summary & Pricing Box */}
        <div className={styles.summaryCard}>
          <div className={styles.summaryRow}>
            <span>Item</span>
            <span className={styles.summaryVal}>{selectedArtwork.title}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Size &amp; Edition</span>
            <span className={styles.summaryVal}>
              {selectedSize.label} · {selectedEdition.label}
            </span>
          </div>
          <div className={styles.summaryRow}>
            <span>Unit Price</span>
            <span className={styles.summaryVal}>${unitPrice}.00</span>
          </div>
          <div className={styles.summaryDivider} />
          <div className={styles.totalRow}>
            <span className={styles.totalLabel}>Total Due</span>
            <span className={styles.totalVal}>${totalPrice}.00 USD</span>
          </div>
        </div>

        {/* Checkout Tabs: Instant Gateway vs Manual */}
        <div className={styles.checkoutTabs}>
          <button
            type="button"
            className={`${styles.tabBtn} ${checkoutMode === 'instant' ? styles.activeTab : ''}`}
            onClick={() => setCheckoutMode('instant')}
          >
            Direct Payment (Stripe / PayPal)
          </button>
          <button
            type="button"
            className={`${styles.tabBtn} ${checkoutMode === 'manual' ? styles.activeTab : ''}`}
            onClick={() => setCheckoutMode('manual')}
          >
            Invoice / Zelle / Direct Transfer
          </button>
        </div>

        {checkoutMode === 'instant' ? (
          <div className={styles.gatewayArea}>
            <p className={styles.gatewayNotice}>
              Instant secure checkout. Shipping address is collected securely through Stripe or PayPal.
            </p>

            <div className={styles.gatewayButtons}>
              {/* Stripe Direct Link */}
              <button
                type="button"
                onClick={handleStripeCheckout}
                className={styles.stripeBtn}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4C2.89 4 2.01 4.89 2.01 6L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                </svg>
                <span>Pay with Card / Apple Pay — ${totalPrice}.00</span>
                <span className={styles.btnArrow}>↗</span>
              </button>

              {/* PayPal Direct Link */}
              <button
                type="button"
                onClick={handlePayPalCheckout}
                className={styles.paypalBtn}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.82.802 4.646-.867 3.167-3.14 5.385-6.02 5.385H10.61l-1.39 8.87a.64.64 0 0 1-.633.526h-1.511z"/>
                </svg>
                <span>Pay with PayPal — ${totalPrice}.00</span>
                <span className={styles.btnArrow}>↗</span>
              </button>
            </div>

            <p className={styles.subtext}>
              * No eCommerce account creation required. Artists directly receive confirmation and tracking details.
            </p>
          </div>
        ) : manualSubmitted ? (
          <div className={styles.manualSuccess}>
            <span className={styles.checkIcon}>✓</span>
            <h4>Direct Order Received!</h4>
            <p>
              We have noted your order for <strong>{selectedArtwork.title}</strong> (${totalPrice}.00).
              Gary or Chris will email you at <strong>{customerEmail || 'your email'}</strong> within 24–48 hours with payment confirmation and shipping details.
            </p>
            <button
              type="button"
              onClick={() => setManualSubmitted(false)}
              className={styles.backBtn}
            >
              Configure another canvas
            </button>
          </div>
        ) : (
          <form onSubmit={handleManualSubmit} className={styles.manualForm}>
            <p className={styles.manualInfo}>
              Prefer to pay via invoice, Zelle, or arrange convention pickup? Provide your details below:
            </p>
            <div className={styles.manualInputs}>
              <input
                type="text"
                required
                placeholder="Full Name *"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className={styles.textInput}
              />
              <input
                type="email"
                required
                placeholder="Email Address *"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className={styles.textInput}
              />
              <textarea
                required
                rows={2}
                placeholder="Shipping Address (Street, City, State, ZIP) *"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className={styles.textarea}
              />
              <textarea
                rows={2}
                placeholder="Special notes, signing dedications, or convention pickup request..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className={styles.textarea}
              />
            </div>
            <button type="submit" className={styles.manualSubmitBtn}>
              Submit Direct Order Request (${totalPrice}.00) →
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
