const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.autoClear = false
renderer.setClearColor(0x000000, 0)

const sectionTag = document.querySelector('section')
sectionTag.appendChild(renderer.domElement)

const scene = new THREE.Scene()
scene.fog = new THREE.FogExp2(0x000000, 0.00025)

//add some lightinng
const ambientLight = new THREE.AmbientLight(0x777777)
scene.add(ambientLight)

//add a spot light
const pointLight = new THREE.PointLight(0xff0000, 1, 0)
pointLight.position.set(500, 500, -3000)
scene.add(pointLight)

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000)
camera.position.z = -4000

//make a three.js loader
const loader = new THREE.TextureLoader()

//make a three.js text loader

//make the planet
const makePlanet = function() {
  const texture = loader.load('myearth.jpg')
  const geometry = new THREE.SphereGeometry(600, 128, 128)
  const material = new THREE.MeshLambertMaterial({
    //color: 0xDA70D6,
    map: texture
  })
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
  return mesh
}

//make the stars
const makeStars = function() {
  const texture = loader.load('particle.png')
  const geometry = new THREE.Geometry()

  for (let i = 0; i < 8000; i = i + 1) {
    const point = new THREE.Vector3()
    const sphericalPoint = new THREE.Spherical(
      900 + Math.random() * 900,
      2 * Math.PI * Math.random(),
      Math.PI * Math.random()
    )
    point.setFromSpherical(sphericalPoint)

    geometry.vertices.push(point)
  }
  const material = new THREE.PointsMaterial({
    size: 25,
    map: texture,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthTest: true,
    depthWrite: false
  })

  const points = new THREE.Points(geometry, material)

  scene.add(points)

  return points
}

//let svideo = "THREE.SphereGeometry(100, 64, 64)"
//add the video
const videoLoad = function() {
  const video = document.getElementById('video')
  video.src = '190629xxxxxxxx.mp4'
  video.load()
  video.play()
  const texture = new THREE.VideoTexture(video)
  texture.needsUpdate
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.format = THREE.RGBFormat
  texture.crossOrgin = 'anonymous'
  const videoGeometry = new THREE.SphereGeometry(100, 64, 64)
  //const videoGeometry = new THREE.SphereGeometry(svideo)
  const videoMaterial = new THREE.MeshLambertMaterial({
    map: texture
  })

  const videoMesh = new THREE.Mesh(videoGeometry, videoMaterial)

  scene.add(videoMesh)
  return videoMesh
}

const videoLoad1 = function() {
  const video1 = document.getElementById('video1')
  video1.src = 'thinkinboutnaomi---r.concept-2.mp4'
  video1.load()
  video1.play()
  const texture = new THREE.VideoTexture(video1)
  texture.needsUpdate
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.format = THREE.RGBFormat
  texture.crossOrgin = 'anonymous'
  const videoGeometry = new THREE.SphereGeometry(200, 128, 128)
  //const videoGeometry = new THREE.SphereGeometry(svideo)
  const videoMaterial = new THREE.MeshLambertMaterial({
    map: texture
  })

  const videoMesh = new THREE.Mesh(videoGeometry, videoMaterial)

  scene.add(videoMesh)
  return videoMesh
}

const videoLoad2 = function() {
  const video2 = document.getElementById('video2')
  video2.src = 'tohberecutshort1-small.mp4'
  video2.load()
  video2.play()
  const texture = new THREE.VideoTexture(video2)
  texture.needsUpdate
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.format = THREE.RGBFormat
  texture.crossOrgin = 'anonymous'
  const videoGeometry = new THREE.SphereGeometry(200, 128, 128)
  //const videoGeometry = new THREE.SphereGeometry(svideo)
  const videoMaterial = new THREE.MeshLambertMaterial({
    map: texture
  })

  const videoMesh = new THREE.Mesh(videoGeometry, videoMaterial)

  scene.add(videoMesh)
  return videoMesh
}
//add text to go around the globe
/*const text = function() {
  const material1 = new THREE.MeshPhongMaterial({
    color: 0xdddddd
  })
  const textGeom = new THREE.TextGeometry('tohbere', {
    font: 'Elektra',
    weight: 'normal'
  })
  const textMesh = new THREE.Mesh(textGeom, material1)

  scene.add(textMesh)
  return textMesh
}*/

//textGeom.computeBoundingBox();
//textGeom.textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;
//make a single ring
const makeRing = function(width, color) {
  const geometry = new THREE.TorusGeometry(width, 5, 16, 80)
  const material = new THREE.MeshBasicMaterial({
    color: color
  })
  const mesh = new THREE.Mesh(geometry, material)

  mesh.geometry.rotateX(Math.PI / 2)
  mesh.geometry.rotateZ(Math.PI / 10)

  scene.add(mesh)
  return mesh
}

const earth = makePlanet()
const ring1 = makeRing(650, 0xa173c7)
const ring2 = makeRing(650, 0xffffff)
const ring3 = makeRing(640, 0x851160)
const stars = makeStars()
const startvideo = videoLoad()
const startvideoGroup = new THREE.Group()
startvideoGroup.add(startvideo)
scene.add(startvideoGroup)
startvideo
  .translateX(800)
  .translateY(500)
  .translateZ(200)

const startvideo1 = videoLoad1()
const startvideo1Group = new THREE.Group()
startvideo1Group.add(startvideo1)
scene.add(startvideo1Group)
startvideo1
  .translateX(-800)
  .translateY(300)
  .translateZ(700)

const startvideo2 = videoLoad2()
const startvideo2Group = new THREE.Group()
startvideo2Group.add(startvideo2)
scene.add(startvideo2Group)
startvideo2
  .translateX(200)
  .translateY(600)
  .translateZ(-700)
