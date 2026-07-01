// Dynamic enhancements for KC Learning Site

function initReadingProgressBar() {
  if (document.getElementById('reading-progress-bar')) return;

  const bar = document.createElement('div');
  bar.id = 'reading-progress-bar';
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    bar.style.width = scrolled + '%';
  });
}

function initHeaderTrelloLink() {
  if (document.getElementById('header-trello-link')) return;

  const headerSource = document.querySelector('.md-header__source');
  if (headerSource) {
    const trelloLink = document.createElement('a');
    trelloLink.id = 'header-trello-link';
    trelloLink.href = 'https://trello.com/b/o3grdhdS/kc-learning-site-documentation';
    trelloLink.target = '_blank';
    trelloLink.rel = 'noopener';
    trelloLink.title = 'Trello Board';
    trelloLink.className = 'header-trello-with-text';
    
    trelloLink.innerHTML = `
      <span class="header-trello-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M390.12 32H57.88C43.6 32 32 43.6 32 57.88v396.24C32 468.4 43.6 480 57.88 480h332.24c14.28 0 25.88-11.6 25.88-25.88V57.88C416 43.6 404.4 32 390.12 32zm-207 325.07c0 14.12-11.48 25.6-25.6 25.6H98.92c-14.12 0-25.6-11.48-25.6-25.6V122.93c0-14.12 11.48-25.6 25.6-25.6h58.6c14.12 0 25.6 11.48 25.6 25.6v234.14zm168-128c0 14.12-11.48 25.6-25.6 25.6h-58.6c-14.12 0-25.6-11.48-25.6-25.6V122.93c0-14.12 11.48-25.6 25.6-25.6h58.6c14.12 0 25.6 11.48 25.6 25.6v106.14z"/>
        </svg>
      </span>
      <span class="header-trello-text">
        Trello Board
      </span>
    `;
    
    const gitSource = headerSource.querySelector('.md-source');
    if (gitSource) {
      gitSource.parentNode.insertBefore(trelloLink, gitSource.nextSibling);
    }
  }
}



function initCollapsibleSections() {
  const contentArea = document.querySelector('.md-content__inner');
  if (!contentArea || contentArea.dataset.collapsibleInitialized) return;
  contentArea.dataset.collapsibleInitialized = 'true';

  // Collapse levels h6 down to h1 for hierarchical nesting (only for headings with .collapsible or .collapable class)
  for (let level = 6; level >= 1; level--) {
    const headings = contentArea.querySelectorAll(`h${level}.collapsible, h${level}.collapable`);
    headings.forEach(heading => {
      if (heading.classList.contains('heading-collapsible')) return;

      const siblings = [];
      let next = heading.nextElementSibling;
      while (next) {
        if (next.tagName.match(/^H[1-6]$/)) {
          const nextLevel = parseInt(next.tagName.substring(1));
          if (nextLevel <= level) {
            break;
          }
        }
        siblings.push(next);
        next = next.nextElementSibling;
      }

      if (siblings.length > 0) {
        heading.classList.add('heading-collapsible');
        
        const toggleIcon = document.createElement('span');
        toggleIcon.className = 'heading-collapse-toggle';
        toggleIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41Z"/></svg>`;
        heading.prepend(toggleIcon);

        const wrapper = document.createElement('div');
        wrapper.className = `heading-collapse-wrapper level-${level}`;
        heading.parentNode.insertBefore(wrapper, siblings[0]);
        siblings.forEach(sib => wrapper.appendChild(sib));

        heading.addEventListener('click', (e) => {
          if (e.target.closest('a') || e.target.closest('button')) {
            return;
          }
          
          const isCollapsed = heading.classList.contains('heading-collapsed');
          if (isCollapsed) {
            heading.classList.remove('heading-collapsed');
            wrapper.style.maxHeight = wrapper.scrollHeight + 'px';
            wrapper.style.opacity = '1';
            setTimeout(() => {
              if (!heading.classList.contains('heading-collapsed')) {
                wrapper.style.maxHeight = 'none';
              }
            }, 300);
          } else {
            wrapper.style.maxHeight = wrapper.scrollHeight + 'px';
            wrapper.offsetHeight; // Force reflow
            heading.classList.add('heading-collapsed');
            wrapper.style.maxHeight = '0px';
            wrapper.style.opacity = '0';
          }
        });
      }
    });
  }
}

function initCollapsibleTabs() {
  const tabbedSets = document.querySelectorAll('.tabbed-set');
  tabbedSets.forEach(tabSet => {
    if (tabSet.dataset.tabsInitialized) return;
    tabSet.dataset.tabsInitialized = 'true';

    const labels = tabSet.querySelectorAll('.tabbed-labels > label');
    labels.forEach(label => {
      label.addEventListener('click', function(e) {
        const inputId = label.getAttribute('for');
        const input = document.getElementById(inputId);
        
        if (input && input.checked) {
          tabSet.classList.toggle('tabbed-collapsed');
          e.preventDefault();
          e.stopPropagation();
        } else {
          tabSet.classList.remove('tabbed-collapsed');
        }
      });
    });
  });
}

function initTldrHighlighting() {
  const spans = document.querySelectorAll('div.tldr pre code > span');
  spans.forEach(span => {
    if (span.dataset.tldrHighlighted) return;
    span.dataset.tldrHighlighted = 'true';

    const anchor = span.querySelector('a');
    const line = span.textContent;
    const trimmed = line.trim();

    let highlightedHtml = '';
    
    if (trimmed.startsWith('-')) {
      const commentContent = trimmed.substring(1).trim();
      const leadingSpaces = line.match(/^(\s*)/)[0];
      highlightedHtml = `${leadingSpaces}<span class="tldr-comment">- ${escapeHtml(commentContent)}</span>`;
    } else if (trimmed) {
      const leadingSpaces = line.match(/^(\s*)/)[0];
      let cmdLine = escapeHtml(trimmed);
      
      // 1. Quoted strings (Red)
      cmdLine = cmdLine.replace(/(&quot;.*?&quot;|&#39;.*?&#39;)/g, '<span class="tldr-string">$1</span>');
      
      // 2. Options (Red)
      cmdLine = cmdLine.replace(/(^|\s)(--?[a-zA-Z0-9_-]+)/g, '$1<span class="tldr-option">$2</span>');
      
      // 3. Command name (Red)
      cmdLine = cmdLine.replace(/^([^&<][a-zA-Z0-9_-]*)/, '<span class="tldr-command">$1</span>');

      // 4. Standalone numbers (Red)
      cmdLine = cmdLine.replace(/(^|\s)(\d+)(\s|$)/g, '$1<span class="tldr-number">$2</span>$3');
      
      highlightedHtml = leadingSpaces + cmdLine;
    } else {
      highlightedHtml = line;
    }

    span.innerHTML = '';
    if (anchor) {
      span.appendChild(anchor);
    }
    span.insertAdjacentHTML('beforeend', highlightedHtml);
  });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function initAll() {
  initReadingProgressBar();
  initHeaderTrelloLink();
  initCollapsibleSections();
  initCollapsibleTabs();
  initTldrHighlighting();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}

if (typeof document$ !== 'undefined') {
  document$.subscribe(initAll);
}

