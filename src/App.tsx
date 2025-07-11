import './App.css';
import cakes from './data/cakes';
import React, { useState } from 'react';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCake, setSelectedCake] = useState<any>(null);
 const [selectedWeight, setSelectedWeight] = useState<"half" | "one" | "custom">("half");
  const [customWeight, setCustomWeight] = useState<string>('');

  const openModal = (cake: any) => {
    setSelectedCake(cake);
    setSelectedWeight('half');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCake(null), 300);
  };

  const confirmOrder = (e: React.FormEvent) => {
  e.preventDefault();

  const form = e.target as HTMLFormElement;

  const name = form.customerName.value;
  const mobile = form.mobile.value;
  const address = form.address.value;
  const date = form.deliveryDate.value;
  const time = form.deliveryTime.value;

  let weight = '';
  let price = 0;

  if (selectedWeight === 'half') {
    weight = '0.5';
    price = selectedCake.priceHalf;
  } else if (selectedWeight === 'one') {
    weight = '1';
    price = selectedCake.priceOne;
  } else if (selectedWeight === 'custom') {
    weight = customWeight;
    price = parseFloat(customWeight) * selectedCake.priceOne;
  }

  const order = {
    cake: selectedCake.name,
    weight,
    price,
    name,
    mobile,
    address,
    date,
    time
  };

  console.log('✅ Order placed:', order);

  closeModal();
};


  return (
    <>
      <header>Hangout Cafe</header>
      <main className="cake-grid">
        {cakes.map((cake, idx) => (
          <div className="cake-card" key={idx}>
            <img src={cake.image} alt={cake.name} />
            <p>{cake.name}</p>
            <button className="order-btn" onClick={() => openModal(cake)}>
              Order this Cake
            </button>
          </div>
        ))}
      </main>

{selectedCake && (
  <div className={`modal-backdrop ${isModalOpen ? 'open' : ''}`}>
    <div className="modal">
      <h2>{selectedCake.name}</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          confirmOrder(e);
        }}
      >
        <div style={{ marginBottom: "15px" }}>
          <div style={{ marginBottom: "8px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Select Weight</label>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <label>
                <input
                  type="radio"
                  name="weight"
                  checked={selectedWeight === 'half'}
                  onChange={() => {
                    setSelectedWeight('half');
                    setCustomWeight('');
                  }}
                />{" "}
                Half Kg — ₹{selectedCake.priceHalf}
              </label>

              <label>
                <input
                  type="radio"
                  name="weight"
                  checked={selectedWeight === 'one'}
                  onChange={() => {
                    setSelectedWeight('one');
                    setCustomWeight('');
                  }}
                />{" "}
                1 Kg — ₹{selectedCake.priceOne}
              </label>

              <label>
                <input
                  type="radio"
                  name="weight"
                  checked={selectedWeight === 'custom'}
                  onChange={() => setSelectedWeight('custom')}
                />{" "}
                Other:
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
                  style={{
                    width: "60px",
                    marginLeft: "5px",
                    padding: "2px 4px",
                    borderRadius: "4px",
                  }}
                  required
                />
              )}
            </div>
          </div>

          <p style={{ fontWeight: 'bold', margin: "10px 0" }}>
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

        <input
          type="text"
          name="customerName"
          placeholder="Your Name"
          required
          style={{ width: "100%", margin: "5px 0", padding: "5px" }}
        />

        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          pattern="[0-9]{10}"
          title="Enter 10-digit mobile number"
          required
          style={{ width: "100%", margin: "5px 0", padding: "5px" }}
        />

        <textarea
          name="address"
          placeholder="Address"
          required
          rows={2}
          style={{ width: "100%", margin: "5px 0", padding: "5px" }}
        ></textarea>

        <label style={{ display: "block", marginTop: "10px" }}>
          Delivery Date & Time
        </label>

        <div style={{ display: "flex", gap: "5px", marginBottom: "10px" }}>
          <input
            type="date"
            name="deliveryDate"
            required
            style={{ flex: "1", padding: "5px" }}
          />
          <input
            type="time"
            name="deliveryTime"
            required
            style={{ flex: "1", padding: "5px" }}
          />
        </div>

        <div className="modal-actions">
          <button type="submit" className="confirm-btn">Confirm</button>
          <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
        </div>
      </form>
    </div>
  </div>
)}
      <Contact />
      <Footer />
    </>
  );
}

export default App;
