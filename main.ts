function spawnBoss () {
    bossActive = true
    bossLives = 3
    boss = sprites.create(img`
        . . . . . . c c c c c c . . . . . . 
        . . . . c c 7 7 7 7 7 7 c c . . . . 
        . . . c c 7 7 7 7 7 7 7 7 c c . . . 
        . . c c 7 7 7 7 7 7 7 7 7 7 c c . . 
        . c c 7 7 7 c c c c c c 7 7 7 c c . 
        c c 7 7 7 c c 7 7 7 7 c c 7 7 7 c c 
        c 7 7 7 c c 7 7 7 7 7 7 c c 7 7 7 c 
        c 7 7 c c 7 7 7 7 7 7 7 7 c c 7 7 c 
        c 7 7 c 7 7 7 7 7 7 7 7 7 7 c 7 7 c 
        c 7 7 7 c c 7 7 7 7 7 7 c c 7 7 7 c 
        c c 7 7 7 c c 7 7 7 7 c c 7 7 7 c c 
        . c c 7 7 7 c c c c c c 7 7 7 c c . 
        . . c c 7 7 7 7 7 7 7 7 7 7 c c . . 
        . . . c c 7 7 7 7 7 7 7 7 c c . . . 
        . . . . c c 7 7 7 7 7 7 c c . . . . 
        . . . . . . c c c c c c . . . . . . 
        `, SpriteKind.Enemy)
    boss.setPosition(80, 30)
    boss.setVelocity(50, 0)
    info.setLife(bossLives)
}
function createRapidFireTimer () {
    if (rapidFireTimer) {
        rapidFireTimer.destroy()
    }
    rapidFireTimer = sprites.create(img`
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        `, SpriteKind.Food)
    rapidFireTimer.setPosition(80, 10)
    rapidFireTimer.setFlag(SpriteFlag.RelativeToCamera, true)
}
function victory () {
    gameRunning = false
    effects.starField.endScreenEffect()
    music.powerUp.play()
    game.splash("COSMIC DEFENDER!", "You saved the galaxy!")
    game.over(true, effects.confetti)
}
function bossFire () {
    if (boss && bossActive) {
        bossProjectile1 = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Enemy)
        bossProjectile2 = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Enemy)
        bossProjectile1.setPosition(boss.x - 10, boss.y + 8)
        bossProjectile1.setVelocity(0, 80)
        bossProjectile2.setPosition(boss.x + 10, boss.y + 8)
        bossProjectile2.setVelocity(0, 80)
        music.pewPew.play()
    }
}
function cleanupSprites () {
    for (let i = projectiles.length - 1; i >= 0; i--) {
        if (projectiles[i].y < -10) {
            projectiles[i].destroy()
            projectiles.removeAt(i)
        }
    }
for (let j = enemies.length - 1; j >= 0; j--) {
        if (enemies[j].y > 130) {
            enemies[j].destroy()
            enemies.removeAt(j)
        }
    }
}
function updateRapidFireTimer () {
    if (rapidFireActive && rapidFireTimer) {
        timeLeft = rapidFireEndTime - game.runtime()
        if (timeLeft <= 0) {
            rapidFireActive = false
            rapidFireTimer.destroy()
            rapidFireTimer = null
        } else {
            secondsLeft = Math.ceil(timeLeft / 1000)
            barWidth = Math.max(1, Math.floor(timeLeft / 20000 * 16))
            if (barWidth <= 4) {
                rapidFireTimer.setImage(img`
                    4 4 4 4 . . . . . . . . . . . . 
                    4 4 4 4 . . . . . . . . . . . . 
                    4 4 4 4 . . . . . . . . . . . . 
                    4 4 4 4 . . . . . . . . . . . . 
                    `)
            } else if (barWidth <= 8) {
                rapidFireTimer.setImage(img`
                    5 5 5 5 5 5 5 5 . . . . . . . . 
                    5 5 5 5 5 5 5 5 . . . . . . . . 
                    5 5 5 5 5 5 5 5 . . . . . . . . 
                    5 5 5 5 5 5 5 5 . . . . . . . . 
                    `)
            } else if (barWidth <= 12) {
                rapidFireTimer.setImage(img`
                    7 7 7 7 7 7 7 7 7 7 7 7 . . . . 
                    7 7 7 7 7 7 7 7 7 7 7 7 . . . . 
                    7 7 7 7 7 7 7 7 7 7 7 7 . . . . 
                    7 7 7 7 7 7 7 7 7 7 7 7 . . . . 
                    `)
            } else {
                rapidFireTimer.setImage(img`
                    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
                    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
                    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
                    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
                    `)
            }
        }
    }
}
function levelUp () {
    level += 1
    levelStartTime = game.runtime()
    if (level > 3) {
        victory()
        return
    }
    if (level == 3) {
        spawnBoss()
        game.splash("BOSS BATTLE!")
    } else {
        enemySpawnRate = Math.max(1000, enemySpawnRate - 300)
        asteroidSpawnRate = Math.max(800, asteroidSpawnRate - 200)
        game.splash("LEVEL " + level + "!")
    }
    music.powerUp.play()
}
function spawnAsteroid () {
    let asteroids: Sprite[] = []
    asteroid = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . c c b b b c c . . . . 
        . . . . c b d d d d b c . . . . 
        . . . c c d d d d d d c c . . . 
        . . . c b d d d d d d b c . . . 
        . c c c b d d d d d d b c c c . 
        . c d d c d d d d d d c d d c . 
        . c d d d c c d d c c d d d c . 
        . c d d d d d c c d d d d d c . 
        . c c d d d d d d d d d d c c . 
        . . c c d d d d d d d d c c . . 
        . . . c c d d d d d d c c . . . 
        . . . . c c d d d d c c . . . . 
        . . . . . c c c c c c . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    asteroid.setPosition(randint(10, 150), 0)
    asteroid.setVelocity(randint(-50, 50), randint(30, 70))
    asteroid.setFlag(SpriteFlag.AutoDestroy, true)
    asteroids.push(asteroid)
}
function initGame () {
    scene.setBackgroundColor(1)
    effects.starField.startScreenEffect()
    player2 = sprites.create(img`
        . . . . . . . c c . . . . . . . . 
        . . . . . . c b 5 c . . . . . . . 
        . . . . c c c 5 5 5 c c c . . . . 
        . . c c b c 5 5 5 5 5 c b c c . . 
        . c b 5 5 b 5 5 5 5 5 b 5 5 b c . 
        c 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 c 
        b 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 b 
        b c 5 5 5 5 5 5 5 5 5 5 5 5 5 c b 
        c b b c 5 5 5 5 5 5 5 5 5 c b b c 
        . c b b c c 5 5 5 5 5 c c b b c . 
        . . c c b c c c c c c c b c c . . 
        . . . c c b b b b b b b c c . . . 
        . . . . . c c b b b c c . . . . . 
        . . . . . . . c c c . . . . . . . 
        `, SpriteKind.Player)
    player2.setPosition(80, 100)
    player2.setStayInScreen(true)
    controller.moveSprite(player2, playerSpeed, playerSpeed)
    info.setScore(score)
    info.setLife(lives)
    game.splash("LEVEL 1 - START!")
    levelStartTime = game.runtime()
    startSpawning()
    setupControls()
}
function gameOver () {
    gameRunning = false
    effects.starField.endScreenEffect()
    game.splash("GAME OVER", "Score: " + score)
    game.over(false, effects.melt)
}
function updateBoss () {
    if (bossActive && boss) {
        if (boss.x >= 140) {
            boss.setVelocity(-50, 0)
        } else if (boss.x <= 20) {
            boss.setVelocity(50, 0)
        }
        if (game.runtime() - bossLastFired > 1500) {
            bossFire()
            bossLastFired = game.runtime()
        }
    }
}
function startSpawning () {
    game.onUpdateInterval(enemySpawnRate, function () {
        if (gameRunning && !bossActive) {
            spawnEnemy()
        }
    })
game.onUpdateInterval(asteroidSpawnRate, function () {
        if (gameRunning && !bossActive) {
            spawnAsteroid()
        }
    })
game.onUpdateInterval(powerUpSpawnRate, function () {
        if (gameRunning) {
            spawnPowerUp()
        }
    })
game.onUpdateInterval(1000, function () {
        cleanupSprites()
        updateRapidFireTimer()
        updateBoss()
    })
game.onUpdateInterval(1000, function () {
        if (gameRunning) {
            let timeInLevel = game.runtime() - levelStartTime
            if (timeInLevel >= 20000 && level < 3) {
                levelUp()
            }
        }
    })
}
function fireTripleShot () {
    projectile1 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 5 5 . . . . . . . 
        . . . . . . . 5 5 . . . . . . . 
        . . . . . . . 5 5 . . . . . . . 
        . . . . . . . 5 5 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Projectile)
    projectile2 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 5 5 . . . . . . . 
        . . . . . . . 5 5 . . . . . . . 
        . . . . . . . 5 5 . . . . . . . 
        . . . . . . . 5 5 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Projectile)
    projectile3 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 5 5 . . . . . . . 
        . . . . . . . 5 5 . . . . . . . 
        . . . . . . . 5 5 . . . . . . . 
        . . . . . . . 5 5 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Projectile)
    projectile1.setPosition(player2.x - 8, player2.y - 8)
    projectile1.setVelocity(-20, -150)
    projectiles.push(projectile1)
    projectile2.setPosition(player2.x, player2.y - 8)
    projectile2.setVelocity(0, -150)
    projectiles.push(projectile2)
    projectile3.setPosition(player2.x + 8, player2.y - 8)
    projectile3.setVelocity(20, -150)
    projectiles.push(projectile3)
    music.pewPew.play()
}
function spawnPowerUp () {
    powerUp = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . 4 4 . . . . . . . 
        . . . . . . 4 5 5 4 . . . . . . 
        . . . . . . 2 5 5 2 . . . . . . 
        . . . . . 2 2 5 5 2 2 . . . . . 
        . . . . . 2 5 5 5 5 2 . . . . . 
        . . . . 2 2 5 5 5 5 2 2 . . . . 
        . . . . 2 5 5 5 5 5 5 2 . . . . 
        . . . . 2 5 5 5 5 5 5 2 . . . . 
        . . . . 2 2 5 5 5 5 2 2 . . . . 
        . . . . . 2 5 5 5 5 2 . . . . . 
        . . . . . 2 2 5 5 2 2 . . . . . 
        . . . . . . 2 5 5 2 . . . . . . 
        . . . . . . 4 5 5 4 . . . . . . 
        . . . . . . . 4 4 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Food)
    powerUp.setPosition(randint(10, 150), 0)
    powerUp.setVelocity(0, 50)
    powerUp.setFlag(SpriteFlag.AutoDestroy, true)
    powerUps.push(powerUp)
}
function fireProjectile () {
    projectile = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 5 5 . . . . . . . 
        . . . . . . . 5 5 . . . . . . . 
        . . . . . . . 5 5 . . . . . . . 
        . . . . . . . 5 5 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Projectile)
    projectile.setPosition(player2.x, player2.y - 8)
    projectile.setVelocity(0, -150)
    projectiles.push(projectile)
    music.pewPew.play()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    powerUps.removeElement(otherSprite)
