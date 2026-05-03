document.addEventListener('DOMContentLoaded', () => {
  const columns = document.querySelectorAll('.column-cards');
  let draggedCard = null;

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('dragstart', (e) => {
      draggedCard = card;
      card.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      // Slight delay so the drag image captures the card before opacity change
      requestAnimationFrame(() => {
        card.style.opacity = '0.4';
      });
    });

    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
      card.style.opacity = '';
      draggedCard = null;
      // Remove all drag-over highlights
      columns.forEach(col => col.classList.remove('drag-over'));
      document.querySelectorAll('.card').forEach(c => {
        c.classList.remove('drag-above', 'drag-below');
      });
      updateColumnCounts();
    });
  });

  columns.forEach(column => {
    column.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      column.classList.add('drag-over');

      const afterElement = getDragAfterElement(column, e.clientY);
      // Clear previous position indicators in this column
      column.querySelectorAll('.card').forEach(c => {
        c.classList.remove('drag-above', 'drag-below');
      });

      if (afterElement) {
        afterElement.classList.add('drag-above');
      }
    });

    column.addEventListener('dragleave', (e) => {
      // Only remove if actually leaving the column
      if (!column.contains(e.relatedTarget)) {
        column.classList.remove('drag-over');
        column.querySelectorAll('.card').forEach(c => {
          c.classList.remove('drag-above', 'drag-below');
        });
      }
    });

    column.addEventListener('drop', (e) => {
      e.preventDefault();
      column.classList.remove('drag-over');
      column.querySelectorAll('.card').forEach(c => {
        c.classList.remove('drag-above', 'drag-below');
      });

      if (!draggedCard) return;

      const afterElement = getDragAfterElement(column, e.clientY);
      if (afterElement) {
        column.insertBefore(draggedCard, afterElement);
      } else {
        column.appendChild(draggedCard);
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
