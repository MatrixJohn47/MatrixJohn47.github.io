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
    { name: 'Cygnet.one', image: '../assets/private-work/edm/Cygnet EDM.png', thumb: '../assets/private-work/thumnails/cyg ico-01.png' },
    { name: 'Aelum | Service Now', image: '../assets/private-work/edm/Aelum EDM.png', thumb: '../null' },
    { name: 'Zoomtopia', image: '../assets/private-work/edm/Zoomtopia EDM.png', thumb: '../null' },
    { name: 'Zoom', image: '../assets/private-work/edm/Zoom1 EDM.png', thumb: '../null' },
    { name: 'Zoom', image: '../assets/private-work/edm/Zoom2 EDM.png', thumb: '../null' },
    { name: 'SAAS22', image: '../assets/private-work/edm/SAAS 22 EDM.png', thumb: '../null' },
    { name: 'Delhivery', image: '../assets/private-work/edm/Delhivery.png', thumb: '../null' },
    { name: 'Okta', image: '../assets/private-work/edm/Okta EDM.png', thumb: '../null' },
    { name: 'Neat', image: '../assets/private-work/edm/Neat EDM.png', thumb: '../null' },
    { name: 'SHI | Snoflake', image: '../assets/private-work/edm/SHI Snowflake EDM.png', thumb: '../null' },
    { name: 'SAP  |Ikyam', image: '../assets/private-work/edm/SAP Ikyam EDM.png', thumb: '../null' },
    { name: 'Monday.com', image: '../assets/private-work/edm/monday com EDM.png', thumb: '../null' },
    { name: 'Digitus', image: '../assets/private-work/edm/Digitus EDM.png', thumb: '../null' },
    { name: 'Databricks', image: '../assets/private-work/edm/Databricks EDM.png', thumb: '../null' },
  ],
  'Event Onsite Collaterals': ['DTS', 'CSS', 'Infor', 'Concentrix | Genesys', 'Snowflake | MLAI | Microsoft', 'Freshworks | Emergys', 'Concentrix | PaloAlto'],
  'Full System Showcase': ['Mongodb', 'GCP', 'Cygnet one', 'Coursera']
};

// Add real image paths here as posts become available.
const socialPosts = [
  { image: '../assets/private-work/social-media/HR SA Whatsapp Campaign..png' }, 
  { image: '../assets/private-work/social-media/BFSI Kenya Announcement Final.png' }, 
  { image: '../assets/private-work/social-media/BFSI Kenya Announcement.png' },
  { image: '../assets/private-work/social-media/BFSI Thailand Whatsapp Campaign.png' },
  { image: '../assets/private-work/social-media/HR UAE Announcement.png' },
  { image: '../assets/private-work/social-media/DTS Qatar Event Announcement.png' },
  { image: '../assets/private-work/social-media/HR UAE Event Announcement.png' },
  { image: '../assets/private-work/social-media/DTS UAE Im Speaking.png' },
  { image: '../assets/private-work/social-media/Pharma IT Whatsapp Campaign.png' },
  { image: '../assets/private-work/social-media/HR UAE Im Speaking.png' },
  { image: '../assets/private-work/social-media/CFO SA Im Speaking.png' },
  { image: '../assets/private-work/social-media/HR South Africa Im Speaking.png' },
  { image: '../assets/private-work/social-media/DTS Indo Whatsapp Campaign.png' },
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
  { image: '../assets/private-work/social-media/BFSI Singapore Delegate Campaign.png' },
  { image: '../assets/private-work/social-media/Brainbox Creative.png' },
  { image: '../assets/private-work/social-media/DTS Indo 1:1 Whatsapp Campaign 65 days to go.png' },
  { image: '../assets/private-work/social-media/SAP_.png' },
  { image: '../assets/private-work/social-media/SGN.png' },
  { image: '../assets/private-work/social-media/CSS UAE Whatsapp Campaign .png' },
  { image: '../assets/private-work/social-media/DTS Thailand Campaign With photo.png' },
  // { image: '../assets/private-work/social-01.jpg' },
];

function openEdm(client, imagePath) {
  edmSubject.textContent = `${client} — Event Invitation`;
  edmSenderName.textContent = client;
  edmAvatar.textContent = client.charAt(0).toUpperCase();
  edmRights.textContent = `© All rights belong to ${client} & Exito Media Concepts. These are client-approved designs, some shown here are my own variations of the same.`;
   edmFrameBody.innerHTML = imagePath
    ? `<img src="${imagePath}" alt="EDM designed for ${client}" style="max-width:75%; margin:0 auto; display:block;">`
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
  rights.textContent = '© All copyrights belong to Exito Media Concepts and the respective clients of each post. These are client-approved designs, some shown here are my own variations of the same.';
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
        const thumb = entry.thumb || null;
        tile.className = thumb ? 'logo-tile' : 'logo-tile no-thumb';
        if (thumb) tile.style.backgroundImage = `url('${thumb}')`;
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
