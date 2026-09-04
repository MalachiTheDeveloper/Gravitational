const mainCanvas = document.getElementById("main-canvas");
const gameCanvas = document.getElementById("game-canvas");
const c = mainCanvas.getContext('2d');
const ctx = gameCanvas.getContext('2d');
mainCanvas.width = 480;
mainCanvas.height = 270;
gameCanvas.width = 1200;
gameCanvas.height = 1200;

let gameCanvasWidth = mainCanvas.getBoundingClientRect().width / 3 + "px";

gameCanvas.style.width = gameCanvasWidth;
gameCanvas.style.height = gameCanvasWidth;

c.imageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

let key = {
    left: false,
    up: false,
    right: false,
    down: false,
    w: false,
    a: false,
    s: false,
    d: false,
    r: false
}

let mouse = {
    x: 0,
    y: 0,
    leftClick: false
}

let gameOver = false;

let images = {
    player: new Image(),
    crate: new Image(),
    spike: new Image(),
    bubble: new Image(),
    goal: new Image(),
    gravityCharge: new Image(),
    background: new Image(),
    floor: new Image(),
    resetCharge: new Image(),
    door: {
        closed: new Image(),
    },
    robot: {
        idle: new Image(),
    },
    blocks: [],
    key: new Image(),
    lock: new Image(),
    phaseBlock: {
        closed: new Image(),
        open: new Image()
    },
    bomb: new Image(),
    breakable: new Image(),
    shield: new Image(),
    horizontalTunnel: new Image(),
    verticalTunnel: new Image(),
    title: new Image(),
    logo: new Image()
}
for(let i = 0; i < 256; i++){
    images.blocks.push(new Image());
    images.blocks[i].src = "Images/blocks/" + i + ".png";
}

images.title.src = "Images/title.png";
images.logo.src = "Images/logo.png";
images.player.src = "Images/player.png";
images.bomb.src = "Images/bomb.png";
images.breakable.src = "Images/breakable.png";
images.phaseBlock.open.src = "Images/phaseBlock/open.png";
images.phaseBlock.closed.src = "Images/phaseBlock/closed.png";
images.crate.src = "Images/crate.png";
images.spike.src = "Images/spike.png";
images.bubble.src = "Images/bubble.png";
images.goal.src = "Images/goal.png";
images.key.src = "Images/key.png";
images.lock.src = "Images/lock.png";
images.gravityCharge.src = "Images/gravityCharge.png";
images.background.src = "Images/background.png";
images.floor.src = "Images/floor.png";
images.resetCharge.src = "Images/resetCharge.png";
images.door.closed.src = "Images/door/closed.png";
images.robot.idle.src = "Images/robot/idle.png";
images.shield.src = "Images/shield.png";
images.horizontalTunnel.src = "Images/horizontalTunnel.png";
images.verticalTunnel.src = "Images/verticalTunnel.png";

let doorFrame = "closed";
let robotFrame = "idle";

let gravity = [0, 0];
let gravityCharges = 0;
let resetCountdown = 60;
let canChangeGravity = true;

