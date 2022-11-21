
// 플레이어가 입장할 때 동작하는 함수
App.onJoinPlayer.Add(function (player) {
	player.tag = {
		elev: null,
	};
});
let _timer = 30;
let _stateTimer = 0;
let _openvote = false;
let _elevopen=false;

App.onUpdate.Add(function(dt){
	_stateTimer += dt;
	
	if(_stateTimer >= 1){
		_stateTimer = 0;
		_timer -= 1;
	}

	
	if(_timer <= 0){
		_openvote = true
	}
})

App.addOnLocationTouched("elev", function(player){
    if (!_openvote) {
		player.tag.elev = player.showWidget("eleone.html", "top", 300, 600);
        openele(player);
		_elevopen=true;
		player.sendUpdated();
    } 
    else{
		player.tag.elev = player.showWidget("eletwo.html", "top", 300, 600);
        openele(player)
		_elevopen=true;
		player.sendUpdated();
    };
});

App.addOnLocationTouched("outelev", function(player){
	if(_elevopen==true){
	player.tag.elev.destroy();
	_elevopen=false;
	player.sendUpdated();
	}
});

function openele(player){
	player.tag.elev.onMessage.Add(function (player, data) {
		if (data.type == "2층으로 이동하였습니다.") {
			player.showCenterLabel("2층으로 이동하였습니다.");
					player.spawnAtMap("6NbKLJ", "8joPR1"); 
		}
		else if (data.type == "1층으로 이동하였습니다.") {
			player.showCenterLabel("1층으로 이동하였습니다.");
			player.spawnAtMap("6NbKLJ", "yoKgAB"); 

		}
		else if (data.type == "투표실로 이동하였습니다.") {
			player.showCenterLabel("투표실로 이동하였습니다.");
			player.spawnAtMap("6NbKLJ", "8AwAgY"); 
			
		}
		else if (data.type == "아직 개방되지 않았습니다.") {
			player.showCenterLabel("아직 개방되지 않았습니다.");
				
		}
	});
	player.sendUpdated();
}
