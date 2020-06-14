const url = 'http://localhost:3000'
const socket = io(url)
const utamoVitaAudio = document.getElementById("myAudio");
const UTAMO_VITA_FULL_TIME = 200 // seconds
let POOLING_INTERVAL = 500

let utamoVitaCountdown = UTAMO_VITA_FULL_TIME
let refreshId = null



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
    refreshCounter()
    refreshId = setInterval(() => {
        console.log(`Next utamo vita in ${utamoVitaCountdown}`);
        const utamovitaResult = utamoVita()
        if (utamovitaResult === true) refreshCounter()
    }, 1000);
}

const refreshCounter = () => {
    clearInterval(refreshId)
    utamoVitaCountdown = UTAMO_VITA_FULL_TIME
}

socket.on('reminder', (data) => {
    if (!data) POOLING_INTERVAL = 1000
    else POOLING_INTERVAL = 100
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
    }, POOLING_INTERVAL);
}

window.onload = () => {
    console.log('window loaded');
    document.getElementById("utamo_label").style.visibility = 'hidden';
    document.getElementById("utamo_vita").style.visibility = 'hidden';
}

window.onbeforeunload = function(){
    return 'Are you sure you want to leave?';
  };

const startApp = () => {
    utamoVitaAudio.play()
    document.getElementById("start").style.visibility = 'hidden';
    document.getElementById("utamo_label").style.visibility = 'visible';
    document.getElementById("utamo_vita").style.visibility = 'visible';
    keepPoolingMessages()
}
