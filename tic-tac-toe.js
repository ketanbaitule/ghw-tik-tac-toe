var board = new Board();
var boardWrapper = document.getElementById('board');
var currentPlayer = document.getElementById('currentPlayer');
currentPlayer.innerText = board.whosChance;

for (let row=0; row < 3; row++) {
	for (let col=0; col < 3; col++) {
		let newOption = document.createElement("div");
		newOption.dataset.row = row;
		newOption.dataset.col = col;
		newOption.classList.add("tile");
		boardWrapper.appendChild(newOption);
		newOption.addEventListener("click", (el)=>{
			let data = board.play(el.target.dataset.row,el.target.dataset.col);
			if(data.status && data.position){
				el.target.innerText = data.position;
				newOption.classList.add(data.position == "X" ? 'player1Selection' : 'player2Selection');
			}
			if(data.status != true){
				if(data.status == 200){
					document.getElementById('status').innerText = "Winner:";
				}else if(data.status == 204){
					document.getElementById('result').innerHTML = "<i> Its Tie </i>"
				}
				Toastify({text: data.msg, className: data.status == false ? "toast_error" : "toast_win"}).showToast();
			}
			currentPlayer.innerText = board.whosChance;
		});
	}
}
