/**
 * Simulador de Lampada
 * @author Patrick G
 */
function quebrar(){
    document.getElementById('lamp').src="img/broken.jpg"
    // reproduzindo um arquivo de audio no js
    // passo 1 -> copiar o arquivo de audio para o projeto
    // passo 2 -> usar a classe audio (biblioteca interna)
    let som = new Audio()
    som.src = "sound/glassbreaking.wav"
    som.play()

}
