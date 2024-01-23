const config = {
    type: Phaser.AUTO,
    parent: 'game',
    noMargins: true,
    pixelArt: true,
    width: 600,
    height: 350,
    backgroundColor: '#211629',
    physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 0 },
          debug: false
      }
  },
    scale: {
      autoCenter: Phaser.Scale.CENTER_BOTH,
      mode: Phaser.Scale.FIT,
      
      zoom: 1  // Size of game canvas = game size * zoom

    },
  
    scene: {
      preload,
      create,
      update,
    },
    
  };
  
var player;
var cursors;

var game = new Phaser.Game(config);
  
    function preload ()
        {
           this.load.image("tiles", "assets/cave.png")
           this.load.tilemapTiledJSON("map", "assets/dungeon_B.json")
           this.load.image('player', 'assets/square.png');
        }

    function create ()
        {
            
            this.scale.refresh();
            // loading in the map
            const map = this.make.tilemap({key : "map"});
            const tileset = map.addTilesetImage("dungeon_tileset", "tiles");
            const floor = map.createLayer("floor", tileset, 0, 0);
            const water = map.createLayer("water", tileset, 0, 0)
            const statue = map.createLayer("statue", tileset, 0, 0)
            const lights = map.createLayer("lights", tileset, 0, 0)

            // player Script
            player = this.physics.add.sprite(100, 100, 'player');
            player.setCollideWorldBounds(true);

            cursors = this.input.keyboard.createCursorKeys();//kb input
        }
  
  function update() {
        // Player movement
        if (cursors.left.isDown) {
          player.setVelocityX(-160);
      } else if (cursors.right.isDown) {
          player.setVelocityX(160);
      } else {
          player.setVelocityX(0);
      }
  
      if (cursors.up.isDown) {
          player.setVelocityY(-160);
      } else if (cursors.down.isDown) {
          player.setVelocityY(160);
      } else {
          player.setVelocityY(0);
      }
  }
  