"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import "./landing.css";

export default function LandingPage() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = "1";
          (entry.target as HTMLElement).style.transform = "translateY(0)";
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll(".dest-card, .trip-card, .how-card, .test-card").forEach(el => {
      (el as HTMLElement).style.opacity = "0";
      (el as HTMLElement).style.transform = "translateY(30px)";
      (el as HTMLElement).style.transition = "opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)";
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#08060F", color: "#F5F3FF", minHeight: "100vh" }}>
      {/* Background */}
      <div className="bg-scene">
        <div className="orb orb1" />
        <div className="orb orb2" />
        <div className="orb orb3" />
      </div>
      <div className="grid-bg" />

      {/* Floating pills */}
      <div className="float-pill" style={{ top: "18%", left: "3%", animationDuration: "6s" }}>✈️ Paris, France</div>
      <div className="float-pill" style={{ top: "32%", right: "3%", animationDuration: "7.5s", animationDelay: "1s" }}>🏝 Bali, Indonesia</div>
      <div className="float-pill" style={{ bottom: "35%", left: "2%", animationDuration: "5.5s", animationDelay: "2s" }}>🗼 Tokyo, Japan</div>
      <div className="float-pill" style={{ bottom: "22%", right: "3%", animationDuration: "8s", animationDelay: "0.5s" }}>🌅 Dubai, UAE</div>

      {/* Navbar */}
      <nav className="land-nav">
        <Link href="/" className="nav-logo">
          <div className="nav-logo-icon">✈️</div>
          <span className="nav-logo-text">Traveloop</span>
        </Link>
        <ul className="nav-links">
          <li><a href="#" className="active">Home</a></li>
          <li><a href="#destinations">Destinations</a></li>
          <li><a href="#trips">Trips</a></li>
          <li><a href="#how">How It Works</a></li>
        </ul>
        <div className="nav-right">
          <Link href="/auth"><button className="btn-ghost">Sign In</button></Link>
          <Link href="/auth"><button className="btn-nav-cta">Start Planning →</button></Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">
          <span className="badge-dot" />
          ✨ Over 10,000 trips planned this month
        </div>
        <h1>
          Discover the World,<br />
          <span className="line2">Plan Every Adventure</span>
        </h1>
        <p className="hero-sub">
          Traveloop is your intelligent travel companion — build multi-city itineraries, track your budget, and share unforgettable journeys.
        </p>


        {/* Search bar */}
        <div className="search-card">
          <div className="search-field"><span className="sf-label">🌍 Destination</span><div className="sf-value"><span>Where do you want to go?</span></div></div>
          <div className="search-field"><span className="sf-label">📅 Departure</span><div className="sf-value"><span>Add dates</span></div></div>
          <div className="search-field"><span className="sf-label">📅 Return</span><div className="sf-value"><span>Add dates</span></div></div>
          <div className="search-field"><span className="sf-label">👥 Travelers</span><div className="sf-value"><span>1 traveler</span></div></div>
          <button className="search-btn">🔍 Search</button>
        </div>

        <div className="popular-tags">
          <span className="pop-label">Popular:</span>
          {["🌸 Bali", "🗼 Paris", "🏯 Tokyo", "🏙 New York", "🌴 Maldives", "🕌 Dubai"].map(t => (
            <span key={t} className="tag-pill">{t}</span>
          ))}
        </div>
      </section>

      {/* Destinations */}
      <section id="destinations" className="land-section">
        <div className="flex-between section-header">
          <div>
            <div className="section-eyebrow">Explore</div>
            <h2 className="section-title">Popular <span>Destinations</span></h2>
            <p className="section-sub">Hand-picked destinations loved by thousands of travelers worldwide.</p>
          </div>
          <a href="#" className="see-all">View all destinations →</a>
        </div>
        <div className="dest-grid">
          {[
            { cls: "bali", badge: "🔥 Trending", badgeStyle: {}, name: "Bali", country: "Indonesia", price: "From ₹45,000", rating: "★★★★★ 4.9", dur: "7–14 day trips" },
            { cls: "paris", badge: "💎 Premium", badgeStyle: { background: "rgba(59,130,246,0.2)", borderColor: "rgba(59,130,246,0.4)", color: "#93C5FD" }, name: "Paris", country: "France", price: "From ₹1,20,000", rating: "★★★★★ 4.8", dur: "5–10 day trips", aspect: "3/3.5" },
            { cls: "tokyo", badge: "✨ Must Visit", badgeStyle: { background: "rgba(167,139,250,0.2)", borderColor: "rgba(167,139,250,0.4)", color: "#C4B5FD" }, name: "Tokyo", country: "Japan", price: "From ₹85,000", rating: "★★★★★ 4.9", dur: "7–12 day trips" },
            { cls: "dubai", badge: "🔥 Trending", badgeStyle: {}, name: "Dubai", country: "UAE", price: "From ₹60,000", rating: "★★★★☆ 4.7", dur: "4–7 day trips", aspect: "3/3.5" },
          ].map(d => (
            <div key={d.name} className="dest-card" style={d.aspect ? { aspectRatio: d.aspect } : {}}>
              <div className={`dest-img ${d.cls}`} />
              <div className="dest-overlay" />
              <div className="dest-content">
                <div className="dest-badge" style={d.badgeStyle}>{d.badge}</div>
                <div className="dest-name">{d.name}</div>
                <div className="dest-country">🌍 {d.country}</div>
                <div className="dest-meta">
                  <span className="dest-price">{d.price}</span>
                  <span className="dest-rating">{d.rating}</span>
                </div>
              </div>
              <div className="dest-glass">
                <span style={{ fontSize: "0.78rem", color: "rgba(245,243,255,0.55)" }}>{d.dur}</span>
                <button className="add-trip-btn">+ Add to Trip</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Trips */}
      <section id="trips" className="land-section">
        <div className="flex-between section-header">
          <div>
            <div className="section-eyebrow">Community</div>
            <h2 className="section-title">Featured <span>Trip Plans</span></h2>
            <p className="section-sub">Real itineraries shared by our community. Copy and customize them.</p>
          </div>
          <a href="#" className="see-all">View all trips →</a>
        </div>
        <div className="trips-scroll">
          {[
            { cover: "tc-europe", label: "🇪🇺 Europe", days: "14 days", name: "Grand European Tour", dates: "📅 Jun 15 – Jun 29, 2025", budget: "₹1,85,000", stops: "📍 6 stops" },
            { cover: "tc-asia", label: "🌏 Southeast Asia", days: "21 days", name: "Southeast Asia Backpack", dates: "📅 Jul 1 – Jul 22, 2025", budget: "₹95,000", stops: "📍 8 stops" },
            { cover: "tc-ocean", label: "🏝 Island Hopping", days: "10 days", name: "Maldives & Sri Lanka", dates: "📅 Aug 10 – Aug 20, 2025", budget: "₹1,40,000", stops: "📍 4 stops" },
            { cover: "tc-nature", label: "🌿 Nature", days: "8 days", name: "Nepal Himalaya Trek", dates: "📅 Sep 5 – Sep 13, 2025", budget: "₹65,000", stops: "📍 3 stops" },
          ].map(t => (
            <div key={t.name} className="trip-card">
              <div className={`trip-cover ${t.cover}`}>
                <div className="trip-cover-label">{t.label}</div>
                <div className="trip-cover-days">{t.days}</div>
              </div>
              <div className="trip-body">
                <div className="trip-name">{t.name}</div>
                <div className="trip-dates">{t.dates}</div>
                <div className="trip-foot">
                  <span className="trip-budget">{t.budget}</span>
                  <span className="trip-stops">{t.stops}</span>
                </div>
                <div className="trip-actions">
                  <button className="ta-btn ta-view">View Plan</button>
                  <button className="ta-btn ta-edit">Copy Trip</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="land-section">
        <div className="section-header" style={{ textAlign: "center" }}>
          <div className="section-eyebrow" style={{ textAlign: "center" }}>Simple Process</div>
          <h2 className="section-title" style={{ textAlign: "center" }}>Plan your trip in <span>4 easy steps</span></h2>
        </div>
        <div className="how-grid">
          {[
            { num: "01", icon: "🌍", title: "Pick Your Destination", desc: "Search from 50,000+ cities worldwide. Filter by budget, region, or popularity." },
            { num: "02", icon: "🗺️", title: "Build Your Itinerary", desc: "Add stops, assign activities to each day, and reorder with drag and drop." },
            { num: "03", icon: "💰", title: "Track Your Budget", desc: "Automatic cost estimates, breakdowns by category, and smart budget alerts." },
            { num: "04", icon: "🤝", title: "Share & Inspire", desc: "Publish your trip publicly or share a private link with travel companions." },
          ].map(s => (
            <div key={s.num} className="how-card">
              <div className="how-num">{s.num}</div>
              <div className="how-icon">{s.icon}</div>
              <div className="how-title">{s.title}</div>
              <p className="how-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="land-section">
        <div className="flex-between section-header">
          <div>
            <div className="section-eyebrow">Reviews</div>
            <h2 className="section-title">Loved by <span>travelers</span></h2>
          </div>
        </div>
        <div className="test-grid">
          {[
            { stars: "★★★★★", text: "\"Traveloop made planning our Europe trip so effortless. The budget tracker alone saved us from overspending at least 3 times!\"", av: "av1", init: "PR", name: "Priya Rajan", loc: "📍 Mumbai → Europe" },
            { stars: "★★★★★", text: "\"The itinerary builder is brilliant. I built a 14-day Japan trip in under an hour. Shared it with my whole friend group.\"", av: "av2", init: "AK", name: "Arjun Kapoor", loc: "📍 Ahmedabad → Japan" },
            { stars: "★★★★★", text: "\"Finally a travel app that actually works offline! Planned everything at home and used it throughout our Southeast Asia trip.\"", av: "av3", init: "SM", name: "Sara Mehta", loc: "📍 Delhi → SE Asia" },
          ].map(r => (
            <div key={r.name} className="test-card">
              <div className="test-stars">{r.stars}</div>
              <p className="test-text">{r.text}</p>
              <div className="test-author">
                <div className={`test-avatar ${r.av}`}>{r.init}</div>
                <div><div className="test-name">{r.name}</div><div className="test-loc">{r.loc}</div></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <div className="cta-banner">
        <h2>Ready to Plan Your Dream Trip?</h2>
        <p>Join 120,000+ travelers who plan smarter with Traveloop. It&apos;s free to start.</p>
        <div className="cta-btns">
          <Link href="/auth"><button className="btn-cta-main">✈️ Start Planning Free</button></Link>
          <button className="btn-cta-sec">Watch Demo →</button>
        </div>
      </div>

      {/* Footer */}
      <footer className="land-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="nav-logo" style={{ textDecoration: "none", marginBottom: "0.5rem", display: "inline-flex" }}>
              <div className="nav-logo-icon" style={{ width: 32, height: 32, fontSize: 15, borderRadius: 8 }}>✈️</div>
              <span className="nav-logo-text" style={{ fontSize: "1.2rem" }}>Traveloop</span>
            </Link>
            <p>Your intelligent travel planning companion. Dream, plan, and explore the world effortlessly.</p>
          </div>
          <div className="footer-links"><h4>Product</h4><ul><li><a href="#">Features</a></li><li><a href="#">Pricing</a></li><li><a href="#">Destinations</a></li><li><a href="#">Community</a></li></ul></div>
          <div className="footer-links"><h4>Company</h4><ul><li><a href="#">About</a></li><li><a href="#">Blog</a></li><li><a href="#">Careers</a></li><li><a href="#">Contact</a></li></ul></div>
          <div className="footer-links"><h4>Legal</h4><ul><li><a href="#">Privacy Policy</a></li><li><a href="#">Terms of Service</a></li><li><a href="#">Cookie Policy</a></li></ul></div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Traveloop. Built with ❤️ for explorers.</p>
          <div className="social-row">
            <a href="#" className="social-btn">𝕏</a>
            <a href="#" className="social-btn">in</a>
            <a href="#" className="social-btn">ig</a>
            <a href="#" className="social-btn">yt</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
