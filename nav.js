document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');
  if (!toggle || !links) return;

  /* Services dropdown: built here so every page gets it from this one file */
  var servicesLink = links.querySelector('a[href="services.html"]');
  if (servicesLink) {
    var item = servicesLink.parentElement;
    item.classList.add('has-dropdown');

    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'dropdown-toggle';
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', 'services-menu');
    button.setAttribute('aria-label', 'Show services');
    button.innerHTML = '<svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10"><path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';

    var menu = document.createElement('ul');
    menu.className = 'dropdown';
    menu.id = 'services-menu';

    [
      { href: 'services.html#seo', label: 'SEO', note: '(Search Engine Optimization)' },
      { href: 'services.html#website', label: 'Website Services' },
      { href: 'services.html#branding', label: 'Branding & Print' }
    ].forEach(function (entry) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = entry.href;
      a.textContent = entry.label;
      if (entry.note) {
        var note = document.createElement('span');
        note.className = 'dropdown-note';
        note.textContent = ' ' + entry.note;
        a.appendChild(note);
      }
      li.appendChild(a);
      menu.appendChild(li);
    });

    item.appendChild(button);
    item.appendChild(menu);

    var setOpen = function (open) {
      item.classList.toggle('is-open', open);
      button.setAttribute('aria-expanded', open ? 'true' : 'false');
      button.setAttribute('aria-label', open ? 'Hide services' : 'Show services');
    };

    button.addEventListener('click', function (event) {
      event.stopPropagation();
      setOpen(!item.classList.contains('is-open'));
    });

    document.addEventListener('click', function (event) {
      if (!item.contains(event.target)) setOpen(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && item.classList.contains('is-open')) {
        setOpen(false);
        button.focus();
      }
    });
  }

  toggle.addEventListener('click', function () {
    var isOpen = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  links.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    });
  });
});
