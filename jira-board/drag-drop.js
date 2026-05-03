document.addEventListener('DOMContentLoaded', () => {
  const columns = document.querySelectorAll('.column-cards');
  let draggedCard = null;

  // Create a visible placeholder element
  const placeholder = document.createElement('div');
  placeholder.classList.add('drag-placeholder');

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('dragstart', (e) => {
      draggedCard = card;
      card.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      requestAnimationFrame(() => {
        card.style.opacity = '0.4';
      });
    });

    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
      card.style.opacity = '';
      draggedCard = null;
      columns.forEach(col => col.classList.remove('drag-over'));
      if (placeholder.parentNode) {
        placeholder.parentNode.removeChild(placeholder);
      }
      updateColumnCounts();
    });
  });

  columns.forEach(column => {
    column.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      column.classList.add('drag-over');

      const afterElement = getDragAfterElement(column, e.clientY);

      // Insert placeholder at the right position
      if (afterElement) {
        column.insertBefore(placeholder, afterElement);
      } else {
        column.appendChild(placeholder);
      }
    });

    column.addEventListener('dragleave', (e) => {
      if (!column.contains(e.relatedTarget)) {
        column.classList.remove('drag-over');
        if (placeholder.parentNode === column) {
          column.removeChild(placeholder);
        }
      }
    });

    column.addEventListener('drop', (e) => {
      e.preventDefault();
      column.classList.remove('drag-over');

      if (!draggedCard) return;

      // Insert the card where the placeholder is
      if (placeholder.parentNode) {
        placeholder.parentNode.insertBefore(draggedCard, placeholder);
        placeholder.parentNode.removeChild(placeholder);
      }
    });
  });

  function getDragAfterElement(column, y) {
    const cards = [...column.querySelectorAll('.card:not(.dragging)')];
    return cards.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      }
      return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }

  function updateColumnCounts() {
    document.querySelectorAll('.column').forEach(col => {
      const count = col.querySelectorAll('.card').length;
      const countEl = col.querySelector('.column-count');
      if (countEl) countEl.textContent = count;
    });
  }
});
