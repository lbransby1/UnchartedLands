const config = {
  type: Phaser.AUTO,
  parent: 'game',
  noMargins: true,
  pixelArt: true,
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

function preload() {
  this.load.image("tiles", "assets/cave.png");
  this.load.tilemapTiledJSON("map", "assets/dungeon.json");
  this.load.spritesheet('player', 'assets/MaleCharacter.png', { frameWidth: 16, frameHeight: 16 });
  this.load.scenePlugin('AnimatedTiles', 'https://raw.githubusercontent.com/nkholski/phaser-animated-tiles/master/dist/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');
}

function create() {
  this.scale.refresh();
  // loading in the map
  const map = this.make.tilemap({ key: "map" });
  const tileset = map.addTilesetImage("dungeon_tileset", "tiles");
  const floor = map.createLayer("floor", tileset, 0, 0);
  const water = map.createLayer("water", tileset, 0, 0);
  const statue = map.createLayer("statue", tileset, 0, 0);
  const lights = map.createLayer("lights", tileset, 0, 0);
  const walls = map.createLayer("walls", tileset, 0, 0);
  this.animatedTiles.init(map);

  // player Script
  player = this.physics.add.sprite(100, 100, 'player');
  player.setCollideWorldBounds(true);

  cursors = this.input.keyboard.createCursorKeys(); // kb input

  // Create animations for each direction
  this.anims.create({
      key: 'walkDown',
      frames: this.anims.generateFrameNumbers('player', { start: 1, end: 3 }), // Use frames 1, 2, and 3 for downwards movement
      frameRate: 10,
      repeat: -1,
  });

  this.anims.create({
      key: 'walkUp',
      frames: this.anims.generateFrameNumbers('player', { start: 5, end: 7 }), // Use frames 5, 6, and 7 for upwards movement
      frameRate: 10,
      repeat: -1,
  });

  this.anims.create({
      key: 'walkLeft',
      frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15 }), // Use frames 12, 13, 14, and 15 for left movement
      frameRate: 10,
      repeat: -1,
  });

  this.anims.create({
      key: 'walkRight',
      frames: this.anims.generateFrameNumbers('player', { start: 8, end: 11 }), // Use frames 8, 9, 10, and 11 for right movement
      frameRate: 10,
      repeat: -1,
  });

  // Set up camera to follow player with smooth movement
  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  this.cameras.main.startFollow(player, true, 0.1, 0.1); // The 0.1 values set the lerp for x and y directions
  this.cameras.main.setZoom(3); // Optional: Zoom in for a closer view
}

function update() {
  player.setVelocity(0);

  if (cursors.left.isDown) {
      player.setVelocityX(-160);
      player.anims.play('walkLeft', true);
  } else if (cursors.right.isDown) {
      player.setVelocityX(160);
      player.anims.play('walkRight', true);
  } else if (cursors.up.isDown) {
      player.setVelocityY(-160);
      player.anims.play('walkUp', true);
  } else if (cursors.down.isDown) {
      player.setVelocityY(160);
      player.anims.play('walkDown', true);
  } else {
      player.anims.stop();
  }
}
