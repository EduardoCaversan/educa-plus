const btn = document.getElementById('theme-toggle')

function applyTheme() {
  const saved = localStorage.getItem('theme')

  if (saved === 'dark') {
    document.body.classList.add('dark')
    btn.innerHTML = '☀️'
  } else {
    document.body.classList.remove('dark')
    btn.innerHTML = '🌙'
  }
}

btn?.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark')

  localStorage.setItem('theme', isDark ? 'dark' : 'light')
  applyTheme()
})

applyTheme()