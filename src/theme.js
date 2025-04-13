export function toggleTheme() {
    const body = document.body;
    const current = body.classList.contains('dark') ? 'light' : 'dark';
    body.classList.remove('dark', 'light');
    body.classList.add(current);
    localStorage.setItem('theme', current);
  }
  
  export function applySavedTheme() {
    const saved = localStorage.getItem('theme') || 'light';
    document.body.classList.add(saved);
  }
  