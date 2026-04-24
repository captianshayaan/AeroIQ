import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function GlobeScene() {
  const hostRef = useRef(null)

  useEffect(() => {
    const host = hostRef.current

    if (!host) return undefined

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    const earthGroup = new THREE.Group()
    
    // The invisible group that spins the plane around the earth
    const planeOrbit = new THREE.Group()
    const planeWrapper = new THREE.Group() 
    
    const clock = new THREE.Clock()

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.domElement.setAttribute('aria-hidden', 'true')
    host.appendChild(renderer.domElement)

    camera.position.set(0, 0.45, 6.5)
    scene.add(earthGroup)
    earthGroup.add(planeOrbit)
    
    planeOrbit.add(planeWrapper)
    planeWrapper.position.set(2.7, 0, 0)

    const ambientLight = new THREE.AmbientLight(0x84a7ff, 1.9)
    const sunLight = new THREE.DirectionalLight(0xffffff, 3.4)
    const rimLight = new THREE.DirectionalLight(0x3b82f6, 2.3)

    sunLight.position.set(-3.2, 2.8, 4.8)
    rimLight.position.set(3.8, -1.4, -3)
    scene.add(ambientLight, sunLight, rimLight)

    const loader = new GLTFLoader()
    let customEarth, customPlane

    // 1. Load the Earth
    loader.load('/Earth.glb', (gltf) => {
      customEarth = gltf.scene
      customEarth.scale.setScalar(1.40) 
      earthGroup.add(customEarth)
    })

    // 2. Load the Aeroplane
    loader.load('/Aeroplane.glb', (gltf) => {
      customPlane = gltf.scene
      customPlane.scale.setScalar(0.015) 
      customPlane.rotation.x = -Math.PI / 2
      customPlane.rotation.z = -Math.PI / 2
      planeWrapper.add(customPlane)
    })

    earthGroup.position.set(1.55, -0.08, 0)
    planeOrbit.rotation.x = Math.PI / 2.6

    const stars = createStars()
    scene.add(stars)

    let scrollProgress = getScrollProgress()
    let frameId = 0

    const resize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    const updateScroll = () => {
      scrollProgress = getScrollProgress()
    }

    const animate = () => {
      const elapsed = clock.getElapsedTime()
      const mobile = window.innerWidth < 768
      const targetX = mobile ? 0.1 : 1.55 - scrollProgress * 1.05
      const targetY = mobile ? -0.72 : -0.08 - scrollProgress * 0.28
      const targetScale = mobile ? 0.64 : 1 - scrollProgress * 0.08

      earthGroup.position.x += (targetX - earthGroup.position.x) * 0.035
      earthGroup.position.y += (targetY - earthGroup.position.y) * 0.035
      earthGroup.scale.setScalar(targetScale)
      
      if (customEarth) {
        customEarth.rotation.y = elapsed * 0.07 + scrollProgress * 1.2
      }
      
      if (customPlane) {
        planeWrapper.rotation.z = Math.sin(elapsed * 1.4) * 0.08
      }

      planeOrbit.rotation.z = elapsed * 0.42 + scrollProgress * 4.2
      stars.rotation.y = elapsed * 0.006

      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }

    window.addEventListener('resize', resize)
    window.addEventListener('scroll', updateScroll, { passive: true })
    animate()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', updateScroll)
      renderer.dispose()
      stars.geometry.dispose()
      stars.material.dispose()
      host.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={hostRef} className="globe-scene" />
}

function getScrollProgress() {
  const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
  return Math.min(window.scrollY / scrollable, 1)
}

function createStars() {
  const geometry = new THREE.BufferGeometry()
  const vertices = []

  for (let i = 0; i < 900; i += 1) {
    vertices.push((Math.random() - 0.5) * 28)
    vertices.push((Math.random() - 0.5) * 16)
    vertices.push(-4 - Math.random() * 12)
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  return new THREE.Points(
    geometry,
    new THREE.PointsMaterial({ color: 0xdbeafe, size: 0.018, transparent: true, opacity: 0.6 }),
  )
}

export default GlobeScene