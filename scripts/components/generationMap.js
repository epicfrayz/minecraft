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
		const materialArray = [
			new THREE.MeshBasicMaterial( { map: loader.load("../texture/dirt-side.jpg") } ),
			new THREE.MeshBasicMaterial( { map: loader.load('../texture/dirt-side.jpg') } ),
			new THREE.MeshBasicMaterial( { map: loader.load('../texture/dirt-top.jpg') } ),
			new THREE.MeshBasicMaterial( { map: loader.load('../texture/dirt-bottom.jpg') } ),
			new THREE.MeshBasicMaterial( { map: loader.load('../texture/dirt-side.jpg') } ),
			new THREE.MeshBasicMaterial( { map: loader.load('../texture/dirt-side.jpg') } )
		];

		this.materialArray = materialArray;

		const geometry = new THREE.BoxGeometry( settings.blockSquare, settings.blockSquare, settings.blockSquare);

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