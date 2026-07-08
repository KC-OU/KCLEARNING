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

function initHeaderTrelloLinks() {
  if (document.getElementById('header-trello-link')) return;

  const headerSource = document.querySelector('.md-header__source');
  if (headerSource) {
    // 1. Trello Board Button
    const trelloLink = document.createElement('a');
    trelloLink.id = 'header-trello-link';
    trelloLink.href = 'https://trello.com/b/o3grdhdS';
    trelloLink.target = '_blank';
    trelloLink.rel = 'noopener';
    trelloLink.title = 'Feedback Board';
    trelloLink.className = 'header-trello-with-text';
    trelloLink.innerHTML = `
      <span class="header-trello-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M390.12 32H57.88C43.6 32 32 43.6 32 57.88v396.24C32 468.4 43.6 480 57.88 480h332.24c14.28 0 25.88-11.6 25.88-25.88V57.88C416 43.6 404.4 32 390.12 32zm-207 325.07c0 14.12-11.48 25.6-25.6 25.6H98.92c-14.12 0-25.6-11.48-25.6-25.6V122.93c0-14.12 11.48-25.6 25.6-25.6h58.6c14.12 0 25.6 11.48 25.6 25.6v234.14zm168-128c0 14.12-11.48 25.6-25.6 25.6h-58.6c-14.12 0-25.6-11.48-25.6-25.6V122.93c0-14.12 11.48-25.6 25.6-25.6h58.6c14.12 0 25.6 11.48 25.6 25.6v106.14z"/>
        </svg>
      </span>
      <span class="header-trello-text">
        Feedback
      </span>
    `;

    // 2. Roadmap Button
    const roadmapLink = document.createElement('a');
    roadmapLink.id = 'header-trello-roadmap-link';
    roadmapLink.href = 'https://trello.com/b/C01DeJVb';
    roadmapLink.target = '_blank';
    roadmapLink.rel = 'noopener';
    roadmapLink.title = 'Roadmap Board';
    roadmapLink.className = 'header-trello-with-text header-trello-roadmap';
    roadmapLink.innerHTML = `
      <span class="header-trello-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M390.12 32H57.88C43.6 32 32 43.6 32 57.88v396.24C32 468.4 43.6 480 57.88 480h332.24c14.28 0 25.88-11.6 25.88-25.88V57.88C416 43.6 404.4 32 390.12 32zm-207 325.07c0 14.12-11.48 25.6-25.6 25.6H98.92c-14.12 0-25.6-11.48-25.6-25.6V122.93c0-14.12 11.48-25.6 25.6-25.6h58.6c14.12 0 25.6 11.48 25.6 25.6v234.14zm168-128c0 14.12-11.48 25.6-25.6 25.6h-58.6c-14.12 0-25.6-11.48-25.6-25.6V122.93c0-14.12 11.48-25.6 25.6-25.6h58.6c14.12 0 25.6 11.48 25.6 25.6v106.14z"/>
        </svg>
      </span>
      <span class="header-trello-text">
        Roadmap
      </span>
    `;
    
    const gitSource = headerSource.querySelector('.md-source');
    if (gitSource) {
      gitSource.parentNode.insertBefore(trelloLink, gitSource.nextSibling);
      trelloLink.parentNode.insertBefore(roadmapLink, trelloLink.nextSibling);
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

function calculateReadingTime() {
  const contentArea = document.querySelector('.md-content__inner');
  if (!contentArea) return null;

  // Clone to avoid modifying the original DOM
  const clone = contentArea.cloneNode(true);
  
  // Remove non-content elements to avoid inflating word counts
  clone.querySelectorAll('.linenos, .md-clipboard, .md-meta, script, style, .admonition-title').forEach(el => el.remove());
  
  // Get text content
  const text = clone.innerText || clone.textContent || "";
  
  // Count words (split by whitespace characters)
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;
  
  if (wordCount < 5) return null;
  
  // Average reading speed: 200 words per minute
  const wordsPerMinute = 200;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  return { wordCount, readingTime };
}

function initReadMeta() {
  // Clear any existing widget first to prevent duplicate elements on transition
  const existing = document.querySelectorAll('.md-read-meta');
  existing.forEach(el => el.remove());

  const stats = calculateReadingTime();
  if (!stats) return;

  const { wordCount, readingTime } = stats;

  const tocInners = document.querySelectorAll('.md-sidebar--secondary .md-sidebar__inner');
  if (tocInners.length === 0) return;

  tocInners.forEach(tocInner => {
    const widget = document.createElement('div');
    widget.className = 'md-read-meta';
    widget.innerHTML = `
      <div class="md-read-meta__item">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="md-read-meta__icon">
          <path d="M12 20c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8m0-18c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2m.5 11H11V7h1.5v4.3l3.3 1.9-.8 1.3-3.5-2.1Z"/>
        </svg>
        <span class="md-read-meta__text"><span class="md-read-meta__value">${readingTime}</span> min read</span>
      </div>
      <div class="md-read-meta__item">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="md-read-meta__icon">
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6Zm2 16H8v-2h8v2Zm0-4H8v-2h8v2Zm-3-5V3.5L18.5 9H13Z"/>
        </svg>
        <span class="md-read-meta__text"><span class="md-read-meta__value">${wordCount.toLocaleString()}</span> words</span>
      </div>
    `;

    // Prepend to the inner secondary sidebar so it sits above the TOC
    tocInner.insertBefore(widget, tocInner.firstChild);
  });
}

function initTableCheckboxes() {
  const tables = document.querySelectorAll('.md-content__inner table');
  tables.forEach(table => {
    const cells = table.querySelectorAll('td, th');
    cells.forEach(cell => {
      if (cell.querySelector('pre')) return;
      processTableCheckboxNode(cell);
    });
  });
}

function processTableCheckboxNode(node) {
  if (node.nodeName === 'CODE' || node.nodeName === 'PRE' || node.nodeName === 'SCRIPT' || node.nodeName === 'STYLE' || node.nodeName === 'INPUT') {
    return;
  }
  
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.nodeValue;
    const regex = /(?:^[ \t]*[-*+]\s+)?\[([ xX])\]/g;
    
    if (regex.test(text)) {
      const fragment = document.createDocumentFragment();
      let lastIndex = 0;
      regex.lastIndex = 0;
      
      let match;
      while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          fragment.appendChild(document.createTextNode(text.substring(lastIndex, match.index)));
        }
        
        const isChecked = match[1].toLowerCase() === 'x';
        const label = document.createElement('label');
        label.className = 'task-list-control';
        
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.disabled = true;
        if (isChecked) {
          input.checked = true;
          input.setAttribute('checked', 'checked');
        }
        
        const indicator = document.createElement('span');
        indicator.className = 'task-list-indicator';
        
        label.appendChild(input);
        label.appendChild(indicator);
        fragment.appendChild(label);
        
        lastIndex = regex.lastIndex;
      }
      
      if (lastIndex < text.length) {
        fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
      }
      
      node.parentNode.replaceChild(fragment, node);
    }
  } else {
    const children = Array.from(node.childNodes);
    children.forEach(child => processTableCheckboxNode(child));
  }
}

function initAll() {
  initReadingProgressBar();
  initHeaderTrelloLinks();
  initCollapsibleSections();
  initCollapsibleTabs();
  initTldrHighlighting();
  initReadMeta();
  initTableCheckboxes();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}

if (typeof document$ !== 'undefined') {
  document$.subscribe(initAll);
}


