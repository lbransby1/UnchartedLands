const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    heigth: 640,
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: {
      preload,
      create,
      update,
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 500 },
      },
    }
  };
  
  const game = new Phaser.Game(config);
  
    function preload ()
        {
           this.load.image("tiles", "assets/cave.png")
           this.load.tilemapTiledJSON("map", "assets/dungeon_v2.json")
        }

    function create ()
        {
            const map = this.make.tilemap({key : "map"});
            const tileset = map.addTilesetImage("dungeon_tileset", "tiles");
            const platforms = map.createLayer("Floor", tileset, 0,200);
        }
  
  function update() {
  }
  