let currentLevel = 1;
let levels = {
    1: {
        levelSize: 6,
        gravityCharges: 2,
        map:[
            "bbbbbb",
            "bP   b",
            "b bb b",
            "b bb b",   
            "b   @b",
            "bbbbbb",
        ]
    },
    2: {
        levelSize: 15,
        gravityCharges: 5,
        map:[
            "bbbbbbbbbbbbbbb",
            "b            @b",
            "b           bbb",
            "b  b          b",
            "b             b",
            "bb            b",
            "b     +       b",
            "b+            b",
            "b             b",
            "b+            b",
            "b    b        b",
            "b +       +  bb",
            "bb  b         b",
            "bP    b       b",
            "bbbbbbbbbbbbbbb",
        ]
    },
    3: {
        levelSize: 7,
        gravityCharges: 9,
        map:[
            "bbbbbbb",
            "b> c @b",
            "bbbcbbb",
            "bbbcbbb",
            "bbbcbbb",
            "bbbPbbb",
            "bbbbbbb",
        ]
    },
    4: {
        levelSize: 15,
        gravityCharges: 5,
        map:[
            "bbbbbbbbbbbbbbb",
            "bPc  +  +   S<b",
            "bb          s<b",
            "bbb          <b",
            "b>           <b",
            "b> S  +      <b",
            "b> s       s <b",
            "b>        S  <b",
            "b>  s      s <b",
            "b>S + + + +  <b",
            "b>         + <b",
            "b> S      ++S<b",
            "b> ^@^   s   <b",
            "bb^bbb^^^^^^^bb",
            "bbbbbbbbbbbbbbb",
        ]
    },
    5: {
        levelSize: 30,
        gravityCharges: 28,
        map:[
            "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
            "b                            b",
            "b                            b",
            "bb                           b",
            "bb                           b",
            "bb                           b",
            "bb                           b",
            "bb                           b",
            "bb                           b",
            "bb                           b",
            "bb                           b",
            "bb                           b",
            "bb                           b",
            "bb  bbbbbbb b                b",
            "bb  bPccccccb                b",
            "bb  bcccccccb    @           b",
            "bb  bbbbbbbbb                b",
            "bb                           b",
            "bb                           b",
            "bb                           b",
            "bb                           b",
            "bb                           b",
            "bb                           b",
            "bb                           b",
            "bb                           b",
            "bb                           b",
            "bb                           b",
            "bb                           b",
            "bb                           b",
            "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
        ]
    },
    6: {
        levelSize: 16,
        gravityCharges: 31,
        map:[
            "bbbbbbbbbbbbbbbb",
            "bbbbbbbbbbbbbbbb",
            "bbvvvvbbvvvvvvbb",
            "bb s   +  +   bb",
            "bb  b        ^^b",
            "b>s+    b   <bbb",
            "b>   S     <bbbb",
            "bbbb       <bbbb",
            "bvvv+       <bbb",
            "b        +  sS@b",
            "b   s       bbbb",
            "b>s    +      +b",
            "b   +     bbcb b",
            "b^         bcb b",
            "bb>  s^^^^^bPb^b",
            "bbbbbbbbbbbbbbbb",
        ]
    },
    7: {
        levelSize: 9,
        gravityCharges: 14,
        map:[
            "bbbbbbbbb",
            "b@blSs cb",
            "bLbSs  cb",
            "b Ss   cb",
            "bbbb bbbb",
            "bbbb bbbb",
            "bbbb bbbb",
            "bP      b",
            "bbbbbbbbb",
        ]
    },
    8: {
        levelSize: 9,
        gravityCharges: 15,
        map:[
            "bbbbbbbbb",
            "b   +   b",
            "b+      b",
            "b  +   Lb",
            "b   @Ll+b",
            "blllLPL b",
            "bLLLlL+lb",
            "bccc   Lb",
            "bbbbbbbbb",
        ]
    },
    9: {
        levelSize: 8,
        gravityCharges: 5,
        map:[
            "bbbbbbbb",
            "b   b @b",
            "b^^   bb",
            "bbb    b",
            "b++   |b",
            "bbbb   b",
            "bP== + b",
            "bbbbbbbb",
        ]
    },
};

let blockSize = Math.round(1200 / levels[currentLevel].levelSize);

let blocks = [];
let players = [];
let crates = [];
let goals = [];
let bubbles = [];
let spikes = [];
let phaseBlocks = [];
let keys = [];
let locks = [];
let bombs = [];
let breakables = [];
let shields = [];
let tunnels = [];

