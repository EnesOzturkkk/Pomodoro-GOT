var windowWidth = window.innerWidth;

var musicPaths = [
    "../musics/Main Title.mp3",
    "../musics/The Rains of Castamere.mp3",
    "../musics/Heir to the Throne.mp3",
    "../musics/The Night King.mp3",
    "../musics/Arrival at Winterfel.mp3"
];

var musicNames = [
    "Main Title",
    "The Rains of Castamere",
    "Heir to the Throne",
    "The Night King",
    "Arrival at Winterfel"
];

var musicCovers = [
    "../music-covers/drag.jpg", 
    "../music-covers/drago.jpg",
    "../music-covers/everyone.jpg",
    "../music-covers/jon.jpg",
    "../music-covers/jon2.jpg",
];


const progressBarContainer = $(".progress-bar-container");
const progressBar = $("#progressBar");
const progressHandle = $("#progressHandle");
const currentTimeDisplay = $("#currentTimeDisplay");
const totalTimeDisplay = $("#totalTimeDisplay");

const musicPhotoElement = $(".music-photo"); 
const musicNameElement = $(".music-name"); 


function setupCustomSeekBar() {
    let isDragging = false;

    currentMusic.addEventListener('loadedmetadata', () => {
        totalTimeDisplay.text(formatTime(currentMusic.duration));
        updateProgressBar(); 
    });

    currentMusic.addEventListener('timeupdate', () => {
        if (!isDragging) {
            updateProgressBar();
        }
    });


    function updateProgressBar() {
        const percentage = (currentMusic.currentTime / currentMusic.duration) * 100;
        progressBar.css("width", percentage + "%");
        progressHandle.css("left", percentage + "%");
        currentTimeDisplay.text(formatTime(currentMusic.currentTime));
    }


    progressHandle.on("mousedown", function(e) {
        isDragging = true;
        currentMusic.pause();
        handleSeek(e); 
    });

    $(document).on("mousemove", function(e) {
        if (isDragging) {
            handleSeek(e);
        }
    });

    $(document).on("mouseup", function() {
        if (isDragging) {
            isDragging = false;
            if (isMusicPlaying) { 
                currentMusic.play();
            }
        }
    });

    progressBarContainer.on("click", function(e) {
        handleSeek(e);
    });

    function handleSeek(e) {
        if (currentMusic.duration === 0) return; 

        const clickX = e.pageX - progressBarContainer.offset().left;
        const containerWidth = progressBarContainer.width();

        let newPercentage = (clickX / containerWidth) * 100;

        newPercentage = Math.max(0, Math.min(100, newPercentage));

        currentMusic.currentTime = (newPercentage / 100) * currentMusic.duration;

        updateProgressBar();
    }
}

let currentMusicIndex = 0;
var currentMusic = new Audio();


currentMusic.addEventListener('loadedmetadata', function() {
    totalTimeDisplay.text(formatTime(currentMusic.duration));
    updateProgressBar();
});


let isMusicPlaying = false; 


function playCurrentMusic() {
    currentMusic.play();
    isMusicPlaying = true;
    $(".play-button img").attr("src", "../images/buttons/pause-button.png"); 
}

function pauseCurrentMusic() {
    currentMusic.pause();
    isMusicPlaying = false;
    $(".play-button img").attr("src", "../images/buttons/play-button.png"); 
}

function loadMusic(index) {
    currentMusic.src = musicPaths[index];
    musicPhotoElement.attr("src", musicCovers[index]); 
    musicNameElement.text(musicNames[index]); 
    currentMusic.load(); 
}   

function playNextMusic() {
    currentMusicIndex++;
    if (currentMusicIndex >= musicPaths.length) {
        currentMusicIndex = 0; 
    }
    loadMusic(currentMusicIndex); 
    if (isMusicPlaying) {
        currentMusic.play();
    }
    console.log("Now playing:", musicNames[currentMusicIndex]); 
}


function playPreviousMusic() {
    currentMusicIndex--;
    if (currentMusicIndex < 0) {
        currentMusicIndex = musicPaths.length - 1; 
    }
    loadMusic(currentMusicIndex); 
    if (isMusicPlaying) {
        currentMusic.play();
    }
    console.log("Now playing:", musicNames[currentMusicIndex]); 
}

currentMusic.addEventListener('ended', () => {
    playNextMusic();
});

