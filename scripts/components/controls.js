import * as THREE from "./three.module.js";
import { Settings } from "./settings.js";

export class Controls {
	constructor(controls, scene, mapWorld){
		this.controls = controls;
		this.keys = [];
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
		this.keys.push(e.key);
	}
	// отпустили клавишу
	inputKeyup(e) {
		let newArr = [];
		for(let i = 0; i < this.keys.length; i++){
			if(this.keys[i] != e.key){
				newArr.push(this.keys[i]);
			}
		}
		this.keys = newArr;
	}
	update() {
		// Движение камеры
		if ( this.keys.includes("w") || this.keys.includes("ц") ) {
			this.controls.moveForward(this.movingSpeed);
		}
		if ( this.keys.includes("a") || this.keys.includes("ф") ) {
			this.controls.moveRight(-1 * this.movingSpeed);
		}
		if ( this.keys.includes("s") || this.keys.includes("ы") ) {
			this.controls.moveForward(-1 * this.movingSpeed);
		}
		if ( this.keys.includes("d") || this.keys.includes("в") ) {
			this.controls.moveRight(this.movingSpeed);
		}
	}
}