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
     if (block && !block.contains(e.target)) {
        document.getElementById('avatar-list').style.display = 'none';
    }
});

function saveName(event){
    event.preventDefault();
    const name = document.getElementById('characterName').value;
    localStorage.setItem('playerName', name);
    window.location.href = "./html/character.html";
}
document.addEventListener('DOMContentLoaded', function() {
const playerName = localStorage.getItem('playerName') || '';
const playerNameEl = document.getElementById('player-name');
if (playerNameEl) {
    playerNameEl.textContent = 'Your Name: ' + playerName;
}

const editButton = document.querySelector(".edit-button");
const editForm = document.getElementById('edit-name-form');
const nameSection  = document.querySelector('.setting-content');
const saveButton = document.getElementById('save-name-btn');
const cancelButton = document.getElementById('cancel-edit-btn');
const input = document.getElementById('new-player-name')

if (editButton) { editButton.addEventListener('click', function(){
nameSection.style.display = "none";
editForm.style.display = "block";
input.value = playerName;
input.focus();
})
};
if (saveButton) {saveButton.addEventListener('click', function() {
    const newName = input.value.trim();
    if (newName) {
        localStorage.setItem('playerName', newName);
        playerName = newName;
        if (playerNameEl) {
            playerNameEl.textContent = 'Your Name: ' + newName;
        }
        editForm.style.display = "none";
        nameSection.style.display = "block";
    }
})
};
 if (cancelButton){ cancelButton.addEventListener('click', function() {
            editForm.style.display = "none";
            nameSection.style.display = "block";
        });
    }
})

const linkFollow = document.querySelector('.gotohome-button');
if(linkFollow) {
linkFollow.addEventListener('click', function(event){
    event.preventDefault();
    window.location.href = "./home.html";
});
}

const fightButton = document.querySelector('.fightbutton');
if (fightButton) {
    fightButton.addEventListener('click', function(event){
        event.preventDefault();
        window.location.href = "./fight.html";
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const savedAvatar = localStorage.getItem('selectedAvatar');
    const mainAvatar = document.getElementById('main-avatar');
    if (savedAvatar && mainAvatar) {
        mainAvatar.src = savedAvatar;
    }
});