function translatePomodoroPage(language, familyFlag) {
    let familyNameText = "";
    let familyEmoji = "";

    switch (familyFlag) {
        case "lannister":
            familyEmoji = "🦁";
            familyNameText = (language === "English") ? "Lannister Family" : "Lannister Hanesi";
            break;
        case "stark":
            familyEmoji = "🐺";
            familyNameText = (language === "English") ? "Stark Family" : "Stark Hanesi";
            break;
        case "targaryen":
            familyEmoji = "🐉";
            familyNameText = (language === "English") ? "Targaryen Family" : "Targaryen Hanesi";
            break;
        default:
            familyEmoji = "";
            familyNameText = (language === "English") ? "Selected Family" : "Seçilen Aile";
    }
    $(".family-name").text(familyNameText + " " + familyEmoji);

    if (language === "English") {
        $(".ssr-button").eq(0).text("Start");
        $(".ssr-button").eq(1).text("Stop");
        $(".ssr-button").eq(2).text("Restart");
    } else if (language === "Türkçe") {
        $(".ssr-button").eq(0).text("Başlat");
        $(".ssr-button").eq(1).text("Durdur");
        $(".ssr-button").eq(2).text("Yeniden Başlat");
    }
}

$("button").on("click", function() {
    var buttonHTML = this.innerHTML;
    console.log(buttonHTML);
    switch(buttonHTML) {
        case "Başlat":
        case "Start":
            buttonAnimation(0);
            pomodoroTime(buttonHTML);
            break;
        case "Durdur":
        case "Stop":
            buttonAnimation(1);
            pomodoroTime(buttonHTML);
            break;
        case "Yeniden Başlat":
        case "Restart":
            buttonAnimation(2);
            pomodoroTime(buttonHTML);
            break;
        case "⚙️":
            window.location.href = "../index.html";
            break;
    }

    var imageElement = $(this).find("img"); 
    var currentPath = imageElement.length ? imageElement.attr("src") : null;

    if (currentPath) { 
        switch (currentPath) {
            case "../images/buttons/left-button.png":
                playPreviousMusic(); 
                buttonAnimation(3);
                break;
            case "../images/buttons/play-button.png":
            case "../images/buttons/pause-button.png": 
                if (isMusicPlaying) {
                    pauseCurrentMusic();
                } else {
                    playCurrentMusic();
                }
                buttonAnimation(4); 
                break;
            case "../images/buttons/right-button.png":
                playNextMusic(); 
                buttonAnimation(5);
                break;
        }
    }
});


function buttonAnimation(index) {
    $("button")[index+1].classList.add("pressed");
    setTimeout(function() {
        $("button")[index+1].classList.remove("pressed");
    }, 200);
}

var lessonMinutes = 20;
var breakMinutes = 5;
var longBreakMinutes = 25;
var seconds = 0;
var intervalId; 

var isLessonTime = true; 
var lessonsCompleted = 0;
var totalLessonsBeforeLongBreak = 4; 
var maxTicksToShow = 18;

const checkParagraph = $(".check");

function pomodoroTime(buttonHTML) {
    if (buttonHTML === "InitialLoad") {
        $(".pomodoro").html(formatTime(lessonMinutes * 60 + seconds)); 
        return;
    }

    if (buttonHTML === "Start") {
        clearInterval(intervalId);

        intervalId = setInterval(function() {
            let currentMinutes;
            let currentSeconds;

            if (isLessonTime) {
                currentMinutes = lessonMinutes;
            } else if (lessonsCompleted % totalLessonsBeforeLongBreak === 0 && lessonsCompleted !== 0) {
                currentMinutes = longBreakMinutes;
            } else {
                currentMinutes = breakMinutes;
            }
            currentSeconds = seconds;
            currentSeconds-=1;

            if (currentSeconds < 0) {
                currentSeconds = 59; 
                currentMinutes-=1; 
            }

            if (currentMinutes < 0) {
                clearInterval(intervalId); 

                if (isLessonTime) {
                    lessonsCompleted++; 
                    updateCheckMarks(); 

                    if (lessonsCompleted % totalLessonsBeforeLongBreak === 0) {
                        $(".pomodoro").html("Long Break!");
                        isLessonTime = false;
                        lessonMinutes = 20;
                        breakMinutes = 5;
                        longBreakMinutes = 25;
                        seconds = 0; 
                        pomodoroTime("Start");
                    } else {
                        $(".pomodoro").html("Break!");
                        isLessonTime = false;
                        lessonMinutes = 20;
                        breakMinutes = 5;
                        longBreakMinutes = 25;
                        seconds = 0; 
                        pomodoroTime("Start"); 
                    }
                } else {
                    $(".pomodoro").html("Work Time!");
                    isLessonTime = true;
                    lessonMinutes = 20;
                    breakMinutes = 5;
                    longBreakMinutes = 25;
                    seconds = 0; 
                    pomodoroTime("Start"); 
                }
                return; 
            }

            if (isLessonTime) {
                lessonMinutes = currentMinutes;
            } else if (lessonsCompleted % totalLessonsBeforeLongBreak === 0 && lessonsCompleted !== 0) {
                longBreakMinutes = currentMinutes;
            } else {
                breakMinutes = currentMinutes;
            }
            seconds = currentSeconds; 

            $(".pomodoro").html(formatTime(currentMinutes * 60 + seconds)); 
        }, 1000); 
    } else if (buttonHTML === "Stop") {
        clearInterval(intervalId);
    } else if (buttonHTML === "Restart") {
        clearInterval(intervalId);
        isLessonTime = true;
        lessonsCompleted = 0;
        lessonMinutes = 20;
        breakMinutes = 5;
        longBreakMinutes = 25;
        seconds = 0;
        checkParagraph.html("");
        $(".pomodoro").html(formatTime(lessonMinutes * 60 + seconds)); 
    }
}

