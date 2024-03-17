<template>
<div>
    <div id="threejs-container" />
</div>
</template>

<script lang="ts" setup>
import * as THREE from 'three'
import WebGL from 'three/addons/capabilities/WebGL.js'
import brush from '~/assets/img/burash01.png'

onMounted(() => {
class CustomScene {
    private readonly scene: THREE.Scene
    private readonly scene1: THREE.Scene
    private viewWidth: number
    private viewHeight: number
    private readonly camera: THREE.OrthographicCamera
    private renderer: THREE.WebGLRenderer
    private baseTexture: THREE.WebGLRenderTarget
    private meshes: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>[] = []
    private mouse: THREE.Vector2 = new THREE.Vector2(0, 0)
    private prevMouse: THREE.Vector2 = new THREE.Vector2(0, 0)
    private currentWave: number = 0
    private max: number = 100
    private time: number = 50
    private isPlaying: boolean = true
    private readonly material: any

    constructor () {
    this.scene = new THREE.Scene()
    this.scene1 = new THREE.Scene()

    this.viewWidth = window.innerWidth
    this.viewHeight = window.innerHeight
    this.camera = new THREE.OrthographicCamera(
        this.viewWidth / -2,
        this.viewWidth / 2,
        this.viewHeight / 2,
        this.viewHeight / -2,
        1,
        1000
    )
    this.camera.position.set(0, 0, 100)
    this.camera.lookAt(0, 0, 0)

    this.baseTexture = new THREE.WebGLRenderTarget(
        this.viewWidth,
        this.viewHeight, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat
        }
    )

    const planeGeometry = new THREE.PlaneGeometry(this.viewWidth, this.viewHeight)
    this.material = new THREE.ShaderMaterial({
        vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
        fragmentShader: `
        uniform float time;
        uniform float progress;
        uniform sampler2D uTexture;
        uniform sampler2D uDisplacement;
        uniform vec4 resolution;
        varying vec2 vUv;
        varying vec3 vPosition;

        void main() {
            vec4 displacement = texture2D(uDisplacement, vUv);
            float theta = displacement.r * 1.00 * 3.141592653589793238;
            vec2 dir = vec2(sin(theta), cos(theta));
            vec2 uv = vUv + dir * displacement.r * 0.02;
            vec4 color = texture2D(uTexture, uv);
            gl_FragColor = color;
        }

`,

        uniforms: {
        uTexture: { value: new THREE.TextureLoader().load('https://images.unsplash.com/photo-1574577457890-57d56460e04c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') },
        uDisplacement: { value: null }
        }
    })

    const backgroundPlane = new THREE.Mesh(planeGeometry, this.material)
    this.scene1.add(backgroundPlane)

    this.renderer = new THREE.WebGLRenderer({ alpha: true }) // Set alpha to true for transparent background
    this.renderer.setSize(this.viewWidth, this.viewHeight)
    document.getElementById('threejs-container')?.appendChild(this.renderer.domElement)
    window.addEventListener('resize', () => this.onWindowResize())
    window.addEventListener('mousemove', e => this.onMouseMove(e))
    window.addEventListener('click', e => this.onMouseMove(e))
    this.createMeshes()
    this.camera.position.z = 5
    this.render()
    }

    private createMeshes () {
    const plane = new THREE.PlaneGeometry(75, 75, 1, 1)
    const neonGlow = [
        '#FF0000', // Red
        '#FFFF00', // Yellow
        '#00FF00', // Lime
        '#00FFFF', // Cyan
        '#FF00FF' // Magenta
    ]
    for (let i = 0; i < this.max; i++) {
        const material = new THREE.MeshBasicMaterial({
        color: neonGlow[Math.floor(Math.random() * (5 + 1))],
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        depthWrite: false,
        map: new THREE.TextureLoader().load(brush)
        })
        const mesh = new THREE.Mesh(plane, material)
        mesh.rotation.z = 2 * Math.PI * Math.random()
        mesh.visible = false
        this.scene.add(mesh)
        this.meshes.push(mesh)
    }
    }

    private onWindowResize () {
    this.viewWidth = window.innerWidth
    this.viewHeight = window.innerHeight
    this.camera.left = this.viewWidth / -2
    this.camera.right = this.viewWidth / 2
    this.camera.top = this.viewHeight / 2
    this.camera.bottom = this.viewHeight / -2
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    private onMouseMove (event: MouseEvent) {
    this.mouse.x = event.clientX - (this.viewWidth / 2)
    this.mouse.y = (this.viewHeight / 2) - event.clientY
    }

    stop () {
    this.isPlaying = false
    }

    play () {
    this.isPlaying = true
    }

    setNewWave (x: number, y: number, i: number) {
    const m = this.meshes[i]
    m.visible = true
    m.position.x = x
    m.position.y = y
    m.material.opacity = 1
    m.scale.x = m.scale.y = 0.0
    m.rotation.z = 1
    }

    trackMousePos () {
    if (!(Math.abs(this.mouse.x - this.prevMouse.x) < 4 && Math.abs(this.mouse.y - this.prevMouse.y) < 4)) {
        this.currentWave = (this.currentWave + 1) % this.max
        this.setNewWave(this.mouse.x, this.mouse.y, this.currentWave)
        console.log(this.currentWave)
    }

    this.prevMouse.x = this.mouse.x
    this.prevMouse.y = this.mouse.y
    }

    private render () {
    if (!this.isPlaying) { return }
    this.trackMousePos()
    this.time += 0.05
    requestAnimationFrame(this.render.bind(this))
    this.renderer.setRenderTarget(this.baseTexture)
    this.renderer.render(this.scene, this.camera)
    this.material.uniforms.uDisplacement.value = this.baseTexture.texture
    this.renderer.setRenderTarget(null)
    this.renderer.clear()
    this.renderer.render(this.scene1, this.camera)
    const myIntervalScale = 0.2
    const myIntervalOpacity = 0.01
    this.meshes.forEach((mesh) => {
        mesh.material.opacity -= myIntervalOpacity
        mesh.scale.y = mesh.scale.x = 0.98 * mesh.scale.x + myIntervalScale
    })
    }
}

const waterFluid = new CustomScene()

if (WebGL.isWebGLAvailable()) {
    console.log('Hello World')
    waterFluid.play()
} else {
    waterFluid.stop()
}
})
</script>

<style>
* {
margin: 0;
padding: 0;
}

#threejs-container {
    position: fixed;
    z-index: 0;
    background: gray;
    height: 100dvh;
    width: 100dvw;
}
</style>
  