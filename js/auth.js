const isLogged = localStorage.getItem('loggedIn') === 'true'
const user = JSON.parse(localStorage.getItem('user'))

const logoutBtn = document.getElementById('logout')
const navCursos = document.getElementById('nav-cursos')
const navCadastro = document.getElementById('nav-cadastro')
const navLogin = document.getElementById('nav-login')
const userName = document.getElementById('user-name')

// controle de menu
if (navCursos) navCursos.style.display = isLogged ? 'block' : 'none'
if (navCadastro) navCadastro.style.display = isLogged ? 'none' : 'block'
if (navLogin) navLogin.style.display = isLogged ? 'none' : 'block'

if (userName && isLogged && user) {
    const firstName = user.nome.split(' ')[0]
    userName.textContent = `Olá, ${firstName}`
}

// botão logout
if (logoutBtn) {
    logoutBtn.style.display = isLogged ? 'inline-flex' : 'none'
}

logoutBtn?.addEventListener('click', () => {
    localStorage.removeItem('loggedIn')
    localStorage.removeItem('user')
    window.location.href = 'login.html'
})