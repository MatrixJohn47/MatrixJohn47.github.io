const cards = document.querySelectorAll('.cat-card, .featured-card');
const cardGridView = document.getElementById('cardGridView');
const galleryView = document.getElementById('galleryView');
const galleryTitle = document.getElementById('galleryTitle');
const skeletonGrid = document.getElementById('skeletonGrid');
const backLink = document.getElementById('backLink');

const edmOverlay = document.getElementById('edmOverlay');
const edmSubject = document.getElementById('edmSubject');
const edmSenderName = document.getElementById('edmSenderName');
const edmAvatar = document.getElementById('edmAvatar');
const edmRights = document.getElementById('edmRights');
const edmClose = document.getElementById('edmClose');
const edmFrameBody = document.getElementById('edmFrameBody');

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

const categoryClients = {
  'EDMs': [
    { name: 'Zoomtopia', image: null },
    { name: 'Zoom', image: null },
    { name: 'SAAS22', image: null },
    { name: 'Okta', image: null },
    { name: 'Neat', image: '../assets/private-work/neat-edm.png' },
    { name: 'Infobip', image: '../assets/private-work/infobip.png' },
    { name: 'Databricks', image: null },
    { name: 'Snowflake|MLAI|Microsoft', image: null },
    { name: 'SHI|AWS', image: null },
    { name: 'SAP|Ikyam', image: null },
    { name: 'Monday.com', image: null },
    { name: 'GSUS|ODOO', image: null },
    { name: 'Digitus', image: null }
  ],
  'Event Onsite Collaterals': ['DTS', 'CSS', 'Infor', 'SAP|IKYAM', 'Concentrix+Genesys', 'SHI|AWS|Snowflake', 'Freshworks+Emergys', 'Concentrix+PaloAlto'],
  'Full System Showcase': ['Mongodb', 'GCP', 'Cygnet one', 'Coursera']
};

// Add real image paths here as posts become available.
const socialPosts = [
  { image: '../assets/private-work/social-media/BFSI Kenya Announcement Final.png' }, 
  { image: '../assets/private-work/social-media/BFSI Kenya Announcement.png' },
  { image: '../assets/private-work/social-media/HR UAE Announcement.png' },
  { image: '../assets/private-work/social-media/DTS Qatar Event Announcement.png' },
  { image: '../assets/private-work/social-media/HR UAE Event Announcement.png' },
  { image: '../assets/private-work/social-media/DTS UAE Im Speaking.png' },
  { image: '../assets/private-work/social-media/HR UAE Im Speaking.png' },
  { image: '../assets/private-work/social-media/CFO SA Im Speaking.png' },
  { image: '../assets/private-work/social-media/HR South Africa Im Speaking.png' },
  { image: '../assets/private-work/social-media/Devops Dubai 2024.jpeg' },
  { image: '../assets/private-work/social-media/DTS Qatar 2days to go.png' },
  { image: '../assets/private-work/social-media/DTS Qatar 1 day to go.png' },
  { image: '../assets/private-work/social-media/CSS Philippines 1 day to go.png' },
  { image: '../assets/private-work/social-media/Freshworks_Social Media Announcement.png' },
  { image: '../assets/private-work/social-media/MITS Thailand 1 day to go.png' },
  { image: '../assets/private-work/social-media/MIts Thailand 2days to go.png' },
  { image: '../assets/private-work/social-media/Mits India im Speaking.png' },
  { image: '../assets/private-work/social-media/Womens Day.png' },
  { image: '../assets/private-work/social-media/HR South Africa Whatsapp 2.png' },
  { image: '../assets/private-work/social-media/DTS Thailand Ads.png' },
  { image: '../assets/private-work/social-media/CFO KSA Whatsapp Campaign.png' },
  // { image: '../assets/private-work/social-01.jpg' },
];

function openEdm(client, imagePath) {
  edmSubject.textContent = `${client} — Event Invitation`;
  edmSenderName.textContent = client;
  edmAvatar.textContent = client.charAt(0).toUpperCase();
  edmRights.textContent = `© All rights belong to ${client} & Exito Media Concepts.`;
  edmFrameBody.innerHTML = imagePath
    ? `<img src="${imagePath}" alt="EDM designed for ${client}" style="width:100%; display:block;">`
    : `<div class="skeleton-box"></div>`;
  edmOverlay.classList.add('open');
}
edmClose.addEventListener('click', () => edmOverlay.classList.remove('open'));
edmOverlay.addEventListener('click', (e) => { if (e.target === edmOverlay) edmOverlay.classList.remove('open'); });

function openLightbox(imagePath) {
  lightboxImg.src = imagePath;
  lightbox.classList.add('open');
}
function closeLightbox() {
  lightbox.classList.remove('open');
}

function renderSocialMedia() {
  skeletonGrid.className = 'social-grid';
  skeletonGrid.innerHTML = '';
  socialPosts.forEach(post => {
    const tile = document.createElement('div');
    if (post.image) {
      tile.className = 'social-tile';
      tile.innerHTML = `<img src="${post.image}" alt="">`;
      tile.addEventListener('mouseenter', () => openLightbox(post.image));
      tile.addEventListener('mouseleave', () => closeLightbox());
    } else {
      tile.className = 'social-tile placeholder';
    }
    skeletonGrid.appendChild(tile);
  });
  const rights = document.createElement('p');
  rights.className = 'social-rights';
  rights.textContent = 'rights.textContent = '© All copyrights belong to Exito Media Concepts and the respective clients of each post. 
                                              These are client-approved designs, some shown here are my own variations of the same.';';
  skeletonGrid.after(rights);
}

cards.forEach(card => {
  card.addEventListener('click', () => {
    galleryTitle.textContent = card.dataset.cat;
    skeletonGrid.className = 'skeleton-grid';
    skeletonGrid.innerHTML = '';
    document.querySelector('.social-rights')?.remove();

    if (card.dataset.cat === 'Social Media') {
      renderSocialMedia();
    } else {
      const clients = categoryClients[card.dataset.cat] || [];
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
    }
    cardGridView.classList.add('hidden');
    galleryView.classList.add('active');
    window.scrollTo(0,0);
  });
});

backLink.addEventListener('click', () => {
  galleryView.classList.remove('active');
  cardGridView.classList.remove('hidden');
});
