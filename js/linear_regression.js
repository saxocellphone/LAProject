$(document).ready(function() {
	//Initialize
	var width = 700;
	var height = 700;
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
	var controls;

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

		//Making the matrix
		var matrix = createArray(cArray.length, $('.solDiv').length);
		for (var row = 0; row < $('.solDiv').length; row++) {
			for (var col = 0; col < cArray.length; col++) {
				var coefficient;
				if (cArray[col].length - 2 <= 0) {
					coefficient = 1;
				} else {
					var x = $('#pair' + (row + 1)).find('#x').val();
					var y = $('#pair' + (row + 1)).find('#y').val();
					coefficient = eval(cArray[col].substr(0, cArray[col].length - 2));
				}
				matrix[col][row] = parseFloat(coefficient);
			}
		}
		var xMatrix,yMatrix,zMatrix= [];
		for(var k = 0; k < $('.solDiv').length; k++){
			xMatrix[k] =
		}
		printMatrix(matrix);
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
			rowStr = rowStr + array[row][col];
		}
		console.log(rowStr);
		rowStr = '';
	}
}
