import { theFont } from "./pong.js";
import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

export function shooter() {
	class Player {
		constructor(name, x, z) {
			this.name = name;
			this.speed = 0.1;
			this.pos = new THREE.Vector3(x, 0, z);
			this.dir = new THREE.Vector3(0, 0, 0);
			this.hp = 150;
			this.dmg = 30;
			this.ammo = 8;
		}

		move(keys) {
			if (keys['shift']) {
				this.speed = 0.2;
			}
			if (keys['w']) {
				let tmpDir = new THREE.Vector3(this.dir.x, 0, this.dir.z);
				tmpDir.normalize();
				tmpDir.multiplyScalar(this.speed);
				this.pos.add(tmpDir);
			}
			if (keys['s']) {
				let tmpDir = new THREE.Vector3(this.dir.x, 0, this.dir.z);
				tmpDir.normalize();
				tmpDir.multiplyScalar(this.speed);
				this.pos.sub(tmpDir);
			}
		}

		shoot(keys) {

		}

		takeDmg() {

		}
	}

	let going = false;
	let memGoing = false;

	const main = document.querySelector("main");

	const container = document.createElement("div");
	container.id = "shooter";
	main.appendChild(container);

	const button = document.createElement("button");
	button.id = "buttonShooter3D";
	button.innerHTML = "PLAY";
	container.appendChild(button);
	button.addEventListener("click", () => {
		going = true;
		button.style.display = "none";
	});

	// Get the header and footer rect box
	const headerRect = document.querySelector('header').getBoundingClientRect();
	const footerRect = document.querySelector('footer').getBoundingClientRect();

	const scene = new THREE.Scene();
	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight - headerRect.bottom - footerRect.bottom);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	container.appendChild(renderer.domElement);

	let player = new Player("test", 0, 0);

	// Camera
	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.x = player.pos.x;
	camera.position.y = player.pos.y + 2;
	camera.position.z = player.pos.z;
	camera.rotation.x = 0;
	camera.rotation.y = 0;
	camera.rotation.z = 0;

	let controls = new PointerLockControls(camera, renderer.domElement);

	// Floor
	const floor = new THREE.Mesh(new THREE.BoxGeometry(20, 0.1, 20), new THREE.MeshStandardMaterial({ color: 0xffffff }));
	floor.receiveShadow = true;
	floor.castShadow = true;
	scene.add(floor);

	// Keys
	let keys = {};
	document.addEventListener('keydown', (e) => keys[e.key] = true);
	document.addEventListener('keyup', (e) => keys[e.key] = false);

	const globalLight = new THREE.DirectionalLight(0xffffff, 1);
	// Setup the position of both light
	globalLight.position.set(0, 20, 0);

	// Enable shadow casting
	globalLight.castShadow = true;

	// Setup the light data and fov
	globalLight.shadow.camera.left = -(20 / 2);
	globalLight.shadow.camera.right = 20 / 2;
	globalLight.shadow.camera.top = 10;
	globalLight.shadow.camera.bottom = -10;
	globalLight.shadow.camera.near = 0.5;
	globalLight.shadow.camera.far = 500;

	scene.add(globalLight);

	// Créer un helper d'axes avec une taille de 5
	let axesHelper = new THREE.AxesHelper(5);
	axesHelper.position.set(1, 1, 1);

	// Ajouter le helper d'axes à la scène
	scene.add(axesHelper);

	document.addEventListener('click', function () {
		controls.lock();
	});

	function animate() {
		requestAnimationFrame(animate);

		player.move(keys);
		camera.position.x = player.pos.x;
		camera.position.y = player.pos.y + 2;
		camera.position.z = player.pos.z;
		camera.getWorldDirection(player.dir);


		
		renderer.render(scene, camera);
	}

	animate();
}