class Player {
    constructor(x, y, width, height, id){
        this.x = x;
        this.y = y; 
        this.width = width;
        this.height = height; 
        this.touchingGround = true;
        this.isFirstMove = true;
        this.keyChecks = {
            left: true,
            right: true,
            up: true,
            down: true,
            w: true,
            a: true,
            s: true,
            d: true
        };
        this.goalCountdown = 60;
        this.playerID = id;
        this.shield = false;
    }
    draw(){
        ctx.drawImage(images.player, this.x, this.y, this.width, this.height)
        if(this.shield){
            ctx.fillStyle = "rgb(0,255,255)";
            ctx.globalAlpha = 0.15;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.globalAlpha = 1;
        }
    }
    update(){
        if(!this.touchingGround){
            canChangeGravity = false;
        }
        if((canChangeGravity || this.isFirstMove) && gravityCharges > 0){
            if(((key.left && this.keyChecks.left === true) || (key.a && this.keyChecks.a === true)) && (gravity[0] !== -1)){
                gravity = [-1, 0];
                this.isFirstMove = false;
                gravityCharges--;
                changePhaseBlocks();
            }
            if(((key.right && this.keyChecks.right === true) || (key.d && this.keyChecks.d === true)) && (gravity[0] !== 1)){
                gravity = [1, 0];
                this.isFirstMove = false;
                gravityCharges--;
                changePhaseBlocks();
            }
            if(((key.up && this.keyChecks.up === true) || (key.w && this.keyChecks.w === true)) && (gravity[1] !== -1)){
                gravity = [0, -1];
                this.isFirstMove = false;
                gravityCharges--;
                changePhaseBlocks();
            }
            if(((key.down && this.keyChecks.down === true) || (key.s && this.keyChecks.s === true))  && (gravity[1] !== 1)){
                gravity = [0, 1];
                this.isFirstMove = false;
                gravityCharges--;
                changePhaseBlocks();
            }
        }
        if(key.left){
            this.keyChecks.left = false;
        } else{
            this.keyChecks.left = true;
        }
        if(key.right){
            this.keyChecks.right = false;
        } else{
            this.keyChecks.right = true;
        }
        if(key.up){
            this.keyChecks.up = false;
        } else{
            this.keyChecks.up = true;
        }
        if(key.down){
            this.keyChecks.down = false;
        } else{
            this.keyChecks.down = true;
        }
        if(key.w){
            this.keyChecks.w = false;
        } else{
            this.keyChecks.w = true;
        }
        if(key.a){
            this.keyChecks.a = false;
        } else{
            this.keyChecks.a = true;
        }
        if(key.s){
            this.keyChecks.s = false;
        } else{
            this.keyChecks.s = true;
        }
        if(key.d){
            this.keyChecks.d = false;
        } else{
            this.keyChecks.d = true;
        }
        if(!checkTunnelCollisions(this)){
            this.x += gravity[0] * Math.round(blockSize / 3);
            this.y += gravity[1] * Math.round(blockSize / 3);
            this.touchingGround = false;
            if(checkSolidCollisions(this)){
                this.touchingGround = true;
                if(gravity[0] === 0){
                    if(gravity[1] === -1){
                        while(checkSolidCollisions(this)){
                            this.y++;
                        }
                    } else{
                        while(checkSolidCollisions(this)){
                            this.y--;
                        }
                    }
                } else{
                    if(gravity[0] === -1){
                        while(checkSolidCollisions(this)){
                            this.x++;
                        }
                    } else{
                        while(checkSolidCollisions(this)){
                            this.x--;
                        }
                    }
                }
            }
        }

        if(checkSpikeCollisions(this) || checkBombCollisions(this).exploded){
            if(!this.shield || checkSpikeCollisions(this)){
                players.splice(this.playerID, 1);
            }
            this.shield = false;
        }

        checkBubbleCollisions(this);
        checkKeyCollisions(this);
        checkShieldCollisions(this)
        
        if(checkGoalCollisions(this)){
            this.x = checkGoalCollisions(this).x;
            this.y = checkGoalCollisions(this).y;
            this.goalCountdown--;
            if(this.goalCountdown < 0){
                currentLevel++;
                if(currentLevel > Object.keys(levels).length){
                    gameOver = true;
                    currentLevel--;
                } else{
                    resetLevel();
                }
            }
        }
    }
}

class Crate {
    constructor(x, y, width, height, id){
        this.x = x;
        this.y = y; 
        this.width = width;
        this.height = height; 
        this.touchingGround = true;
        this.crateID = id;
        this.shield = false;
    }
    draw(){
        ctx.drawImage(images.crate, this.x, this.y, this.width, this.height)
        if(this.shield){
            ctx.fillStyle = "rgb(0,255,255)";
            ctx.globalAlpha = 0.15;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.globalAlpha = 1;
        }
    }
    update(){
        if(!checkTunnelCollisions(this)){
            this.x += gravity[0] * Math.round(blockSize / 3);
            this.y += gravity[1] * Math.round(blockSize / 3);
            this.touchingGround = false;
            if(checkSolidCollisions(this)){
                this.touchingGround = true;
                if(gravity[0] === 0){
                    if(gravity[1] === -1){
                        while(checkSolidCollisions(this)){
                            this.y++;
                        }
                    } else{
                        while(checkSolidCollisions(this)){
                            this.y--;
                        }
                    }
                } else{
                    if(gravity[0] === -1){
                        while(checkSolidCollisions(this)){
                            this.x++;
                        }
                    } else{
                        while(checkSolidCollisions(this)){
                            this.x--;
                        }
                    }
                }
            }
        }

        checkBubbleCollisions(this);
        checkKeyCollisions(this);
        checkShieldCollisions(this);

        if(!this.touchingGround){
            canChangeGravity = false;
        }
        if(checkSpikeCollisions(this) || checkBombCollisions(this).exploded){
            if(checkSpikeCollisions(this) || !this.shield){
                crates.splice(this.crateID, 1);
                changeCrateIDs(this.crateID);
                return true;
            }
            this.shield = false;
        }
        return false;
    }
}

