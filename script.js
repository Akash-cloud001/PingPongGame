// Determining the height and width of the ground
const ground = document.getElementById('groundid');
const ball = document.getElementById('ballid');
const counter = document.getElementById('counter');
const fplayer = document.getElementById('f_player');
const splayer = document.getElementById('s_player');

// position of the rods 
fplayer.style.left = fplayer.offsetLeft+"px";
fplayer.style.top = fplayer.offsetTop+"px";


splayer.style.left = splayer.offsetLeft+"px";
splayer.style.top = splayer.offsetTop+"px";



// Height and width of the ground 
var groundHeight = ground.offsetHeight;
var groundWidth = ground.offsetWidth;

// Dynamic resize of the div will fetch new height and width of the ground
window.onresize = function(e){
   groundHeight = ground.offsetHeight;
   groundWidth = ground.offsetWidth;
  //  console.log(groundHeight , groundWidth);
};


//SET VALUE FOR ROD MOVEMENT
function setValue(value){
  return value + 'px';
}
//kEYBOARD EVENT
function controller(keycode)
{
  var f_left = parseInt(fplayer.style.left);
  var s_left = parseInt(splayer.style.left);
  //A
  if(keycode === 97 || keycode === 65){
    if(f_left > 5){
      fplayer.style.left = setValue(f_left - 20);
    }
  }
  //D
  else if(keycode === 100 || keycode === 68){
    if(f_left<(groundWidth - 130)-5){
      fplayer.style.left = setValue(f_left + 20);
    }
  }
  //J
  if(keycode === 52 ){
    if(s_left > 5){
      splayer.style.left = setValue(s_left - 20);
    }
  }
  else if(keycode === 54 ){
      if(s_left<(groundWidth - 130)-5){
        splayer.style.left = setValue(s_left + 20);
      }
    }
}

  let ballXspeed = 2;
  let ballYspeed = 2;
  let gameOn = false ;
  let movement,
      fplayer_x,
      splayer_x;
    //move the rods with keyboard events [A & D][4 & 6]
    this.addEventListener('keypress' , (event)=>{
      if(event.code === "Enter"){
        if(!gameOn){
          gameOn = true;
          let ballRect = ball.getBoundingClientRect();
          let ballx = ballRect.x;
          let bally = ballRect.y;
          let balldia = ballRect.width;

          let fplayer_height = fplayer.getBoundingClientRect().height ;
          let fplayer_width = fplayer.getBoundingClientRect().width ;
          let splayer_height = splayer.getBoundingClientRect().height ;
          let splayer_width = splayer.getBoundingClientRect().width ;

          movement = setInterval(() => {
            ballx += ballXspeed;
            bally += ballYspeed;

            ball.style.left = ballx + 'px';
            ball.style.top = bally + 'px';

            fplayer_x = fplayer.getBoundingClientRect().x;
            splayer_x = splayer.getBoundingClientRect().x;

            if((ballx + balldia) > groundWidth || ballx < 0){
              ballXspeed = -ballXspeed;
            }
            
            let ballpos = ballx + balldia / 2 ;

            //check for f_player
            if(bally <= fplayer_height + 5){
              ballYspeed = -ballYspeed ;
             
              if(ballpos < fplayer_x || (ballpos > (fplayer_x + fplayer_width + 20))){
                alert("SPIDY WON");
                location.reload();
              }
            }
            else if((bally + balldia) >= groundHeight + 5){
              ballYspeed = -ballYspeed;
              
              if(ballpos < splayer_x || (ballpos > (splayer_x + splayer_width + 20))){
                alert("IRON-MAN WON");
                location.reload();
              }
            }
          }, 10);
        }
      }
      controller(event.keyCode);
    },1000);







