document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('video-grid')
  const links = document.querySelectorAll('[data-filter]')
  const logoutBtn = document.getElementById('logout')

  let videos = []
  let filter = 'all'

  const isLogged = localStorage.getItem('loggedIn')

  if (isLogged !== 'true') {
    window.location.href = 'login.html'
    return
  }

  logoutBtn?.addEventListener('click', () => {
    localStorage.removeItem('loggedIn')
    localStorage.removeItem('user')
    window.location.href = 'login.html'
  })

  async function load() {
    try {
      grid.innerHTML = '<p>Carregando...</p>'

      const response = await fetch('./data/videos.json')

      if (!response.ok) throw new Error('Erro ao carregar JSON')

      videos = await response.json()

      render()
    } catch (err) {
      grid.innerHTML = '<p>Erro ao carregar vídeos 😢</p>'
      console.error(err)
    }
  }

  function render() {
    grid.innerHTML = ''

    const filtered =
      filter === 'all'
        ? videos
        : videos.filter(v => v.category === filter)

    if (filtered.length === 0) {
      grid.innerHTML = '<p>Nenhum vídeo encontrado</p>'
      return
    }

    filtered.forEach(v => {
      const el = document.createElement('div')
      el.className = 'video-card'

      el.innerHTML = `
        <h3>${v.title}</h3>
        <iframe 
          src="https://www.youtube.com/embed/${v.id}" 
          allowfullscreen>
        </iframe>
        <p>${v.description || ''}</p>
      `

      grid.appendChild(el)
    })
  }

  // filtros
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault()

      links.forEach(l => l.classList.remove('active'))
      link.classList.add('active')

      filter = link.dataset.filter || 'all'
      render()
    })
  })

  load()
})