class Bomb {
    constructor(x, y, width, height, id){
        this.x = x;
        this.y = y; 
        this.width = width;
        this.height = height; 
        this.touchingGround = true;
        this.bombID = id;
        this.exploded = false;
    }
    draw(){
        if(!this.exploded){
            ctx.drawImage(images.bomb, this.x, this.y, this.width, this.height)
        }
    }
    update(){
        if(this.exploded){
            bombs.splice(this.bombID, 1);
            changeBombIDs(this.bombID);
            return true;
        }
        if(!checkTunnelCollisions(this)){
            this.x += gravity[0] * Math.round(blockSize / 3);
            this.y += gravity[1] * Math.round(blockSize / 3);
            if(checkBombCollisions(this) && !this.exploded && !checkTunnelCollisions(this)){
                if(gravity[0] === 0){
                    if(gravity[1] === -1){
                        while(checkSpikeCollisions(this)){
                            this.y++;
                        }
                    } else{
                        while(checkSpikeCollisions(this)){
                            this.y--;
                        }
                    }
                } else{
                    if(gravity[0] === -1){
                        while(checkSpikeCollisions(this)){
                            this.x++;
                        }
                    } else{
                        while(checkSpikeCollisions(this)){
                            this.x--;
                        }
                    }
                }
                this.explode();
            }
            this.touchingGround = false;
            if(checkSolidCollisions(this) && !this.exploded){
                this.touchingGround = true;
                if(gravity[0] === 0){
                    if(gravity[1] === -1){
                        while(checkSolidCollisions(this)){
                            this.y++;
                        }
                    } else{
                        while(checkSolidCollisions(this)){
                            this.y--;
                        }
                    }
                } else{
                    if(gravity[0] === -1){
                        while(checkSolidCollisions(this)){
                            this.x++;
                        }
                    } else{
                        while(checkSolidCollisions(this)){
                            this.x--;
                        }
                    }
                }
            }
        }

        if(checkSpikeCollisions(this) && !this.exploded){
             if(gravity[0] === 0){
                if(gravity[1] === -1){
                    while(checkSpikeCollisions(this)){
                        this.y++;
                    }
                } else{
                    while(checkSpikeCollisions(this)){
                        this.y--;
                    }
                }
            } else{
                if(gravity[0] === -1){
                    while(checkSpikeCollisions(this)){
                        this.x++;
                    }
                } else{
                    while(checkSpikeCollisions(this)){
                        this.x--;
                    }
                }
            }
            this.explode();
        }

        checkBubbleCollisions(this);
        checkKeyCollisions(this);

        if(!this.touchingGround){
            canChangeGravity = false;
        }

        if(this.touchingGround){
            this.width = blockSize;
            this.height = blockSize * 3;
            this.y -= blockSize;
            if(checkCrateCollisions(this) || checkPlayerCollisions(this)){ 
                this.width = blockSize;
                this.height = blockSize;
                this.y += blockSize;
                this.explode();
                return;
            }
            this.width = blockSize;
            this.height = blockSize;
            this.y += blockSize;

            this.width = blockSize * 3;
            this.height = blockSize;
            this.x -= blockSize;
            if(checkCrateCollisions(this) || checkPlayerCollisions(this)){ 
                this.width = blockSize;
                this.height = blockSize;
                this.x += blockSize;
                this.explode();
                return;
            }
            this.width = blockSize;
            this.height = blockSize;
            this.x += blockSize;
        }
        return false;
    }
    explode(){
        this.touchingGround = false;
        if(checkSolidCollisions(this) && !this.exploded){
            this.touchingGround = true;
            if(gravity[0] === 0){
                if(gravity[1] === -1){
                    while(checkSolidCollisions(this)){
                        this.y++;
                    }
                } else{
                    while(checkSolidCollisions(this)){
                        this.y--;
                    }
                }
            } else{
                if(gravity[0] === -1){
                    while(checkSolidCollisions(this)){
                        this.x++;
                    }
                } else{
                    while(checkSolidCollisions(this)){
                        this.x--;
                    }
                }
            }
        }
        this.width = blockSize * 3;
        this.height = blockSize * 3;
        this.x -= blockSize;
        this.y -= blockSize;
        if(!this.exploded){
            this.exploded = true;
        }
    }
}

function changeBombIDs(id){
    bombs.forEach((bomb)=>{
        if(bomb.bombID > id){
            bomb.bombID--;
        }
    })
}

function changeCrateIDs(id){
    crates.forEach((crate)=>{
        if(crate.crateID > id){
            crate.crateID--;
        }
    })
}

function changeBreakableIDs(id){
    breakables.forEach((breakable)=>{
        if(breakable.breakableID > id){
            breakable.breakableID--;
        }
    })
}

