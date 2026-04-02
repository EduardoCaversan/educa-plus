document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menu-toggle')
  const sidebar = document.getElementById('sidebar')

  if (!sidebar) return

  const isLogged = localStorage.getItem('loggedIn') === 'true'
  const currentPage = window.location.pathname.split('/').pop()
  sidebar.innerHTML = ''

  function addLink(href, text) {
    if (href === currentPage) return

    const a = document.createElement('a')
    a.href = href
    a.textContent = text
    sidebar.appendChild(a)
  }

  addLink('index.html', 'Início')

  if (isLogged) {
    addLink('cursos.html', 'Cursos')

    const logoutBtn = document.createElement('button')
    logoutBtn.textContent = 'Sair'

    logoutBtn.onclick = () => {
      localStorage.clear()
      window.location.href = 'login.html'
    }

    sidebar.appendChild(logoutBtn)

  } else {
    addLink('cadastro.html', 'Cadastro')
    addLink('login.html', 'Login')
  }

  // abrir/fechar pelo botão
  toggle?.addEventListener('click', (e) => {
    e.stopPropagation() // impede fechar imediatamente
    sidebar.classList.toggle('open')
  })

  // impedir clique dentro da sidebar de fechar
  sidebar.addEventListener('click', (e) => {
    e.stopPropagation()
  })

  // fechar clicando fora
  document.addEventListener('click', () => {
    sidebar.classList.remove('open')
  })

  // fechar com ESC (bônus profissional)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      sidebar.classList.remove('open')
    }
  })
})