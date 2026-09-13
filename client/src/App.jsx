import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [message, setMessage] = useState("");

  const loadProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/products`, {
        params: { search, category }
      });
      setProducts(data);
    } catch {
      setMessage("Could not connect to the server. Start the backend first.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [search, category]);

  const addToCart = (product) => {
    setCart((current) => {
      const found = current.find((item) => item._id === product._id);
      if (found) {
        return current.map((item) =>
          item._id === product._id
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
            : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
    setShowCart(true);
  };

  const updateQuantity = (id, amount) => {
    setCart((current) =>
      current
        .map((item) =>
          item._id === id
            ? { ...item, quantity: Math.max(0, Math.min(item.quantity + amount, item.stock)) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const placeOrder = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    try {
      await axios.post(`${API}/orders`, {
        customer: {
          name: form.get("name"),
          email: form.get("email"),
          address: form.get("address")
        },
        items: cart.map((item) => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        total
      });

      setCart([]);
      setCheckout(false);
      setShowCart(false);
      setMessage("Order placed successfully!");
    } catch {
      setMessage("Order could not be placed.");
    }
  };

  const categories = ["All", "Electronics", "Fashion", "Home"];

  return (
    <div className="app">
      <header className="header">
        <div className="logo">Shop<span>Kart</span></div>
        <div className="search-wrap">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
          />
        </div>
        <button className="cart-btn" onClick={() => setShowCart(true)}>
          🛒 Cart <b>{cart.reduce((n, i) => n + i.quantity, 0)}</b>
        </button>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">NEW COLLECTION</p>
          <h1>Everything you need.<br />All in one place.</h1>
          <p>Discover quality products at prices you'll love.</p>
          <button onClick={() => document.getElementById("products").scrollIntoView({ behavior: "smooth" })}>
            Shop Now →
          </button>
        </div>
      </section>

      <main id="products" className="container">
        <div className="section-head">
          <div>
            <h2>Featured Products</h2>
            <p>Browse our latest collection</p>
          </div>
          <div className="categories">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "active" : ""}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {message && <div className="message">{message}<button onClick={() => setMessage("")}>×</button></div>}

        {loading ? (
          <div className="loading">Loading products...</div>
        ) : (
          <div className="grid">
            {products.map((product) => (
              <article className="card" key={product._id}>
                <div className="image-wrap">
                  <img src={product.image} alt={product.name} />
                  <span>{product.category}</span>
                </div>
                <div className="card-body">
                  <div className="rating">★ {product.rating}</div>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="card-footer">
                    <strong>₹{product.price.toLocaleString("en-IN")}</strong>
                    <button onClick={() => addToCart(product)}>Add to Cart</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="empty">No products found.</div>
        )}
      </main>

      {showCart && (
        <div className="overlay" onClick={() => setShowCart(false)}>
          <aside className="cart-panel" onClick={(e) => e.stopPropagation()}>
            <div className="panel-head">
              <h2>Your Cart</h2>
              <button onClick={() => setShowCart(false)}>×</button>
            </div>

            {cart.length === 0 ? (
              <div className="empty">Your cart is empty.</div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item._id}>
                      <img src={item.image} alt={item.name} />
                      <div>
                        <h4>{item.name}</h4>
                        <strong>₹{item.price.toLocaleString("en-IN")}</strong>
                        <div className="quantity">
                          <button onClick={() => updateQuantity(item._id, -1)}>−</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item._id, 1)}>+</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-total">
                  <span>Total</span>
                  <strong>₹{total.toLocaleString("en-IN")}</strong>
                </div>
                <button className="checkout-btn" onClick={() => setCheckout(true)}>
                  Proceed to Checkout
                </button>
              </>
            )}
          </aside>
        </div>
      )}

      {checkout && (
        <div className="overlay">
          <form className="checkout" onSubmit={placeOrder}>
            <div className="panel-head">
              <h2>Checkout</h2>
              <button type="button" onClick={() => setCheckout(false)}>×</button>
            </div>
            <label>Name<input name="name" required /></label>
            <label>Email<input name="email" type="email" required /></label>
            <label>Address<textarea name="address" rows="4" required /></label>
            <div className="order-summary">Order total: <b>₹{total.toLocaleString("en-IN")}</b></div>
            <button className="checkout-btn">Place Order</button>
          </form>
        </div>
      )}

      <footer>
        <b>ShopKart</b> — Full-stack E-Commerce Demo
      </footer>
    </div>
  );
}

export default App;
