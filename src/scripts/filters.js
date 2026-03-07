document.addEventListener('DOMContentLoaded', () => {
  const specialtyFilter = document.getElementById('filter-specialty');
  const locationFilter = document.getElementById('filter-location');
  const sortFilter = document.getElementById('filter-sort');
  const countDisplay = document.getElementById('filter-count');
  const cards = Array.from(document.querySelectorAll('.lawyer-card[data-specialty-tags]'));

  if (!specialtyFilter || !locationFilter || !sortFilter || !cards.length) return;

  const container = cards[0].parentElement;

  function applyFilters() {
    const specialty = specialtyFilter.value;
    const location = locationFilter.value;
    let visible = 0;

    cards.forEach(card => {
      const tags = card.dataset.specialtyTags || '';
      const area = card.dataset.area || '';
      const matchSpecialty = !specialty || tags.includes(specialty);
      const matchLocation = !location || area === location;
      const show = matchSpecialty && matchLocation;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    if (countDisplay) {
      countDisplay.textContent = `${visible} attorney${visible !== 1 ? 's' : ''} found`;
    }

    applySort();
  }

  function applySort() {
    const sortBy = sortFilter.value;
    const visibleCards = cards.filter(c => c.style.display !== 'none');

    visibleCards.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return parseFloat(b.dataset.rating || '0') - parseFloat(a.dataset.rating || '0');
        case 'reviews':
          return parseInt(b.dataset.reviews || '0') - parseInt(a.dataset.reviews || '0');
        case 'experience':
          return parseInt(b.dataset.experience || '0') - parseInt(a.dataset.experience || '0');
        case 'score':
        default:
          return parseFloat(b.dataset.score || '0') - parseFloat(a.dataset.score || '0');
      }
    });

    visibleCards.forEach(card => container.appendChild(card));
    // Re-append hidden cards at the end
    cards.filter(c => c.style.display === 'none').forEach(card => container.appendChild(card));
  }

  specialtyFilter.addEventListener('change', applyFilters);
  locationFilter.addEventListener('change', applyFilters);
  sortFilter.addEventListener('change', applyFilters);
});
