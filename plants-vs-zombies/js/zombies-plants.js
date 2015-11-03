Quintus.ZombiesPlants = function(Q){
	// Sun
	Q.Sprite.extend("Sun",{
		init: function(p){
			this._super(p,{
				asset: "sun.png",
				type: Q.SPRITE_SUN,
				y: -120,
				x: 300 + Math.random()*(1080-360),
				vy: 80,
				finalY: 60 + Math.random()*(720 - 60),
				expirationTime: 3
			});
			this.add("2d");
			this.on("touch");
		},
		touch: function(touch){
			// console.log(touch);
			// console.log("touching sun");
			Q.state.inc("sun", 25);
			Q.audio.play("coins.mp3");
			this.destroy();
		},
		step: function(dt){
			if (this.p.y >= this.p.finalY) {
				this.p.vy = 0;
				this.p.expirationTime -= dt;
	
				if (this.p.expirationTime <= 0) {
					this.destroy();
				};
			};
		},
	});

	// Plant types
	Q.plantTypes = {
		plant:{
			asset: "plant.png",
			cost: 100,
			energy: 10,
			isShooter: true,
			shootingFrequency: 2,
			damage: 2,
		},
		corn:{
			asset: "corn.png",
			cost: 150,
			energy: 20,
			isShooter: true,
			shootingFrequency: 5,
			damage: 3,
		},
		chilli:{
			asset: "chilli.png",
			cost: 50,
			energy: 10,
			isExploding: true,
			damage: 30,
		},
		sunflower: {
			asset: "sunflower.png",
			cost: 75,
			energy: 15,
			isSunProducer: true,
			sunFrequency: 4,
		}
	};

	// Plant
	Q.Sprite.extend("Plant",{
		init: function(p){
			this._super(p, {
				type: Q.SPRITE_PLANT,
			});
			this.add("2d");

			// init timer for shooters
			if (this.p.isShooter) {
				this.p.timeToShoot = this.p.shootingFrequency;
			};

			// init timer for sun producers
			if (this.p.isSunProducer) {
				// console.log("sunflower");
				this.p.timeToSun = this.p.sunFrequency;
			};

		},
		step: function(dt){
			// check for death
			if (this.p.energy <= 0) {
				this.destroy();
			};

			// shooter plants
			if (this.p.isShooter) {
				this.p.timeToShoot -= dt;
				if (this.p.timeToShoot <=0) {
					this.p.timeToShoot = this.p.shootingFrequency;
					// create a new bullet
					this.stage.insert(new Q.Bullet({
						x: this.p.x,
						y: this.p.y,
						damage: this.p.damage,
					}));
				};
			};

			if (this.p.isSunProducer) {
				// console.log("isSunProducer");

				this.p.timeToSun -= dt;

				if (this.p.timeToSun<= 0) {
				// console.log("new sun");

				this.p.timeToSun = this.p.sunFrequency;
					Q.stage(1).insert(new Q.Sun({
						x: this.p.x -50 + 100*Math.random(),
						y: this.p.y,
						vy:0,
						finalY: this.p.y
					}));
				};

			};


		},
		takeDamage: function(damage){
			this.p.energy -= damage/50;
			// console.log(this.p.energy)
		},

		destroy: function(){
			Q("Level").first().plantsGrid[this.p.gridRow][this.p.gridCol] = null;
			this._super();
		},
	});

	// Bullets
	Q.Sprite.extend("Bullet",{
		init: function(p){
			this._super(p,{
				type: Q.SPRITE_BULLET,
				asset: "bullet.png",
				vx: 300
			});
			this.add("2d");
		},
		step: function(dt){
			if(this.p.x>=1280){
				this.destroy();
			}
		},
	});

};