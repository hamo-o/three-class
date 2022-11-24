import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  // 장면
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xffffff)

  // 카메라
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 2

  // 렌더러
  // 여기에 alpha: true 주고 배경 없애면 투명배경으로 사용가능!!
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)

  document.body.appendChild(renderer.domElement)

  // orbitcontrol
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.update()

  // 빛
  const pointLight = new THREE.PointLight(0xffffff, 1)
  pointLight.position.set(0, 2, 12)
  scene.add(pointLight)

  // 텍스쳐 추가
  const textureLoader = new THREE.TextureLoader()
  const textureBaseColor = textureLoader.load(
    '../static/textures/Grass_002_COLOR.jpg'
  )
  const textureNormalMap = textureLoader.load(
    '../static/textures/Grass_002_NRM.jpg'
  )
  const textureHeightMap = textureLoader.load(
    '../static/textures/Grass_002_DISP.png'
  )
  const textureRoughnessMap = textureLoader.load(
    '../static/textures/Grass_002_SPEC.jpg'
  )

  // 도형 추가
  const geometry = new THREE.SphereGeometry(0.3, 32, 16)

  const material01 = new THREE.MeshStandardMaterial({ map: textureBaseColor })
  const obj01 = new THREE.Mesh(geometry, material01)
  obj01.position.x = -1.5
  scene.add(obj01)

  // 노멀맵 == 법선 매핑 : 대비 강조. 좀 더 입체감 줌
  const material02 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap: textureNormalMap,
  })
  const obj02 = new THREE.Mesh(geometry, material02)
  obj02.position.x = -0.5
  scene.add(obj02)

  // 디스플레이스먼트맵 : 높낮이 강조
  const material03 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap: textureNormalMap,
    displacementMap: textureHeightMap,
    displacementScale: 0.05,
  })
  const obj03 = new THREE.Mesh(geometry, material03)
  obj03.position.x = 0.5
  scene.add(obj03)

  const material04 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap: textureNormalMap,
    displacementMap: textureHeightMap,
    displacementScale: 0.05,
    textureRoughnessMap: textureRoughnessMap,
    roughness: 0.5,
  })
  const obj04 = new THREE.Mesh(geometry, material04)
  obj04.position.x = 1.5
  scene.add(obj04)

  const material05 = new THREE.MeshStandardMaterial({ color: 0xeeeeee })
  const obj05 = new THREE.Mesh(geometry, material05)
  obj05.position.x = 2.5
  scene.add(obj05)

  // 렌더링 루프
  function render(time) {
    time *= 0.001

    // cube.rotation.x = time
    // cube.rotation.y = time

    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)
} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
