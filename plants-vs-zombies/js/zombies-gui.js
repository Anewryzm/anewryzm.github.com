Quintus.ZombiesGUI = function(Q){
	//  Panel
	Q.UI.Container.extend("SidePanel",{
		init: function(p){
			this._super(Q._defaults(p,{
				fill: "#E1DEB7",
				x: 120/2,
				y:768/2,
				radius:0,
				border: 0,
				shadow: 0,
				w: 120,
				h: 768,
			}));
			this.on("inserted");

			// var panel = this

			Q.state.on("change.sun", function(){
				// panel.refreshStats();
				Q("SidePanel",0).items[0].refreshStats();
			});

		},
		inserted: function(){

			// botones
			// var sun = new Q.Sprite({
			// 	asset: "sun.png",
			// 	x: 60,
			// 	y:40
			// });
			// this.stage.insert(sun);

			this.stage.insert(new Q.Sprite({
				asset: "sun.png",
				x: 60,
				y: 40
			}));

			// this.totalSun = new Q.UI.Text({
			// 	x:60,
			// 	y:60,
			// 	label: " "
			// });
			// this.stage.insert(this.totalSun);

			this.totalSun = this.stage.insert(new Q.UI.Text({
				x:60,
				y:60,
				label: " "
			}));

			// correct stats
			this.refreshStats();

			// Insert plant type buttons

			var x = 40, y =180, plantObject;
			Q._each(this.p.plantTypes, function(element, index, list){
				plantObject = Q.plantTypes[element];
				this.stage.insert(new Q.PlantButton({x: x, y:y, asset: plantObject.asset, plant: plantObject}))
				this.stage.insert(new Q.UI.Text({x: x+40, y: y, label: plantObject.cost+""}));
				y += 90;
			}, this);

		},
		refreshStats: function(){
			this.totalSun.p.label = Q.state.get("sun") + "";
		},

	});

	// Buttons

	Q.UI.Button.extend("PlantButton",{
		init: function(p){
			this._super(Q._defaults(p,{
				scale:0.6
			}), function(){
				// console.log("click");

				var plantButtons = Q("PlantButton").items;
				Q._each(plantButtons, function(element, index,list){
					element.trigger("unselected");
				}, this);

				this.p.opacity = 0.5;
				Q.state.set("currentPlant", this.p.plant);
			});
				this.on("unselected", function(){
					this.p.opacity = 1;
				});
		},
	});

};