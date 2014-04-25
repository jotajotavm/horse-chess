var CellSelected_x;
var CellSelected_y;
var Moves;
var Options;

var secs;
var mins;
var cronometer;

var board = new Array(8);


	 
function ResetTime(){
    clearInterval(cronometer);
}

function StarTime(){
    secs =0;
    mins =0;
    s = document.getElementById("seconds");
    m = document.getElementById("minutes");

    cronometer = setInterval(
        function(){
            if(secs==60){
                secs=0;
                mins++;
                if (mins<10) m.innerHTML ="0"+mins;
                else m.innerHTML = mins;

                if(mins==60) mins=0;
            }
            if (secs<10) s.innerHTML ="0"+secs;
            else s.innerHTML = secs;

            secs++;
        }
        ,1000);
}


function Check_SuccessfulEnd(){

	SuccessfulEnd = true;
	if (Moves > 0) SuccessfulEnd = false;
	/*
	for (i=0; i<8 && SuccessfulEnd; i++){
		for (j=0; j<8 && SuccessfulEnd; j++){
			//if (board[x][y] == 0) SuccessfulEnd=false; //habria que depurar para que nada mas empezar no salga esto
			cell = document.getElementById("c"+x+y);
			if (cell.style.background != "none repeat scroll 0% 0% green" || 
				cell.style.background != "none repeat scroll 0% 0% orange" ) 
				SuccessfulEnd=false;

		}
	}
	*/
	if (SuccessfulEnd){
		ShowGameOver("You win!!", "Return to Game", false);
		autoplay();
	} 
}

function Check_GameOver(x, y){

	Options = 0;

	Check_Move(x, y, 1, 2);		//check move right - top long
	Check_Move(x, y, 2, 1);		//check move right long - top
	Check_Move(x, y, 1, -2);	//check move right - bottom long
	Check_Move(x, y, 2, -1);	//check move right long - bottom
	Check_Move(x, y, -1, 2);	//check move left - top long
	Check_Move(x, y, -2, 1);	//check move left long - top
	Check_Move(x, y, -1, -2);	//check move left - bottom long
	Check_Move(x, y, -2, -1);	//check move left long - bottom

	cont_moves = document.getElementById("options").innerHTML = Options;

	if (!Options){
		ShowGameOver("Game Over", "Try Again!", true);
		autoplay();
	}

}

function PaintCell(x, y){
	cell = document.getElementById("c"+CellSelected_x+CellSelected_y);
	cell.style.background = "none repeat scroll 0% 0% orange";
	
}

function SelectCell(x, y){

	Moves--;
	cont_moves = document.getElementById("moves").innerHTML = Moves;
	
	PaintCell(x, y);

	cell = document.getElementById("c"+x+y);
	cell.style.background = "none repeat scroll 0% 0% green";
	cell = document.getElementById("c"+x+y).innerHTML = 
		"<img id='" + x + y + "' src='horse.gif'></img>"
	
	board[x][y]=1;
	CellSelected_x=x;
	CellSelected_y=y;


	Check_SuccessfulEnd();
	Check_GameOver(x, y);

}

function CheckCell(x, y){
	dif_x = x - CellSelected_x;
	dif_y = y - CellSelected_y;
	CheckTrue = false;

	if (dif_x == 1 && dif_y == 2)   CheckTrue = true; // right - top long
	if (dif_x == 1 && dif_y == -2)  CheckTrue = true; // right - bottom long
	if (dif_x == 2 && dif_y == 1)   CheckTrue = true; // right long - top
	if (dif_x == 2 && dif_y == -1)  CheckTrue = true; // rightlong - bottom
	if (dif_x == -1 && dif_y == 2)  CheckTrue = true; // left - top long
	if (dif_x == -1 && dif_y == -2) CheckTrue = true; // left - bottom long
	if (dif_x == -2 && dif_y == 1)  CheckTrue = true; // left long - top
	if (dif_x == -2 && dif_y == -1) CheckTrue = true; // left long - bottom


	if (board[x][y]==1) CheckTrue=false;

	if (CheckTrue) SelectCell(x, y);
}


function autoplay(){
	
	message = document.getElementById("message");
	message.style.display = "none";

	for (i=0; i<10; i++) board[i]= new Array(8);

	ClearBoard();
	ResetTime();
	StarTime();
	Moves=4; //64
	
	

	x=Math.round(Math.random()*7);
	y=Math.round(Math.random()*7);
	
	CellSelected_x=x;
	CellSelected_y=y;

	SelectCell(x, y);
}


autoplay();

function hide_message(){
	message = document.getElementById("message");
	message.style.display = "none";
	autoplay();
}

function ClearBoard(){
	for (i=0; i<8; i++){
		for (j=0; j<8; j++){
			board[i][j]=0;

			cell = document.getElementById("c"+i+j);
			cell.style.background = "";  
			cell = document.getElementById("c"+i+j).innerHTML = "";
		}
	}

}

function ShowGameOver(string_notification, string_button, game_over){
	ResetTime();
		score_min = mins;
		score_sec = secs;
		string_score="";
		if (score_min<10) string_score="0";
		string_score=string_score + score_min + ":";
		if (score_sec<10) string_score=string_score +"0";
		string_score=string_score + score_sec;

		//string_tweet="<a id='tweet_game_over' href='https://twitter.com/share' class='twitter-share-button' data-via='JoseCodFacilito' data-size='large' data-count='none' data-text='No soy capaz de hacer este juego!! ' target='_blank'>Tweet</a>"

		//function ShowGameOver(){
			GameOver = document.getElementById("message");
			GameOver.style.display = "block";
			Message_GameOver=document.getElementById("notification");
			Message_GameOver=document.getElementById("notification").innerHTML=string_notification;
			Message_GameOver=document.getElementById("final_score");
			Message_GameOver=document.getElementById("final_score").innerHTML="Time " + string_score;
			Message_GameOver=document.getElementById("button");
			Message_GameOver=document.getElementById("button").innerHTML= string_button;
			
			if (game_over == true){
				Tweet_Game=document.getElementById("tweet_game_ok");
				Tweet_Game.style.display = "none";
			}
			else{
				Tweet_Game=document.getElementById("tweet_game_over");
				Tweet_Game.style.display = "none";
			}
		WhiteRestart();
}

function Check_Move(x, y, mov_x, mov_y){
		option_x = x+mov_x;
		option_y = y+mov_y;

		if (option_x < 8 && option_y < 8 && 
			option_x >= 0 && option_y >= 0){

		if (board[option_x][option_y] == 0) Options++;

	}
}