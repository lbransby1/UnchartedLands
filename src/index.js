import Phaser from 'phaser'

export default class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('tiles', 'assets/TileSheets/cave.png')
        this.load.tilemapTiledJSON('tilemap', 'assets/Maps/Dungeon.json')
    }
      
    create ()
    {
        this.add.image(0, 0, 'dungeon_tiles')
        const map = this.make.tilemap({ key: 'tilemap' })
        const tileset = map.addTilesetImage('cave', 'cave')

        // map.createStaticLayer('water', tileset)
        // map.createStaticLayer('void', tileset)
        // map.createStaticLayer('floor', tileset)
        // map.createStaticLayer('walls', tileset)
        // map.createStaticLayer('waterrocks', tileset)
        // map.createStaticLayer('rocks', tileset)
        // map.createStaticLayer('light', tileset)
        // map.createStaticLayer('statues', tileset)
        // map.createStaticLayer('holes', tileset)
        // map.createStaticLayer('shading', tileset)
        

    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: MyGame
};

const game = new Phaser.Game(config);
