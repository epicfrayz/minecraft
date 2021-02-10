import * as THREE from "./three.module.js";
import { Settings } from "./settings.js";

export class Controls {
	constructor(controls, scene, mapWorld){
		this.controls = controls;
		this.keys = new Set();
		this.movingSpeed = 1.5;
		this.scene = scene;
		this.mapWorld = mapWorld;
	}
	// клик
	onClick(e) {
		e.stopPropagation();
		e.preventDefault();

		this.controls.lock();

		if (e.button == 0) {
			this.onLeftClick(e);
		} else if (e.button == 2) {			
			this.onRightClick(e);
		}
	}
	onRightClick(e){
		// Удаление элемента по клику

		const raycaster = new THREE.Raycaster();
		
		raycaster.setFromCamera( new THREE.Vector2(), this.controls.getObject() );
		let intersects = raycaster.intersectObjects( this.scene.children );
		
		if (intersects.length < 1)
			return;
		this.scene.remove( intersects[0].object );
	}
	onLeftClick(e) {

		const raycaster = new THREE.Raycaster();
		const settings = new Settings();

		// Поставить элемент по клику
		const geometry = new THREE.BoxGeometry(settings.blockSquare, settings.blockSquare, settings.blockSquare);
		const cube = new THREE.Mesh(geometry, this.mapWorld.materialArray);
		
		raycaster.setFromCamera( new THREE.Vector2(), this.controls.getObject() );
		const intersects = raycaster.intersectObjects( this.scene.children );
		if (intersects.length < 1)
			return;
		const psn = intersects[0].object.position;
		switch(intersects[0].face.materialIndex) {
			case 0:
				cube.position.set(psn.x + 5, psn.y, psn.z); 
				break;
			case 1: 
				cube.position.set(psn.x - 5, psn.y, psn.z); 
				break;
			case 2:
				cube.position.set(psn.x, psn.y + 5, psn.z); 
				break;
			case 3:
				cube.position.set(psn.x, psn.y - 5, psn.z); 
				break;
			case 4:
				cube.position.set(psn.x, psn.y, psn.z + 5); 
				break;
			case 5: 
				cube.position.set(psn.x, psn.y, psn.z - 5); 
				break;
		}

		this.scene.add(cube);
	}
	// нажали на клавишу
	inputKeydown(e) {
		this.keys.add(e.key.toLowerCase());
	}

	// отпустили клавишу
	inputKeyup(e) {
		this.keys.delete(e.key.toLowerCase());
	}

	update() {
		// Движение камеры

		// Вперёд и назад
		if ( this.keys.has("w") || this.keys.has("ц") ) {
			this.controls.moveForward(this.movingSpeed);
		} else if ( this.keys.has("s") || this.keys.has("ы") ) {
			this.controls.moveForward(-1 * this.movingSpeed);
		}

		// Вправо и влево
		if ( this.keys.has("d") || this.keys.has("в") ) {
			this.controls.moveRight(this.movingSpeed);
		} else if ( this.keys.has("a") || this.keys.has("ф") ) {
			this.controls.moveRight(-1 * this.movingSpeed);
		}

		// Вниз и вверх
		if ( this.keys.has("shift")) {
			this.controls.moveUp(-this.movingSpeed / 2);
		} else if (this.keys.has(" ")) {
			this.controls.moveUp(this.movingSpeed / 2);
		}
	}
}