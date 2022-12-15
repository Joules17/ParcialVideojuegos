class Escena extends Phaser.Scene {
  constructor() {
    super('init');
  }
    preload() {
      // images
      this.load.image('bg_image', '../Flappy/assets/images/city.jpg');
      this.load.spritesheet('barry', '../Flappy/assets/images/barries.png', {frameWidth: 37, frameHeight: 50});
      this.load.image('tube0', '../Flappy/assets/images/tube0.png'); 
      this.load.image('tubearriba0', '../Flappy/assets/images/tubearriba0.png');
      this.load.image('tubeabajo0', '../Flappy/assets/images/tubeabajo0.png');
      this.load.image('tube1', '../Flappy/assets/images/tube1.png'); 
      this.load.image('tubearriba1', '../Flappy/assets/images/tubearriba1.png');
      this.load.image('tubeabajo1', '../Flappy/assets/images/tubeabajo1.png');

    }

    create() {
      this.add.sprite(480, 270, 'bg_image'); 
      this.bg = this.add.tileSprite(960, 540, 1920, 1080, 'bg_image').setScrollFactor(0);
      this.player = this.physics.add.sprite(50, 100, 'barry')
      
      this.anims.create({
        key: 'volar',
        frames: this.anims.generateFrameNumbers('barry', {start: 0, end: 1}),
        frameRate: 5,
        repeat: -1,
      });

      this.anims.create({
        key: 'saltar',
        frames: this.anims.generateFrameNumbers('barry', {start: 2, end: 2}),
        frameRate: 7,
        repeat: 1,
      });
      this.player.play('volar');

      this.input.keyboard.on('keydown', (event) => {
        if (event.keyCode === 32) {
          this.saltar();
        }
      });
      this.input.on('pointerdown', () => this.saltar());
      this.player.on('animationcomplete', this.animationComplete, this); 
      this.nuevaColumna(); 

      this.physics.world.on('worldbounds', (body) => {
        this.scene.start('finScene');
      });
    
      this.player.setCollideWorldBounds(true);
      this.player.body.onWorldBounds = true;

    }

    update (time ) {
      this.bg.tilePositionX = time*0.1;
    }

    animationComplete(animation, frame, sprite) {
      if (animation.key === 'saltar') {
        this.player.play('volar');
      }
    }
    saltar () {
      this.player.setVelocityY(-200); 
      this.player.play('saltar');
    }

    nuevaColumna() {
      //Una columna es un grupo de cubos
      const columna = this.physics.add.group();
      //Cada columna tendrá un hueco (zona en la que no hay cubos) por dónde pasará el super héroe
      const hueco = Math.floor(Math.random() * 5) + 1;
      const aleatorio = Math.floor(Math.random() * 2);
      for (let i = 0; i < 8; i++) {
          //El hueco estará compuesto por dos posiciones en las que no hay cubos, por eso ponemos hueco +1
        if (i !== hueco && i !== hueco + 1 && i !== hueco - 1) {
          let cubo; 
          if (i == hueco - 2) {
            cubo = columna.create(960, i * 90, 'tubearriba' + aleatorio);
          } else if (i == hueco + 2) {
            cubo = columna.create(960, i * 90, 'tubeabajo' + aleatorio);
          } else {
            cubo = columna.create(960, i * 90, 'tube' + aleatorio);
          }
          cubo.body.allowGravity = false;
        }
      }
      columna.setVelocityX(-200);
      //Detectaremos cuando las columnas salen de la pantalla...
      columna.checkWorldBounds = true;
      //... y con la siguiente línea las eliminaremos
      columna.outOfBoundsKill = true;
      //Cada 1000 milisegundos llamaremos de nuevo a esta función para que genere una nueva columna
      this.time.delayedCall(1000, this.nuevaColumna, [], this);
      this.physics.add.overlap(this.player, columna, this.hitColumna, null, this);
    }

    hitColumna() {
      this.scene.start('finScene');
    }
}

class EscenaFinal extends Phaser.Scene {
  constructor () {
    super('finScene');

  }

  preload () {
    this.load.image('fondoFin', '../Flappy/assets/images/PERDISTE.png');

  }

  create () {
    this.add.sprite(480, 350, 'fondoFin');
    this.input.on('pointerdown', () => this.volverAJugar());

  }

  volverAJugar() {
    this.scene.start('init'); 
  }
}

const config = {
    type: Phaser.AUTO,
    width: 960,
    height: 640,
    scene: [Escena, EscenaFinal],
    scale: {
		mode: Phaser.Scale.FIT
    },
    physics: {
		default: 'arcade',
		arcade: {
			debug: true,
			gravity: {
				y: 500,
			},
		},
	},
};

new Phaser.Game(config);

