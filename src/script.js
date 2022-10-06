


import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereGeometry( 0.9,94,94);


// nasaObjects
const nasaObject = new THREE.SphereGeometry( .2,16,15);



// truturing

const textureLoader=new THREE.TextureLoader();
const earthTexture= textureLoader.load('./texture/earthmap.jpg')
const earthbump= textureLoader.load('./texture/earthbump.jpg')
const earthcloud= textureLoader.load('./texture/earthcloud.jpg')
const nasaspace=textureLoader.load('./texture/nasa.png')

// Materials

const material = new THREE.MeshPhongMaterial({
    roughness:1,
    metalness:1,
    map: earthTexture,
    bumpMap:earthbump,
    bumpScale: 0.2,
   
})

// nasaMaterials

const nasamaterial = new THREE.MeshPhongMaterial({
    roughness:8,
    metalness:1,
    map: nasaspace,
  
    bumpScale: 0.2,
   
})
// cloud

// const cloudGeometry=new THREE.SphereGeometry(0.7,32,32)

// const cloudMaterial= new THREE.MeshPhongMaterial({
//     map:earthcloud
// })
// const cloudmesh= new THREE.Mesh (cloudGeometry,cloudMaterial);
// scene.add(cloudmesh);

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// nasaMesh
const nasasphere = new THREE.Mesh(nasaObject,nasamaterial)
nasasphere.receiveShadow=true;
nasasphere.castShadow=true;
nasasphere.position.x=2;
nasasphere.layers.set(0);
scene.add(nasasphere)


var nasaPivot=new THREE.Object3D();
sphere.add(nasaPivot);
nasaPivot.add(nasasphere)

// ambientLights
 
const ambientLight= new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Animate
 */

// document.addEventListener('mousemove', onDocumentMouseMove)
// let mouseX=0;
// let mouseY=0;

// let targetX=0;
// let targetY=0;

// const windowX=window.innerwidth/2;
// const windowY= window.innerHeight/2;

// function onDocumentMouseMove(event){
//     mouseX=(event.clientX - windowX)
//     mouseY=(event.clientY - windowY)
// }



const clock = new THREE.Clock()

const tick = () =>
{
// targetX=mouseX*.001
// targetY=mouseY*.001
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime
 nasaPivot.rotation.y -=0.005
    // sphere.rotation.y+= .5*(targetX-sphere.rotation.y)
    
    // sphere.rotation.x+= .5*(targetY-sphere.rotation.x)
    
    // sphere.rotation.z+= .5*(targetY-sphere.rotation.x)
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()