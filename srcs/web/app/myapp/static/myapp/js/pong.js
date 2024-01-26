import { main } from './app.js';
import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


export function pong()
{

	class Arena {
		constructor(scene) {
			this.cube = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(20, 20, 1)), new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 }));
			this.hitbox = new THREE.Box3().setFromObject(this.cube);
	
			// this.cube.castShadow = true;
			// this.cube.receiveShadow = true;
	
			scene.add( this.cube );
		}
	}
	
	class Player {
		constructor(playerType, scene) {
			this.type = playerType;
			this.speed = 0.1;
			this.cube = new THREE.Mesh( new THREE.BoxGeometry( 0.5, 2, 0.5 ), new THREE.MeshStandardMaterial( { color: 0xff0000 } ) );
			this.hitbox = new THREE.Box3().setFromObject(this.cube);
			this.score = 0;
	
			if (playerType == "left") {
				this.cube.position.x = -9;
			} else if (playerType == "right") {
				this.cube.position.x = 9;
			}
			this.cube.position.z = -0.25;
	
			this.cube.castShadow = true;
			this.cube.receiveShadow = true;
	
			scene.add( this.cube );
		}
	
		move(keys, arena) {
			this.hitbox.setFromObject(this.cube);
			if (this.type == "left") {
				if (keys['w']) {
					if (this.hitbox.max.y + this.speed < arena.hitbox.max.y) {
						this.cube.position.y += this.speed;
					} else {
						this.cube.position.y = arena.hitbox.max.y - 1;
					}
				}
				if (keys['s']) {
					if (this.hitbox.min.y - this.speed > arena.hitbox.min.y) {
						this.cube.position.y -= this.speed;
					} else {
						this.cube.position.y = arena.hitbox.min.y + 1;
					}
				}
			} else if (this.type == "right") {
				if (keys['ArrowUp']) {
					if (this.hitbox.max.y + this.speed < arena.hitbox.max.y) {
						this.cube.position.y += this.speed;
					} else {
						this.cube.position.y = arena.hitbox.max.y - 1;
					}
				}
				if (keys['ArrowDown']) {
					if (this.hitbox.min.y - this.speed > arena.hitbox.min.y) {
						this.cube.position.y -= this.speed;
					} else {
						this.cube.position.y = arena.hitbox.min.y + 1;
					}
				}
			}
		}
	
		reset() {
			this.cube.position.y = 0;
		}
	}
	
	class Ball {
		constructor(scene) {
			this.speed = 0.1;
			this.dirX = Math.round(Math.random()) * 2 - 1;
			this.dirY = 0;
			this.cube = new THREE.Mesh( new THREE.SphereGeometry( 0.4, 32, 32), new THREE.MeshStandardMaterial( { color: 0x00ff00 } ) );
			this.hitbox = new THREE.Box3().setFromObject(this.cube);
	
			this.cube.position.z = -0.2;
	
			this.cube.castShadow = true;
			this.cube.receiveShadow = true;
			scene.add( this.cube );
		}
	
		move(playerLeft, playerRight, arena) {
			this.cube.position.x += this.speed * this.dirX;
			this.cube.position.y += this.speed * this.dirY;
	
			// Don't need to update the arena hitbox because it's a static object
			//arena.hitbox.setFromObject(arena.cube);
	
			// If the ball hit the bottom or top
			this.hitbox.setFromObject(this.cube);
			arena.hitbox.setFromObject(arena.cube);
			if (this.hitbox.max.y >= arena.hitbox.max.y || this.hitbox.min.y <= arena.hitbox.min.y) {
				this.dirY *= -1;
			}
	
			// If the ball go through the player line (scoring)
			if (this.cube.position.x >= 10) {
				playerLeft.score += 1;
				this.reset();
			} else if (this.cube.position.x <= -10) {
				playerRight.score += 1;
				this.reset();
			}
	
			// If the ball hit the player (bounce)
			playerLeft.hitbox.setFromObject(playerLeft.cube);
			playerRight.hitbox.setFromObject(playerRight.cube);
			if (this.hitbox.min.x <= playerLeft.hitbox.max.x && this.hitbox.min.x > playerLeft.hitbox.min.x && this.hitbox.max.y >= playerLeft.hitbox.min.y && this.hitbox.min.y <= playerLeft.hitbox.max.y) {
				this.dirY = (this.cube.position.y - playerLeft.cube.position.y) / 2;
				this.dirX = 1;
			} else if (this.hitbox.max.x >= playerRight.hitbox.min.x && this.hitbox.max.x < playerRight.hitbox.max.x && this.hitbox.max.y >= playerRight.hitbox.min.y && this.hitbox.min.y <= playerRight.hitbox.max.y) {
				this.dirY = (this.cube.position.y - playerRight.cube.position.y) / 2;
				this.dirX = -1;
			}
			
		}
	
		reset() {
			updateScore();
			this.cube.position.x = 0;
			this.cube.position.y = 0;
			this.dirX = Math.round(Math.random()) * 2 - 1;
			this.dirY = 0;
			playerLeft.reset();
			playerRight.reset();
		}
	}
	
	// ------------------------------------setup------------------------------------
	// Scene
	const scene = new THREE.Scene();
	const renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	document.body.appendChild( renderer.domElement );
	
	// Font gestion
	let textScore, theFont;
	function loadFont(url) {
		return new Promise((resolve, reject) => {
			const loader = new FontLoader();
	
			loader.load(url, function (font) {
				resolve(font);
			}, undefined, function (error) {
				reject(error);
			});
		});
	}
	// Wait for the font to be loaded (async)
	// await loadFont('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json')
	// 	.then(font => {
	// 		theFont = font;
	// 	})
	// 	.catch(error => {
	// 		console.log("the font could not be loaded: " + error);
	// 	});
	
	// 3d Title
	const title = new THREE.Mesh( doTextGeo("PONG", 5, true), new THREE.MeshStandardMaterial( { color: 0xffffff } ) );
	
	title.position.x = -9;
	title.position.y = 17;
	title.position.z = -1.16;
	title.rotation.x = 0.2;
	
	scene.add( title );
	
	// Floor
	const floor = new THREE.Mesh( new THREE.PlaneGeometry( 20, 20 ), new THREE.MeshStandardMaterial( { color: 0xffffff } ) );
	
	floor.position.z = -0.5;
	floor.receiveShadow = true;
	floor.castShadow = true;
	scene.add( floor );
	
	// Camera
	const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.position.y = -10;
	camera.position.z = 15;
	camera.rotation.x = 0.55;
	
	let controls = new OrbitControls(camera, renderer.domElement);
	controls.enableRotate = true;
	controls.rotateSpeed = 1.0;
	controls.target.set(0, 0, 0);
	
	// ------------------------------------blocks------------------------------------
	const arena = new Arena(scene);
	const ball = new Ball(scene);
	const playerLeft = new Player("left", scene);
	const playerRight = new Player("right", scene);
	
	const spot = new THREE.SpotLight( 0xffffff, 50, 100, Math.PI / 8, 0);
	const globalLight = new THREE.DirectionalLight( 0xffffff , 1 );
	spot.position.set( 0, 0, 10 );
	globalLight.position.set( 0, -20, 10 );
	
	globalLight.castShadow = true;
	spot.castShadow = true;
	
	globalLight.shadow.camera.left = -10;
	globalLight.shadow.camera.right = 10;
	globalLight.shadow.camera.top = 10;
	globalLight.shadow.camera.bottom = -10;
	globalLight.shadow.camera.near = 0.5;
	globalLight.shadow.camera.far = 500;
	
	scene.add( spot );
	scene.add( spot.target );
	scene.add( globalLight );
	updateScore();
	
	// ------------------------------------keys------------------------------------
	let keys = {};
	document.addEventListener('keydown', (e) => keys[e.key] = true);
	document.addEventListener('keyup', (e) => keys[e.key] = false);
	
	// ------------------------------------functions------------------------------------
	function doTextGeo(text, fontSize, threeD = false) {
		return new TextGeometry( text, {
			font: theFont,
			size: fontSize,
			height: 1 * threeD,
			curveSegments: 12,
			bevelEnabled: threeD,
			bevelThickness: 0.01,
			bevelSize: 0.1,
			bevelOffset: 0,
			bevelSegments: 5
		} );
	}
	
	function updateScore() {
	
		if (textScore) {
			// If the TextScore already exist, remove it
			scene.remove(textScore);
		}
	
		if (playerLeft.score == 10 || playerRight.score == 10) {
			// End of the game
			playerLeft.score = 0;
			playerRight.score = 0;
			ball.reset();
		} else {
			let scoreString = playerLeft.score.toString() + " - " + playerRight.score.toString();
			textScore = new THREE.Mesh( doTextGeo(scoreString, 1.5), new THREE.MeshBasicMaterial( { color: 0xffffff } ) );	
			
			// Add to the scene and set positions
			textScore.position.x = -2;
			textScore.position.y = 11;
			textScore.position.z = 1;
			scene.add( textScore );
		}
	}
	
	function debug() {
		if (keys['r']) {
			playerLeft.score = 0;
			playerRight.score = 0;
			ball.reset();
		}
		if (keys['+']) {
			camera.rotation.x += 0.01;
		}
		if (keys['-']) {
			camera.rotation.x -= 0.01;
		}
		if (keys['8']) {
			camera.position.y += 0.1;
		}
		if (keys['5']) {
			camera.position.z += 0.1;
		}
		if (keys['2']) {
			camera.position.y -= 0.1;
		}
		if (keys['4']) {
			camera.position.x -= 0.1;
		}
		if (keys['6']) {
			camera.position.x += 0.1;
		}
		if (keys['0']) {
			camera.position.z -= 0.1;
		}
		if (keys['7']) {
			camera.rotation.z += 0.01;
		}
		if (keys['9']) {
			camera.rotation.z -= 0.01;
		}
		if (keys['1']) {
			camera.rotation.y += 0.01;
		}
		if (keys['3']) {
			camera.rotation.y -= 0.01;
		}
		if (keys['d']) {
			playerLeft.speed += 0.01;
			playerRight.speed += 0.01;
			ball.speed += 0.01;
		}
		if (keys['a']) {
			playerLeft.speed -= 0.01;
			playerRight.speed -= 0.01;
			ball.speed -= 0.01;
		}
	}
	
	// ------------------------------------loop------------------------------------
	function animate() {
		requestAnimationFrame( animate );
	
		playerLeft.move(keys, arena);
		playerRight.move(keys, arena);
		ball.move(playerLeft, playerRight, arena);
		spot.target.position.set(ball.cube.position.x, ball.cube.position.y, ball.cube.position.z);
		debug();
	
		controls.update();
	
		renderer.render( scene, camera );
	}
	
	animate();
}