export class Settings {
	constructor() {
		// площадь блока
		this.blockSquare 		= 5;
		// размер и площадь чанка
		this.chunkSize 			= 16;
		this.chunkSquare 		= this.chunkSize * this.chunkSize;
	}
}