function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = Math.floor(totalSeconds % 60);
    let displayMinutes = minutes < 10 ? "0" + minutes : minutes;
    let displaySeconds = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
    return displayMinutes + ":" + displaySeconds;
}


function updateCheckMarks() {
    checkParagraph.html(""); 

    const currentWindowWidth = window.innerWidth;
    let ticksPerRow;

    if (currentWindowWidth <= 650) {
        ticksPerRow = 3; 
        maxTicksToShow = 15;
    } else if (currentWindowWidth > 650 && currentWindowWidth < 1350) {
        ticksPerRow = 6; 
        maxTicksToShow = 18;
    } else { 
        ticksPerRow = 8; 
        maxTicksToShow = 24;
    }

    if (lessonsCompleted > 0 && lessonsCompleted <= maxTicksToShow) {
        for (let i = 0; i < lessonsCompleted; i++) {
            const tickSpan = $('<span>✔️</span>');
            checkParagraph.append(tickSpan);

            if ((i + 1) % ticksPerRow === 0 && (i + 1) < lessonsCompleted) {
                checkParagraph.append('<br>');
            }
        }
    } else if (lessonsCompleted > maxTicksToShow) {
        checkParagraph.html(`${lessonsCompleted} x ✔️`);
    }
}

const lannisterImageDir = "../family-images/Lannisters/";
const starkImageDir = "../family-images/Starks/";  
const targaryenImageDir = "../family-images/Targaryens/";


function applyImageVisibility(selectedFamilyName, numberOfImagesToShowParam) {
    const allImages = document.querySelectorAll(".btn"); 

    let imageDirectory;

    switch (selectedFamilyName) {
        case "Lannister":
            imageDirectory = lannisterImageDir;
            break;
        case "Stark":
            imageDirectory = starkImageDir;
            break;
        case "Targaryen":
            imageDirectory = targaryenImageDir;
            break;
        default:
            imageDirectory = lannisterImageDir;
            console.warn("Bilinmeyen aile seçildi, varsayılan resimler kullanılıyor.");
            break;
    }   
    

    let list = [1, 2, 3, 4, 5];
    allImages.forEach((img, index) => {

        if (index < numberOfImagesToShowParam) {
    
            const randomImageNumber = Math.floor(Math.random() * 2) + 1; 
            
            if (list.length > 0) { 
            const randomIndex = Math.floor(Math.random() * list.length);
            const folderIndex = list[randomIndex]; 

            const familyFolderPrefix = selectedFamilyName + "s"; 
            img.src = `${imageDirectory}${familyFolderPrefix}${folderIndex}/${randomImageNumber}.jpg`;

            list.splice(randomIndex, 1);
            img.style.display = 'block';
            
            }
            else {
                console.warn("Tüm klasör indeksleri kullanıldı, daha fazla resim gösterilemiyor.");
                img.src = "";
                img.style.display = 'none';
            }
        } 
        else {
            img.src = "";
            img.style.display = 'none';
        }
    });
}

let resizeTimeout;
let lastNumberOfImagesToShow = -1; 

function handleResize() {
    const currentWidth = window.innerWidth;
    let newNumberOfImagesToShow;

    if (currentWidth <= 650) {
        newNumberOfImagesToShow = 1;
    } else if (currentWidth > 650 && currentWidth < 1350) {
        newNumberOfImagesToShow = 3;
    } else {
        newNumberOfImagesToShow = 5;
    }

    if (newNumberOfImagesToShow !== lastNumberOfImagesToShow) { 
        applyImageVisibility(currentSelectedFamilyName, newNumberOfImagesToShow); 
        lastNumberOfImagesToShow = newNumberOfImagesToShow;
    }

    updateCheckMarks();
}

window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout); 
    resizeTimeout = setTimeout(function() {
        handleResize(); 
    }, 200); 
});

