const API_BASE = window.API_BASE || 'http://localhost:8000';

document.addEventListener('DOMContentLoaded', () => {
  const columns = document.querySelectorAll('.column-cards');
  let draggedCard = null;

  const placeholder = document.createElement('div');
  placeholder.classList.add('drag-placeholder');

  loadCards();

  async function loadCards() {
    try {
      const res = await fetch(`${API_BASE}/api/cards`);
      const data = await res.json();

      document.querySelectorAll('.column').forEach(col => {
        const status = col.dataset.status;
        const container = col.querySelector('.column-cards');
        container.innerHTML = '';

        const cards = data[status] || [];
        cards.forEach(card => {
          container.appendChild(createCardElement(card));
        });
      });

      updateColumnCounts();
      bindDragEvents();
    } catch (err) {
      console.error('Failed to load cards:', err);
    }
  }

  function createCardElement(card) {
    const el = document.createElement('div');
    el.classList.add('card');
    el.draggable = true;
    el.dataset.cardId = card.id;

    let html = `<p class="card-title">${escapeHtml(card.title)}</p>`;

    if (card.label) {
      html += `<span class="card-label label-${card.labelColor}">${escapeHtml(card.label)}</span>`;
    }

    html += '<div class="card-footer"><div class="card-icons"></div>';

    if (card.points !== null) {
      html += `<span class="card-points">${card.points}</span>`;
    }

    html += `<span class="card-key">${escapeHtml(card.cardKey)}</span>`;

    if (card.avatarInitials) {
      html += `<img class="card-avatar" src="https://ui-avatars.com/api/?name=${card.avatarInitials}&background=${card.avatarColor}&color=fff&size=24&rounded=true" alt="">`;
    }

    html += '</div>';
    el.innerHTML = html;
    return el;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function bindDragEvents() {
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
  }

  columns.forEach(column => {
    column.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      column.classList.add('drag-over');

      const afterElement = getDragAfterElement(column, e.clientY);

      if (afterElement) {
        if (placeholder.nextSibling !== afterElement) {
          column.insertBefore(placeholder, afterElement);
        }
      } else {
        if (placeholder.parentNode !== column || placeholder.nextSibling !== null) {
          column.appendChild(placeholder);
        }
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

      if (placeholder.parentNode) {
        placeholder.parentNode.insertBefore(draggedCard, placeholder);
        placeholder.parentNode.removeChild(placeholder);
      }

      // Landing animation
      draggedCard.classList.add('card-landing');
      draggedCard.addEventListener('animationend', function handler() {
        draggedCard.classList.remove('card-landing');
        draggedCard.removeEventListener('animationend', handler);
      });

      // Find new status and position
      const targetColumn = column.closest('.column');
      const newStatus = targetColumn.dataset.status;
      const cards = [...column.querySelectorAll('.card')];
      const newPosition = cards.indexOf(draggedCard);
      const cardId = draggedCard.dataset.cardId;

      // Send move to API
      fetch(`${API_BASE}/api/cards/${cardId}/move`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, position: newPosition }),
      }).catch(err => console.error('Failed to move card:', err));

      updateColumnCounts();
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