class Block {
    constructor(x, y, width, height){
        this.x = x;
        this.y = y; 
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.autoTile();
    }
    autoTile(){
        let number = 0;
        let blockX = (Math.round(this.x) / blockSize) - 1;
        let blockY = (Math.round(this.y) / blockSize) - 1;
        if(blockX >= 0 && blockY >= 0 && blockX < levels[currentLevel].levelSize && blockY < levels[currentLevel].levelSize){
            if(levels[currentLevel].map[blockY][blockX] === "b"){
                number += 128;
            }
        }
        blockX++;
        if(blockX >= 0 && blockY >= 0 && blockX < levels[currentLevel].levelSize && blockY < levels[currentLevel].levelSize){
            if(levels[currentLevel].map[blockY][blockX] === "b"){
                number += 64;
            }
        }
        blockX++;
        if(blockX >= 0 && blockY >= 0 && blockX < levels[currentLevel].levelSize && blockY < levels[currentLevel].levelSize){
            if(levels[currentLevel].map[blockY][blockX] === "b"){
                number += 32;
            }
        }
        blockY++;
        if(blockX >= 0 && blockY >= 0 && blockX < levels[currentLevel].levelSize && blockY < levels[currentLevel].levelSize){
            if(levels[currentLevel].map[blockY][blockX] === "b"){
                number += 16;
            }
        }
        blockY++;
        if(blockX >= 0 && blockY >= 0 && blockX < levels[currentLevel].levelSize && blockY < levels[currentLevel].levelSize){
            if(levels[currentLevel].map[blockY][blockX] === "b"){
                number += 8;
            }
        }
        blockX--;
        if(blockX >= 0 && blockY >= 0 && blockX < levels[currentLevel].levelSize && blockY < levels[currentLevel].levelSize){
            if(levels[currentLevel].map[blockY][blockX] === "b"){
                number += 4;
            }
        }
        blockX--;
        if(blockX >= 0 && blockY >= 0 && blockX < levels[currentLevel].levelSize && blockY < levels[currentLevel].levelSize){
            if(levels[currentLevel].map[blockY][blockX] === "b"){
                number += 2;
            }
        }
        blockY--;
        if(blockX >= 0 && blockY >= 0 && blockX < levels[currentLevel].levelSize && blockY < levels[currentLevel].levelSize){
            if(levels[currentLevel].map[blockY][blockX] === "b"){
                number ++;
            }
        }
        this.image = images.blocks[number];
    };
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}

class PhaseBlock {
    constructor(x, y, width, height, solid){
        this.x = x;
        this.y = y; 
        this.width = width;
        this.height = height;
        this.solid = solid;
    }
    draw(){
        if(this.solid){
            ctx.drawImage(images.phaseBlock.open, this.x, this.y, this.width, this.height);
        } else{
            ctx.drawImage(images.phaseBlock.closed, this.x, this.y, this.width, this.height);
        }
    }
}
class Tunnel {
    constructor(x, y, width, height, dir){
        this.x = x;
        this.y = y; 
        this.width = width;
        this.height = height;
        this.dir = dir;
    }
    draw(){
        if(this.dir === "horizontal"){
            ctx.drawImage(images.horizontalTunnel, this.x, this.y, this.width, this.height);
        } else{
            ctx.drawImage(images.verticalTunnel, this.x, this.y, this.width, this.height);
        }
    }
}
class Spike {
    constructor(x, y, width, height, dir){
        this.x = x;
        this.y = y; 
        this.width = width;
        this.height = height;
        this.dir = dir;
    }
    draw(){
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.dir);
        ctx.drawImage(images.spike, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }
}

class Goal {
    constructor(x, y, width, height){
        this.x = x;
        this.y = y; 
        this.width = width;
        this.height = height;
    }
    draw(){
        ctx.drawImage(images.goal, this.x, this.y, this.width, this.height)
    }
}

class Breakable {
    constructor(x, y, width, height, id){
        this.x = x;
        this.y = y; 
        this.width = width;
        this.height = height;
        this.breakableID = id;
    }
    draw(){
        ctx.drawImage(images.breakable, this.x, this.y, this.width, this.height)
    }
    update(){
        if(checkBombCollisions(this).exploded){
            breakables.splice(this.breakableID, 1);
            changeBreakableIDs(this.breakableID);
            return true;
        }
    }
}

class Bubble {
    constructor(x, y, width, height, charges){
        this.x = x;
        this.y = y; 
        this.width = width;
        this.height = height;
    }
    draw(){
        ctx.drawImage(images.bubble, this.x, this.y, this.width, this.height)
    }
}

class Shield {
    constructor(x, y, width, height, charges){
        this.x = x;
        this.y = y; 
        this.width = width;
        this.height = height;
    }
    draw(){
        ctx.drawImage(images.shield, this.x, this.y, this.width, this.height)
    }
}

