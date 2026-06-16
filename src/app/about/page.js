"use client";

import Link from "next/link";
import { Leaf, Eye, Heart, Compass } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: <Leaf size={22} className="value-icon" />,
      title: "Ecological Materials",
      description: "We partner exclusively with sustainable forestry farms to source FSC-certified American walnut, solid oaks, and non-toxic brass finishes."
    },
    {
      icon: <Eye size={22} className="value-icon" />,
      title: "Visual Minimalism",
      description: "Our gadgets are designed to hide complex wiring and blinky status LEDs. We prefer clean, matte finishes and invisible capacitive sensors."
    },
    {
      icon: <Heart size={22} className="value-icon" />,
      title: "Acoustic Excellence",
      description: "Whether it is mechanical keyboard keystrokes or 360-degree wireless subwoofers, we ensure acoustic profiles sound warm and soothing."
    }
  ];

  const milestones = [
    { year: "2024", title: "The Inception", desc: "LuxeSpace is founded in San Francisco by a small collective of sound engineers and furniture designers looking to declutter workspaces." },
    { year: "2025", title: "Carbon Neutrality", desc: "Completed our transition to carbon-neutral manufacturing and offset 100% of shipping emissions globally." },
    { year: "2026", title: "The Smart Line", desc: "Launched the Halo Ring and Iris Aura series, bridging physical titanium fashion with biodata monitoring." }
  ];

  return (
    <div className="about-page-wrapper">
      <div className="glow-accent" style={{ top: "15%", left: "5%" }}></div>
      <div className="glow-accent" style={{ bottom: "15%", right: "5%" }}></div>

      <div className="container">
        {/* Title Section */}
        <div className="about-header text-center animate-fade-in">
          <span className="badge">Our Identity</span>
          <h1 className="text-gradient">Crafting Modern Sanctums</h1>
          <p className="about-intro">
            LuxeSpace was born out of a simple realization: the tools we use and the furniture we inhabit dictate the quality of our focus and peace of mind.
          </p>
        </div>

        {/* Narrative & Image split */}
        <div className="narrative-grid animate-fade-in">
          <div className="narrative-text glass">
            <h2>Merging Tech & Organics</h2>
            <p>
              Traditional electronics look cold, plastic-heavy, and expire in a few years. Traditional furniture is solid, but ignores our digital lives. We believe in bridging these two worlds.
            </p>
            <p>
              Every gadget curated in the LuxeSpace catalog uses natural materials (solid wood, spun metal, glass, wool felt) and features state-of-the-art processors, Bluetooth 5.3 chips, and high-frequency transducer technology. We build tools that perform like tomorrow but feel like home.
            </p>
            <div className="narrative-cta-row">
              <Link href="/items" className="btn btn-primary">
                Browse Curated Items <Compass size={16} />
              </Link>
            </div>
          </div>
          
          <div className="narrative-visual glass">
            <img 
              src="https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800" 
              alt="Luxe Desk Setup Mockup"
              className="about-workspace-img"
            />
            <div className="about-visual-overlay"></div>
          </div>
        </div>

        {/* Values Section */}
        <div className="values-section animate-fade-in">
          <h2 className="section-title text-center">Core Curating Pillars</h2>
          <div className="values-grid grid">
            {values.map((v, idx) => (
              <div key={idx} className="value-card glass">
                <div className="value-icon-container">
                  {v.icon}
                </div>
                <h3>{v.title}</h3>
                <p>{v.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* History timeline Section */}
        <div className="timeline-section glass animate-fade-in">
          <h2 className="timeline-title">Luxe Journey</h2>
          <div className="timeline-list">
            {milestones.map((m, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-year text-gradient-purple">{m.year}</div>
                <div className="timeline-content">
                  <h3>{m.title}</h3>
                  <p>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-page-wrapper {
          padding: 60px 0 100px;
          position: relative;
          min-height: 100vh;
        }

        .text-center {
          text-align: center;
        }

        .about-header {
          margin-bottom: 60px;
        }

        .about-header h1 {
          font-size: 2.8rem;
          margin-top: 10px;
          margin-bottom: 20px;
        }

        .about-intro {
          font-size: 1.15rem;
          color: var(--clr-text-muted);
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Narrative split layout */
        .narrative-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 48px;
          margin-bottom: 80px;
          align-items: center;
        }

        .narrative-text {
          padding: 40px;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .narrative-text h2 {
          font-size: 1.8rem;
          color: var(--clr-text-main);
        }

        .narrative-text p {
          font-size: 0.98rem;
          line-height: 1.7;
        }

        .narrative-cta-row {
          margin-top: 10px;
        }

        .narrative-visual {
          border-radius: var(--radius-lg);
          overflow: hidden;
          padding: 16px;
          position: relative;
          aspect-ratio: 1;
        }

        .about-workspace-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: var(--radius-md);
          display: block;
        }

        .about-visual-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%);
          pointer-events: none;
        }

        /* Values layout */
        .values-section {
          margin-bottom: 80px;
        }

        .section-title {
          font-size: 2.2rem;
          color: var(--clr-text-main);
          margin-bottom: 40px;
        }

        .values-grid {
          grid-template-columns: repeat(3, 1fr);
        }

        .value-card {
          padding: 32px;
          border-radius: var(--radius-md);
        }

        .value-icon-container {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          background: rgba(124, 58, 237, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--clr-primary-light);
          margin-bottom: 20px;
        }

        .value-card h3 {
          font-size: 1.25rem;
          color: var(--clr-text-main);
          margin-bottom: 12px;
        }

        .value-card p {
          font-size: 0.9rem;
          line-height: 1.6;
        }

        /* Timeline / History styling */
        .timeline-section {
          padding: 40px;
          border-radius: var(--radius-lg);
        }

        .timeline-title {
          font-size: 1.8rem;
          color: var(--clr-text-main);
          margin-bottom: 36px;
        }

        .timeline-list {
          display: flex;
          flex-direction: column;
          gap: 32px;
          position: relative;
        }

        .timeline-list::before {
          content: "";
          position: absolute;
          left: 45px;
          top: 10px;
          bottom: 10px;
          width: 1px;
          background: var(--clr-border);
        }

        .timeline-item {
          display: flex;
          align-items: flex-start;
          gap: 32px;
          position: relative;
        }

        .timeline-year {
          font-family: var(--font-title);
          font-size: 1.5rem;
          font-weight: 800;
          width: 90px;
          text-align: right;
          flex-shrink: 0;
          position: relative;
        }

        .timeline-year::after {
          content: "";
          position: absolute;
          right: -17px;
          top: 10px;
          width: 9px;
          height: 9px;
          background: var(--clr-primary);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--clr-primary);
        }

        .timeline-content h3 {
          font-size: 1.15rem;
          color: var(--clr-text-main);
          margin-bottom: 6px;
        }

        .timeline-content p {
          font-size: 0.92rem;
          line-height: 1.6;
        }

        @media (max-width: 992px) {
          .narrative-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .values-grid {
            grid-template-columns: 1fr;
          }
          .timeline-list::before {
            left: 35px;
          }
          .timeline-year {
            width: 70px;
            font-size: 1.3rem;
          }
          .timeline-year::after {
            right: -15px;
          }
        }
      `}</style>
    </div>
  );
}
