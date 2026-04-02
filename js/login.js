const form = document.getElementById('login-form')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = form[0].value
  const senha = form[1].value

  const savedUser = JSON.parse(localStorage.getItem('user'))

  if (!savedUser) {
    alert('Nenhum usuário cadastrado!')
    return
  }

  if (email === savedUser.email && senha === savedUser.senha) {
    localStorage.setItem('loggedIn', 'true')
    window.location.href = 'cursos.html'
  } else {
    alert('Credenciais inválidas!')
  }
})