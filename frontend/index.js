const url = 'http://localhost:3000'
const socket = io(url)
const utamoVitaAudio = document.getElementById("myAudio");
const UTAMO_VITA_FULL_TIME = 200 // seconds

let utamoVitaCountdown = UTAMO_VITA_FULL_TIME



const utamoVita = () => {
    const utamoVitaCountDownBar = document.getElementById("utamo_vita")
    const utamoLabel = document.getElementById("utamo_label")
    utamoVitaCountDownBar.value = utamoVitaCountdown
    utamoLabel.innerHTML =     `Next utamo in ${utamoVitaCountdown}s`
    if (utamoVitaCountdown < 5) {
        utamoVitaAudio.play()
        utamoVitaCountdown = UTAMO_VITA_FULL_TIME
        return true
    }
    utamoVitaCountdown--
}

const utamoVitaCountDown = () => {
    const refreshId = setInterval(() => {
        console.log(`Next utamo vita in ${utamoVitaCountdown}`);
        const utamovitaResult = utamoVita()
        if (utamovitaResult === true) clearInterval(refreshId)
    }, 1000);
}


socket.on('reminder', (data) => {
    console.log(data)
    switch(data) {
        case 'utamo vita':
            utamoVitaCountDown()
            break;
        default:
            break;
    }

});

const keepPoolingMessages = () => {
    setInterval(() => {
        socket.emit('check-status', 'front-loaded');
    }, 500);
}

window.onload = () => {
    console.log('window loaded');
    keepPoolingMessages()
}

window.onbeforeunload = function(){
    return 'Are you sure you want to leave?';
  };

const enableAudio = () => {
    utamoVitaAudio.play()
    document.getElementById("start").style.visibility = 'hidden';
}
