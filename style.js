document.addEventListener('DOMContentLoaded', function() {

    var images = [
        "Immagini/1/Cucina1.jpg",
        "Immagini/1/Cucina2.jpg",
        "Immagini/1/Cucina3.jpg",
        "Immagini/1/Cucina4.jpg",
        "Immagini/1/rara.jpg",
        "Immagini/1/Cucina5.jpg",
        "Immagini/1/Cucina6.jpg",
        "Immagini/1/Cucina7.jpg",
        "Immagini/1/Cucina8.jpg",
        "Immagini/1/Cucina9.jpg",
    ];

    var secondImages = [
        "Immagini/2/Zaino1.jpg",
        "Immagini/2/Zaino2.jpg",
        "Immagini/2/Zaino3.jpg",
        "Immagini/2/Zaino4.jpg",
        "Immagini/2/Zaino5.jpg",
        "Immagini/2/rara.jpg",
        "Immagini/2/Zaino6.jpg",
        "Immagini/2/Zaino7.jpg",
        "Immagini/2/Zaino8.jpg",
        "Immagini/2/Zaino9.jpg",
    ];

    var thirdImages = [
        "Immagini/3/Pianta1.jpg",
        "Immagini/3/Pianta2.jpg",
        "Immagini/3/Pianta3.jpg",
        "Immagini/3/Pianta4.jpg",
        "Immagini/3/Pianta5.jpg",
        "Immagini/3/Pianta6.jpg",
        "Immagini/3/Pianta7.jpg",
        "Immagini/3/rara.jpg",
        "Immagini/3/Pianta8.jpg",
        "Immagini/3/Pianta9.jpg",
    ];

    var fourthImages = [
        "Immagini/4/Frutta1.jpg",
        "Immagini/4/Frutta2.jpg",
        "Immagini/4/Frutta3.jpg",
        "Immagini/4/Frutta4.jpg",
        "Immagini/4/rara.jpg",
        "Immagini/4/Frutta5.jpg",
        "Immagini/4/Frutta6.jpg",
        "Immagini/4/Frutta7.jpg",
        "Immagini/4/Frutta8.jpg",
        "Immagini/4/Frutta9.jpg",
    ];

    var fifthImages = [
        "Immagini/5/Libro1.jpg",
        "Immagini/5/Libro2.jpg",
        "Immagini/5/Libro3.jpg",
        "Immagini/5/Libro4.jpg",
        "Immagini/5/Libro5.jpg",
        "Immagini/5/Libro6.jpg",
        "Immagini/5/Libro7.jpg",
        "Immagini/5/Libro8.jpg",
        "Immagini/5/rara.jpg",
        "Immagini/5/Libro9.jpg",
    ];

    var nameInput = document.getElementById('name');
    var submitButton = document.querySelector('.form-submit-button');
    var userNameDisplay = document.getElementById('userNameDisplay');
    var runButton = document.querySelector('.run-test-button');
    var sequenceButton = document.querySelector('.run-sequence-button');
    var dynamicImage = document.getElementById('dynamicImage');
    var imageContainers = [images, secondImages, thirdImages, fourthImages, fifthImages];
    var currentSequence = 0;
    var timestampSec = undefined;
    var timestampRare = undefined;
    var timestampImage = undefined;
    var reactionTime = 0;
    var differenceNotRareTot = 0;
    var differenceTot = 0;
    var timestampArray = [];
    var flag = 0;
    var flagRare = 0;
    var isImageSequenceDisplayed = false;
    var timestamps = []; 
    var differenceFirstImage = [];
    var firstTimestamp;
    var differenceFirstImageForSecondSignal = [];

    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space' && isImageSequenceDisplayed == true) {
            var timestamp = new Date().getTime();
            timestampSec = Math.floor(timestamp / 1000);
            console.log("Timestamp per spazio: ", timestampSec);

            if (timestampImage != undefined && timestampSec != undefined) {
                var differenceNotRare = timestampSec - timestampImage;
                console.log("Differenza normale: ", differenceNotRare);
                differenceNotRareTot = differenceNotRareTot + differenceNotRare;
                flag = flag + 1;
                differenceFirstImage.push(timestampImage - firstTimestamp);
            }
            if (timestampRare != undefined && timestampSec != undefined) {
                var difference = timestampSec - timestampRare;
                console.log("Differenza rara: ", difference);
                differenceTot = difference + differenceTot;
                flagRare = flagRare + 1;
                differenceFirstImage.push(timestampRare - firstTimestamp);
            }
        }
    });

    nameInput.addEventListener('input', function() {
        if (nameInput.value.trim() !== '') {
            submitButton.disabled = false;
            runButton.disabled = false;
        } else {
            submitButton.disabled = true;
            runButton.disabled = true;
        }
    });

    submitButton.addEventListener('click', function() {
        document.getElementById('session_block').style.display = 'none';
        document.getElementById('userBox').style.display = 'flex';
        document.getElementById('runBox').style.display = 'flex';
        userNameDisplay.textContent = nameInput.value;
    });

    runButton.addEventListener('click', function() {
        document.getElementById('runBox').style.display = 'none';
        document.getElementById('intermediateParagraph').style.display = 'flex';
        setTimeout(function() {
            document.getElementById('intermediateParagraph').style.display = 'none';
            document.getElementById('testBox').style.display = 'flex';
            changeImage();
        }, 4000);
    });

    sequenceButton.addEventListener('click', function() {
        if (currentSequence < imageContainers.length - 1) {
            currentSequence++;
            document.getElementById('intermediateParagraph').style.display = 'flex';
            document.getElementById('intermediateButton').style.display = 'none';
            setTimeout(function() {
                document.getElementById('intermediateParagraph').style.display = 'none';
                document.getElementById('testBox').style.display = 'flex';
                changeImage();
            }, 4000);
        } else {
            document.getElementById('finalParagraph').style.display = 'flex';
        }
    });

    function noise(x) {
        let total = 0;
        let frequency = 1;
        let amplitude = 1;
        let maxValue = 0; // Valore massimo che può essere generato dall'ottava
    
        // Calcola il valore massimo che può essere generato dall'ottava
        for (let i = 0; i < 2.5; i++) {
            maxValue += amplitude;
            amplitude /= 2;
        }
    
        // Genera il rumore Perlin utilizzando ottave
        for (let i = 0; i < 2.5; i++) {
            total += Math.sin(x * frequency) * amplitude;
            frequency *= 2;
            amplitude /= 2;
        }
    
        // Normalizza il valore totale in modo che sia compreso tra -1 e 1
        return total / maxValue;
    }

    function changeImage() {
        isImageSequenceDisplayed = true;
        var imagesToShow = imageContainers[currentSequence];
        var imageIndex = 0;
        dynamicImage.src = imagesToShow[imageIndex];
        document.getElementById('intermediateButton').style.display = 'none'; // Nasconde il pulsante durante la visualizzazione delle immagini
        
        var imageInterval = setInterval(function() {
            imageIndex++;
            if (imageIndex < imagesToShow.length) {
                dynamicImage.src = imagesToShow[imageIndex];
                if (imagesToShow[imageIndex].endsWith("rara.jpg")) {
                    timestampImage = undefined;
                    var timestamp2 = new Date().getTime();
                    timestampRare = Math.floor(timestamp2 / 1000);
                    console.log("Timestamp per rara.png: ", timestampRare);
                    timestamps.push(timestampRare);
                    differenceFirstImageForSecondSignal.push(timestampRare - firstTimestamp);
                }
                else {
                    timestampRare = undefined;
                    var timestamp3 = new Date().getTime();
                    timestampImage = Math.floor(timestamp3 / 1000);
                    console.log("Timestamp per immagine: ", timestampImage);
                    timestamps.push(timestampImage);
                    firstTimestamp = timestamps[0];
                }
            } else {
                clearInterval(imageInterval);
                if (currentSequence < imageContainers.length - 1) {
                    difference = differenceTot + differenceNotRareTot;
                    console.log("differenza totale", difference);
                    timestampArray.push(difference);
                    difference = 0;
                    differenceNotRareTot = 0;
                    differenceTot = 0;
                    isImageSequenceDisplayed = false;
                    document.getElementById('intermediateButton').style.display = 'flex'; // Mostra il pulsante per la prossima sequenza
                }
                document.getElementById('testBox').style.display = 'none'; // Nasconde le immagini alla fine della sequenza
                if (currentSequence===imageContainers.length - 1){
                    difference = differenceTot + differenceNotRareTot;
                    console.log("differenza totale", difference);
                    timestampArray.push(difference);
                    for (var i = 0; i < timestampArray.length; i++) {
                        reactionTime = reactionTime + timestampArray[i];
                    }
                    console.log("Tempo di reazione: ", reactionTime);
                    reactionTime = reactionTime / timestampArray.length;
                    console.log("Tempo di reazione: ", reactionTime);
                    difference = 0;
                    differenceNotRareTot = 0;
                    differenceTot = 0;
                    document.getElementById('finalParagraph').style.display = 'flex';
                    document.getElementById('resultParagraph').style.display = 'flex';
                    document.getElementById('legendParagraph').style.display = 'flex';
                    document.getElementById('resultParagraph').textContent = "Il tuo tempo di reazione è: " + reactionTime + " e hai rilevato " + flagRare + " immagini rara/e su 5";
                    document.getElementById('legendParagraph').textContent = "Legenda del tempo di reazione (ipotizzando 5/5 immagini rilevate): < 1 perfetto; <= 1,4 buono; >1,4 controllo necessario";
                    document.getElementById('chart').style.display = 'flex';

                    for (var i = 0; i < timestamps.length; i++) {
                        console.log(differenceFirstImage[i]);
                    }

                    const stepSize = 1.5;

                    //new array from 0 to 100 step 0.1
                    const timeArray = Array.from({length: 100}, (_, i) => i * stepSize);
                
                    const ctx = document.getElementById('p300Chart').getContext('2d');
                    const myChart = new Chart(ctx, {
                    type: 'line',
                        data: {
                            labels: timeArray,
                            datasets: [{
                                label: 'P300',
                                data: timeArray.map(time => {
                                    // Controlla se il tempo corrente è vicino a uno dei timestamp specificati
                                    const isNear = differenceFirstImage.some(stamp => Math.abs(time - stamp) < (stepSize/2));
                                    // Restituisci 1 se il tempo corrente è vicino a uno dei timestamp, altrimenti 0
                                    const baseValue = isNear ? -1 : 0;
                                    return baseValue +  noise(time);
                                }),
                                borderColor: "#182b898c",
                                borderWidth: 2,
                                fill: true,
                            }, {
                                label: 'Immagini rare',
                                data: timeArray.map(time => {
                                    // Controlla se il tempo corrente è vicino a uno dei timestamp specificati
                                    const isNear = differenceFirstImageForSecondSignal.some(stamp => Math.abs(time - stamp) < (stepSize/2));
                                    // Restituisci 1 se il tempo corrente è vicino a uno dei timestamp, altrimenti 0
                                    return isNear ? 1 : 0;
                                }),
                                borderColor: "gray",
                                borderWidth: 1,
                                fill: true,
                            }],
                        },
                        options: {
                            scales: {
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Tempo',
                                        color: '#000', // Colore del titolo
                                        font: {
                                            size: 14, // Dimensione del font
                                            weight: 'bold' // Peso del font
                                        }
                                    },
                                    max: 200,
                                },
                                y: {
                                    beginAtZero: true,
                                    suggestedMax: 1.5, // Imposta il massimo valore sull'asse y
                                    suggestedMin: -1.5,
                                    title: {
                                        display: true,
                                        text: 'Ampiezza',
                                        color: '#000', // Colore del titolo
                                        font: {
                                            size: 14, // Dimensione del font
                                            weight: 'bold' // Peso del font
                                        }
                                    },
                                },
                            },
                         },
                    });  
                }
            }
        }, 2000); // Cambia immagine ogni due secondi
    }
});