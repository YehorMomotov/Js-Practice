const end = document.querySelector('.end'),
        reloadButton = document.getElementById('reload-button'),
        closeButton = document.getElementById('close-button'),
        score = document.getElementById('score'),
        finalText = document.querySelector('.final-text');
        
const mainSection = document.querySelector('.main-section'),
        errors = document.querySelector('.errors');

const description = document.querySelector('.description'),
        descriptionImg = document.querySelector('.description-img');
        
const theWord = document.querySelector('.the-word'),
        alreadyUsed = document.querySelector('.already-used');

const attempts = document.getElementById('attempts'),
        charInput = document.getElementById('char-input'),
        strInput = document.getElementById('str-input'),
        confirmButton = document.getElementById('confirm-button');

let alreadyUsedChars = '';

let currentWord = 0;
const usedWords = [];
let scored = 0;

words = [
    {
        word: "Вьючные",
        description: `Тип рабочего животного, используемого людьми в качестве средства транспортировки материалов закрепляя их таким образом, чтобы их вес приходился на спину животного.`,
        imgs:  ['https://www.syl.ru/misc/i/ai/378693/2444688.jpg',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Pack_Horse_2.jpg/290px-Pack_Horse_2.jpg',
                'https://www.syl.ru/misc/i/ai/378693/2444699.jpg'],
    },
    {
        word: 'Rifle',
        description: `A gun, especially one fired from shoulder level, having a long spirally grooved barrel intended to make a bullet spin and thereby have greater accuracy over a long distance.`,
        imgs:  ['https://www.collinsdictionary.com/images/full/rifle_224386324.jpg',
                'https://upload.wikimedia.org/wikipedia/commons/8/8f/M1_Garand_Rifle.jpg',
                'https://cdn.britannica.com/70/123170-050-D7AAF458/AK-47.jpg'],
    },
    {
        word: 'Спорт',
        description: `Организованная по определённым правилам деятельность людей, состоящая в сопоставлении их физических и/или интеллектуальных способностей.`,
        imgs:  ['https://growfood.pro/blog/wp-content/uploads/2017/10/sport2610-1.jpg',
                'https://24betting.ru/bitrix/templates/24hnew/img/IMG-SPORT.jpg',
                'https://images11.cosmopolitan.ru/upload/img_cache/c87/c873dd02b41919d4983a15ec6351ae93_ce_735x490x5x0_cropped_666x444.jpg'],
    },
    {
        word: 'JavaScript',
        description: `Мультипарадигменный язык программирования. Поддерживает объектно-ориентированный, императивный и функциональный стили. Является реализацией спецификации ECMAScript (стандарт ECMA-262). Он обычно используется как встраиваемый язык для программного доступа к объектам приложений. Наиболее широкое применение находит в браузерах как язык сценариев для придания интерактивности веб-страницам.`,
    },
    {
        word: 'Медицина',
        // description: `Система научных знаний и практической деятельности, целями которой являются укрепление и сохранение здоровья, продление жизни, предупреждение и лечение болезней человека и животных, а также облегчения страданий от физических и психических недугов.`,
        imgs:  ['https://www.evromed.org.ua/wp-content/uploads/2017/03/Medetsina-v-polshe.jpg',
                'https://moxa.pro/upload/iblock/f4a/zdravoohranenie-s-moxa_cover.jpg',
                'https://cdnimg.rg.ru/img/content/209/94/37/445453_d_850.jpeg'],
    },
];

const printDescription = () =>{
    if(words[currentWord].hasOwnProperty('description')){
        description.textContent = words[currentWord].description;
    }
}

const printImgs = () =>{
    let imgToPrint;
    if(words[currentWord].hasOwnProperty('imgs')){
        for(let i = 0; i < words[currentWord].imgs.length; i++)
        {
            imgToPrint = document.createElement('img');
            imgToPrint.setAttribute('src', words[currentWord].imgs[i]);
            descriptionImg.appendChild(imgToPrint);
        }
    }
}

const hideTheWord = () => {
    let result = '';
    for(let i = 0; i < words[currentWord].word.length; i++)
    {
        result += '*';
    }
    theWord.textContent = result;
}

const printTheWord = () =>{
    let formOfTheWord = theWord.textContent;
    for (let i = 0; i < alreadyUsedChars.length; i++) 
    {
        for (let j = 0; j < words[currentWord].word.length; j++) 
        {
            if(words[currentWord].word[j].toLowerCase() === alreadyUsedChars[i].toLowerCase())
            {
                formOfTheWord = formOfTheWord.substring(0, j) + words[currentWord].word[j] + formOfTheWord.substring(j + 1);
            }
        }
    }
    theWord.textContent = formOfTheWord;
}

const postInput = (event) =>{
    event.preventDefault();
    alreadyUsedChars += charInput.value;
    charInput.focus();
    printTheWord();
    if(charInput.value !== '' || strInput.value !== ''){
        printAlreadyUsed();
    }
    printAttempts();
    checkUserDecisions();
    if(strInput.value !== ''){
        strInput.disabled = true;
    }
    strInput.value = '';
    charInput.value = '';
}

