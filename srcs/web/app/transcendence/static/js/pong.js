import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import * as UTILS from './threeJsUtils.js';
import * as PONG from './pongUtils.js';

const X_SIZE_MAP = 20;

// ------------------------------------classes------------------------------------
class Arena {
	constructor(scene) {
		this.cube = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(X_SIZE_MAP, 1, 20)), new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 }));
		this.hitbox = new THREE.Box3().setFromObject(this.cube);

		// this.cube.castShadow = true;
		// this.cube.receiveShadow = true;

		scene.add(this.cube);
	}
}

class Player {
	constructor(playerType, scene) {
		this.type = playerType;
		this.speed = 0.1;
		this.size = 2;
		this.cube = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, this.size), new THREE.MeshStandardMaterial({ color: 0xff0000 }));
		this.hitbox = new THREE.Box3().setFromObject(this.cube);
		this.score = 0;
		this.keys = {
			up: "",
			down: "",
		};

		if (playerType == "left") {
			this.keys = { up: "w", down: "s" };
			this.cube.position.x = -(X_SIZE_MAP / 2) + 1;
		} else if (playerType == "right") {
			this.keys = { up: "ArrowUp", down: "ArrowDown" };
			this.cube.position.x = X_SIZE_MAP / 2 - 1;
		}

		this.cube.position.y = -0.3;

		this.cube.castShadow = true;
		this.cube.receiveShadow = true;

		scene.add(this.cube);
	}

	move(keys, arena, deltaTime) {
		this.hitbox.setFromObject(this.cube);
		this.speed = 0.1 * deltaTime;
		if (keys[this.keys['up']]) {
			PONG.playerHitTop(this, arena.hitbox);
		}
		if (keys[this.keys['down']]) {
			PONG.playerHitBottom(this, arena.hitbox);
		}
	}

	reset() {
		this.cube.position.z = 0;
	}
}

class Ball {
	constructor(scene) {
		this.speed = 0.1;
		this.direction = new THREE.Vector3(Math.round(Math.random()) * 2 - 1, 0, 0);
		this.cube = new THREE.Mesh(new THREE.SphereGeometry(0.4, 32, 32), new THREE.MeshStandardMaterial({ color: 0x00ff00 }));
		this.hitbox = new THREE.Box3().setFromObject(this.cube);

		this.cube.position.y = -0.2;

		this.cube.castShadow = true;
		this.cube.receiveShadow = true;
		scene.add(this.cube);
	}

	move(scene, playerLeft, playerRight, button, arena, game, deltaTime) {

		// After pinch (slow systeme)
		if (this.speed > 0.1) {
			this.speed -= 0.1;
		}

		this.hitbox.setFromObject(this.cube);

		PONG.ballHitTopOrBot(this, arena.hitbox);

		if (PONG.ballHitGoal(this, arena.hitbox) == "left") {
			playerLeft.score += 1;
			this.reset(scene, playerLeft, playerRight, button, game);
		} else if (PONG.ballHitGoal(this, arena.hitbox) == "right") {
			playerRight.score += 1;
			this.reset(scene, playerLeft, playerRight, button, game);
		}

		playerLeft.hitbox.setFromObject(playerLeft.cube);
		playerRight.hitbox.setFromObject(playerRight.cube);
		PONG.ballHitPlayer(this, playerLeft);
		PONG.ballHitPlayer(this, playerRight);

		PONG.ballPinch(this, playerLeft, arena.hitbox);
		PONG.ballPinch(this, playerRight, arena.hitbox);

		PONG.ballAntiBlockSystem(this, playerLeft);
		PONG.ballAntiBlockSystem(this, playerRight);

		// Setup the director vector
		this.direction.normalize();
		this.direction.multiplyScalar(this.speed * deltaTime);
		this.cube.position.add(this.direction);
	}

	reset(scene, playerLeft, playerRight, button, game) {
		updateScore(scene, playerLeft, playerRight, button, game);
		this.cube.position.x = 0;
		this.cube.position.z = 0;
		this.direction.set(Math.round(Math.random()) * 2 - 1, 0, 0);
		playerLeft.reset();
		playerRight.reset();
	}
}

let textScore = new THREE.Mesh(UTILS.doTextGeo("0 - 0", 1.5), new THREE.MeshBasicMaterial({ color: 0xffffff }));

function updateScore(scene, playerLeft, playerRight, button, game) {
	if (scene && textScore) {
		// If the TextScore already exist, remove it
		scene.remove(textScore);
	}

	if (playerLeft.score == 10 || playerRight.score == 10) {
		// End of the game
		button.innerHTML = "RESTART";
		button.style.display = "block";
		game.going = false;
		game.memGoing = false;
	}
	let scoreString = playerLeft.score.toString() + " - " + playerRight.score.toString();
	textScore = new THREE.Mesh(UTILS.doTextGeo(scoreString, 1.5), new THREE.MeshBasicMaterial({ color: 0xffffff }));

	// Add to the scene and set positions
	textScore.position.x = -2;
	textScore.position.z = -11;
	textScore.position.y = 1;
	scene.add(textScore);
}