class Key {
    constructor(x, y, width, height, charges){
        this.x = x;
        this.y = y; 
        this.width = width;
        this.height = height;
    }
    draw(){
        ctx.drawImage(images.key, this.x, this.y, this.width, this.height)
    }
}

class Lock {
    constructor(x, y, width, height, charges){
        this.x = x;
        this.y = y; 
        this.width = width;
        this.height = height;
    }
    draw(){
        ctx.drawImage(images.lock, this.x, this.y, this.width, this.height)
    }
}

function drawGravityCharges(){
    for(let i = 0; i < gravityCharges; i++){
        c.drawImage(images.gravityCharge, 10 + i * 15, 10, 10, 20);
    }
}

function createBlocks(){
    let playerID = 0;
    let crateID = 0;
    let bombID = 0;
    let breakableID = 0;
    for(let i = 0; i < levels[currentLevel].map.length; i++){
        for(let  j= 0; j < levels[currentLevel].map[i].length; j++){
            let tile = levels[currentLevel].map[i][j];
            if(tile === "b"){
                blocks.push(new Block(j * blockSize, i * blockSize, blockSize, blockSize));
            }
            if(tile === ">"){
                spikes.push(new Spike(j * blockSize, i * blockSize, blockSize, blockSize, Math.PI / 2));
            }
            if(tile === "^"){
                spikes.push(new Spike(j * blockSize, i * blockSize, blockSize, blockSize, 0));
            }
            if(tile === "<"){
                spikes.push(new Spike(j * blockSize, i * blockSize, blockSize, blockSize, -Math.PI / 2));
            }
            if(tile === "v"){
                spikes.push(new Spike(j * blockSize, i * blockSize, blockSize, blockSize, Math.PI));
            }
            if(tile === "P"){
                players.push(new Player(j * blockSize, i * blockSize, blockSize, blockSize, playerID));
                playerID++;
            }
            if(tile === "c"){
                crates.push(new Crate(j * blockSize, i * blockSize, blockSize, blockSize, crateID));
                crateID++;
            }
            if(tile === "B"){
                bombs.push(new Bomb(j * blockSize, i * blockSize, blockSize, blockSize, bombID));
                bombID++;
            }
            if(tile === "@"){
                goals.push(new Goal(j * blockSize, i * blockSize, blockSize, blockSize));
            }
            if(tile === "S"){
                phaseBlocks.push(new PhaseBlock(j * blockSize, i * blockSize, blockSize, blockSize, true));
            }
            if(tile === "s"){
                phaseBlocks.push(new PhaseBlock(j * blockSize, i * blockSize, blockSize, blockSize, false));
            }
            if(tile === "+"){
                bubbles.push(new Bubble(j * blockSize, i * blockSize, blockSize, blockSize));
            }
            if(tile === "U"){
                shields.push(new Shield(j * blockSize, i * blockSize, blockSize, blockSize));
            }
            if(tile === "L"){
                locks.push(new Lock(j * blockSize, i * blockSize, blockSize, blockSize));
            }
            if(tile === "|"){
                tunnels.push(new Tunnel(j * blockSize, i * blockSize, blockSize, blockSize, "vertical"));
            }
            if(tile === "="){
                tunnels.push(new Tunnel(j * blockSize, i * blockSize, blockSize, blockSize, "horizontal"));
            }
            if(tile === "x"){
                breakables.push(new Breakable(j * blockSize, i * blockSize, blockSize, blockSize, breakableID));
                breakableID++;
            }
            if(tile === "l"){
                keys.push(new Key(j * blockSize, i * blockSize, blockSize, blockSize));
            }
        }
    }
}   

function drawBlocks(){
    phaseBlocks.forEach((phaseBlock) => {
        phaseBlock.draw();
    });
    blocks.forEach((block) => {
        block.draw();
    });
    breakables.forEach((breakable) => {
        breakable.draw();
    });
    spikes.forEach((spike) => {
        spike.draw();
    });
    goals.forEach((goal) => {
        goal.draw();
    });
    locks.forEach((lock) => {
        lock.draw();
    });
    keys.forEach((key) => {
        key.draw();
    });
    bubbles.forEach((bubble) => {
        bubble.draw();
    });
    shields.forEach((shield) => {
        shield.draw();
    });
    crates.forEach((crate) => {
        crate.draw(); 
    })
    bombs.forEach((bomb) => {
        bomb.draw(); 
    })
    players.forEach((player) => {
        player.draw();
    });
    tunnels.forEach((tunnel) => {
        tunnel.draw();
    });
}

