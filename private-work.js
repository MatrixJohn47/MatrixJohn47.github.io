const cards = document.querySelectorAll('.cat-card, .featured-card');
const cardGridView = document.getElementById('cardGridView');
const galleryView = document.getElementById('galleryView');
const galleryTitle = document.getElementById('galleryTitle');
const skeletonGrid = document.getElementById('skeletonGrid');
const backLink = document.getElementById('backLink');

const edmOverlay = document.getElementById('edmOverlay');
const edmSubject = document.getElementById('edmSubject');
const edmRights = document.getElementById('edmRights');
const edmClose = document.getElementById('edmClose');
const edmFrameBody = document.getElementById('edmFrameBody');

const categoryClients = {
  'EDMs': [
    { name: 'Zoomtopia', image: null },
    { name: 'Zoom', image: null },
    { name: 'SAAS22', image: null },
    { name: 'Okta', image: null },
    { name: 'Neat', image: '../assets/industry-work/neat-edm.png' },
    { name: 'Infobip', image: '../assets/industry-work/infobip.png' },
    { name: 'Databricks', image: null },
    { name: 'Snowflake|MLAI|Microsoft', image: null },
    { name: 'SHI|AWS', image: null },
    { name: 'SAP|Ikyam', image: null },
    { name: 'Monday.com', image: null },
    { name: 'GSUS|ODOO', image: null },
    { name: 'Digitus', image: null }
  ],
  'Event Onsite Collaterals': ['DTS', 'CSS', 'Infor', 'SAP|IKYAM', 'Concentrix+Genesys', 'SHI|AWS|Snowflake', 'Freshworks+Emergys', 'Concentrix+PaloAlto'],
  'Full System Showcase': ['Mongodb', 'GCP', 'Cygnet one', 'Coursera'],
  'Social Media': []
};

function openEdm(client, imagePath) {
  edmSubject.textContent = `${client} — Event Invitation`;
  edmRights.textContent = `© All rights belong to ${client} & Exito Media Concepts.`;
  edmFrameBody.innerHTML = imagePath
    ? `<img src="${imagePath}" alt="EDM designed for ${client}" style="width:100%; display:block;">`
    : `<div class="skeleton-box"></div>`;
  edmOverlay.classList.add('open');
}
edmClose.addEventListener('click', () => edmOverlay.classList.remove('open'));
edmOverlay.addEventListener('click', (e) => { if (e.target === edmOverlay) edmOverlay.classList.remove('open'); });

cards.forEach(card => {
  card.addEventListener('click', () => {
    galleryTitle.textContent = card.dataset.cat;
    const clients = categoryClients[card.dataset.cat] || [];
    skeletonGrid.innerHTML = '';
    const isEdmCategory = card.dataset.cat.includes('EDM');

    clients.forEach((entry) => {
      const client = isEdmCategory ? entry.name : entry;
      const image = isEdmCategory ? entry.image : null;
      const item = document.createElement('div');
      item.className = 'skeleton-item';

      if (isEdmCategory) {
        const tile = document.createElement('div');
        tile.className = 'logo-tile';
        tile.innerHTML = `<span>${client}</span>`;
        tile.addEventListener('click', () => openEdm(client, image));
        item.appendChild(tile);
      } else {
        const box = document.createElement('div');
        box.className = 'skeleton-box';
        item.appendChild(box);
      }

      const caption = document.createElement('div');
      caption.className = 'skeleton-caption';
      caption.textContent = `Designed at Exito Media Concepts, for ${client}`;
      item.appendChild(caption);
      skeletonGrid.appendChild(item);
    });
    cardGridView.classList.add('hidden');
    galleryView.classList.add('active');
    window.scrollTo(0,0);
  });
});

backLink.addEventListener('click', () => {
  galleryView.classList.remove('active');
  cardGridView.classList.remove('hidden');
});
