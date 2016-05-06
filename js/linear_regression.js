//Initialize
var width = 700;
var height = 700;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
var controls;

$(document).ready(function() {

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height);
	document.body.appendChild(renderer.domElement);

	camera.position.z = 50;

	var axisHelper = new THREE.AxisHelper(20);
	scene.add(axisHelper);

	controls = new THREE.OrbitControls(camera, renderer.domElement);

	controls.addEventListener('change', render);

	function animate() {
		window.requestAnimationFrame(animate);
		controls.update();
	}

	function render() {
		renderer.render(scene, camera);
	}

	animate();
	render();

	var xBasis = new THREE.Vector3(1, 0, 0);
	var yBasis = new THREE.Vector3(0, 1, 0);
	var zBasis = new THREE.Vector3(0, 0, 1);

	//jquery
	var pairNum = 1;
	$('#addSol').click(function() {
		$("body").append('<div class="solDiv" id="pair' + pairNum + '"><input id="x" size="3" placeholder="x"> <input id="y" size="3" placeholder="y"></input> <input id="z" size="3" placeholder="z"></input></div>');
		$('#pair' + pairNum).css({
			'position': 'absolute',
			'left': 700,
			'top': pairNum * 30
		});
		pairNum++;
	});

	//getting info
	$('#graph').click(function() {
		//Getting the terms
		var equationStr = $('#equation').val();
		var cArray = [];
		var cArrayIndex = 0;
		var solObject = {};
		var tempStr = '';
		for (var i = 0; i < equationStr.length; i++) {
			if (equationStr.charAt(i) == '+') {
				cArray[cArrayIndex] = tempStr;
				tempStr = '';
				cArrayIndex++;
			} else {
				tempStr = tempStr + equationStr.charAt(i);
			}
		}
		cArray[cArrayIndex] = tempStr;
		console.log(cArray);
		//Making the matrix
		var matrix = createArray(cArray.length, $('.solDiv').length);
		// for (var row = 0; row < $('.solDiv').length; row++) {
		// 	for (var col = 0; col < cArray.length; col++) {
		// 		var coefficient;
		// 		if (cArray[col].length - 2 <= 0) {
		// 			coefficient = 1;
		// 		} else {
		// 			var x = $('#pair' + (row + 1)).find('#x').val();
		// 			var y = $('#pair' + (row + 1)).find('#y').val();
		// 			coefficient = eval(cArray[col].substr(0, cArray[col].length - 2));
		// 		}
		// 		matrix[col][row] = parseFloat(coefficient);
		// 	}
		// }
		var xMatrix = new Array($('.solDiv').length);
		var yMatrix = new Array($('.solDiv').length);
		var zMatrix = new Array($('.solDiv').length);
		for(var k = 0; k < $('.solDiv').length; k++){//TODO need to fix for multiples of x
			xMatrix[k] = parseFloat($('#pair' + (k+1)).find('#x').val());
			yMatrix[k] = parseFloat($('#pair' + (k + 1)).find('#y').val());
			zMatrix[k] = parseFloat($('#pair' + (k + 1)).find('#z').val());
		}
		var aMatrix = createArray(3,3);
		var bMatrix = [];
		aMatrix[0][0] = sum_i(xMatrix, xMatrix);
		aMatrix[0][1] = aMatrix[1][0] = sum_i(xMatrix, yMatrix);
		aMatrix[0][2] = aMatrix[2][0] = sum_i(xMatrix, null);
		aMatrix[2][1] = aMatrix[1][2] = sum_i(null, yMatrix);
		aMatrix[1][1] = sum_i(yMatrix, yMatrix);
		aMatrix[2][2] = $('.solDiv').length;
		bMatrix[0] = sum_i(xMatrix, zMatrix);
		bMatrix[1] = sum_i(yMatrix, zMatrix);
		bMatrix[2] = sum_i(zMatrix, null);

		var mathAMatrix = math.matrix(aMatrix);
		var mathBMatrix = math.matrix(bMatrix);
		var result = math.lusolve(mathAMatrix, math.transpose(mathBMatrix));
		var C = result._data[0][0];
		var D = result._data[1][0];
		var E = result._data[2][0];
		console.log(result._data);
		console.log("C: " + C + " D: " + D + " E:" + E);

		var x, y = -10;
		var vectors = [];
		vectors[0] = new THREE.Vector3(-10, -10, eval($('#equation').val()));
		x = 10;
		vectors[1] = new THREE.Vector3(10, -10, eval($('#equation').val()));
		y = 10;
		vectors[2] = new THREE.Vector3(10, 10, eval($('#equation').val()));
		x = -10;
		vectors[3] = new THREE.Vector3(-10, 10, eval($('#equation').val()));
		var plane_obj = new THREE.Mesh(new THREE.PlaneGeometry(20, 20, 1, 1), new THREE.MeshBasicMaterial({
			 color: 0xddd3af
		}));

		scene.add(plane_obj);
		for ( var i = 0, l = plane_obj.geometry.vertices.length; i < l; i ++ ){
			plane_obj.geometry.vertices[i] = vectors[i];
		}

		plane_obj.geometry.computeFaceNormals();
		plane_obj.geometry.computeVertexNormals();
		render();
	});
});

//Useful Methods
function createArray(length) {
	var arr = new Array(length || 0),
		i = length;

	if (arguments.length > 1) {
		var args = Array.prototype.slice.call(arguments, 1);
		while (i--) arr[length - 1 - i] = createArray.apply(this, args);
	}

	return arr;
}

function printMatrix(array) {
	var rowStr = '';
	for (var col = 0; col < array[0].length; col++) {
		for (var row = 0; row < array.length; row++) {
			rowStr = rowStr + array[row][col]+" ";
		}
		console.log(rowStr);
		rowStr = '';
	}
}

function sum_i(x, y){
	var sum = 0;
	if(x==null){
		x = new Array(y.length);
		x = fillArraryWithNum(x, 1);
	} else if(y==null){
		y = new Array(x.length);
		y = fillArraryWithNum(y, 1);
	}
	for(var i = 0; i < x.length; i++){
		sum = sum + x[i]*y[i];
	}
	return sum;
}

function fillArraryWithNum(arr, num){
	for(var i = 0; i < arr.length; i++){
		arr[i]=num;
	}
	return arr;
}