const checkTheInput = (event) =>{
    let regexp = /[A-Z]/gi;
    let inputChar = event.target.value;

    words[currentWord].word[0] == words[currentWord].word[0].match(/[A-Z]/gi) ? regexp = /[A-Z]/gi : regexp = /[А-Я]/gi;
    strInput.value = '';

    if(inputChar != inputChar.match(regexp) && inputChar !== ''){
        event.target.value = '';
            errors.textContent = 'Вводить можно только буквы, соответствующие раскладке вопроса!';
            errors.classList.remove('display-none');
            charInput.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
            setTimeout(() => {
                errors.classList.add('display-none')
                charInput.style.backgroundColor = '';
            }, 2000);
    } else { 
        for(let i = 0; i < alreadyUsedChars.length; i++)
        {
            if(inputChar.toLowerCase() == alreadyUsedChars[i].toLowerCase())
            {
                event.target.value = '';
                errors.textContent = 'Вы уже вводили эту букву!';
                errors.classList.remove('display-none');
                errors.style.left = '-64px';
                charInput.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
                setTimeout(() => {
                    charInput.style.backgroundColor = '';
                    errors.classList.add('display-none')
                    errors.style.left = '0px';
                }, 2000);
            }
        }
    }
}

const checkTheSTRInput = (event) =>{
    let regexp = /[A-Z]/gi;
    let inputStr = event.target.value;
    charInput.value = '';

    words[currentWord].word[0] == words[currentWord].word[0].match(/[A-Z]/gi) ? regexp = /[A-Z]/gi : regexp = /[А-Я]/gi;
    for(let i = 0; i < inputStr.length; i++){
        if(inputStr[i] != inputStr[i].match(regexp) && inputStr !== ''){
            event.target.value = inputStr.substring(0, i) + inputStr.substring(i + 1);
            errors.textContent = 'Вводить можно только буквы, соответствующие раскладке вопроса!';
            errors.classList.remove('display-none');
            setTimeout(() => errors.classList.add('display-none'), 2000);
        }
    }
}

const printAttempts = () =>{
    attempts.textContent = Math.ceil(words[currentWord].word.length + words[currentWord].word.length/2 - alreadyUsedChars.length);
}

const printAlreadyUsed = () =>{
    let formAlreadyUsed = '';
    if(strInput.value == ''){
        for(let i = 0; i < alreadyUsedChars.length; i++)
        {
            formAlreadyUsed = alreadyUsedChars[i].toUpperCase() + alreadyUsedChars[i].toLowerCase() + ', ';
        }
    }else {
        formAlreadyUsed = strInput.value + ', ';
    }
        alreadyUsed.textContent += formAlreadyUsed;
}

const printScore = () => {
    score.textContent = scored;
}

const checkUserDecisions = () =>{
    if(theWord.textContent.toLowerCase() == words[currentWord].word.toLowerCase() || strInput.value.toLowerCase() == words[currentWord].word.toLowerCase()){
        defineScore();
        gameOver(true);
    }
    if(attempts.textContent == 0){
        defineScore();
        gameOver(false);
    }
}

const defineScore = () =>{
    let currentScore = 0;
    if(theWord.textContent.toLowerCase() == words[currentWord].word.toLowerCase()){
        currentScore = Math.ceil(words[currentWord].word.length + words[currentWord].word.length/2 - alreadyUsedChars.length);
        scored += currentScore;
        console.log(currentScore, scored)

        finalText.innerHTML += `<ul>Слово ${words[currentWord].word}\n
        <li>Вы отгадали это слово по буквам!\n</li>
        <li>Очки, полученные за отгадывание: ${currentScore}</li>
        </ul>`
    }
    else if(strInput.value.toLowerCase() == words[currentWord].word.toLowerCase()){
        currentScore = 2 * (words[currentWord].word.length - theWord.textContent.replace(/[*]/g, '').length);
        scored += currentScore;

        finalText.innerHTML += `<ul>Слово ${words[currentWord].word}\n
        <li>Вы отгадали слово введя его полностью!\n</li>
        <li>${theWord.textContent} - ${words[currentWord].word}\n</li>
        <li>Очки, полученные за отгадывание: ${currentScore}</li>
        </ul>`
    }else {
        finalText.innerHTML += `<ul>Слово ${words[currentWord].word}\n
        <li>Вы не отгадали это слово.\n</li>
        <li>${theWord.textContent} - ${words[currentWord].word}\n</li>
        </ul>`
    }
}

const gameOver = (boolean) =>{
    if(usedWords.length == words.length){
        printScore();
        mainSection.classList.add('blur');
        mainSection.classList.add('disabled');
        end.classList.remove('display-none');
    }else{
        if(boolean){
            currentWord++;
            resetAll();
            reload();
        }else{
            currentWord++;
            resetAll();
            reload();
        }
    }
}
confirmButton.addEventListener('click', postInput);

charInput.addEventListener('input', checkTheInput);

strInput.addEventListener('input', checkTheSTRInput);

reloadButton.addEventListener('click', () =>{
    window.location.reload();
})

closeButton.addEventListener('click', () =>{
    window.close();
})

const resetAll = () => {
    strInput.disabled = false;
    description.textContent = '';
    descriptionImg.innerHTML = '';
    alreadyUsed.textContent = '';
    strInput.value = '';
    charInput.value = '';
    alreadyUsedChars = '';
}

const reload = () => {
    randomizeWord();
    printDescription();
    printImgs();
    hideTheWord();
    printTheWord();
    printAttempts();
}

const randomizeWord = () =>{
    let index = Math.floor(Math.random() * words.length);
    let hitDuplicate = false;
    usedWords.forEach(item => {
                if(item == index){
                    hitDuplicate = true;
                }
            });
     if(hitDuplicate){
            randomizeWord();  
            }else {
                currentWord = index;
                usedWords.push(currentWord);
            }
}

window.addEventListener('load',() =>{
        reload();
});
