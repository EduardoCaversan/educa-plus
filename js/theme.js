const btn = document.getElementById('theme-toggle')
const icon = document.getElementById('theme-icon')

function applyTheme() {
  const saved = localStorage.getItem('theme')

  if (saved === 'dark') {
    document.body.classList.add('dark')
    icon.textContent = 'light_mode'
  } else {
    document.body.classList.remove('dark')
    icon.textContent = 'dark_mode'
  }
}

btn?.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark')

  localStorage.setItem('theme', isDark ? 'dark' : 'light')
  applyTheme()
})

applyTheme()