/**
 * Simulador de Lampada
 * @author Patrick G
 */
// variaveis de apoio
let chave = false // o interruptor inicia desligado
let lampada = true // lampada esta ok

// pre carregamento do arquivo de audio
let som = new Audio("sound/breaking-glass.mp3")

// lanterna (pré carregamento)
let stream, track // variaveis de apoio
inicializarLanterna()

function quebrar() {
    if (lampada === true) {
        document.getElementById('lamp').src = "img/broken.jpg"
        // reproduzindo um arquivo de audio no js
        // passo 1 -> copiar o arquivo de audio para o projeto
        // passo 2 -> usar a classe audio (biblioteca interna)
        // passo 3 -> pre carregar o arquivo de audio para sincronizar com a troca de imagem (UX)
        som.play()
        // apoia a logica
        lampada = false
    }
}

function onoff() {
    if (chave === false) {
        document.getElementById('interruptor').src = "img/swon.png"
        chave = true // chave esta ligada
        // verificar se a lampada esta intacta antes de acender
        if (lampada === true) {
            document.getElementById('lamp').src = "img/on.jpg"
        }
    } else {
        document.getElementById('interruptor').src = "img/swoff.png"
        chave = false
        // verificar se a lampada esta intacta antes de acender
        if (lampada === true) {
            document.getElementById('lamp').src = "img/off.jpg"
        }
    }
}

// Estudo de eventos relacionados a click do mouse (pressionado ou nao pressionado) e telas touch
// passo 1 -> capturar os elementos do HTML (DOM)
const botao = document.getElementById('button')
const lampadaImg = document.getElementById('lamp')

// passo 2 -> manipular o evento mouse pressionado
// addEventListener (escuta de eventos em tempo real)
// mousedowm (mouse pressionado constantemente)
// mouseup (soltar o botao do mouse)
// touchstart (tocar na tela e manter)
// touchend (deixar de pressionar a tela touch)

// pressionar o botao e manter
botao.addEventListener('mousedown', (event) => {
    event.preventDefault() // ignorar o conportamento padrao
    // se a lampada estiver intacta e o interruptor principal estiver desligado
    if (lampada === true && chave === false) {
        lampadaImg.src = "img/on.jpg"
    }
})

// soltar o botao do mouse
botao.addEventListener('mouseup', (event) => {
    event.preventDefault()
    // se a lampada estiver intacta e o interruptor principal estiver desligado
    if (lampada === true && chave === false) {
        lampadaImg.src = "img/off.jpg" // trocar a imagem
    }
})

// pressionar a tela touch e manter
botao.addEventListener('touchstart', (event) => {
    event.preventDefault()
    if (lampada === true && chave === false) {
        lampadaImg.src = "img/on.jpg"
    }
})

// deixar de pressionar a tela touch
botao.addEventListener('touchend', (event) => {
    event.preventDefault()
    if (lampada === true && chave === false) {
        lampadaImg.src = "img/off.jpg" // trocar a imagem
    }
})

// lanterna (torch)
async function inicializarLanterna() {
    // try-cath (tratamento de exceçoes)
    try {
        // Solicita acesso à câmera traseira sem exibir o vídeo
        stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" }
        })

        // Obtém o track do vídeo para controlar a lanterna
        track = stream.getVideoTracks()[0]

        // Verifica se o dispositivo suporta o uso da lanterna
        const capabilities = track.getCapabilities()
        if (!capabilities.torch) {
            console.log("Lanterna não suportada no dispositivo.")
            return
        }
    } catch (error) {
        console.error(`Erro ao inicializar a lanterna: ${error}`)
    }
}
async function ligar() {
    if (track) {
        try {
            await track.applyConstraints({ advanced: [{ torch: true }] })
        } catch (error) {
            console.error(`Erro ao inicializar a lanterna: ${error}`)
        }
    }
}

async function desligar() {
    if (track) {
        try {
            await track.applyConstraints({ advanced: [{ torch: false }] })
        } catch (error) {
            console.error(`Erro ao inicializar a lanterna: ${error}`)
        }
    }
}