var width = 800;
var height = 800;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 50;

var xBasis = new THREE.Vector3(1,0,0);
var yBasis = new THREE.Vector3(0,1,0);
var zBasis = new THREE.Vector3(0,0,1);

var material = new THREE.LineBasicMaterial({
	color: 0x0000ff,
	linewidth: 5
});

var axisHelper = new THREE.AxisHelper(20);
scene.add( axisHelper );

function render() {
	requestAnimationFrame( render );
	renderer.render( scene, camera );
}
render();

