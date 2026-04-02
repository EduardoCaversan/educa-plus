const form = document.getElementById('cadastro-form')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const nomeFormatado = formatName(form[0].value)
    const user = {
        nome: nomeFormatado,
        email: form[1].value,
        senha: form[2].value
    }
    if (!isValidEmail(user.email)) {
        alert('Email inválido!')
        return
    }
    localStorage.setItem('user', JSON.stringify(user))

    window.location.href = 'login.html'
})

function formatName(name) {
    const ignore = ['da', 'de', 'do', 'dos', 'das']

    return name
        .toLowerCase()
        .split(' ')
        .map((word, i) => {
            if (i !== 0 && ignore.includes(word)) return word
            return word.charAt(0).toUpperCase() + word.slice(1)
        })
        .join(' ')
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}