//const text = textloader()
//const textgroup = new THREE.Group()
//textgroup.add(text)
//scene.add(textgroup)

//hold the camera positions
let currentX = 0
let currentY = 0
let currentZ = -900
let aimX = 0
let aimY = 0
let aimZ = -900

// RIK WAS HERE
let sphereCurrentSize = 1
let sphereAimSize = 1
let sphereSpeed = 0.01

let sphereCurrentSize1 = 1
let sphereAimSize1 = 1
let sphere1Speed = 0.01

let sphereCurrentSize2 = 1
let sphereAimSize2 = 1
let sphere2Speed = 0.01

const animate = function() {
  const diffX = aimX - currentX
  const diffY = aimY - currentY
  const diffZ = aimZ - currentZ

  currentX = currentX + diffX * 0.05
  currentY = currentY + diffY * 0.05
  currentZ = currentY + diffZ * 0.05

  sphereCurrentSize += (sphereAimSize - sphereCurrentSize) * sphereSpeed

  sphereCurrentSize1 += (sphereAimSize1 - sphereCurrentSize1) * sphere1Speed
  
  sphereCurrentSize2 += (sphereAimSize2 - sphereCurrentSize2) * sphere2Speed

  const sphere = new THREE.Spherical(3000, currentY * 0.001 - Math.PI / 2, currentX * 0.001)
  //camera.position.x = currentX
  //camera.position.y = currentY
  camera.position.setFromSpherical(sphere)
  camera.lookAt(scene.position)

  earth.rotateY(0.01)

  startvideo.rotateY(0.02)
  startvideo1.rotateY(0.02)
  startvideo2.rotateY(0.02)

  startvideo.scale.x = sphereCurrentSize
  startvideo.scale.y = sphereCurrentSize
  startvideo.scale.z = sphereCurrentSize

  startvideo1.scale.x = sphereCurrentSize1
  startvideo1.scale.y = sphereCurrentSize1
  startvideo1.scale.z = sphereCurrentSize1
  
  startvideo2.scale.x = sphereCurrentSize2
  startvideo2.scale.y = sphereCurrentSize2
  startvideo2.scale.z = sphereCurrentSize2
  console.log(sphereCurrentSize)

  //text.rotateX(0.01)
  ring1.geometry.rotateY(0.004)
  ring2.geometry.rotateY(-0.002)
  ring3.geometry.rotateY(-0.003)

  renderer.render(scene, camera)

  requestAnimationFrame(animate)
}
animate()

window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
})
//variation: scroll down page
document.addEventListener('scroll', function() {
  const scrollPosition = window.pageYOffset

  earth.rotation.set(0, scrollPosition / 100, 0)
})

let isMouseDown = false
let startX = 0
let startY = 0

document.addEventListener('mousedown', function() {
  isMouseDown = true
  startX = event.pageX
  startY = event.pageY
})
document.addEventListener('touchstart', function() {
  isMouseDown = true
  startX = event.pageX
  startY = event.pageY
})
document.addEventListener('touchmove', function() {
  const scrollPosition = window.pageYOffset

  earth.rotation.set(0, scrollPosition / 100, 0)
})
document.addEventListener('mouseup', function() {
  isMouseDown = false
})

document.addEventListener('mousemove', function(event) {
  if (isMouseDown) {
    aimX = aimX + (event.pageX - startX) * 8
    aimY = aimY + (event.pageY - startY) * 8
    startX = event.pageX
    startY = event.pageY
  }
  aimX = (window.innerWidth / 2 - event.pageX) * 4
  aimY = (window.innerHeight / 2 - event.pageY) * 4
})

document.addEventListener('touchmove', function(event) {
  aimX = (window.innerWidth / 2 - event.pageX) * 4
  aimY = (window.innerHeight / 2 - event.pageY) * 4
})

//zoom into the video
document.addEventListener(
  'click',
  function(event) {
    const mouse = new THREE.Vector2()
    const raycaster = new THREE.Raycaster()

    mouse.set(
      (event.pageX / window.innerWidth) * 2 - 1,
      (event.pageY / window.innerHeight) * -2 + 1
    )

    raycaster.setFromCamera(mouse, camera)

    const intersections = raycaster.intersectObjects([startvideo])

    // RIK WAS HERE
    if (intersections.length > 0) {
      if (sphereAimSize !== 4) {
        sphereAimSize = 4
      } else {
        sphereAimSize = 2
      }
    }
    //2nd zoom
    document.addEventListener('click', function(event) {
      const mouse = new THREE.Vector2()
      const raycaster = new THREE.Raycaster()

      mouse.set(
        (event.pageX / window.innerWidth) * 2 - 1,
        (event.pageY / window.innerHeight) * -2 + 1
      )

      raycaster.setFromCamera(mouse, camera)

      const intersections1 = raycaster.intersectObjects([startvideo1])

      // RIK WAS HERE
      if (intersections1.length > 0) {
        if (sphereAimSize1 !== 2) {
          sphereAimSize1 = 2
        } else {
          sphereAimSize1 = 1
        }
      }
    })
    function resize(canvas) {
      var realToCSSPixels = window.devicePixelRatio

      // Lookup the size the browser is displaying the canvas in CSS pixels
      // and compute a size needed to make our drawingbuffer match it in
      // device pixels.
      var displayWidth = Math.floor(canvas.clientWidth * realToCSSPixels)
      var displayHeight = Math.floor(canvas.clientHeight * realToCSSPixels)

      // Check if the canvas is not the same size.
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        // Make the canvas the same size
        canvas.width = displayWidth
        canvas.height = displayHeight
      }
    }
  }
  /*
  intersections.forEach(intersection => {
    
//     intersection.object.geometry = new THREE.SphereGeometry(100, 64, 64)

    //window.location.href = "https://www.superhi.com
  }) */
)
