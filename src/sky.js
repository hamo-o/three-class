import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { WEBGL } from './webgl'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

if (WEBGL.isWebGL2Available()) {
  // 색상
  const fogColor = 0x004fff
  const objColor = 0x333333

  // 장면
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xffffff)

  // 안개
  //   scene.fog = new THREE.Fog(fogColor, 2, 8)

  // 카메라
  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    1,
    4000
  )
  camera.position.z = 3

  // 렌더러
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  //OrbitControls 추가 (카메라 이후 등장필요)
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.minDistance = 20
  controls.maxDistance = 800
  controls.update()

  // 빛
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
  scene.add(ambientLight)

  // 텍스쳐
  const texture_ft = new THREE.TextureLoader().load(
    '../static/textures/meadow_ft.jpg'
  )
  const texture_bk = new THREE.TextureLoader().load(
    '../static/textures/meadow_bk.jpg'
  )
  const texture_up = new THREE.TextureLoader().load(
    '../static/textures/meadow_up.jpg'
  )
  const texture_dn = new THREE.TextureLoader().load(
    '../static/textures/meadow_dn.jpg'
  )
  const texture_rt = new THREE.TextureLoader().load(
    '../static/textures/meadow_rt.jpg'
  )
  const texture_lf = new THREE.TextureLoader().load(
    '../static/textures/meadow_lf.jpg'
  )
  const textureArray = [
    texture_ft,
    texture_bk,
    texture_up,
    texture_dn,
    texture_rt,
    texture_lf,
  ]

  const skyMaterialArray = textureArray.map(
    (texture) =>
      new THREE.MeshStandardMaterial({
        map: texture,
      })
  )

  for (let i = 0; i < 6; i++) {
    skyMaterialArray[i].side = THREE.BackSide
  }

  // 매쉬
  const geometry = new THREE.BoxGeometry(2000, 2000, 2000)

  const obj03 = new THREE.Mesh(geometry, skyMaterialArray)
  scene.add(obj03)

  // 일반 렌더링
  function render(time) {
    renderer.render(scene, camera)
  }
  requestAnimationFrame(render)

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
}
