Quintus.ZombiesGameplay = function(Q){
	Q.Sprite.extend("Level",{
		init:function(p){
			this._super(p,{
				asset: "background.png",
				type: Q.SPRITE_GROUND,
				x: 1280/2,
				y: 768/2,
				w: 1160,
				h: 768,
				sunFrecuency: {min: 1, max: 5},
			});

			this.timeNextSun = this.getTimeNextSun();

			// Level data
			this.zombieIndex = 0;
			this.numZombies = this.p.levelData.zombies.length;
			this.levelTime = 0;

			this.plantsGrid = new Array( new Array(9), new Array(9), new Array(9), new Array(9), new Array(9), new Array(9));

		  this.on("touch");

		},
		touch: function(touch){
		// Detectando cuando se toca el suelo
			// console.log("you touched the ground");
			if (Q.state.get("currentPlant")) {
				var row = Math.floor((touch.y)/120);
				var col = Math.floor((touch.x - 240)/120);

				if(row >= 0 && row < this.plantsGrid.length && col >= 0 && col < this.plantsGrid[0].length){
					if (!this.plantsGrid[row][col] && Q.state.get("sun")>= Q.state.get("currentPlant").cost) {
						Q.state.dec("sun", Q.state.get("currentPlant").cost);
						this.plantsGrid[row][col] = Q.state.get("currentPlant");
						var newPlant = new Q.Plant(Q._extend({x:240 + 60 + col*120, y:60 + row*120}, Q.state.get("currentPlant")));
						this.stage.insert(newPlant);
						this.plantsGrid[row][col] = newPlant;
						newPlant.p.gridRow = row;
						newPlant.p.gridCol = col;

					};
				}

			};


		},
		step: function(dt){
			// Update level duration
			this.levelTime +=dt;

			// Check for level passed
			if (this.levelTime >= this.p.levelData.duration) {
				// console.log("Level Completed!");
				if (this.p.levelData.nextLevel) {
					Q.stageScene("level",{
						levelData: Q.assets[this.p.levelData.nextLevel]
					});
				};
			};

			// Create zombies at the defined times

			if (this.zombieIndex < this.numZombies) {
				var currentZombie = this.p.levelData.zombies[this.zombieIndex];
				if (this.levelTime >= currentZombie.time) {
					var zombieData = Q.zombieTypes[currentZombie.type];
					var newZombie = new Q.Zombie(
						Q._extend(zombieData, {y:currentZombie.row*120+60})
					);
					this.stage.insert(newZombie);
					this.zombieIndex++;
				};
			};

			// Update sun generation timing
			this.timeNextSun -= dt;
			if (this.timeNextSun <= 0) {
				this.timeNextSun = this.getTimeNextSun();
				Q.stage(1).insert(new Q.Sun());
			};
		},
		getTimeNextSun: function(){
			return this.p.sunFrecuency.min + Math.random()*(this.p.sunFrecuency.max - this.p.sunFrecuency.min)
		},
	});
};