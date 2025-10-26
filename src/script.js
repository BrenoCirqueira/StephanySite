const body = document.body
const audio = document.getElementById("audioplay")
const divEnrolados = document.getElementById("enrolados");
const divVelozes = document.getElementById("veloz");
const divkitty = document.getElementById("helloKitty");
const divPotter = document.getElementById("herryPotter");

// function trocarAudio(novoSrc) {
//     // Para e remove o áudio atual
//     audio.pause();
//     audio.remove();

//     // Cria novo elemento de áudio
//     const novoAudio = document.createElement("audio");
//     novoAudio.autoplay = true;
//     novoAudio.id = "meuAudio";
//     novoAudio.pause(); 
//     // olha esse pause

//     const novoSource = document.createElement("source");
//     novoSource.src = novoSrc;
//     novoSource.type = "audio/mpeg";

//     novoAudio.appendChild(novoSource);
//     document.body.appendChild(novoAudio);

//     // Toca o novo áudio
//     novoAudio.load();
//     novoAudio.play();
// }

// divEnrolados.addEventListener("click", () => {
//     trocarAudio("assets/audio/Sylvia Salustti, Raphael Rossato - Vejo Enfim a Luz Brilhar (De ＂Enrolados＂⧸Vídeo Oficial).mp3");
//     divEnrolados.style.background = "gray"
// });
// divVelozes.addEventListener("click", () => {
//     trocarAudio("assets/audio/Wiz Khalifa - See You Again ft. Charlie Puth [Official Video] Furious 7 Soundtrack.mp3");
//     divVelozes.style.background = "gray"
// });
// divkitty.addEventListener("click", () => {
//     trocarAudio("assets/audio/Música tema ⧸ Abertura (Hello Kitty Vila da Floresta).mp3");
//     divkitty.style.background = "gray"
// });
// divPotter.addEventListener("click", () => {
//     trocarAudio("assets/audio/Harry Potter - Música Tema ( Edwiges' Theme).mp3");
//     divPotter.style.background = "gray"
// });
