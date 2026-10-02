    const mainCanvas = document.getElementById("main-canvas");
    const gameCanvas = document.getElementById("game-canvas");
    const c = mainCanvas.getContext('2d');
    const ctx = gameCanvas.getContext('2d');
    mainCanvas.width = 480;
    mainCanvas.height = 270;
    gameCanvas.width = 1200;
    gameCanvas.height = 1200;
    let gameOn = false;
    gameCanvas.style.display = "none";
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
        r: false,
        space: false
    }

    let mouse = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        leftClick: false
    }

    let sounds = {
        break: new Audio('Sounds/break.mp3'),
        explosion: new Audio('Sounds/explosion.mp3'),
        atmosphere: new Audio('Sounds/atmosphere.mp3'),
        impact: new Audio('Sounds/impact.mp3'),
        left: new Audio('Sounds/left.wav'),
        right: new Audio('Sounds/right.wav'),
        up: new Audio('Sounds/up.wav'),
        down: new Audio('Sounds/down.wav'),
        music: new Audio('Sounds/music.mp3'),
        win: new Audio('Sounds/win.mp3'),
        door: new Audio('Sounds/door.mp3'),
        beep: new Audio('Sounds/beep.mp3'),
        collect: new Audio('Sounds/collect.mp3'),
        pressurePlate: new Audio('Sounds/pressurePlate.mp3')
    }

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
        door: new Image(),
        robot: new Image(),
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
        logo: new Image(),
        barrier: new Image(),
        reverseBarrier: new Image(),
        button: {
            unpressed: [new Image(), new Image()],
            pressed: [new Image(), new Image()],
        },
        buttonBlock: [new Image(), new Image()],
        unpressedPressurePlate: new Image(),
        pressedPressurePlate: new Image(),
        pressurePlateBlock: new Image(),
        mine: new Image(),
        timedBlock: [],
        winAnimation: new Image(),
        explosion: new Image(),
        smallerExplosion: new Image(),
        playButton: new Image(),
        crateParticle: new Image(),
        breakableParticle: new Image(),
        settingsButton: new Image(),
        backButton: new Image(),
        levelSelect: new Image(),
        leftArrow: new Image(),
        rightArrow: new Image(),
        upArrow: new Image(),
        downArrow: new Image(),
        lockedLevel: new Image(),
        levels: [],
    }
    for(let i = 0; i < 256; i++){
        images.blocks.push(new Image());
        images.blocks[i].src = "Images/blocks/" + i + ".png";
    }

    for(let i = 1; i <= 100; i++){
        images.levels.push(new Image());
        images.levels[i-1].src = "Images/levels/" + i + ".png";
    }

    for(let i = 1; i <= 50; i++){
        images.timedBlock.push(new Image());
        images.timedBlock[i-1].src = "Images/timedBlock/" + i + ".png";
    }

    images.leftArrow.src = "Images/leftArrow.png";
    images.rightArrow.src = "Images/rightArrow.png";
    images.upArrow.src = "Images/upArrow.png";
    images.downArrow.src = "Images/downArrow.png";
    images.backButton.src = "Images/backButton.png";
    images.settingsButton.src = "Images/settingsButton.png";
    images.levelSelect.src = "Images/levelSelect.png";
    images.crateParticle.src = "Images/crateParticle.png";
    images.breakableParticle.src = "Images/breakableParticle.png";
    images.winAnimation.src = "Images/winAnimation.png";
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
    images.door.src = "Images/door.png";
    images.explosion.src = "Images/explosion.png";
    images.smallerExplosion.src = "Images/smallerExplosion.png";
    images.playButton.src = "Images/playButton.png";
    for(let i = 0; i < images.button.unpressed.length; i++){
        images.button.unpressed[i].src = "Images/button/unpressed" + (parseInt(i)+1).toString() + ".png";
    }
    for(let i = 0; i < images.button.pressed.length; i++){
        images.button.pressed[i].src = "Images/button/pressed" + (parseInt(i)+1).toString() + ".png";
    }

    images.robot.src = "Images/robot.png";
    images.shield.src = "Images/shield.png";
    images.horizontalTunnel.src = "Images/horizontalTunnel.png";
    images.verticalTunnel.src = "Images/verticalTunnel.png";
    images.barrier.src = "Images/barrier.png";
    images.reverseBarrier.src = "Images/reverseBarrier.png";
    images.unpressedPressurePlate.src = "Images/unpressedPressurePlate.png";
    images.pressedPressurePlate.src = "Images/pressedPressurePlate.png";
    images.pressurePlateBlock.src = "Images/pressurePlateBlock.png";
    images.mine.src = "Images/mine.png";
    images.lockedLevel.src = "Images/lockedLevel.png";

    for(let i = 0; i < images.buttonBlock.length; i++){
        images.buttonBlock[i].src = "Images/buttonBlock/" + (parseInt(i)+1).toString() + ".png";
    }


    let levelsUnlocked = 16;

    function startGame(level = levelsUnlocked){
        gameOn = true;
        let gameOver = false;

        sounds.atmosphere.currentTime = 0;
        sounds.atmosphere.loop = true;
        sounds.atmosphere.volume = 0;
        sounds.atmosphere.play();

        let gravityPreset = [0, 0];
        let gravity = [0, 0];
        let gravityCharges = 0;
        let resetCountdown = 60;
        let canChangeGravity = true;
        let robotFrame = 0;

        let currentLevel = level;
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
                levelSize: 16,
                gravityCharges: 5,
                map:[
                    "bbbbbbbbbbbbbbbb",
                    "bvvvvvvvvvvvvvbb",
                    "bPc  +  +    S<b",
                    "bb           s<b",
                    "bbb           <b",
                    "b>            <b",
                    "b> S  +       <b",
                    "b> s        s <b",
                    "b>         S  <b",
                    "b>  s       s <b",
                    "b>S + + +   + <b",
                    "b>          + <b",
                    "b> S       ++S<b",
                    "b> ^@^    s   <b",
                    "bb^bbb^^^^^^^^bb",
                    "bbbbbbbbbbbbbbbb",
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
                gravityCharges: 28,
                map:[
                    "bbbbbbbbbbbbbbbb",
                    "bbbbbbbbbbbbbbbb",
                    "bbvvvvbbvvvvvvbb",
                    "bb+s   +  +   bb",
                    "bb  b        ^^b",
                    "b>s+    b   <bbb",
                    "b>    S    <bbbb",
                    "bbbb       <bbbb",
                    "bvvv +      <bbb",
                    "b  +     +  sS@b",
                    "b    s      bbbb",
                    "b>s    +      +b",
                    "b   +     bbcb b",
                    "b^         bcb b",
                    "bb>+ s^^^^^bPb^b",
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
            10: {
                levelSize: 15,
                gravityCharges: 21,
                map:[
                    "bbbbbbbbbbbbbbb",
                    "b>     +      b",
                    "bb +   bbbbb  b",
                    "bP  S  Bbbb>+ b",
                    "bbbbbbbbbbbbbxb",
                    "bcsSsS        b",
                    "bbbbbb        b",
                    "b   +b       +b",
                    "b             b",
                    "b b    +   +  b",
                    "b   s       LLb",
                    "bl          Lcb",
                    "bxx b       LLb",
                    "b@x+      + LBb",
                    "bbbbbbbbbbbbbbb",
                ]
            },
            11: {
                levelSize: 10,
                gravityCharges: 10,
                map:[
                    "bbbbbbbbbb",
                    "blb    L@b",
                    "bHb    LLb",
                    "b        b",
                    "bs       b",
                    "b        b",
                    "b S     Pb",
                    "b    bbbbb",
                    "b   c h+lb",
                    "bbbbbbbbbb",
                ]
            },
            12: {
                levelSize: 15,
                gravityCharges: 15,
                buttonDirs: [Math.PI / 2],
                buttonAssignments: [0],
                buttonBlockAssignments: [0,0,0,0,0,0,0,0,0,0],
                map:[
                    "bbbbbbbbbbbbbbb",
                    "b>  vvbDbvv  <b",
                    "b>s +   b    <b",
                    "b>    b b s  <b",
                    "b>  S s      <b",
                    "b>     b     <b",
                    "b> s   +   S <b",
                    "b>         S <b",
                    "b> + <bPb>   <b",
                    "bdddddbbbdddddb",
                    "b>   <b@b>   <b",
                    "b>      S   s<b",
                    "b> S  ^    ^ <b",
                    "bb^^^^b +  b^bb",
                    "bbbbbbbbbbbbbbb",
                ]
            },
            13: {
                levelSize: 8,
                gravityCharges: 9,
                buttonDirs: [Math.PI],
                buttonAssignments: [0],
                buttonBlockAssignments: [0],
                map:[
                    "bbbbbbbb",
                    "b    ]@b",
                    "b    bbb",
                    "b    cPb",
                    "b  bbbbb",
                    "b     [b",
                    "b bbbbbb",
                    "bbbbbbbb",
                ]
            },
            14: {
                levelSize: 9,
                gravityCharges: 9,
                buttonDirs: [Math.PI],
                buttonAssignments: [0],
                buttonBlockAssignments: [0],
                map:[
                    "bbbbbbbbb",
                    "b  cbbbbb",
                    "b   +  Pb",
                    "bs  bbbbb",
                    "bc  ooo@b",
                    "bS  bbbbb",
                    "b   +  cb",
                    "b   bbbbb",
                    "bbbbbbbbb",
                ]
            },
            15: {
                levelSize: 9,
                gravityCharges: 12,
                buttonDirs: [Math.PI],
                buttonAssignments: [0],
                buttonBlockAssignments: [0],
                timedBlockAssignments: [12,12,12,12,12,12,12,12],
                map:[
                    "bbbbbbbbb",
                    "b     bbb",
                    "b @  |  b",
                    "b       b",
                    "b  ttt  b",
                    "b  tct  b",
                    "b  tttb b",
                    "bP +bb  b",
                    "bbbbbbbbb",
                ]
            },
            16: {
                levelSize: 15,
                gravityCharges: 19,
                map:[
                    "bbbbbbbbbbbbbbb",
                    "b@x     b     b",
                    "bxx         s b",
                    "b       ===   b",
                    "bS            b",
                    "b             b",
                    "b             b",
                    "b            Bb",
                    "b           bbb",
                    "b      S +   <b",
                    "bS         xxxb",
                    "b          xBUb",
                    "bxxxxxxxxxxxxxb",
                    "bc  +  B   + Pb",
                    "bbbbbbbbbbbbbbb",
                ]
            } 
        };

        let blockSize = Math.round(1200 / levels[currentLevel].levelSize);

        let blocks = [];
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
        let barriers = [];
        let buttons = [];
        let buttonBlocks = [];
        let pressurePlates = [];
        let pressurePlateBlocks = [];
        let mines = [];
        let timedBlocks = [];
        let explosions = [];
        let atmosphericParticles = [];
        let particles = [];

        class Player {
            constructor(x, y, width, height){
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
                this.goalCountdown = -1;
                this.shield = false;
                this.dead = false;
                this.isPlayer = true;
            }
            draw(){
                if(!this.dead){
                    if(this.goalCountdown >= 9){
                        if(this.goalCountdown >= 39){
                            ctx.drawImage(images.winAnimation, (14) * 16, 0, 16, 16, this.x, this.y, this.width, this.height)
                        } else{
                            ctx.drawImage(images.winAnimation, (Math.floor((this.goalCountdown - 6) / 3)) * 16 , 0, 16, 16, this.x, this.y, this.width, this.height)
                        }
                    } else{
                        ctx.drawImage(images.player, this.x, this.y, this.width, this.height)
                        if(this.shield){
                            ctx.fillStyle = "rgb(0,255,255)";
                            ctx.globalAlpha = 0.15;
                            ctx.fillRect(this.x, this.y, this.width, this.height);
                            ctx.globalAlpha = 1;
                        }
                    }
                }
            }
            update(){
                if(!this.dead){
                    if(!this.touchingGround){
                        canChangeGravity = false;
                    }
                    this.handleGravityChanges();
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

                    if(checkSpikeCollisions(this) || checkBombCollisions(this).exploded || checkBarrierCollisions(this) === 1 || checkMineCollisions(this)){
                        if(!this.shield || checkSpikeCollisions(this)){
                            for(let i = 0; i < 40; i++){
                                particles.push(new Particle(this.x + this.width / 2, this.y + this.height / 2, Math.floor(Math.random() * blockSize / 12) + blockSize / 10, Math.floor(Math.random() * blockSize / 12) + blockSize / 10, images.crateParticle, Math.random() * blockSize / 3 - blockSize / 6, Math.random() * blockSize / 3 - blockSize / 6, 0.99, 0.99, blockSize / 90, 1, -0.01));
                            }
                            this.dead = true;
                            sounds.break.currentTime = 0;
                            sounds.break.play();    
                        }
                        this.shield = false;
                    }

                    checkBubbleCollisions(this);
                    checkKeyCollisions(this);
                    checkShieldCollisions(this)
                    
                    if(checkGoalCollisions(this)){
                        this.x = checkGoalCollisions(this).x;
                        this.y = checkGoalCollisions(this).y;
                        this.goalCountdown++;
                        if(this.goalCountdown === 0){
                            sounds.win.currentTime = 0;
                            sounds.win.play();
                            currentLevel++;
                            if(!(currentLevel > Object.keys(levels).length) && currentLevel > levelsUnlocked){
                                levelsUnlocked++;
                            }
                            currentLevel--;
                        }
                        if(this.goalCountdown === 40){
                            sounds.door.currentTime = 0;
                            sounds.door.play();
                        }
                        if(this.goalCountdown > 180){
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
            handleGravityChanges(){
                if((canChangeGravity || this.isFirstMove) && gravityCharges > 0){
                    if(gravityPreset[0] !== 0 || gravityPreset[1] !== 0 && robotAnimationReady){
                        gravity = gravityPreset;
                        onGravityChange();
                        if(gravity[0] === 1){
                            robotAnimation = "right";
                            sounds.right.currentTime = 0;
                            sounds.right.play();
                        }
                        if(gravity[0] === -1){
                            robotAnimation = "left";
                            sounds.left.currentTime = 0;
                            sounds.left.play();
                        }
                        if(gravity[1] === 1){
                            robotAnimation = "down";
                            sounds.down.currentTime = 0;
                            sounds.down.play();
                        }
                        if(gravity[1] === -1){
                            robotAnimation = "up";
                            sounds.up.currentTime = 0;
                            sounds.up.play();
                        }
                        gravityPreset = [0,0];
                        return;
                    }
                    if(((key.left && this.keyChecks.left === true) || (key.a && this.keyChecks.a === true)) && (gravity[0] !== -1)){
                        if(robotAnimationReady){
                            gravity = [-1, 0];
                            onGravityChange();
                            robotAnimation = "left";
                            sounds.left.currentTime = 0;
                            sounds.left.play();
                        } else if(gravityPreset[0] === 0 && gravityPreset[1] === 0){
                            gravityPreset = [-1, 0];
                        }
                    }
                    if(((key.right && this.keyChecks.right === true) || (key.d && this.keyChecks.d === true)) && (gravity[0] !== 1)){
                        if(robotAnimationReady){
                            gravity = [1, 0];
                            onGravityChange();
                            robotAnimation = "right";
                            sounds.right.currentTime = 0;
                            sounds.right.play();
                        } else if(gravityPreset[0] === 0 && gravityPreset[1] === 0){
                            gravityPreset = [1, 0];
                        }
                    }
                    if(((key.up && this.keyChecks.up === true) || (key.w && this.keyChecks.w === true)) && (gravity[1] !== -1)){
                        if(robotAnimationReady){
                            gravity = [0, -1];
                            onGravityChange();
                            robotAnimation = "up";
                            sounds.up.currentTime = 0;
                            sounds.up.play();
                        } else if(gravityPreset[0] === 0 && gravityPreset[1] === 0){
                            gravityPreset = [0, -1];
                        }
                    }
                    if(((key.down && this.keyChecks.down === true) || (key.s && this.keyChecks.s === true))  && (gravity[1] !== 1)){
                        if(robotAnimationReady){
                            gravity = [0, 1];
                            onGravityChange();
                            robotAnimation = "down";
                            sounds.down.currentTime = 0;
                            sounds.down.play();
                        } else if(gravityPreset[0] === 0 && gravityPreset[1] === 0){
                            gravityPreset = [0, 1];
                        }
                    }
                }
            }
        }

        let player = new Player(20, 20, blockSize, blockSize);

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
                if(checkSpikeCollisions(this) || checkBombCollisions(this).exploded || checkBarrierCollisions(this) === 2 || checkMineCollisions(this)){
                    if(checkSpikeCollisions(this) || !this.shield){
                        for(let i = 0; i < 40; i++){
                            particles.push(new Particle(this.x + this.width / 2, this.y + this.height / 2, Math.floor(Math.random() * blockSize / 12) + blockSize / 10, Math.floor(Math.random() * blockSize / 12) + blockSize / 10, images.crateParticle, Math.random() * blockSize / 3 - blockSize / 6, Math.random() * blockSize / 3 - blockSize / 6, 0.99, 0.99, blockSize / 90, 1, -0.01));
                        }
                        crates.splice(this.crateID, 1);
                        sounds.break.currentTime = 0;
                        sounds.break.play();
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
                    this.height = blockSize * 2;
                    this.y -= blockSize / 2;
                    if(checkCrateCollisions(this) || checkPlayerCollisions(this)){ 
                        this.width = blockSize;
                        this.height = blockSize;
                        this.y += blockSize / 2;
                        this.explode();
                        return;
                    }
                    this.y += blockSize / 2;

                    this.width = blockSize * 2;
                    this.height = blockSize;
                    this.x -= blockSize / 2;
                    if(checkCrateCollisions(this) || checkPlayerCollisions(this)){ 
                        this.width = blockSize;
                        this.height = blockSize;
                        this.x += blockSize / 2;
                        this.explode();
                        return;
                    }
                    this.width = blockSize;
                    this.height = blockSize;
                    this.x += blockSize / 2;
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
                this.width = blockSize * 2;
                this.height = blockSize * 2;
                this.x -= blockSize / 2;
                this.y -= blockSize / 2;
                if(!this.exploded){
                    this.exploded = true;
                    sounds.explosion.currentTime = 0;
                    sounds.explosion.volume = 0.7;
                    sounds.explosion.play();
                    explosions.push(new Explosion(this.x - blockSize / 2, this.y - blockSize / 2, this.width + blockSize, this.height + blockSize));
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

        class Explosion{
            constructor(x, y, width, height){
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
                this.frame = 0;
            }
            draw(){
                if(this.width > blockSize){
                    ctx.drawImage(images.explosion, Math.floor(this.frame / 3) * 48, 0, 48, 48, this.x, this.y, this.width, this.height);
                } else{
                    ctx.drawImage(images.smallerExplosion, Math.floor(this.frame / 3) * 16, 0, 16, 16, this.x, this.y, this.width, this.height);
                }
            } 
            update(){
                this.frame++;
            }
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

        class Barrier {
            constructor(x, y, width, height, type){
                this.x = x;
                this.y = y; 
                this.width = width;
                this.height = height;
                this.type = type;
            }
            draw(){
                if(this.type === 1){
                    ctx.globalAlpha = 0.7;
                    ctx.drawImage(images.barrier, this.x, this.y, this.width, this.height);
                } else{
                    ctx.globalAlpha = 0.5;
                    ctx.drawImage(images.reverseBarrier, this.x, this.y, this.width, this.height);
                }
                ctx.globalAlpha = 1;
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

        class Button {
            constructor(x, y, width, height, dir, id){
                this.x = x;
                this.y = y; 
                this.width = width;
                this.height = height;
                this.dir = dir;
                this.pressed = false;
                this.id = id;
            }
            draw(){
                ctx.save();
                ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
                ctx.rotate(this.dir);
                if(this.pressed){
                    ctx.drawImage(images.button.pressed[this.id], -this.width / 2, -this.height / 2, this.width, this.height);
                } else{
                    ctx.drawImage(images.button.unpressed[this.id], -this.width / 2, -this.height / 2, this.width * 1.25, this.height);
                }
                ctx.restore();
            }
        }

        class PressurePlate {
            constructor(x, y, width, height, dir, id){
                this.x = x;
                this.y = y; 
                this.width = width;
                this.height = height;
                this.dir = dir;
                this.pressed = false;
                this.id = id;
            }
            draw(){
                ctx.save();
                ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
                ctx.rotate(this.dir);
                if(this.pressed){
                    ctx.drawImage(images.pressedPressurePlate, -this.width / 2, -this.height / 2, this.width, this.height);
                } else{
                    ctx.drawImage(images.unpressedPressurePlate, -this.width / 2, -this.height / 2, this.width * 1.0625, this.height);
                }
                ctx.restore();
            }
        }

        class ButtonBlock {
            constructor(x, y, width, height, id){
                this.x = x;
                this.y = y; 
                this.width = width;
                this.height = height;
                this.id = id;
            }
            draw(){
                ctx.drawImage(images.buttonBlock[this.id], this.x, this.y, this.width, this.height);
            }
        }

        class TimedBlock {
            constructor(x, y, width, height, time){
                this.x = x;
                this.y = y; 
                this.width = width;
                this.height = height;
                this.time = time;
            }
            draw(){
                if(this.time > 0){
                    ctx.drawImage(images.timedBlock[this.time - 1], this.x, this.y, this.width, this.height);
                }
            }
        }

        class Mine {
            constructor(x, y, width, height){
                this.x = x;
                this.y = y; 
                this.width = width;
                this.height = height;
            }
            draw(){
                ctx.drawImage(images.mine, this.x, this.y, this.width, this.height);
            }
        }

        class PressurePlateBlock {
            constructor(x, y, width, height, id){
                this.x = x;
                this.y = y; 
                this.width = width;
                this.height = height;
                this.id = id;
                this.active = true;
            }
            draw(){
                if(this.active){
                    ctx.drawImage(images.pressurePlateBlock, this.x, this.y, this.width, this.height);
                }
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
                ctx.drawImage(images.breakable, this.x, this.y, this.width, this.height);
            }
            update(){
                if(checkBombCollisions(this).exploded){
                    for(let i = 0; i < 10; i++){
                        particles.push(new Particle(this.x + this.width / 2, this.y + this.height / 2, Math.floor(Math.random() * blockSize / 6) + blockSize / 5, Math.floor(Math.random() * blockSize / 6) + blockSize / 5, images.breakableParticle, Math.random() * blockSize / 3 - blockSize / 6, Math.random() * blockSize / 3 - blockSize / 6, 0.99, 0.99, blockSize / 90, 1, -0.01));
                    }
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

        class Particle{
            constructor(x, y, width, height, image, speedX, speedY, frictionX, frictionY, gravity, alpha, alphaChange){
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
                this.image = image;
                this.velocity = {
                    x: speedX,
                    y: speedY
                };
                this.friction = {
                    x: frictionX,
                    y: frictionY
                };
                this.gravity = gravity;
                this.alpha = alpha;
                this.alphaChange = alphaChange;
            }
            draw(){
                ctx.globalAlpha = this.alpha;
                ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
                ctx.globalAlpha = 1;
            }
            update(){        
                this.x += this.velocity.x;
                this.y += this.velocity.y;
                this.velocity.x *= this.friction.x;
                this.velocity.y *= this.friction.y;
                this.velocity.x += this.gravity * gravity[0];
                this.velocity.y += this.gravity * gravity[1];
                this.alpha += this.alphaChange;
                if(this.alpha < 0){
                    this.alpha = 0;
                }
                if(this.alpha > 1){
                    this.alpha = 1;
                }
            }
        }

        class AtmosphericParticle{
            constructor(x,y,width,height){
                this.x = x; 
                this.y = y;
                this.width = width; 
                this.height = height;
                this.color = Math.random() * 40 + 30;
                this.speedX = Math.random() * 0.25 + 0.5;
                this.speedY = Math.random() * 0.4 - 0.2;
                this.time = Math.random() * 10;
            }
            draw(){
                c.fillStyle = "rgb(" + this.color + "," + this.color + "," + this.color +")";
                c.fillRect(Math.round(this.x),Math.round(this.y),this.width,this.height);
            }
            update(){
                this.x += this.speedX;
                this.y += this.speedY + (Math.sin(performance.now() / 1000 + this.time)) / 4;
            }
        }

        function drawGravityCharges(){
            for(let i = 0; i < gravityCharges; i++){
                c.drawImage(images.gravityCharge, 10 + i * 15, 10, 10, 20);
            }
        }

        function onGravityChange(){
            player.isFirstMove = false;
            gravityCharges--;
            changePhaseBlocks();
            decreaseTimedBlocks();
            canChangeGravity = false;
            robotAnimationCountdown = 0;
            robotAnimationReady = false;
        }

        function createBlocks(){
            let crateID = 0;
            let bombID = 0;
            let breakableID = 0;
            let buttonID = 0;
            let buttonBlockID = 0;
            let timedBlockID = 0;
            for(let i = 0; i < levels[currentLevel].map.length; i++){
                for(let  j = 0; j < levels[currentLevel].map[i].length; j++){
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
                        player = new Player(j * blockSize, i * blockSize, blockSize, blockSize);
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
                    if(tile === "t"){
                        timedBlocks.push(new TimedBlock(j * blockSize, i * blockSize, blockSize, blockSize, levels[currentLevel].timedBlockAssignments[timedBlockID]));
                        timedBlockID++;
                    }
                    if(tile === "l"){
                        keys.push(new Key(j * blockSize, i * blockSize, blockSize, blockSize));
                    }
                    if(tile === "H"){
                        barriers.push(new Barrier(j * blockSize, i * blockSize, blockSize, blockSize, 1));
                    }
                    if(tile === "h"){
                        barriers.push(new Barrier(j * blockSize, i * blockSize, blockSize, blockSize, 2));
                    }
                    if(tile === "D"){
                        buttons.push(new Button(j * blockSize, i * blockSize, blockSize, blockSize, levels[currentLevel].buttonDirs[buttonID], levels[currentLevel].buttonAssignments[buttonID]));
                        buttonID++;
                    }
                    if(tile === "d"){
                        buttonBlocks.push(new ButtonBlock(j * blockSize, i * blockSize, blockSize, blockSize, levels[currentLevel].buttonBlockAssignments[buttonBlockID]));
                        buttonBlockID++;
                    }
                    if(tile === "["){
                        pressurePlates.push(new PressurePlate(j * blockSize, i * blockSize, blockSize, blockSize, levels[currentLevel].buttonDirs[buttonID], levels[currentLevel].buttonAssignments[buttonID]));
                        buttonID++;
                    }
                    if(tile === "]"){
                        pressurePlateBlocks.push(new PressurePlateBlock(j * blockSize, i * blockSize, blockSize, blockSize, levels[currentLevel].buttonBlockAssignments[buttonBlockID]));
                        buttonBlockID++;
                    }
                    if(tile === "o"){
                        mines.push(new Mine(j * blockSize, i * blockSize, blockSize, blockSize));
                    }
                }
            }
        }   

        function drawBlocks(){
            pressurePlates.forEach((pressurePlate) => {
                pressurePlate.draw();
            });
            pressurePlateBlocks.forEach((pressurePlateBlock) => {
                pressurePlateBlock.draw();
            });
            phaseBlocks.forEach((phaseBlock) => {
                phaseBlock.draw();
            });
            blocks.forEach((block) => {
                block.draw();
            });
            timedBlocks.forEach((timedBlock) => {
                timedBlock.draw();
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
            crates.forEach((crate) => {
                crate.draw(); 
            })
            bombs.forEach((bomb) => {
                bomb.draw(); 
            })
            shields.forEach((shield) => {
                shield.draw();
            });
            mines.forEach((mine) => {
                mine.draw(); 
            })
            player.draw();
            buttons.forEach((button) => {
                button.draw();
            });
            buttonBlocks.forEach((buttonBlock) => {
                buttonBlock.draw();
            });
            barriers.forEach((barrier) => {
                barrier.draw();
            });
            tunnels.forEach((tunnel) => {
                tunnel.draw();
            });
            particles.forEach((particle) => {
                particle.draw();
            })
            explosions.forEach((explosion) => {
                explosion.draw();
            });
        }

        function decreaseTimedBlocks(){
            for(let i = timedBlocks.length - 1; i >= 0; i--){
                timedBlocks[i].time--;
                if(timedBlocks[i].time <= 0){
                    timedBlocks.splice(i, 1);
                }
            }
        }

        function updateButtons(){
            let breaking;
            for(let i = 0; i < 10; i++){
                breaking = true
                for(let j = 0; j < buttons.length; j++){
                    if(buttons[j].id === i && !buttons[j].pressed){
                        breaking = false;
                    }
                }
                if(breaking){
                    for(let j = buttonBlocks.length - 1; j >= 0; j--){
                        if(buttonBlocks[j].id === i){
                            buttonBlocks.splice(j, 1);
                        }
                    }
                }
            }

            pressurePlateBlocks.forEach((pressurePlateBlock) => {
                pressurePlateBlock.active = true;
            })
            for(let i = 0; i < 10; i++){
                breaking = true
                for(let j = 0; j < pressurePlates.length; j++){
                    if(pressurePlates[j].id === i && !pressurePlates[j].pressed){
                        breaking = false;
                    }
                }
                if(breaking){
                    for(let j = pressurePlateBlocks.length - 1; j >= 0; j--){
                        if(pressurePlateBlocks[j].id === i){
                            pressurePlateBlocks[j].active = false;
                        }
                    }
                }
            }
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
            for(let i = particles.length - 1; i >= 0; i--){
                particles[i].update();
                if(particles[i].alpha === 0 || particles[i].width < 0 || particles[i].height < 0 || particles[i].x < -particles[i].width || particles[i].y < -particles[i].height || particles[i].x > 1200 || particles[i].y > 1200){
                    particles.splice(i, 1);
                }
            }
            explosions.forEach((explosion) => {
                explosion.update();
            });
            player.update();
        };

        let canClick = true;
        let canPressR = true;
        function drawAndCheckResetCharge(){
            c.drawImage(images.resetCharge, 10, 40, 20, 40)
            if(!player.dead){
                if((mouse.leftClick && canClick)){
                    if(mouse.x > 10 && mouse.x < 30 && mouse.y > 40 && mouse.y < 80){
                        if(!checkGoalCollisions(player) && !player.isFirstMove){
                            resetLevel();
                        }
                    }
                }
                if(canPressR && key.r){
                    if(!checkGoalCollisions(player) && !player.isFirstMove){
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
                if(!(checkPlayerCollisions(phaseBlock) || checkCrateCollisions(phaseBlock) || checkBombCollisions(phaseBlock))){
                    phaseBlock.solid = !phaseBlock.solid;
                }
            })
        }

        function clearBlocks(){
            particles = [];
            blocks = [];
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
            barriers = [];
            tunnels = [];
            buttons = [];
            buttonBlocks = [];
            pressurePlateBlocks = [];
            pressurePlates = [];
            mines = [];
            timedBlocks = [];
            explosions = [];
            atmosphericParticles = [];
        }

        let curtainAlpha = 0;
        function drawCurtain(){
            if(player.goalCountdown > 60){
                curtainAlpha+=0.015;
            } else{
                curtainAlpha-=0.015;
            }
            if(curtainAlpha < 0){
                curtainAlpha = 0;
            }
            if(curtainAlpha > 1){
                curtainAlpha = 1;
            }
            c.globalAlpha = curtainAlpha;
            ctx.globalAlpha = curtainAlpha;
            c.fillStyle = "black";
            ctx.fillStyle = "black";
            c.fillRect(0,0,480,270);
            ctx.fillRect(0,0,1200,1200);
            c.globalAlpha = 1;
            ctx.globalAlpha = 1;
        }

        function resetLevel(){
            gravity = [0, 0];
            blockSize = Math.round(1200 / levels[currentLevel].levelSize);
            gravityCharges = levels[currentLevel].gravityCharges;
            clearBlocks();
            createBlocks();
            generateAtmosphericParticles();
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
        let robotAnimation = "idle";
        let robotAnimationCountdown = 0;
        let robotAnimationReady = false;
        function drawRobot(){
            robotAnimationCountdown++;
            if(robotAnimationCountdown % 60 < 30 && robotAnimation === "idle"){
                robotFrame = 0;
            } else{
                robotFrame = 1;
            }
            if(robotAnimation === "waiting" && (gravityCharges <= 0 || player.dead)){
                robotAnimation = "idle";
                robotAnimationCountdown = 0;
            }
            if((robotAnimation === "idle" || robotAnimation === "waiting") && (canChangeGravity || player.isFirstMove) && !checkGoalCollisions(player) && gravityCharges > 0){
                robotAnimation = "windup";
                robotAnimationCountdown = 0;
            }
            if(robotAnimation === "windup"){
                robotAnimationReady = true;
                if(robotAnimationCountdown > 57){
                    robotAnimationCountdown = 57;
                }
                robotFrame = Math.floor((robotAnimationCountdown + 3) / 3);
            }
            if(robotAnimation === "right"){
                if(robotAnimationCountdown > 18){
                    robotAnimation = "waiting";
                    robotAnimationCountdown = 30;
                }
                if(robotAnimationCountdown !== 30){
                    robotFrame = Math.floor((robotAnimationCountdown + 60) / 3);
                }
            }
            if(robotAnimation === "down"){
                if(robotAnimationCountdown > 18){
                    robotAnimation = "waiting";
                    robotAnimationCountdown = 30;
                }
                if(robotAnimationCountdown !== 30){
                    robotFrame = Math.floor((robotAnimationCountdown + 81) / 3);
                }
            }
            if(robotAnimation === "left"){
                if(robotAnimationCountdown > 18){
                    robotAnimation = "waiting";
                    robotAnimationCountdown = 30;
                }
                if(robotAnimationCountdown !== 30){
                    robotFrame = Math.floor((robotAnimationCountdown + 102) / 3);
                }
            }
            if(robotAnimation === "up"){
                if(robotAnimationCountdown > 18){
                    robotAnimation = "waiting";
                    robotAnimationCountdown = 30;
                }
                if(robotAnimationCountdown !== 30){
                    robotFrame = Math.floor((robotAnimationCountdown + 123) / 3);
                }
            }
            c.drawImage(images.robot, robotFrame * 48, 0, 48, 40, -14, 55, 192, 160)
        }

        let atmosphericParticleCountdown = 0;
        function handleAtmosphericParticles(){
            atmosphericParticleCountdown++;
            if(atmosphericParticleCountdown % 40 === 0){
                let number = Math.round(Math.random() * 2) + 3;
                atmosphericParticles.push(new AtmosphericParticle(-10, Math.random() * 270, number, number));
            }
            atmosphericParticles.forEach((atmosphericParticle) => {
                atmosphericParticle.update();
                atmosphericParticle.draw();
            })
            for(let i = atmosphericParticles.length - 1; i >= 0; i--){
                if(atmosphericParticles[i].x > 480){
                    atmosphericParticles.splice(i,1);
                }
            }
        }
        function generateAtmosphericParticles(){
            for(let i = 0; i < 4000; i++){
                handleAtmosphericParticles();
                c.clearRect(0,0,480,270);
                curtainAlpha = 1;
            }
        }
        
        function drawMainCanvas (){
            c.clearRect(0,0,480,270);
            c.drawImage(images.background, 0, 0, 480, 270);
            if(sounds.atmosphere.volume < 0.5){
                sounds.atmosphere.volume += 0.002;
            }
            handleAtmosphericParticles();
            c.drawImage(images.floor, 0, 215, 480, 40);
            if(player.goalCountdown >= 40 && player.goalCountdown <= 60){
                c.drawImage(images.door, Math.floor((player.goalCountdown - 40) / 3) * 17 , 0, 17, 24, 400, 119, 64, 96);
            } else if(player.goalCountdown < 60){
                c.drawImage(images.door, 0, 0, 17, 24, 400, 119, 64, 96)
            } else{
                c.drawImage(images.door, 6 * 17 , 0, 17, 24, 400, 119, 64, 96);
            }
            drawRobot();
        }

        function drawBorder(){
            ctx.fillStyle = "black";
            ctx.fillRect(blockSize * levels[currentLevel].levelSize, 0, blockSize, 1200);
            ctx.fillRect(0, blockSize * levels[currentLevel].levelSize, 1200, blockSize);
        }

        function handleDeath(){
            if(player.dead){
                resetCountdown--;
                if(resetCountdown === 0){
                    resetLevel();
                    resetCountdown = 60;
                }
            }
        }

        function gameLoop(){
            if(sounds.music.paused){
                sounds.music.currentTime = 0;
                sounds.music.loop = true;
                sounds.music.volume = 0.3;
                sounds.music.play();
            }
            ctx.clearRect(0, 0, 1200, 1200);
            lastPressurePlatePressed = pressurePlatePressed;
            pressurePlatePressed = false;
            drawMainCanvas();
            drawBorder();
            handleDeath();
            updateButtons();
            pressurePlates.forEach((pressurePlate) => {
                pressurePlate.pressed = false;
            })
            drawAndCheckResetCharge();
            drawGravityCharges();
            updateBlocks();
            drawBlocks();
            drawCurtain();
            drawLogo();
            if(menuButtons.length === 1){
                menuButtons[0].draw();
                menuButtons[0].update();
                if(mouse.leftClick){
                    canClickButtons = false;
                } else{
                    canClickButtons = true;
                }
            }
            if(gameOn){
                requestAnimationFrame(gameLoop);
            }
            if(gameCanvas.style.display === "none"){
                gameCanvas.style.display = "block";
            }
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
            } else if(checkButtonBlockCollisions(object)){
                return true;
            } else if(checkButtonCollisions(object)){
                return true;
            } else if(checkPressurePlateBlockCollisions(object)){
                return true;
            } else if(checkTimedBlockCollisions(object)){
                return true;
            } else if(checkPressurePlateCollisions(object)){
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

        function checkTimedBlockCollisions(object){
            for(let i = 0; i < timedBlocks.length; i++){
                if(isColliding(timedBlocks[i], object)){
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

        function checkButtonBlockCollisions(object){
            for(let i = 0; i < buttonBlocks.length; i++){
                if(isColliding(buttonBlocks[i], object)){
                    return true;
                }
            }
            return false;
        }

        function checkPressurePlateBlockCollisions(object){
            for(let i = 0; i < pressurePlateBlocks.length; i++){
                if(isColliding(pressurePlateBlocks[i], object) && pressurePlateBlocks[i].active){
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

        function checkMineCollisions(object){
            for(let i = 0; i < mines.length; i++){
                if(Math.abs(object.x - mines[i].x) < Math.round(blockSize / 3) + 1 && Math.abs(object.y - mines[i].y) < Math.round(blockSize / 3) + 1){
                    explosions.push(new Explosion(mines[i].x, mines[i].y, mines[i].width, mines[i].height));
                    mines.splice(i, 1);
                    return true;
                }
            }
            return false;
        }

        function checkButtonCollisions(object){
            for(let i = 0; i < buttons.length; i++){
                if(isColliding(buttons[i], object)){
                    if(buttons[i].pressed === false){
                        sounds.beep.currentTime = 0;
                        sounds.beep.play();
                    }
                    buttons[i].pressed = true;
                    return true;
                }
            }
            return false;
        }

        let pressurePlatePressed = false;
        let lastPressurePlatePressed = false;

        function checkPressurePlateCollisions(object){
            for(let i = 0; i < pressurePlates.length; i++){
                let oldX = pressurePlates[i].x;
                let oldY = pressurePlates[i].y;
                if(pressurePlates[i].dir === Math.PI){
                    pressurePlates[i].x--;
                }
                if(pressurePlates[i].dir === 0){
                    pressurePlates[i].x++;
                }
                if(pressurePlates[i].dir === Math.PI / 2){
                    pressurePlates[i].y--;
                }
                if(pressurePlates[i].dir === -Math.PI / 2){
                    pressurePlates[i].y++;
                }
                if(isColliding(pressurePlates[i], object)){
                    pressurePlates[i].pressed = true;
                    pressurePlatePressed = true;
                }
                pressurePlates[i].x = oldX;
                pressurePlates[i].y = oldY;
                if(isColliding(pressurePlates[i], object)){
                    return true;
                }
                if((!lastPressurePlatePressed && pressurePlatePressed)){
                    sounds.pressurePlate.currentTime = 0;
                    sounds.pressurePlate.play();
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
            if(isColliding(player, object) && !object.isPlayer && !player.dead){
                return true;
            } else{
                return false;
            }
        }

        function checkBubbleCollisions(object){
            for(let i = 0; i < bubbles.length; i++){
                if(isColliding(bubbles[i], object)){
                    sounds.collect.currentTime = 0;
                    sounds.collect.play();
                    gravityCharges++;
                    bubbles.splice(i, 1);
                }
            }
        }

        function checkShieldCollisions(object){
            for(let i = 0; i < shields.length; i++){
                if(isColliding(shields[i], object) && object.shield === false){
                    sounds.collect.currentTime = 0;
                    sounds.collect.play();
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
                    sounds.collect.currentTime = 0;
                    sounds.collect.play();
                }
            }
        }

        function checkBarrierCollisions(object){
            for(let i = 0; i < barriers.length; i++){
                if(isColliding(barriers[i], object)){
                    return barriers[i].type;
                }
            }
        }
        resetLevel();
        requestAnimationFrame(gameLoop);
        menuButtons = [];
        menuButtons.push(new MenuButton(440, 10, 30, 30, images.backButton, () => {
            gameOn = false;
            menu = "title";
            loadMenu();
            sounds.atmosphere.pause();
            sounds.atmosphere.currentTime = 0;
            sounds.music.pause();
            sounds.music.currentTime = 0;
            requestAnimationFrame(titleLoop);
        }));
    }

    function isColliding(first, second){
        return first.x < second.x + second.width &&
            first.x + first.width > second.x &&
            first.y < second.y + second.height &&
            first.y + first.height > second.y;
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
        if(e.keyCode === 32){
            key.space = true;
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
        if(e.keyCode === 32){
            key.space = false;
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

    window.addEventListener("contextmenu", (e) => {
        e.preventDefault();
    })

    window.addEventListener("mousemove", (event) => {
        const rect = mainCanvas.getBoundingClientRect();
        mouse.x = (event.clientX - rect.left) * (480 / rect.width);
        mouse.y = (event.clientY - rect.top) * (270 / rect.height);
    })

    let menuButtons = [];

    class MenuButton{
        constructor(x, y, width, height, image, onPress, active = true){
            this.x = x;
            this.y = y;
            this.width = width;
            this.defaultX = x;
            this.defaultY = y;
            this.defaultWidth = width;
            this.defaultHeight = height;
            this.height = height;
            this.image = image;
            this.onPress = onPress;
            this.targetX = x;
            this.targetY = y;
            this.targetWidth = width;
            this.active = active;
        }
        draw(){
            c.drawImage(this.image,this.x,this.y,this.width,this.height)
        }
        update(){
            if(isColliding(this, mouse) && this.active){
                this.targetX = this.defaultX - this.defaultWidth / 6;
                this.targetY = this.defaultY - this.defaultHeight / 6;
                this.targetWidth = this.defaultWidth + this.defaultWidth / 3;
                this.targetHeight = this.defaultHeight + this.defaultHeight / 3;
                if(mouse.leftClick && canClickButtons && this.active){
                    this.onPress();
                    canClickButtons = false;
                }
            } else{
                this.targetX = this.defaultX;
                this.targetY = this.defaultY;
                this.targetWidth = this.defaultWidth;
                this.targetHeight = this.defaultHeight;
            }
            this.x += (this.targetX - this.x) / 5;
            this.y += (this.targetY - this.y) / 5;
            this.width += (this.targetWidth - this.width) / 5;
            this.height += (this.targetHeight - this.height) / 5;    
        }
    }

    function loadMenu(){
        menuButtons = [];
        if(menu === "title"){
            menuButtons.push(new MenuButton(210, 155, 60, 60, images.playButton, () => {
                cancelAnimationFrame(title);
                startGame(levelsUnlocked);    
                curtainAlpha = 1;   
            }));
            menuButtons.push(new MenuButton(305, 160, 50, 50, images.settingsButton, () => {
                menu = "settings";
                loadMenu();
            }));
            menuButtons.push(new MenuButton(118, 230, 244, 32, images.levelSelect, () => {
                menu = "levelSelect1";
                loadMenu();
            }));
            menuButtons.push(new MenuButton(125, 160, 50, 50, images.backButton, () => {

            }));
        }
        if(menu === "settings"){
            menuButtons.push(new MenuButton(15, 15, 30, 30, images.backButton, () => {
                menu = "title";
                loadMenu();
            }));
        }
        if(menu === "levelSelect1"){
            menuButtons.push(new MenuButton(15, 15, 30, 30, images.backButton, () => {
                menu = "title";
                loadMenu();
            }));
            menuButtons.push(new MenuButton(432, 230, 40, 32, images.rightArrow, () => {
                menu = "levelSelect2";
                loadMenu();
            }));
            for(let i = 0; i < 5; i++){
                for(let j = 0; j < 5; j++){
                    if(j * 5 + i + 1 <= levelsUnlocked){
                        menuButtons.push(new MenuButton(i * 70 + 75, j * 50 + 15, 40, 40, images.levels[j * 5 + i], () => {
                            cancelAnimationFrame(title);
                            startGame(j * 5 + i + 1);        
                            curtainAlpha = 1; 
                        }, true));
                    } else{
                        menuButtons.push(new MenuButton(i * 70 + 75, j * 50 + 15, 40, 40, images.lockedLevel, () => {}, false));
                    }
                }
            }
        }
        if(menu === "levelSelect2"){
            menuButtons.push(new MenuButton(15, 15, 30, 30, images.backButton, () => {
                menu = "title";
                loadMenu();
            }));
            menuButtons.push(new MenuButton(8, 230, 40, 32, images.leftArrow, () => {
                menu = "levelSelect1";
                loadMenu();
            }));
            menuButtons.push(new MenuButton(432, 230, 40, 32, images.rightArrow, () => {
                menu = "levelSelect3";
                loadMenu();
            }));
            for(let i = 0; i < 5; i++){
                for(let j = 0; j < 5; j++){
                    if(j * 5 + i + 26 <= levelsUnlocked){
                        menuButtons.push(new MenuButton(i * 70 + 75, j * 50 + 15, 40, 40, images.levels[j * 5 + i + 25], () => {
                            cancelAnimationFrame(title);
                            startGame(j * 5 + i + 26);        
                            curtainAlpha = 1; 
                        }, true));
                    } else{
                        menuButtons.push(new MenuButton(i * 70 + 75, j * 50 + 15, 40, 40, images.lockedLevel, () => {}, false));
                    }
                }
            }
        }
        if(menu === "levelSelect3"){
            menuButtons.push(new MenuButton(15, 15, 30, 30, images.backButton, () => {
                menu = "title";
                loadMenu();
            }));
            menuButtons.push(new MenuButton(8, 230, 40, 32, images.leftArrow, () => {
                menu = "levelSelect2";
                loadMenu();
            }));
            menuButtons.push(new MenuButton(432, 230, 40, 32, images.rightArrow, () => {
                menu = "levelSelect4";
                loadMenu();
            }));
            for(let i = 0; i < 5; i++){
                for(let j = 0; j < 5; j++){
                    if(j * 5 + i + 51 <= levelsUnlocked){
                        menuButtons.push(new MenuButton(i * 70 + 75, j * 50 + 15, 40, 40, images.levels[j * 5 + i + 50], () => {
                            cancelAnimationFrame(title);
                            startGame(j * 5 + i + 51);        
                            curtainAlpha = 1; 
                        }, true));
                    } else{
                        menuButtons.push(new MenuButton(i * 70 + 75, j * 50 + 15, 40, 40, images.lockedLevel, () => {}, false));
                    }
                }
            }
        }
        if(menu === "levelSelect4"){
            menuButtons.push(new MenuButton(15, 15, 30, 30, images.backButton, () => {
                menu = "title";
                loadMenu();
            }));
            menuButtons.push(new MenuButton(8, 230, 40, 32, images.leftArrow, () => {
                menu = "levelSelect3";
                loadMenu();
            }));
            for(let i = 0; i < 5; i++){
                for(let j = 0; j < 5; j++){
                    if(j * 5 + i + 76 <= levelsUnlocked){
                        menuButtons.push(new MenuButton(i * 70 + 75, j * 50 + 15, 40, 40, images.levels[j * 5 + i + 75], () => {
                            cancelAnimationFrame(title);
                            startGame(j * 5 + i + 76);        
                            curtainAlpha = 1; 
                        }, true));
                    } else{
                        menuButtons.push(new MenuButton(i * 70 + 75, j * 50 + 15, 40, 40, images.lockedLevel, () => {}, false));
                    }
                }
            }
        }
    }
    
    let canClickButtons;
    let title;
    let menu = "title";
    loadMenu();
    function titleLoop(){
        if(gameCanvas.style.display = "block"){
            gameCanvas.style.display = "none";
        }
        gameCanvas.style.display = "none";
        title = requestAnimationFrame(titleLoop);
        c.clearRect(0,0,480,270);
        if(menu === "title"){
            c.drawImage(images.title, 30, 60, 460, 92);
        }
        for(let i = 0; i < menuButtons.length; i++){
            menuButtons[i].draw();
            menuButtons[i].update();
        }
        if(mouse.leftClick){
            canClickButtons = false;
        } else{
            canClickButtons = true;
        }
        //c.drawImage(images.playButton, 210, 160, 60, 60);
    }

    window.addEventListener("load", () => {
        titleLoop();
    })