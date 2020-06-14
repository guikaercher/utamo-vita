const url = 'http://localhost:3000'
const socket = io(url)
const utamoVitaAudio = document.getElementById("audio_utamo_vita");
const startAudio = document.getElementById("audio_start");
const UTAMO_VITA_FULL_TIME = 200 // seconds
let POOLING_INTERVAL = 500

let utamoVitaCountdown = UTAMO_VITA_FULL_TIME
let refreshId = null

const updateLabelAndBar = (utamoVitaCountdown) => {
    const utamoVitaCountDownBar = document.getElementById("utamo_vita")
    const utamoLabel = document.getElementById("utamo_label")
    utamoLabel.innerHTML = `Next utamo in ${utamoVitaCountdown}s`
    utamoVitaCountDownBar.value = utamoVitaCountdown
}

const utamoVita = () => {
    if (utamoVitaCountdown < 5) {
        utamoVitaAudio.play()
        refreshCounter()
        return true
    }
    updateLabelAndBar(utamoVitaCountdown)
    utamoVitaCountdown--
}

const clearExactTimeout = function(timeout) {
	clearInterval(timeout);
};

const utamoVitaCountDown = () => {
    refreshCounter()
    refreshId = setInterval(() => {
        console.log(`Next utamo vita in ${utamoVitaCountdown}`);
        const utamovitaResult = utamoVita()
        if (utamovitaResult === true) refreshCounter()
    }, 1000);
}

const refreshCounter = () => {
    utamoVitaCountdown = UTAMO_VITA_FULL_TIME
    clearInterval(refreshId)
    updateLabelAndBar(utamoVitaCountdown)
}

socket.on('reminder', (data) => {
    if (!data) return POOLING_INTERVAL = 1000
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
    startAudio.play()
    document.getElementById("start").style.visibility = 'hidden';
    document.getElementById("utamo_label").style.visibility = 'visible';
    document.getElementById("utamo_vita").style.visibility = 'visible';
    keepPoolingMessages()
}