function updateBlocks(){
    canChangeGravity = true;
    if(keys.length === 0){
        locks = [];
    }
    for(let i = 0; i < crates.length; i++){
        if(crates[i].update(i)){
            i--;
        }
    }
    for(let i = 0; i < bombs.length; i++){
        if(bombs[i].update(i)){
            i--;
        };
    }
    for(let i = 0; i < breakables.length; i++){
        if(breakables[i].update(i)){
            i--;
        };
    }
    players.forEach((player) => {
        player.update();
    });
};

let canClick = true;
let canPressR = true;
function drawAndCheckResetCharge(){
    c.drawImage(images.resetCharge, 10, 40, 20, 40)
    if(players.length > 0){
        if((mouse.leftClick && canClick)){
            if(mouse.x > 10 && mouse.x < 30 && mouse.y > 40 && mouse.y < 80){
                if(!checkGoalCollisions(players[0]) && !players[0].isFirstMove){
                    resetLevel();
                }
            }
        }
        if(canPressR && key.r){
            if(!checkGoalCollisions(players[0]) && !players[0].isFirstMove){
                resetLevel();
            }
        }
    }
    if(mouse.leftClick){
        canClick = false;
    } else{
        canClick = true;
    }
    if(key.r){
        canPressR = false;
    } else{
        canPressR = true;
    }
}

function changePhaseBlocks(){
    phaseBlocks.forEach((phaseBlock) => {
        if(!(checkPlayerCollisions(phaseBlock) || checkCrateCollisions(phaseBlock))){
            phaseBlock.solid = !phaseBlock.solid;
        }
    })
}

function clearBlocks(){
    blocks = [];
    players = [];
    goals = [];
    bubbles = [];
    crates = [];
    spikes = [];
    locks = [];
    keys = [];
    phaseBlocks = [];
    bombs = [];
    breakables = [];
    shields = [];
}

function resetLevel(){
    gravity = [0, 0];
    blockSize = Math.round(1200 / levels[currentLevel].levelSize);
    gravityCharges = levels[currentLevel].gravityCharges;
    clearBlocks();
    createBlocks();
}

let logoAlpha = 0;
function drawLogo(){
    if(gameOver){
        logoAlpha+=0.02;
    } else{
        logoAlpha-=0.02;
    }
    if(logoAlpha < 0){
        logoAlpha = 0;
    }
    if(logoAlpha > 1){
        logoAlpha = 1;
    }
    ctx.globalAlpha = logoAlpha;
    ctx.drawImage(images.logo,0,0,1200,1200);
    ctx.globalAlpha = 1;
}

function gameLoop(){
    c.clearRect(0,0,480,270);
    ctx.clearRect(0, 0, 1200, 1200);
    c.drawImage(images.background, 0, 0, 480, 270)
    c.drawImage(images.floor, 0, 215, 480, 40);
    if(doorFrame === "closed"){
        c.drawImage(images.door.closed, 400, 119, 64, 96)
    }
    if(robotFrame === "idle"){
        c.drawImage(images.robot.idle, 50, 135, 64, 80)
    }
    ctx.fillStyle = "black";
    ctx.fillRect(blockSize * levels[currentLevel].levelSize, 0, blockSize, 1200);
    ctx.fillRect(0, blockSize * levels[currentLevel].levelSize, 1200, blockSize);
    if(players.length === 0){
        resetCountdown--;
        if(resetCountdown === 0){
            resetLevel();
            resetCountdown = 60;
        }
    }
    drawAndCheckResetCharge();
    drawGravityCharges();
    drawBlocks();
    updateBlocks();
    drawLogo();
    requestAnimationFrame(gameLoop);
}

function isColliding(first, second){
    return first.x < second.x + second.width &&
           first.x + first.width > second.x &&
           first.y < second.y + second.height &&
           first.y + first.height > second.y;
}

function checkSolidCollisions(object){
    if(checkBlockCollisions(object)){
        return true;
    } else if(checkCrateCollisions(object)){
        return true;
    } else if(checkPlayerCollisions(object)){
        return true;
    } else if(checkPhaseBlockCollisions(object)){
        return true;
    } else if(checkLockCollisions(object)){
        return true;
    } else if(checkBreakableCollisions(object)){
        return true;
    } else if(checkBombCollisions(object)){
        if(!checkBombCollisions(object).exploded){
            return true;
        }
    } else if(checkTunnelCollisions(object)){
        return true;
    }
    return false;
}

function checkBlockCollisions(object){
    for(let i = 0; i < blocks.length; i++){
        if(isColliding(blocks[i], object)){
            return true;
        }
    }
    return false;
}

function checkTunnelCollisions(object){
    for(let i = 0; i < tunnels.length; i++){
        if(isColliding(tunnels[i], object)){
            if((gravity[0] === 0 && tunnels[i].dir === "horizontal") || gravity[1] === 0 && tunnels[i].dir === "vertical"){
                return true;
            }
        }
    }
    return false;
}

