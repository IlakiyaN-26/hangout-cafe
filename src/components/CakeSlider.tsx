import React, { useState } from 'react';
import cakes, { Cake } from '../data/cakes';
import '../App.css';

// 🧹 Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type WeightOption = "half" | "one" | "custom";

/**
 * 🍰 CakeSlider Component
 * Displays cakes in a beautiful Swiper slider
 * On clicking a cake → shows a modal to order
 */
const CakeSlider: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCake, setSelectedCake] = useState<Cake | null>(null);
  const [selectedWeight, setSelectedWeight] = useState<WeightOption>("half");
  const [customWeight, setCustomWeight] = useState<string>('');

  const openModal = (cake: Cake) => {
    setSelectedCake(cake);
    setSelectedWeight("half");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCake(null), 300);
  };

  const [mobile, setMobile] = React.useState("");

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = e.target.value.replace(/\D/g, ""); // remove non-digits
    setMobile(onlyDigits);
  };

  const confirmOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const name = (form.customerName as HTMLInputElement).value;
    const mobile = (form.mobile as HTMLInputElement).value;
    const address = (form.address as HTMLTextAreaElement).value;
    const cakeMsg = (form.cakeMsg as HTMLTextAreaElement ).value
    const date = (form.deliveryDate as HTMLInputElement).value;
    const time = (form.deliveryTime as HTMLInputElement).value;

    if (!selectedCake) return;

    const weight =
      selectedWeight === 'half'
        ? '0.5'
        : selectedWeight === 'one'
        ? '1'
        : customWeight;

    const price =
      selectedWeight === 'half'
        ? selectedCake.priceHalf
        : selectedWeight === 'one'
        ? selectedCake.priceOne
        : parseFloat(customWeight) * selectedCake.priceOne;

    const order = {
      cake: selectedCake.name,
      weight,
      price,
      name,
      mobile,
      address,
      cakeMsg,
      date,
      time
    };

    console.log('✅ Order placed:', order);

    closeModal();
  };

  return (
    <>
      {/* 🖼️ Swiper Slider */}
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          768: {
            slidesPerView: 3,
          },
        }}
      >
        {cakes.map((cake, idx) => (
          <SwiperSlide key={idx}>
            <div className="cake-card">
              <img src={cake.image} alt={cake.name} />
              <p>{cake.name}</p>
              <button className="order-btn" onClick={() => openModal(cake)}>
                Order this Cake
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

<p className="swipe-hint">👉 Swipe for more cake varieties!</p>

      {/* 🎯 Modal */}
      {selectedCake && (
        <div className={`modal-backdrop ${isModalOpen ? 'open' : ''}`}>
          <div className="modal">
            <h2>{selectedCake.name}</h2>

            <form onSubmit={confirmOrder}>
              <div>
                <label>Select Weight</label>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="weight"
                      checked={selectedWeight === 'half'}
                      onChange={() => { setSelectedWeight('half'); setCustomWeight(''); }}
                    /> Half Kg — ₹{selectedCake.priceHalf}
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="weight"
                      checked={selectedWeight === 'one'}
                      onChange={() => { setSelectedWeight('one'); setCustomWeight(''); }}
                    /> 1 Kg — ₹{selectedCake.priceOne}
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="weight"
                      checked={selectedWeight === 'custom'}
                      onChange={() => setSelectedWeight('custom')}
                    /> Other:
                  </label>

                  {selectedWeight === 'custom' && (
                    <input
                      type="number"
                      name="customWeight"
                      placeholder="Kg"
                      step="0.1"
                      min="0.5"
                      value={customWeight}
                      onChange={(e) => setCustomWeight(e.target.value)}
                      required
                    />
                  )}
                </div>

                <p>
                  Price: ₹
                  {selectedWeight === 'half'
                    ? selectedCake.priceHalf
                    : selectedWeight === 'one'
                    ? selectedCake.priceOne
                    : customWeight
                    ? (parseFloat(customWeight) * selectedCake.priceOne).toFixed(2)
                    : '0'}
                </p>
              </div>

              <input type="text" name="customerName" placeholder="Your Name" required />
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={mobile}
                onChange={handleMobileChange}
                maxLength={10}
                required
              />

              <textarea name="address" placeholder="Address" required></textarea>
              <textarea name="cakeMsg" placeholder="Cake Message" required></textarea>
              <div>
                <input type="date" name="deliveryDate" required />
                <input type="time" name="deliveryTime" required />
              </div>

              <div>
                <button type="submit" className="confirm-btn">Confirm</button>
                <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CakeSlider;
