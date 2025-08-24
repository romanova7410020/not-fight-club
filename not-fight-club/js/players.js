const storedName = localStorage.getItem('playerName') || 'player'; 

const player= 
  { name: storedName,
    id: 'main-avatar',
    health: 100,
    damage: 18,
    criticalChance: 0.3,
    criticalMultiplier: 2,
    attackZonesCount: 2,
    defenseZonesCount: 1,
    zones: ["head", "neck", "body", "belly", "legs"]
  }

