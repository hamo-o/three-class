import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { WEBGL } from './webgl'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// 장면
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x004fff)

// 카메라
// const camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// )
// camera.position.z = 3

const fov = 75
const aspect = window.innerWidth / window.innerHeight
const near = 0.1
const far = 1000
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.set(0, 0, 3)
camera.lookAt(new THREE.Vector3(0, 0, 0))

// 렌더러
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

//OrbitControls 추가
const controls = new OrbitControls(camera, renderer.domElement)
controls.update()

// 빛
const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.set(0, 2, 12)
scene.add(pointLight)

// 매쉬
const geometry = new THREE.TorusGeometry(0.3, 0.15, 16, 40)
const material01 = new THREE.MeshStandardMaterial({
  color: 0xff7f00,
})
const obj01 = new THREE.Mesh(geometry, material01)
obj01.position.x = -2
scene.add(obj01)

// 매쉬
const material02 = new THREE.MeshBasicMaterial({ color: 0xff7f00 })
const obj02 = new THREE.Mesh(geometry, material02)
obj02.position.x = -1
scene.add(obj02)

// 매쉬
const material03 = new THREE.MeshPhysicalMaterial({
  color: 0xff7f00,
  clearcoat: 1,
})
const obj03 = new THREE.Mesh(geometry, material03)
scene.add(obj03)

// 매쉬
const material04 = new THREE.MeshLambertMaterial({ color: 0xff7f00 })
const obj04 = new THREE.Mesh(geometry, material04)
obj04.position.x = 1
scene.add(obj04)

// 매쉬
const material05 = new THREE.MeshPhongMaterial({
  color: 0xff7f00,
  shininess: 60,
})
const obj05 = new THREE.Mesh(geometry, material05)
obj05.position.x = 2
scene.add(obj05)

// 바닥 추가
// const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1)
// const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xeeeeee })
// const plane = new THREE.Mesh(planeGeometry, planeMaterial)
// plane.rotation.x = -0.5 * Math.PI
// plane.position.y = -0.5
// scene.add(plane)

// 렌더링 루프
function rotate(time) {
  time *= 0.0005

  obj01.rotation.x = time
  obj01.rotation.y = time

  obj02.rotation.x = time
  obj02.rotation.y = time

  obj03.rotation.x = time
  obj03.rotation.y = time

  obj04.rotation.x = time
  obj04.rotation.y = time

  obj05.rotation.x = time
  obj05.rotation.y = time

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
