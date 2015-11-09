var SpaceHipster = SpaceHipster || {};

SpaceHipster.Boot = function (){};

SpaceHipster.Boot.prototype = {
	preload: function(){
		// Cargamos lo que usaremos en la pantalla de carga
		this.load.image("logo", "assets/images/logo.png");
		this.load.image("preloadbar", "assets/images/preloader-bar.png");
	},
	create: function(){
		// Le damos un fondo blanco a nuestra pantalla de carga
		this.game.stage.backgroundColor = "#fff";
		// scaling options
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.minWidth = 240;
		this.scale.minHeight = 170;
		this.scale.maxWidth = 2880;
		this.scale.maxHeight = 1920;

		// centramos el juego horizontalmente
		this.scale.pageAlignHorizontally = true;

		// El tamaño de la pantalla se establecerá automáticamente
		// this.scale.setScreenSize(true);

		// Sistema de física para los movimientos
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.state.start('Preload');
	},
};