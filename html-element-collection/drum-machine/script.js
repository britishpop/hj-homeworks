function play () {
    let drum = document.getElementsByClassName(this.classList[1]);
    drum[0].getElementsByTagName("audio")[0].play();
}

const drums = document.getElementsByClassName("drum-kit__drum");

for (let drum of drums) {
    drum.onclick = play;
}