powerType = randint(1, 3)
    if (powerType == 1) {
        lives += 1
        info.setLife(lives)
        game.splash("EXTRA LIFE!")
    } else if (powerType == 2) {
        rapidFireActive = true
        rapidFireEndTime = game.runtime() + 20000
        createRapidFireTimer()
        game.splash("RAPID FIRE!")
    } else {
        playerSpeed += 20
        controller.moveSprite(player2, playerSpeed, playerSpeed)
        game.splash("SPEED BOOST!")
    }
    score += 50
    info.setScore(score)
    music.powerUp.play()
})
function spawnEnemy () {
    enemy = sprites.create(img`
        . . . . c c c c c c . . . . . . 
        . . . c 6 7 7 7 7 6 c . . . . . 
        . . c 7 7 7 7 7 7 7 7 c . . . . 
        . c 6 7 7 7 7 7 7 7 7 6 c . . . 
        . c 7 c 6 6 6 6 6 6 c 7 c . . . 
        . f 7 c c 6 6 6 6 c c 7 f . . . 
        . f 7 6 f 6 6 6 6 f 6 7 f . . . 
        . . f 7 7 7 7 6 6 7 7 7 f . . . 
        . . . f c c c c c c c f . . . . 
        . . . . f f f f f f f . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    enemy.setPosition(randint(10, 150), 0)
    enemy.setVelocity(randint(-30, 30), randint(40, 80))
    enemies.push(enemy)
}
function setupControls () {
    controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
        if (gameRunning && game.runtime() - lastFired > fireRate) {
            if (rapidFireActive && game.runtime() < rapidFireEndTime) {
                fireTripleShot()
            } else {
                fireProjectile()
                rapidFireActive = false
            }
            lastFired = game.runtime()
        }
    })
controller.A.onEvent(ControllerButtonEvent.Repeated, function () {
        if (gameRunning && game.runtime() - lastFired > fireRate) {
            if (rapidFireActive && game.runtime() < rapidFireEndTime) {
                fireTripleShot()
            } else {
                fireProjectile()
                rapidFireActive = false
            }
            lastFired = game.runtime()
        }
    })
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    projectiles.removeElement(sprite)
if (otherSprite == boss && bossActive) {
        bossLives += 0 - 1
        if (bossLives <= 0) {
            otherSprite.destroy()
            bossActive = false
            boss = null
score += 500
            victory()
        } else {
            score += 100
            scene.cameraShake(6, 150)
            otherSprite.startEffect(effects.fire, 500)
        }
    } else {
        otherSprite.destroy()
        enemies.removeElement(otherSprite)
score += 10
        scene.cameraShake(4, 100)
    }
    info.setScore(score)
    music.smallCrash.play()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (otherSprite != boss) {
        otherSprite.destroy()
        enemies.removeElement(otherSprite)
    }
    lives += 0 - 1
    info.setLife(lives)
    scene.cameraShake(8, 200)
    music.bigCrash.play()
    if (lives <= 0) {
        gameOver()
    } else {
        sprite.startEffect(effects.fire, 1000)
    }
})
let enemy: Sprite = null
let powerType = 0
let projectile: Sprite = null
let powerUp: Sprite = null
let projectile3: Sprite = null
let projectile2: Sprite = null
let projectile1: Sprite = null
let bossLastFired = 0
let score = 0
let player2: Sprite = null
let asteroid: Sprite = null
let barWidth = 0
let secondsLeft = 0
let timeLeft = 0
let bossProjectile2: Sprite = null
let bossProjectile1: Sprite = null
let bossLives = 0
let asteroidSpawnRate = 0
let enemySpawnRate = 0
let playerSpeed = 0
let gameRunning = false
let level = 0
let lives = 0
let bossActive = false
let boss: Sprite = null
let rapidFireTimer: Sprite = null
let rapidFireEndTime = 0
let rapidFireActive = false
let lastFired = 0
let levelStartTime = 0
let powerUps: Sprite[] = []
let enemies: Sprite[] = []
let projectiles: Sprite[] = []
lives = 3
level = 1
gameRunning = true
let fireRate = 500
playerSpeed = 80
enemySpawnRate = 2000
asteroidSpawnRate = 1500
let powerUpSpawnRate = 8000
bossLives = 3
initGame()
forever(function () {
    if (score >= 2000 && gameRunning && level <= 3) {
        victory()
    }
})
