// 랜덤번호 지정
// 유저가 번호를 입력한다. 그리고 go라는 버튼을 누름
// 만약에 유저가 랜덤번호를 맞추면 "맞췄습니다"
// 랜덤번호 < 유저번호 : Down
// 랜덤번호 > 유저번호 : Up
// 리셋버튼을 누르면 게임이 리셋된다.
// 5번의 기회를 다 쓰면 게임이 끝난다. 더이상 추측 불가, 버튼이 disabled
// 유저가 1~100 범위 밖의 숫자를 입력하면 알려 준다. 기회를 깍지 않는다.
// 유저가 이미 입력한 숫자를 또 입력하면 알려 준다. 기회를 깍지 않는다.

let computerNum = 0;
let playButton = document.getElementById("play-button");
let resetButton = document.getElementById("reset-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let chancesArea = document.getElementById("chances-area");
let chances = 5;
let gameOver = false;
let history = [];

playButton.addEventListener("click",play);
resetButton.addEventListener("click",reset);
userInput.addEventListener("focus",function(){userInput.value=null}); // 익명의 함수 //

function pickRandomNum() {
    computerNum = Math.floor(Math.random()*100)+1
    console.log("정답: ", computerNum)
};

function play(){
    userValue = userInput.value;

    if (history.includes(userValue)){
        resultArea.textContent = "동일한 숫자를 다시 입력했습니다. 다시 입력해 주세요";
        return;
    }

    if (userValue < 1 || userValue > 100){
        resultArea.textContent = "1~100 사이의 숫자를 입력하세요";
        return;
    }
    chances--;
    chancesArea.textContent = `남은 기회: ${chances}번`;
    
    if (userValue == computerNum) {
        resultArea.textContent = "That's right!"
        playButton.disabled = true;
    } else if (userValue < computerNum) {
        resultArea.textContent = "Up!!!"
    } else {
        resultArea.textContent = "Down!!!"
    }

    history.push(userValue)
    console.log(history)

    if (chances < 1){
        gameOver = true;
    }
    if (gameOver == true){
        playButton.disabled = true;
    }
};
pickRandomNum();

function reset(){
    userInput.value = null;
    pickRandomNum();
    resultArea.textContent = "결과가 나온다.";
    playButton.disabled = false;
}