// ------------------------------------setup------------------------------------
export function pong3D() {

	let game = {
		going: false,
		memGoing: false,
	}

	const scene = UTILS.createScene();
	const renderer = UTILS.createRenderer();
	const button = UTILS.createContainerForGame("pong", renderer);
	button.addEventListener("click", () => {
		game.going = true;
		button.style.display = "none";
		playerLeft.score = 0;
		playerRight.score = 0;
	});

	// 3d Title
	const title = new THREE.Mesh(UTILS.doTextGeo("PONG", 5, true), new THREE.MeshStandardMaterial({ color: 0xffffff }));

	title.position.x = -9;
	title.position.z = -17;
	title.position.y = 1.16;
	title.rotation.x = -0.7;

	scene.add(title);

	// Floor
	const floor = new THREE.Mesh(new THREE.BoxGeometry(X_SIZE_MAP, 0.1, 20), new THREE.MeshStandardMaterial({ color: 0xffffff }));

	floor.position.y = -0.6;
	floor.receiveShadow = true;
	floor.castShadow = true;
	scene.add(floor);

	// Camera
	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.z = 10;
	camera.position.y = X_SIZE_MAP - 5;

	let controls = new OrbitControls(camera, renderer.domElement);
	controls.enableRotate = true;
	controls.rotateSpeed = 1.0;
	controls.target.set(0, 0, 0);

	// ------------------------------------blocks------------------------------------
	const arena = new Arena(scene);
	const ball = new Ball(scene);
	const playerLeft = new Player("left", scene);
	const playerRight = new Player("right", scene);

	// ------------------------------------light------------------------------------
	// Spot light that follow the ball
	const spot = new THREE.SpotLight(0xffffff, 50, 100, Math.PI / 8, 0);
	// Directional light that enlighte all the elements
	const globalLight = new THREE.DirectionalLight(0xffffff, 1);
	// Setup the position of both light
	spot.position.set(0, X_SIZE_MAP / 2, 0);
	globalLight.position.set(0, 10, 20);

	// Enable shadow casting
	globalLight.castShadow = true;
	spot.castShadow = true;

	// Setup the light data and fov
	globalLight.shadow.camera.left = -(X_SIZE_MAP / 2);
	globalLight.shadow.camera.right = X_SIZE_MAP / 2;
	globalLight.shadow.camera.top = 10;
	globalLight.shadow.camera.bottom = -10;
	globalLight.shadow.camera.near = 0.5;
	globalLight.shadow.camera.far = 500;

	scene.add(spot);
	scene.add(spot.target);
	scene.add(globalLight);
	updateScore(scene, playerLeft, playerRight, button, game);

	// ------------------------------------keys------------------------------------
	let keys = {};
	document.addEventListener('keydown', (e) => keys[e.key] = true);
	document.addEventListener('keyup', (e) => keys[e.key] = false);

	// ------------------------------------functions------------------------------------

	// To delete (cheats for debug)
	function debug() {
		if (keys['r']) {
			playerLeft.score = 0;
			playerRight.score = 0;
			ball.reset(scene, playerLeft, playerRight, button, game);
		}
		if (keys['4']) {
			ball.direction.x = 0;
			ball.direction.z = 0;
			ball.direction.y = 0;
			ball.cube.position.x = playerLeft.cube.position.x;
			ball.cube.position.z = playerLeft.cube.position.z + 2;
		}
		if (keys['5']) {
			ball.direction.x = 0;
			ball.direction.z = 0;
			ball.direction.y = 0;
			ball.cube.position.x = playerRight.cube.position.x;
			ball.cube.position.z = playerRight.cube.position.z + 2;
		}
		if (keys['1']) {
			ball.direction.x = 0;
			ball.direction.z = 0;
			ball.direction.y = 0;
			ball.cube.position.x = playerLeft.cube.position.x;
			ball.cube.position.z = playerLeft.cube.position.z - 2;
		}
		if (keys['2']) {
			ball.direction.x = 0;
			ball.direction.z = 0;
			ball.direction.y = 0;
			ball.cube.position.x = playerRight.cube.position.x;
			ball.cube.position.z = playerRight.cube.position.z - 2;
		}
	}

	let lastTime = 0;
	// ------------------------------------loop------------------------------------
	function animate(currentTime) {
		if (lastTime) {
			let delta = (currentTime - lastTime) / 10;
			if (game.going) {
				playerLeft.move(keys, arena, delta);
				playerRight.move(keys, arena, delta);
			}
			if (game.going && !game.memGoing) {
				game.memGoing = true;
				ball.reset(scene, playerLeft, playerRight, button, game);
			}

			ball.move(scene, playerLeft, playerRight, button, arena, game, delta);
			spot.target.position.set(ball.cube.position.x, ball.cube.position.y, ball.cube.position.z);
			debug();

			controls.update();
			renderer.render(scene, camera);
		}
		lastTime = currentTime;
		requestAnimationFrame(animate);
	}

	animate();
}