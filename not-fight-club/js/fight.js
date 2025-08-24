   const enemies = [
  {
    img: "../assets/enemy1.png",
    alt: "Enemy 1",
    name: "Enemy 1",
    health: 100,
    damage: 10,
    criticalChance: 0.4,
    criticalMultiplier: 2,
    attackZonesCount: 2,
    defenseZonesCount: 1,
    zones: ["head", "neck", "body", "belly", "legs"]
  },
  {
    img: "../assets/enemy2.png",
    name: "Enemy 2",
    alt: "Enemy 2",
    health: 100,
    damage: 15,
    criticalChance: 0.3,
    criticalMultiplier: 1.75,
    attackZonesCount: 1,
    defenseZonesCount: 2,
    zones: ["head", "neck", "body", "belly", "legs"]
  },
  {
    img: "../assets/enemy3.png",
    name: "Enemy 3",
    alt: "Enemy 3",
    health: 100,
    damage: 20,
    criticalChance: 0.2,
    criticalMultiplier: 1.5,
    attackZonesCount: 1,
    defenseZonesCount: 1,
    zones: ["head", "neck", "body", "belly", "legs"]
  }
];

function getRandomEnemy() {
  return enemies[Math.floor(Math.random() * enemies.length)];
}

function getRandomZones(zonesArray, count) {
  let temp = zonesArray.slice();
  let result = [];
  while (result.length < count && temp.length > 0) {
    const index = Math.floor(Math.random() * temp.length);
    result.push(temp[index]);
    temp.splice(index, 1);
  }
  return result;
}

function isCritical(chance) {
  return Math.random() < chance;
}


let enemy;


const attackRadiobtn = document.querySelectorAll('input[name="attack"]');
const defenceChekboxbtn = document.querySelectorAll('input[name="defence"]');
const attackbutton = document.getElementById("attack-btn");

function checkSelections() {
  let attackSelected = false;
  for (let i = 0; i < attackRadiobtn.length; i++) {
    if (attackRadiobtn[i].checked) {
      attackSelected = true;
      break;
    }
  }
  let defenceSelected = 0;
  for (let i = 0; i < defenceChekboxbtn.length; i++) {
    if (defenceChekboxbtn[i].checked) {
      defenceSelected++;
    }
  }
  attackbutton.disabled = !(attackSelected && defenceSelected === 2);
}
attackRadiobtn.forEach(radio => radio.addEventListener('change', checkSelections));
defenceChekboxbtn.forEach(checkbox => checkbox.addEventListener('change', checkSelections));

function updateHealthBars() {
  const playerHealthPercent = Math.max(0, (player.health / 100) * 100);
  const enemyHealthPercent = Math.max(0, (enemy.health / 100) * 100);

  const playerBar = document.querySelector('.player-place .progress-bar-value');
  const playerText = document.querySelector('.player-place .health-progress');
  if (playerBar && playerText) {
    playerBar.style.width = playerHealthPercent + '%';
    playerText.textContent = `${Math.round(player.health)}/100`;
  }

  const enemyBar = document.querySelector('.enemy-place .progress-bar-value');
  const enemyText = document.querySelector('.enemy-place .health-progress');
  if (enemyBar && enemyText) {
    enemyBar.style.width = enemyHealthPercent + '%';
    enemyText.textContent = `${Math.round(enemy.health)}/100`;
  }
}

function battleTurn(player, enemy, playerAttackZone, playerDefenseZones) {
  if (player.health <= 0 || enemy.health <= 0) {
    setTimeout(function() {
      alert("Бой окончен.");
    }, 100);
    attackbutton.disabled = true;
  }


  const log = [];
  const enemyAttackZones = getRandomZones(enemy.zones, enemy.attackZonesCount);
  const enemyDefenseZones = getRandomZones(enemy.zones, enemy.defenseZonesCount);

  let playerCrit = isCritical(player.criticalChance);
  let playerDamage = player.damage;
  if (playerCrit) playerDamage *= player.criticalMultiplier;

  let damageToEnemy = 0;
  if (!enemyDefenseZones.includes(playerAttackZone)) {
    damageToEnemy = playerDamage;
  } else if (playerCrit) {
    damageToEnemy = playerDamage;
  }

  enemy.health -= damageToEnemy;
  log.push(`<span class="attacker">${player.name}</span> атаковал <span class="defender">${enemy.name}</span> в ${playerAttackZone} и нанёс <span class="damage">${damageToEnemy.toFixed(0)}</span> урона.`);

 
  enemyAttackZones.forEach(zone => {
    let enemyCrit = isCritical(enemy.criticalChance);
    let enemyDamage = enemy.damage;
    if (enemyCrit) enemyDamage *= enemy.criticalMultiplier;

    let damageToPlayer = 0;
    if (!playerDefenseZones.includes(zone)) {
      damageToPlayer = enemyDamage;
    } else if (enemyCrit) {
      damageToPlayer = enemyDamage;
    }

    player.health -= damageToPlayer;
    log.push(`<span class="attacker">${enemy.name}</span> атаковал <span class="defender">${player.name}</span> в ${zone} и нанёс <span class="damage">${damageToPlayer.toFixed(0)}</span> урона.`);
  });

 
  log.push(`Здоровье: <span class="attacker">${player.name}</span> — ${player.health.toFixed(0)}, <span class="defender">${enemy.name}</span> — ${enemy.health.toFixed(0)}.`);

    if (player.health <= 0 && enemy.health <= 0) {
  log.push("Оба противника повержены! Ничья.");
} else if (player.health <= 0) {
  log.push(`<span class="defender">${player.name}</span> проиграл.`);
  playerLosses++;
  updateBattleStats();
} else if (enemy.health <= 0) {
  log.push(`<span class="defender">${enemy.name}</span> проиграл.`);
  playerWins++;
  updateBattleStats();
}


  const battleLog = document.getElementById('battle-log');
  if (battleLog) {
    
    log.forEach(entry => {
      battleLog.innerHTML += `<div>${entry}</div>`;
    });
    battleLog.scrollTop = battleLog.scrollHeight;
  }

  updateHealthBars();

  attackbutton.disabled = true;
}

document.addEventListener('DOMContentLoaded', () => {
  enemy = getRandomEnemy();


  const EnemyAvatar = document.getElementById('enemy-avatar');
  const healthProgress = document.querySelector('.enemy-place .health-progress');
  if (EnemyAvatar && healthProgress) {
    EnemyAvatar.src = enemy.img;
    EnemyAvatar.alt = enemy.alt;
    healthProgress.textContent = `${enemy.health}/100`;
  }

  updateHealthBars();

  document.getElementById('battle-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let playerAttackZone = "";
    attackRadiobtn.forEach(radio => {
      if (radio.checked) playerAttackZone = radio.value;
    });

    let playerDefenseZones = [];
    defenceChekboxbtn.forEach(checkbox => {
      if (checkbox.checked) playerDefenseZones.push(checkbox.value);
    });

    battleTurn(player, enemy, playerAttackZone, playerDefenseZones);
  });
});