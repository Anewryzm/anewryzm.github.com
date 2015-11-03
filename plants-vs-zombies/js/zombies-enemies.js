Quintus.ZombiesEnemies = function(Q){

	// Zombie types
	Q.zombieTypes = {
		boy:{
			asset: "zombie_boy.png",
			vx: -20,
			damage: 1,
			energy: 10
		},
		girl:{
			asset: "zombie_girl.png",
			vx: -30,
			damage: 1.2,
			energy: 15
		},
		boss:{
			asset: "zombie_boss.png",
			vx: -60,
			damage: 3,
			energy: 40
		},

	};

	// Zombie
	Q.Sprite.extend("Zombie",{
		init: function(p){
			this._super(p,{
				type: Q.SPRITE_ZOMBIE,
				collisionMask: Q.SPRITE_BULLET | Q.SPRITE_PLANT,
				x: 1280 + 60,
			});
			this.p.originalVx = this.p.vx;
			this.add("2d");

			this.on("bump.left", function(collision){
				if (collision.obj.isA("Plant")) {
					// console.log("chocan");

					if (collision.obj.p.isExploding) {
						// console.log("isExploding")
						this.p.energy -= collision.obj.p.damage;
						Q.audio.play("boom.mp3");
						collision.obj.destroy();
					}
					else{
						collision.obj.takeDamage(this.p.damage);
					}

				}
				else if (collision.obj.isA("Bullet")) {
					// console.log("disparo")
					this.p.energy -= collision.obj.p.damage;
					Q.audio.play("hit.mp3");
					collision.obj.destroy();
					// console.log(this.p.energy)
				};

				this.p.vx = this.p.originalVx;
			});

		},
		step: function(dt){
			if(this.p.x <= 270){
				this.destroy();
				console.log("The zombies ate your brain");
				// restart game
				Q.stageScene("level", {levelData: Q("Level").first().p.levelData});
			};

			if (this.p.energy <= 0) {
				this.destroy();
			};
		},
	});
};