function checkBreakableCollisions(object){
    for(let i = 0; i < breakables.length; i++){
        if(isColliding(breakables[i], object)){
            return true;
        }
    }
    return false;
}

function checkPhaseBlockCollisions(object){
    for(let i = 0; i < phaseBlocks.length; i++){
        if(isColliding(phaseBlocks[i], object)){
            if(phaseBlocks[i].solid){
                return true;
            }
        }
    }
    return false;
}

function checkSpikeCollisions(object){
    for(let i = 0; i < spikes.length; i++){
        if(isColliding(spikes[i], object)){
            return true;
        }
    }
    return false;
}

function checkLockCollisions(object){
    for(let i = 0; i < locks.length; i++){
        if(isColliding(locks[i], object)){
            return true;
        }
    }
    return false;
}

function checkGoalCollisions(object){
    for(let i = 0; i < goals.length; i++){
        if(Math.abs(object.x - goals[i].x) < Math.round(blockSize / 3) + 1 && Math.abs(object.y - goals[i].y) < Math.round(blockSize / 3) + 1){
            return goals[i];
        }
    }
}

function checkCrateCollisions(object){
    for(let i = 0; i < crates.length; i++){
        if(isColliding(crates[i], object) && crates[i].crateID !== object.crateID){
            return true;
        } 
    }
    return false;
}

function checkPlayerCollisions(object){
    for(let i = 0; i < players.length; i++){
        if(isColliding(players[i], object) && players[i].playerID !== object.playerID){
            return true;
        }
    }
    return false;
}

function checkBubbleCollisions(object){
    for(let i = 0; i < bubbles.length; i++){
        if(isColliding(bubbles[i], object)){
            gravityCharges++;
            bubbles.splice(i, 1);
        }
    }
}

function checkShieldCollisions(object){
    for(let i = 0; i < shields.length; i++){
        if(isColliding(shields[i], object) && object.shield === false){
            object.shield = true;
            shields.splice(i, 1);
        }
    }
}

function checkBombCollisions(object){
    for(let i = 0; i < bombs.length; i++){
        if(isColliding(bombs[i], object) && bombs[i].bombID !== object.bombID){
            return bombs[i];
        }
    }
    return false;
}

function checkKeyCollisions(object){
    for(let i = 0; i < keys.length; i++){
        if(isColliding(keys[i], object)){
            keys.splice(i, 1);
        }
    }
}

window.addEventListener("resize", () => {
    gameCanvasWidth = mainCanvas.getBoundingClientRect().width / 3 + "px"
    gameCanvas.style.width = gameCanvasWidth;
    gameCanvas.style.height = gameCanvasWidth;   
});

window.addEventListener("keydown", (e) => {
    
    if(e.keyCode === 37){
        key.left = true;
    }
    if(e.keyCode === 38){
        key.up = true;
    }
    if(e.keyCode === 39){
        key.right = true;
    }
    if(e.keyCode === 40){
        key.down = true;
    }
    if(e.keyCode === 65){
        key.a = true;
    }
    if(e.keyCode === 87){
        key.w = true;
    }
    if(e.keyCode === 68){
        key.d = true;
    }
    if(e.keyCode === 83){
        key.s = true;
    }
    if(e.keyCode === 82){
        key.r = true;
    }
});

window.addEventListener("keyup", (e) => {
    
    if(e.keyCode === 37){
        key.left = false;
    }
    if(e.keyCode === 38){
        key.up = false;
    }
    if(e.keyCode === 39){
        key.right = false;
    }
    if(e.keyCode === 40){
        key.down = false;
    }
    if(e.keyCode === 65){
        key.a = false;
    }
    if(e.keyCode === 87){
        key.w = false;
    }
    if(e.keyCode === 68){
        key.d = false;
    }
    if(e.keyCode === 83){
        key.s = false;
    }
    if(e.keyCode === 82){
        key.r = false;
    }
});

window.addEventListener("mousedown", (e) => {
    if(e.button === 0){
        mouse.leftClick = true;
    }
})
window.addEventListener("mouseup", (e) => {
    if(e.button === 0){
        mouse.leftClick = false;
    }
})

window.addEventListener("mousemove", (event) => {
    const rect = mainCanvas.getBoundingClientRect();
    mouse.x = (event.clientX - rect.left) * (480 / rect.width);
    mouse.y = (event.clientY - rect.top) * (270 / rect.height);
})
window.addEventListener("load", (event) => {
    resetLevel();
    requestAnimationFrame(gameLoop);
})