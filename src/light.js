import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { WEBGL } from './webgl'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// 장면
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x004fff)

// 카메라
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.z = 3

// 렌더러
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

//OrbitControls 추가
const controls = new OrbitControls(camera, renderer.domElement)
controls.update()

// 빛

// const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
// scene.add(ambientLight)

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
// directionalLight.position.set(1, 1, 1)
// const dlHelper = new THREE.DirectionalLightHelper(directionalLight, 0.5)
// scene.add(directionalLight)
// scene.add(dlHelper)

// const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0xff0000, 1)
// scene.add(hemisphereLight)

// const pointLight = new THREE.PointLight(0xffffff, 1)
// pointLight.position.set(0.5, 0.5, 0.5)
// scene.add(pointLight)

// const rectLight = new THREE.RectAreaLight(0xffffff, 2, 1, 1)
// rectLight.position.set(0.5, 0.5, 1)
// rectLight.lookAt(0, 0, 0)
// scene.add(rectLight)

const spotLight = new THREE.SpotLight(0xffffff, 0.5)
scene.add(spotLight)

// 매쉬
const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
const material01 = new THREE.MeshStandardMaterial({
  color: 0xffffff,
})
const cube = new THREE.Mesh(geometry, material01)
cube.position.y = 0.5
scene.add(cube)

// 바닥 추가
const planeGeometry = new THREE.PlaneGeometry(20, 20, 1, 1)
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff })
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = -0.5 * Math.PI
plane.position.y = -0.2
scene.add(plane)

// 렌더링 루프
function rotate(time) {
  time *= 0.0005

  obj01.rotation.x = time
  obj01.rotation.y = time

  renderer.render(scene, camera)

  requestAnimationFrame(rotate)
}
// requestAnimationFrame(render)

// 일반 렌더링
// function render(time) {
//   renderer.render(scene, camera)
// }
// requestAnimationFrame(render)

// OrbitControl 쓸 때!
function animate() {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}
animate()

// 반응형 처리
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

window.addEventListener('resize', onWindowResize)

// 클릭이벤트

function onDblClickRotate() {
  requestAnimationFrame(rotate)
}

window.addEventListener('dblclick', onDblClickRotate)
