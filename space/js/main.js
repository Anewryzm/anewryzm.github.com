// Creamos una variable 'namespace' única para evitar conflictos
// con otras librerías que tal vez estemos usando.
var SpaceHipster = SpaceHipster || {};

// Iniciamos un nuevo juego
SpaceHipster.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

SpaceHipster.game.state.add("Boot", SpaceHipster.Boot);

SpaceHipster.game.state.add("Preload", SpaceHipster.Preload);
SpaceHipster.game.state.add("MainMenu", SpaceHipster.MainMenu);
SpaceHipster.game.state.add("Game", SpaceHipster.Game);

SpaceHipster.game.state.start("Boot");