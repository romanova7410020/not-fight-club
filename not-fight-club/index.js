function showAvatarChooser(){
    let list = document.getElementById('avatar-list');
list.style.display = (list.style.display ==='none' || list.style.display ==="") ? 'flex': 'none';
    
}

function setAvatar(src){
    document.getElementById('main-avatar').src = src;
    document.getElementById('avatar-list').style.display = 'none';
    localStorage.setItem('selectedAvatar', src)
}

document.addEventListener('click' , function(e){
    let block = document.querySelector('.avatar-section');
    if(!block.contains(e.target)){
       document.getElementById('avatar-list').style.display = 'none';
    }
});

function saveName(event){
    event.preventDefault();
    const name = document.getElementById('characterName').value;
    localStorage.setItem('playerName', name);
    window.location.href = "./html/character.html";
}

const playerName = localStorage.getItem('playerName') || '';
document.getElementById('player-name').textContent = 'Your Name: ' + playerName;

const linkFollow = document.querySelector('.gotohome-button')
linkFollow.addEventListener('click', function(event){
    event.preventDefault();
    window.location.href = "./home.html";
});

const linkFollowFight = document.querySelector('.fight-button')
linkFollowFight.addEventListener('click', function(event){
    event.preventDefault();
    window.location.href = "./fight.html";
});