/**
 * Simulador de Lampada
 * @author Patrick G
 */
// variaveis de apoio
let chave = false // o interruptor inicia desligado
let lampada = true // lampada esta ok


function quebrar(){
    if (lampada === true){
        document.getElementById('lamp').src="img/broken.jpg"
    // reproduzindo um arquivo de audio no js
    // passo 1 -> copiar o arquivo de audio para o projeto
    // passo 2 -> usar a classe audio (biblioteca interna)
    let som = new Audio()
    som.src = "sound/glassbreaking.wav"
    som.play()

    // apoia a logica
    lampada = false
    }
}

function onoff(){
    if (chave === false && lampada === true){
        document.getElementById('interruptor').src="img/swon.png"
        chave = true // chave esta ligada
        // ligar a lampada
        document.getElementById('lamp').src="img/on.jpg"
    }else if (lampada === true){
        document.getElementById('interruptor').src="img/swoff.png"
        chave = false
        // desligar a lampada
        document.getElementById('lamp').src="img/off.jpg"
    }
}


