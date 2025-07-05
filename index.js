const englishQuotesList = ["'When you play the game of thrones, you win or you die. There is no middle ground.' - Cersei Lannister",
"'The night is dark and full of terrors.' - Melisandre",
"'A Lannister always pays his debts.' - Various Lannisters",
"'Winter is coming.' - House Stark Motto",
"'I drink and I know things.' - Tyrion Lannister",
"'Chaos isn't a pit. Chaos is a ladder.' - Petyr Baelish",
"'Hold the door!' - Hodor",
"'The things I do for love.' - Jaime Lannister",
"'What do we say to the God of Death? Not today.' - Syrio Forel/Arya Stark",
"'Power resides where men believe it resides. It's a trick. A shadow on the wall.' - Varys",
"'Dracarys!' - Daenerys Targaryen",
"'Never forget what you are, for surely the world will not. Make it your strength. Then it can never be your weakness. Armor yourself in it, and it will never be used to hurt you.' - Tyrion Lannister",
"'The man who passes the sentence should swing the sword.' - Ned Stark",
"'There is only one war that matters. The Great War. And it is here.' - Jon Snow",
"'You know nothing, Jon Snow.' - Ygritte",
"'Leave one wolf alive and the sheep are never safe.' - Arya Stark",
"'Burn them all!' - Aerys II Targaryen (The Mad King)",
"'I am the dragon's daughter, and I swear to you, those who would harm you will die screaming.' - Daenerys Targaryen",
"'That's what I do. I drink, and I know things.' - Tyrion Lannister",
"'If you think this has a happy ending, you haven't been paying attention.' - Ramsay Bolton",]; 

const türkçeQuotesList = ["'Taht oyunları oynadığında ya kazanırsın ya da ölürsün. Ortası yoktur.' - Cersei Lannister",
"'Gece karanlık ve dehşetlerle dolu.' - Melisandre",
"'Bir Lannister her zaman borcunu öder.' - Çeşitli Lannister'lar",
"'Kış geliyor.' - Stark Hanesi Sloganı",
"'İçerim ve bilirim.' - Tyrion Lannister",
"'Kaos bir çukur değildir. Kaos bir merdivendir.' - Petyr Baelish",
"'Kapıyı tut!' - Hodor",
"'Aşk için yaptığım şeyler.' - Jaime Lannister",
"'Ölüm Tanrısı'na ne deriz? Bugün değil.' - Syrio Forel/Arya Stark",
"'Güç, insanların inandığı yerdedir. Bu bir hile. Duvardaki bir gölge.' - Varys",
"'Dracarys!' - Daenerys Targaryen",
"'Ne olduğunu asla unutma, çünkü dünya bunu asla unutmayacaktır. Bunu gücün haline getir. O zaman asla zayıflığın olamaz. Ona bürün ve asla sana zarar vermek için kullanılamaz.' - Tyrion Lannister",
"'Hükmü veren adam kılıcı savurmalıdır.' - Ned Stark",
"'Tek bir savaş önemlidir. Büyük Savaş. Ve o burada.' - Jon Snow",
"'Hiçbir şey bilmiyorsun, Jon Snow.' - Ygritte",
"'Tek bir kurt canlı kalırsa koyunlar asla güvende olmaz.' - Arya Stark",
"'Hepsini yakın!' - Aerys II Targaryen (Deli Kral)",
"'Ben ejderhanın kızıyım ve yemin ederim ki, sana zarar verecek olanlar çığlık çığlığa ölecek.' - Daenerys Targaryen",
"'İşte ben buyum. İçerim ve bilirim.' - Tyrion Lannister",
"'Bunun mutlu bir sonu olduğunu düşünüyorsan, dikkat etmiyorsun demektir.' - Ramsay Bolton",];

let currentLanguage = "English";

document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('appLanguage');
    console.log("saved language is: "+ savedLanguage);
    if (savedLanguage) {
        currentLanguage = savedLanguage;
    } else {
        const browserLanguage = navigator.language || navigator.userLanguage;
        if (browserLanguage.startsWith('tr')) {
            currentLanguage = "Türkçe";
        }
    }
    translate(currentLanguage); 
});

function randomQuoteMaker(language) {
    let selectedIndex = Math.floor(Math.random()*20);
    if (language === "English") {
        $(".quote").html(englishQuotesList[selectedIndex]); 
    }
    else if (language === "Türkçe") {
        $(".quote").html(türkçeQuotesList[selectedIndex]);
    }
    else {
        console.log("Given language quote list does not exist!")
    }
}

$("button").on("click", function() {

    let path = $(this).find('img').attr('src'); 
    let buttonText = $(this).text().trim();
    console.log(path);
    if (path) {
        switch(path) {
            case "images/lang.png":
                buttonAnimation(this);
                langButton();
                break;
            case "images/lannister.png":
                buttonAnimation(this);
                startIndex("lannister");
                break;
            case "images/stark.png":
                buttonAnimation(this);
                startIndex("stark");
                break;
            case "images/targaryen.png":
                buttonAnimation(this);
                startIndex("targaryen");
                break;
        }
    }
    else {
        switch(buttonText) {
            case "English":
                buttonAnimation(this);
                translate("English");
                break;
            case "Türkçe":
                buttonAnimation(this);
                translate("Türkçe");
                break;
        }
    }
});

function buttonAnimation(buttonElement) { 
    $(buttonElement).addClass("pressed");
    setTimeout(function() {
        $(buttonElement).removeClass("pressed");
    }, 200);
}

function startIndex(indicatorFlag) {

    setTimeout(function() {
        window.location.href = "public/index2.html?family=" + indicatorFlag;
    }, 300);
}

function langButton () {
    let languageVisibility = $("#language-options").css("visibility");

    if (window.innerWidth < 650) {
        if (languageVisibility === "hidden") {
            $("#language-options").css("visibility", "visible");
            $(".top").css("justify-content", "center");
            $("#language-options").css("order", "1");
        }
        else {
            $("#language-options").css("visibility", "hidden");
            $(".top").css("justify-content", "end");
            $("#language-options").css("order", "0");
        }
    }
    else {
        if (languageVisibility === "hidden") {
            $("#language-options").css("visibility", "visible");
            $("#language-options").css("order", "1");
        }
        else {
            $("#language-options").css("visibility", "hidden");
            $("#language-options").css("order", "0");
        }
    } 
}

function translate(language) {
    currentLanguage = language; 
    localStorage.setItem('appLanguage', language); 

    if (language === "English") {

        $("#language p").text("Language");

        $("h1").text("Pomodoro GOT"); 
        $("h2").html("Select a family to continue");
        
        randomQuoteMaker("English");

        $(".copy-right .footer-type").text("© 2025 Enes Öztürk");
        $(".email").text("Email: enesozturk032@gmail.com");

    } 

    else if (language === "Türkçe") {
        $("#language p").text("Dil");

        $("h1").text("Pomodoro GOT"); 
        randomQuoteMaker("Türkçe");
        $("h2").html("Devam etmek için Aile seçiniz");

        $(".family-name").te

        $(".copy-right .footer-type").text("© 2025 Enes Öztürk"); 
        $(".email").text("E-posta: enesozturk032@gmail.com");
    } 
    else {
        console.log("Given Language does not exist!");
    }
}