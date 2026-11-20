/* ==========================================================================
   Ayisha F R — Multidisciplinary Studio Interactions
   Theme Mood, Gallery Filter, Project Modal, Form Feedback
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Palette Mood Toggle (Editorial Cream <-> Midnight Studio)
  const paletteToggle = document.getElementById('palette-toggle');
  const savedMood = localStorage.getItem('ayisha-studio-palette') || 'editorial';

  if (savedMood === 'midnight') {
    document.body.classList.add('palette-midnight');
  }

  if (paletteToggle) {
    paletteToggle.addEventListener('click', () => {
      const isMidnight = document.body.classList.toggle('palette-midnight');
      localStorage.setItem('ayisha-studio-palette', isMidnight ? 'midnight' : 'editorial');
    });
  }

  // 2. Multidisciplinary Gallery Filtering
  const filterChips = document.querySelectorAll('.filter-chip');
  const artCards = document.querySelectorAll('.art-card');

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filterVal = chip.getAttribute('data-filter');

      artCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(8px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 3. Project Detail Case Study Modal
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const modalClose = document.getElementById('modal-close');
  const openButtons = document.querySelectorAll('.open-project-btn');

  const caseStudies = {
    onde: {
      tag: "Furniture & Object Design",
      title: "L’Onde Sculptural Lounge Chair",
      materials: "Steam-bent European Ash, Natural Bouclé Wool, Concealed Steel Brackets",
      dimensions: "94cm W × 86cm D × 72cm H",
      year: "2025",
      description: "Inspired by the fluid ebb and flow of tidal contours, L’Onde was conceived through 1:1 cardboard sculpting and CNC ashwood rib laminations. The profile cradles the body with zero visible hardware, celebrating raw wood grain and deep sensory tactility.",
      highlights: [
        "Hand-sanded satin wax finish preserving timber breathability",
        "Dual-density ergonomic latex foam core",
        "Exhibited at Milan Design Week Rising Voices"
      ]
    },
    solstice: {
      tag: "Interior & Spatial Scenography",
      title: "Atelier Solstice Gallery & Cafe",
      materials: "Hand-troweled Lime Plaster, Cast Pink Terrazzo, Sandblasted Glass",
      scale: "280 m² Commercial Hospitality",
      location: "Kochi, Kerala",
      year: "2025",
      description: "A cultural hospitality hub designed to slow down time. By integrating curved colonnades that capture coastal sunset angles, the interior breathes warmth through monolithic terracotta surfaces and diffused ambient lighting pedestals.",
      highlights: [
        "Acoustic felt ceiling baffles disguised as architectural fabric canopies",
        "Custom communal terrazzo dining island seating 16 guests",
        "Integrated botanical niches with indigenous flora"
      ]
    },
    kora: {
      tag: "Product & Graphic Identity",
      title: "Kōra Acoustic Diffuser & Brand Suite",
      materials: "Slip-cast Terracotta, Brushed Brass, FSC Uncoated Cotton Paper",
      volume: "Limited run of 300 pieces",
      year: "2025",
      description: "Kōra is an artisanal olfactory and acoustic vessel designed for meditative rituals. Paired with a custom blind-embossed packaging suite and bespoke typography, the piece acts as both a functional mist diffuser and a sculptural mantle object.",
      highlights: [
        "Passive acoustic resonance chamber amplifying low frequency water drops",
        "Soy-ink printed editorial booklet accompanying every collector edition",
        "Plastic-free origami interlocking gift packaging"
      ]
    }
  };

  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const pKey = btn.getAttribute('data-project');
      const data = caseStudies[pKey];
      if (!data) return;

      modalContent.innerHTML = `
        <div style="display:inline-block; padding: 0.25rem 0.75rem; border-radius: 9999px; background: var(--canvas-card-soft); border: 1.5px solid var(--ink-border); font-family: var(--font-mono); font-size: 0.75rem; font-weight: 700; margin-bottom: 0.75rem;">
          ${data.tag}
        </div>
        <h3 style="font-family: var(--font-display); font-size: 1.85rem; font-weight: 800; margin-bottom: 1rem; line-height: 1.2;">
          ${data.title}
        </h3>
        <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.6; margin-bottom: 1.5rem;">
          ${data.description}
        </p>
        <div style="background: var(--canvas-card-soft); border: 1.5px solid var(--ink-border); border-radius: 12px; padding: 1.25rem; font-family: var(--font-mono); font-size: 0.8rem; margin-bottom: 1.5rem; line-height: 1.7;">
          <div><strong>Materials:</strong> ${data.materials}</div>
          <div><strong>Timeline/Year:</strong> ${data.year}</div>
          ${data.dimensions ? `<div><strong>Dimensions:</strong> ${data.dimensions}</div>` : ''}
          ${data.scale ? `<div><strong>Scale:</strong> ${data.scale}</div>` : ''}
          ${data.location ? `<div><strong>Location:</strong> ${data.location}</div>` : ''}
        </div>
        <h4 style="font-family: var(--font-display); font-size: 1.1rem; font-weight: 800; margin-bottom: 0.6rem;">Key Design Explorations</h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.925rem; color: var(--text-muted);">
          ${data.highlights.map(h => `<li>✦ ${h}</li>`).join('')}
        </ul>
      `;

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  };

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // 4. Studio Inquiry Form Simulation
  const form = document.getElementById('studio-form');
  const alert = document.getElementById('feedback-alert');
  const submitBtn = document.getElementById('submit-btn');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const origText = submitBtn.innerHTML;
      submitBtn.innerHTML = `<span>Transmitting Vision...</span>`;
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = origText;
        submitBtn.disabled = false;
        alert.className = 'feedback-alert show';
        alert.innerHTML = '✦ Thank you! Your project inquiry has been delivered directly to Ayisha F R. We will review your vision and reply within 48 hours.';
        form.reset();

        setTimeout(() => {
          alert.className = 'feedback-alert';
        }, 7000);
      }, 900);
    });
  }

  // 5. Sticky Nav border effect on scroll
  const nav = document.getElementById('studio-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      nav.style.boxShadow = '0 6px 20px rgba(24, 22, 26, 0.08)';
    } else {
      nav.style.boxShadow = 'none';
    }
  });
});
