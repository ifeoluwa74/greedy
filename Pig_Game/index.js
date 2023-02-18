let playersScore=[0,0];
let activePlayer=1;
let currScores=[0,0];
let globalScores=[0,0];
let gameOver=false;

const newGame=document.querySelector('#New_Game')
const player1=document.querySelector('#player1');
const player2=document.querySelector('#player2');
const currScore1El=document.querySelector('#curr1_Score');
const currScore2El=document.querySelector('#curr2_Score');
const diesContainer=document.querySelector('.dicesImage');
const rollBtn=document.querySelector('.roll_btn');
const holdBtn=document.querySelector('.Hold_btn');
const activePlayer1El=document.querySelector('.active1_player');
var randomScore;
var rollBefore=false;
window.onload=function(){
document.querySelector('#curr1_Score').textContent=0;
document.querySelector('#curr2_Score').textContent=0;
document.querySelector('#Player1_GlobalScore').textContent=0;
document.querySelector('#Player2_GlobalScore').textContent=0;
    EventHandler();
}

function main(){

}

function ActivePlayer(){
    activePlayer === 1 ? activePlayer=2: activePlayer=1;   
    return  activePlayer;
}

function changeActivePlayer(r,g){
    switch(true){
        case activePlayer === 1 && r === 1:
            activePlayer=ActivePlayer();
            currScores[(activePlayer-1)]=0;
            activePlayer1El.removeAttribute('id','active_player')
            document.querySelector('.active'+activePlayer+'_player').setAttribute('id','active_player');
            break;
        case  activePlayer === 2 && r === 1:
        activePlayer=ActivePlayer();
        currScores[(activePlayer-1)]=0;
        document.querySelector('.active2_player').removeAttribute('id','active_player')
        document.querySelector('.active'+activePlayer+'_player').setAttribute('id','active_player');
        break;
    }
    if(g){
        if(g  ===  1){
            activePlayer=ActivePlayer();
            activePlayer1El.removeAttribute('id','active_player')
            document.querySelector('.active2_player').setAttribute('id','active_player');
        }
        if(g  ===  2){
                activePlayer=ActivePlayer();
                document.querySelector('.active2_player').removeAttribute('id','active_player')
                document.querySelector('.active1_player').setAttribute('id','active_player');
        }
    }
    return activePlayer;
}


function  EventHandler(){
    var currScr,active,currScor,addedGlobal,Winner,rolled=false;
        rollBtn.addEventListener('click',()=>{
            if(!gameOver){
                rolled=true;
                randomScore=Math.floor(Math.random()*6+1);
                displayDice(randomScore);
                currScor=currScore(randomScore,undefined)
            }
        })
        holdBtn.addEventListener('click',()=>{
            if(!gameOver){
                active=currScor.activePlayer;
                currScr=currScor.curr;
                if(active === 1){
                    addedGlobal=1;
                }else if(active === 2){
                    addedGlobal=2;
                }
                if(rolled){
                    if(active === 1 && parseInt(currScore1El.textContent) !== 0){
                        globalScores[(active-1)]+=currScr;
                        document.querySelector('#Player'+(globalScores.indexOf(globalScores[active-1])+1)+'_GlobalScore').textContent=globalScores[(active-1)];
                        currScore(undefined,addedGlobal)
                    }
                    if(active === 2 && parseInt(currScore2El.textContent) !== 0){
                        globalScores[(active-1)]+=currScr;
                        document.querySelector('#Player'+(globalScores.indexOf(globalScores[active-1])+1)+'_GlobalScore').textContent=globalScores[(active-1)];
                        currScore(undefined,addedGlobal)
                    }
                }else{
                    alert('roll the dice to start the game!')
                }
                if(globalScores[0] >= 100){
                    Winner=document.querySelector('#Player1_text').textContent='Winner!';
                    gameOver=true;
                }else if(globalScores[1] >= 100){
                  Winner=document.querySelector('#Player2_text').textContent='Winner!';
                  gameOver=true;
                }
            }
        })

}


function displayDice(r){
    let Image=`<div class="dies"><img src="../Pig_Game/img/dies${r}.png"/></div>`;
    if(rollBefore){
        document.querySelector('.dies').remove()
    }
    diesContainer.insertAdjacentHTML('beforeend',Image);
    rollBefore=true;
}

function currScore(r,g){
                var activePly=changeActivePlayer(r);
                if(r){
                    if(r === 1){
                        currScores[(activePly-1)]=0; 
                        if(activePly ===  2){
                            document.querySelector('#curr1_Score').textContent=currScores[(activePly-1)];
                        }else if(activePly ===  1){
                            document.querySelector('#curr2_Score').textContent=currScores[(activePly-1)];
                        }
                    }else{
                        currScores[(activePly-1)]+=r;
                        document.querySelector('#curr'+(currScores.indexOf(currScores[activePly-1])+1)+'_Score').textContent=currScores[(activePly-1)];
                    }
                }
                if(g){
                    if(g === 2 && parseInt(currScore2El.textContent) !== 0){
                        activePly=changeActivePlayer(undefined,g);
                        currScores[1]=0;
                        document.querySelector('#curr2_Score').textContent=currScores[1];
                    }else if(g === 1  && parseInt(currScore1El.textContent) !== 0){
                        activePly=changeActivePlayer(undefined,g);
                        currScores[0]=0;
                        document.querySelector('#curr1_Score').textContent=currScores[0];
                    }
                }
            return {curr:currScores[(activePly-1)],activePlayer:activePly};
}


