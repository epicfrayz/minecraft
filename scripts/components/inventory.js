export class Inventory {
	constructor(canvas, count) {
		this.count = count;
		this.items = [];
		this.indexActive = 0;
		this.objects = [
			"./texture/inventory/dirt.png",
			"./texture/inventory/rock.png",
		]

		this.init();

		if (canvas.addEventListener) {
			if ('onwheel' in document) {
				// IE9+, FF17+, Ch31+
				document.addEventListener("wheel", (e) => { this.onWheel(e, this) } );
			} else if ('onmousewheel' in document) {
				// устаревший вариант события
				document.addEventListener("mousewheel", (e) => { this.onWheel(e,this) } );
			} else {
				// Firefox < 17
				document.addEventListener("MozMousePixelScroll", (e) => { this.onWheel(e,this) } );
			}
		} else { 
			// IE8-
			document.attachEvent("onmousewheel", (e) => { this.onWheel(e,this) } );
		}
	}
	init() {
		let inventory = document.createElement("div");
		inventory.id = "inventory";
		for(let i = 0; i < this.count; i++) {
			let item = document.createElement("div");
			if( this.objects[i] ) {
				let img = document.createElement("img");
				img.setAttribute("src", this.objects[i] );
				item.append( img );
			}
			this.items.push( item );
			inventory.append( item );
		}
		this.items[ this.indexActive ].classList.add("select");
		document.querySelector("body").append( inventory );
	}  
	onWheel(e, that) {
		e = e || window.event;
		
		// wheelDelta не даёт возможность узнать количество пикселей
		var delta = e.deltaY || e.detail || e.wheelDelta;
		if ( delta > 0 ) {
			// console.log("left");
			if ( that.indexActive == 0 ) {
				that.indexActive = that.items.length - 1;
			} else {
				that.indexActive--;
			}

		} else if (delta < 0) {
			// console.log("right");
			if ( that.indexActive == that.items.length - 1 ) {
				that.indexActive = 0;
			} else {
				that.indexActive++;
			}
		}
		this.selectItem();
	}
	selectItem() {
		this.items.forEach((el) => {
			el.classList.remove("select");
		});
		this.items[ this.indexActive ].classList.add("select");
	}

	
}