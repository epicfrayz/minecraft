import * as THREE from './three.module.js';
import { Settings } from "./settings.js";

export class Map {
    constructor(){
		this.materialArray;
		
		this.xoff = 0;
		this.zoff = 0;
		this.inc = 0.05;
		this.amplitude = 30 + (Math.random() * 70);
    }
    generation(scene) {
		const settings = new Settings();

		const loader = new THREE.TextureLoader();
		const materialArray = ["dirt-side.jpg", "dirt-side.jpg", "dirt-top.jpg", "dirt-bottom.jpg", "dirt-side.jpg", "dirt-side.jpg"].map(v => {
			let texture = loader.load(`../texture/${v}`);
			texture.magFilter = THREE.NearestFilter;
			texture.minFilter = THREE.NearestFilter;
			return new THREE.MeshBasicMaterial({ map: texture });
		})

		this.materialArray = materialArray;

		const geometry = new THREE.BoxGeometry( settings.blockSquare, settings.blockSquare, settings.blockSquare);
		console.log(geometry);

		noise.seed(Math.random());
		
		for(let x = 0; x < settings.chunkSize; x++) {
			for(let z = 0; z < settings.chunkSize; z++) {

				let cube = new THREE.Mesh(geometry, materialArray);
				

				this.xoff = this.inc * x;
				this.zoff = this.inc * z;
				let y = Math.round(noise.perlin2(this.xoff, this.zoff) * this.amplitude / 5) * 5;

				cube.position.set(x * settings.blockSquare, y, z * settings.blockSquare);
				scene.add( cube );
				
			}
		}
	}
}