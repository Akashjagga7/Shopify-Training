<template>
	<picture :id="imageId" class="image" :style="style">
		<source 
			:data-srcset="srcset"
			:sizes="sizes"
			aria-hidden="true"
			:srcset="srcset"
		/>
		<img
			class="image__elem"
			:src="initialSrc" 
			:alt="obj.alt" 
		/>
	</picture>
</template>

<script>
const set = [100, 116, 134, 156, 182, 210, 244, 282, 328, 380, 442, 512, 594, 688, 798, 926, 1074, 1246, 1446, 1678, 1946, 2258, 2618, 3038]
const noImage = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
export default {
	props: {
		obj: { type: Object,default: () => ({}) },
		widthParam: { type: String, default: 'w' },
		sizes: { type: String, default: '100vw' },
		fit: { type: String, default: 'cover' },
		standard: { type: Boolean, default: true },
		load: { type: Boolean, default: true },
	},
	computed: {	
		imageId() {
			const num = Math.floor(Math.random() * 1000)	
			return `image${num}`
		},

		width() {
			return this.obj.width
		},

		url() {
			return this.obj.url
		},

		initialSrc() {
			const url = this.standard ? `${this.url}&${this.widthParam}=10` : noImage
			return url
		},

		style() {
			const h = this.obj.height
			const w = this.width
			return {
				'--maxw': `${w}px`,
				'--maxh': `${h}px`,
				'--aspect-ratio': `var(--ov-aspect-ratio, ${h/w})`, 
				'--image-fit': this.fit
			}
		},

		srcset() {
			if(!this.standard) return this.url;

			const w = this.width
			const url = this.url
			const wp = this.widthParam;
			let a = false
			
			return set.reduce((newSizes, size) => {
				if(a) return newSizes;

				if(size <= w) {
					newSizes.push(`${this.url}&${wp}=${size} ${size}w`)
				}else {
					newSizes.push(`${this.url}&${wp}=${w} ${w}w`);
					a = true
				}

				return newSizes;
			}, [])
		}
	},

	mounted(){
		if(!this.load) return;
		const	lazyImages = window.lazyImages = window.lazyImages || []
		const el = document.querySelector(`#${this.imageId}`)
		if(el && window.lazyImageFn) window.lazyImageFn(el);
		else if(el) lazyImages.push(el)
	}
}
</script>