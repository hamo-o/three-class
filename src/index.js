import * as THREE from 'three'
import { CubeCamera } from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
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
  camera.position.z = 2

  // 캔버스 DOM
  const canvas = document.querySelector('#index')

  // 렌더러
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)

  // document.body.appendChild(renderer.domElement)

  // 매쉬
  const geometry01 = new THREE.BoxGeometry(0.5, 0.5, 0.5)
  const material01 = new THREE.MeshStandardMaterial({
    color: 0x999999,
  })
  const obj01 = new THREE.Mesh(geometry01, material01)
  obj01.position.x = -1
  scene.add(obj01)

  const geometry02 = new THREE.ConeGeometry(0.4, 0.7, 6)
  const material02 = new THREE.MeshStandardMaterial({
    color: 0x999999,
  })
  const obj02 = new THREE.Mesh(geometry02, material02)
  scene.add(obj02)

  const geometry03 = new THREE.IcosahedronGeometry(0.4, 0)
  const material03 = new THREE.MeshStandardMaterial({
    color: 0x999999,
  })
  const obj03 = new THREE.Mesh(geometry03, material03)
  obj03.position.x = 1
  scene.add(obj03)

  // 렌더링 루프
  function render(time) {
    time *= 0.0005

    obj01.rotation.x = time
    obj01.rotation.y = time

    obj02.rotation.x = time
    obj02.rotation.y = time

    obj03.rotation.x = time
    obj03.rotation.y = time

    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)

  // 반응형 처리
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  window.addEventListener('resize', onWindowResize)
} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
