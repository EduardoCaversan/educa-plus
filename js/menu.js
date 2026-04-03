document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menu-toggle')
  const sidebar = document.getElementById('sidebar')

  if (!sidebar) return

  const isLogged = localStorage.getItem('loggedIn') === 'true'

  const currentPage = location.pathname.includes('cursos')
    ? 'cursos.html'
    : location.pathname.includes('login')
      ? 'login.html'
      : location.pathname.includes('cadastro')
        ? 'cadastro.html'
        : 'index.html'

  // cria backdrop
  const backdrop = document.createElement('div')
  backdrop.className = 'sidebar-backdrop'
  document.body.appendChild(backdrop)

  sidebar.innerHTML = ''

  // título
  const title = document.createElement('h2')
  title.textContent = 'Educa+'
  sidebar.appendChild(title)

  function createItem(href, text, icon) {
    const el = document.createElement('a')
    el.href = href

    if (href === currentPage) el.classList.add('active')

    el.innerHTML = `
      <span class="material-icons">${icon}</span>
      <span>${text}</span>
    `

    addRipple(el)
    sidebar.appendChild(el)
  }

  function createLogout() {
    const btn = document.createElement('button')

    btn.innerHTML = `
      <span class="material-icons">logout</span>
      <span>Sair</span>
    `

    btn.onclick = () => {
      localStorage.clear()
      window.location.href = 'login.html'
    }

    addRipple(btn)
    sidebar.appendChild(btn)
  }

  function addRipple(element) {
    element.addEventListener('click', function (e) {
      const circle = document.createElement('span')
      circle.classList.add('ripple')

      const rect = element.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)

      circle.style.width = circle.style.height = size + 'px'
      circle.style.left = e.clientX - rect.left - size / 2 + 'px'
      circle.style.top = e.clientY - rect.top - size / 2 + 'px'

      element.appendChild(circle)

      setTimeout(() => circle.remove(), 500)
    })
  }

  // menu
  createItem('index.html', 'Início', 'home')

  if (isLogged) {
    createItem('cursos.html', 'Cursos', 'school')
    createLogout()
  } else {
    createItem('cadastro.html', 'Cadastro', 'person_add')
    createItem('login.html', 'Login', 'login')
  }

  function openSidebar() {
    sidebar.classList.add('open')
    backdrop.classList.add('open')
  }

  function closeSidebar() {
    sidebar.classList.remove('open')
    backdrop.classList.remove('open')
  }

  toggle?.addEventListener('click', (e) => {
    e.stopPropagation()
    openSidebar()
  })

  backdrop.addEventListener('click', closeSidebar)

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSidebar()
  })
})