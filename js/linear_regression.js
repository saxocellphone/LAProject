var width = 800;
var height = 800;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
var controls = new THREE.OrbitControls( camera );
  
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild( renderer.domElement );

controls.addEventListener( 'change', render );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 50;

var xBasis = new THREE.Vector3(1,0,0);
var yBasis = new THREE.Vector3(0,1,0);
var zBasis = new THREE.Vector3(0,0,1);

var axisHelper = new THREE.AxisHelper(20);
scene.add(axisHelper);


function animate()
{
	window.requestAnimationFrame(animate);
	controls.update();
}

function render()
{
	renderer.render(scene, camera);
}

animate();
render();