const cards = document.querySelectorAll('.cat-card');
const cardGridView = document.getElementById('cardGridView');
const galleryView = document.getElementById('galleryView');
const galleryTitle = document.getElementById('galleryTitle');
const skeletonGrid = document.getElementById('skeletonGrid');
const backLink = document.getElementById('backLink');

cards.forEach(card => {
  card.addEventListener('click', () => {
    galleryTitle.textContent = card.dataset.cat;
    const count = parseInt(card.dataset.count);
    skeletonGrid.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const box = document.createElement('div');
      box.className = 'skeleton-box';
      box.style.animationDelay = (i * 0.05) + 's';
      skeletonGrid.appendChild(box);
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