const starkBackgroundColor ="rgb(145, 140, 121)";
const starkBorderButtonColor ="#54614b";
const starkLinearGradientMid = "rgb(235, 230, 210)";

const lannisterBackgroundColor ="rgb(153, 31, 18)";
const lannisterBorderButtonColor ="#c7b28a";
const lannisterLinearGradientMid = "rgb(250, 131, 108)";

const targaryenBackgroundColor = "rgb(15, 14, 14)";
const targaryenBorderButtonColor = "#2a2828";
const targaryenLinearGradientMid = "rgb(106, 101, 101)";

let currentSelectedFamilyName = "Lannister";

document.addEventListener('DOMContentLoaded', function() {

    const urlParams = new URLSearchParams(window.location.search);
    const selectedFamily = urlParams.get('family'); 

    const savedLanguage = localStorage.getItem('appLanguage') || "English";
    translatePomodoroPage(savedLanguage, selectedFamily);

    if (selectedFamily) {
        const familyNameElement = $(".family-name");

        if (familyNameElement.length > 0) {
            const formattedFamilyName = selectedFamily.charAt(0).toUpperCase() + selectedFamily.slice(1);
            currentSelectedFamilyName = formattedFamilyName;
            console.log(currentSelectedFamilyName);
            switch (formattedFamilyName) {
                case "Lannister":
                    document.querySelectorAll(".btn")
                    familyNameElement.text(`${formattedFamilyName} 🦁 Family`);
                    styleFamily(lannisterBackgroundColor, lannisterBorderButtonColor, lannisterLinearGradientMid);
                    break;
                case "Stark":
                    familyNameElement.text(`${formattedFamilyName} 🐺 Family`); 
                    styleFamily(starkBackgroundColor, starkBorderButtonColor, starkLinearGradientMid);
                    break;
                case "Targaryen":
                    familyNameElement.text(`${formattedFamilyName} 🐉 Family`); 
                    styleFamily(targaryenBackgroundColor, targaryenBorderButtonColor, targaryenLinearGradientMid);
                    break;
            }
        }
    } 
    else {
        console.log("Hiçbir aile seçilmedi veya geçersiz parametre.");
    }

    handleResize();
});

$(document).ready(function() {
    setupCustomSeekBar();
    pomodoroTime("InitialLoad"); 
    loadMusic(currentMusicIndex); 
    
    if (currentMusic.readyState >= 2) { 
        totalTimeDisplay.text(formatTime(currentMusic.duration));
        updateProgressBar();
    }
});

function styleFamily (backgroundColor, borderColor, linearGradientMid) {

    $(".family-name").css("text-shadow", "5px 0 "+ borderColor);
    $(".settings").css("background-color", borderColor);
    $(".ssr-button").css("text-shadow", "2.3px 0 "+ backgroundColor);
    $(".ssr-button").css("background-color", borderColor);
    $(".pomodoro").css("text-shadow", "5px 0 "+ borderColor);
    $(".email").css("text-shadow", "1.8px 0 "+ borderColor);
    $(".copy-right").css("text-shadow", "1.8px 0 "+ borderColor);
    $(".check").css("border", "6px solid " + borderColor);
    $(".btn").css("border", "10px solid " + borderColor);
    $(".music-box").css("background-color", linearGradientMid);
    $(".music-box").css("border", "6px solid " + borderColor);
    $(".play-button img").css("background-color", backgroundColor);
    $(".play-button img").css("background-color", backgroundColor);
    $(".left-button img").css("background-color", backgroundColor);
    $(".right-button img").css("background-color", backgroundColor);
    $(".msc-btn").css("background-color", backgroundColor);
    $(".gradient-background").css("background", "linear-gradient(300deg, " + backgroundColor + ", " + linearGradientMid + ", " + backgroundColor + ")");
    $("body").css("background-color", backgroundColor);
    $(".progress-bar").css("background-color", backgroundColor);
    $(".time-display").css("color", borderColor);
    
    if (windowWidth >= 1350) {
        $(".container").css("background-color", backgroundColor);
        $(".check").css("background-color", linearGradientMid);
    }
    else if (windowWidth < 1350 && windowWidth > 650) {
        $(".container").css("background-color", backgroundColor);
        $(".check").css("background-color", linearGradientMid);
    }
    else {
        $(".ssr-button").css("text-shadow", "1.8px 0 "+ backgroundColor);
        $(".pomodoro").css("text-shadow", "4.5px 0 "+ borderColor);
        $(".family-name").css("text-shadow", "5px 0 "+ borderColor);
        $(".container").css("background-color", backgroundColor);
        $(".check").css("background-color", linearGradientMid);
    };
}
