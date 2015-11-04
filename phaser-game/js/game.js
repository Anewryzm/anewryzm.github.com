//creamos el objeto Phaser y lo guardamos en la variable 'game'
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

//función de precarga
function preload() {
	// Hacemos el precargado de los archivos dentro de 'assets'
	// Usamos 'game.load.image()'
	// El primer parámetro es el nombre que usaremos para hacer referencia a nuestra imagen
	// El segundo parámetro es la ruta a nuestra imagen
	game.load.image("sky", "assets/sky.png");
	game.load.image("ground", "assets/platform.png");
	game.load.image("star", "assets/star.png");

	// Para nuestro personaje ('dude') precargamos el sprite
	// De forma similar a las imágenes. Los otros dos parámetros son width y height
	game.load.spritesheet("dude", "assets/dude.png", 32, 48);

}
	// Variables locales
	var player;
	var platforms;
	var cursors;

	var stars;
	var score = 0;
	var scoreText;

//función de inicio de creación del juego
function create() {
	// Para poder utilizar física en nuestro juego
	// debemos activar el sistema de Física Arcade
	// game.physics.startSystem(Phaser.Physics.ARCADE);
// 
	// Agregamos un fondo con origen en x:0 y:0
	game.add.sprite(0,0, "sky");

	// Agrupamos las plataformas
	platforms = game.add.group();

	// Activamos la física a lo que se encuentra dentro de plataforma
	platforms.enableBody = true;

	// Creamos el suelo
	// 'game.world.height' accede al alto establecido en la variable game, que es instancia de Phaser.Game()

	var ground = platforms.create(0, game.world.height - 64, "ground");

	// Escalamos a 'ground' para que encaje en la parte de abajo
	ground.scale.setTo(2,2);

	// Inmovilizamos al suelo para que no se caiga cuando los objetos colisionen con ellos
	ground.body.immovable = true;

	// Ahora crearemos dos superficies flotantes
	var ledge = platforms.create(400, 400, "ground");
	ledge.body.immovable = true;

	ledge = platforms.create(-150, 250, "ground");
	ledge.body.immovable = true;

	// Creamos al jugador
	player = game.add.sprite(32, game.world.height-150, "dude");

	// Activamos la física para el jugador
	// game.physics.arcade.enable(player);

	// Algunas propiedades físicas del jugador.
	player.body.bounce.y = 0.1;
	player.body.gravity.y = 6;
	player.body.collideWorldBounds = true;

	// Establecemos las animaciones para nuestro jugador
	// para caminar a la izquierda y derecha
	// con 'player.animations()'

	player.animations.add('left', [0,1,2,3], 10, true);
	player.animations.add('right', [5,6,7,8], 10, true);

	// Creacion de las estrellas
	// Agrupamos las estrellas
	stars = game.add.group();

	// Activamos la física de las estrellas
	stars.enableBody = true;

	// Creamos una iteración para crear doce estrellas
	for (var i = 0; i < 12; i++) {
		// Creamos estrellas dentro del grupo correspondiente
		// Conforme 'i' aumenta, la posición en x va aumentando
		// de 70 en 70px
		var star = stars.create(i*70, 0, "star");

		// Dejamos a la gravedad hacer su trabajo
		star.body.gravity.y = 6;

		// Hacemos que las estrellas reboten de forma aleatoria
		// con valores entre 0.7 y 0.9
		star.body.bounce.y = 0.7 + Math.random()*0.2

	};

	// Agregamos un contador de puntaje en la posicion x:16 y:16
	scoreText = game.add.text(16,16, 'score:0',{fontSize: "32px", fill: "#000"});


	// Agregamos los controles para nuestro jugador
	// 'up', 'down', 'left', 'right' están establecidas por defecto

	cursors = game.input.keyboard.createCursorKeys();


}

//función llamada durante el juego, en cada frame
function update() {

	// Hacemos que nuestro jugador haga colision con las plataformas y las estrellas
	game.physics.collide(player, platforms);
	game.physics.collide(stars, platforms);

	// Si el jugador se superpone con la estrellas llamamos
	// a la funcion collectStar()
	game.physics.overlap(player, stars, collectStar, null, this);

	// Reseteamos la velocidad del jugador
	player.body.velocity.x = 0;

	// Si el control 'left' ha sido presionado
	if (cursors.left.isDown) {
		// El jugador se mueve a la izquierda
		player.body.velocity.x = -150;
		// El sprite 'left' se activa cuando el jugador se mueve hacia la izquierda
		player.animations.play("left");
	}
	// Si el control 'right' ha sido presionado
	else if(cursors.right.isDown){
		// El jugador se mueve a la derecha
		player.body.velocity.x = 150;
		// El sprite 'right' se activa cuando el jugador se mueve hacia la derecha
		player.animations.play("right");
	}
	else{
		// Detenemos las animaciones
		player.animations.stop();
		// El frame 4 es la vista frontal del personaje
		player.frame = 4;
	}

	// Activamos el salto del jugador siempre y cuando se encuentre en el suelo
	if (cursors.up.isDown && player.body.touching.down) {
		player.body.velocity.y = -350;
	};

}

function collectStar(player,star){
	// Cuando la funcion collectStar() es llamada
	// eliminamos a la estrella en contacto

	star.kill();

	// Actualizamos el puntaje
	score += 10;
	scoreText.content = "Score: " + score;
	console.log(scoreText)

}