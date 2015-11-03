window.addEventListener("load", function(){

	var Q = window.Q = Quintus({development: true})
										.include("Sprites, Scenes, 2D, Input, Anim, UI, Touch, Audio")
										.include("ZombiesGUI, ZombiesPlants, ZombiesEnemies, ZombiesGameplay")
										.setup({
											width: 1280,
											height: 768,
											scaleToFit: true
										});

  // Activando el audio
  Q.enableSound(); 
  // Apagando la gravedad
  Q.gravityX = 0;
  Q.gravityY = 0;
  
  // Constantes
  Q.SPRITE_SUN = 2;
  Q.SPRITE_ZOMBIE = 4;
  Q.SPRITE_PLANT = 8;
  Q.SPRITE_BULLET = 16;
  Q.SPRITE_GROUND = 32;
  Q.SPRITE_UI = 64;

  // Enable touch

  Q.touch(Q.SPRITE_SUN | Q.SPRITE_GROUND | Q.SPRITE_UI);

	// Escene

	Q.scene("level", function(stage){
		var level = new Q.Level({levelData: stage.options["levelData"]});

		stage.insert(level);

		// var sprite2 = new Q.Zombie({
		// 	x: 700,
		// 	y: 600,
		// 	asset: Q.zombieTypes["boy"].asset,
		// 	vx: Q.zombieTypes["boy"].vx
		// });

		var sprite2 = new Q.Zombie(
			Q._extend({x: 700, y: 600}, Q.zombieTypes["boy"])
		);

		var sprite3 = new Q.Zombie(
			Q._extend({x: 600, y:200}, Q.zombieTypes["boy"])
		);

		var sprite4 = new Q.Zombie(
			Q._extend({x: 650, y:350}, Q.zombieTypes["girl"])
		);

		// var plant1 = new Q.Plant(
		// 	Q._extend({x:300, y:600}, Q.plantTypes["plant"])
		// );

		// var plant2 = new Q.Plant(
			// Q._extend({x:275, y:350}, Q.plantTypes["chilli"])
		// );
// 
		// var plant3 = new Q.Plant(
			// Q._extend({x:275, y:250}, Q.plantTypes["sunflower"])
		// );

		// stage.insert(plant1);
		// stage.insert(plant2);
		// stage.insert(plant3);
		

		// stage.insert(sprite2);
		// stage.insert(sprite3);
		// stage.insert(sprite4);


		var sidePanel = new Q.SidePanel({
			plantTypes: stage.options["levelData"]["availablePlants"]
		});
		stage.insert(sidePanel)


	});

	Q.load("boom.mp3, hit.mp3, coins.mp3, level1.json, level2.json,corn.png, zombie_boss.png, sunflower.png, background.png, chilli.png, zombie_boy.png, zombie_girl.png, sun.png, plant.png, bullet.png", function(){

		Q.state.reset({sun: 120});
		Q.stageScene("level", {levelData: Q.assets["level1.json"]});
		Q.stageScene("sun", 1);

		// var sun1 = new Q.Sun();
		// var sun2 = new Q.Sun();
		// var sun3 = new Q.Sun();
		// var sun4 = new Q.Sun();
		// var sun5 = new Q.Sun();
		// Q.stage(1).insert(sun1);
		// Q.stage(1).insert(sun2);
		// Q.stage(1).insert(sun3);
		// Q.stage(1).insert(sun4);
		// Q.stage(1).insert(sun5);

	});										

});