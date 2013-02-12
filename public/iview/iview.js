var iview = (function () {
	function iview(id) {
		this.elementColors = {
			 'H': 0xCCCCCC,
			 'C': 0xAAAAAA,
			 'O': 0xCC0000,
			 'N': 0x0000CC,
			 'S': 0xCCCC00,
			 'P': 0x6622CC,
			 'F': 0x00CC00,
			'CL': 0x00CC00,
			'BR': 0x882200,
			 'I': 0x6600AA,
			'FE': 0xCC6600,
			'CA': 0x8888AA,
		};
		this.vdwRadii = { // Hu et al.
			 'H': 1.08,
			'HE': 1.34,
			'LI': 1.75,
			'BE': 2.05,
			 'B': 1.47,
			 'C': 1.49,
			 'N': 1.41,
			 'O': 1.40,
			 'F': 1.39,
			'NE': 1.68,
			'NA': 1.84,
			'MG': 2.05,
			'AL': 2.11,
			'SI': 2.07,
			 'P': 1.92,
			 'S': 1.82,
			'CL': 1.83,
			'AR': 1.93,
			 'K': 2.05,
			'CA': 2.21,
			'SC': 2.16,
			'TI': 1.87,
			 'V': 1.79,
			'CR': 1.89,
			'MN': 1.97,
			'FE': 1.94,
			'CO': 1.92,
			'NI': 1.84,
			'CU': 1.86,
			'ZN': 2.10,
			'GA': 2.08,
			'GE': 2.15,
			'AS': 2.06,
			'SE': 1.93,
			'BR': 1.98,
			'KR': 2.12,
			'RB': 2.16,
			'SR': 2.24,
			 'Y': 2.19,
			'ZN': 1.86,
			'NB': 2.07,
			'MO': 2.09,
			'TC': 2.09,
			'RU': 2.07,
			'RH': 1.95,
			'PD': 2.02,
			'AG': 2.03,
			'CD': 2.30,
			'IN': 2.36,
			'SN': 2.33,
			'SB': 2.25,
			'TE': 2.23,
			 'I': 2.23,
			'XE': 2.21,
			'CS': 2.22,
			'BA': 2.51,
			'LA': 2.40,
			'CE': 2.35,
			'PR': 2.39,
			'ND': 2.29,
			'PM': 2.36,
			'SM': 2.29,
			'EU': 2.33,
			'GD': 2.37,
			'TB': 2.21,
			'DY': 2.29,
			'HO': 2.16,
			'ER': 2.35,
			'TM': 2.27,
			'YB': 2.42,
			'LU': 2.21,
			'HF': 2.12,
			'TA': 2.17,
			 'W': 2.10,
			'RE': 2.17,
			'OS': 2.16,
			'IR': 2.02,
			'PT': 2.09,
			'AU': 2.17,
			'HG': 2.09,
			'TL': 2.35,
			'PB': 2.32,
			'BI': 2.43,
			'PO': 2.29,
			'AT': 2.36,
			'RN': 2.43,
			'FR': 2.56,
			'RA': 2.43,
			'AC': 2.60,
			'TH': 2.37,
			'PA': 2.43,
			 'U': 2.40,
			'NP': 2.21,
			'PU': 2.56,
			'AM': 2.56,
			'CM': 2.56,
			'BK': 2.56,
			'CF': 2.56,
			'ES': 2.56,
			'FM': 2.56,
		};

		this.container = $('#' + id);
		this.WIDTH = this.container.width();
		this.HEIGHT = this.container.height();
		this.ASPECT = this.WIDTH / this.HEIGHT;
		this.NEAR = 1;
		this.FAR = 800;
		this.CAMERA_Z = -150;
		this.renderer = new THREE.WebGLRenderer({
			canvas: this.container.get(0),
			antialias: true,
		});
//		this.renderer.sortObjects = false;
		this.renderer.setSize(this.WIDTH, this.HEIGHT);

		this.perspectiveCamera = new THREE.PerspectiveCamera(20, this.ASPECT, 1, 800);
		this.perspectiveCamera.position = new THREE.Vector3(0, 0, this.CAMERA_Z);
		this.perspectiveCamera.lookAt(new THREE.Vector3(0, 0, 0));
		this.orthographicCamera = new THREE.OrthographicCamera();
		this.orthographicCamera.position.z = this.CAMERA_Z;
		this.orthographicCamera.lookAt(new THREE.Vector3(0, 0, 0));
		this.camera = this.perspectiveCamera;

		this.slabNear = -50; // relative to the center of rotationGroup
		this.slabFar = +50;

		// Default values
		this.fov = 20;
		this.fogStart = 0.4;
		this.sphereRadius = 1.5;
		this.cylinderRadius = 0.4;
		this.lineWidth = 1.5;
		this.curveWidth = 3;
		this.defaultColor = 0xCCCCCC;
		this.sphereQuality = 16; // 16
		this.cylinderQuality = 16; // 8
		this.axisDIV = 5; // 3
		this.strandDIV = 6;
		this.tubeDIV = 8;
		this.coilWidth = 0.3;
		this.helixSheetWidth = 1.3;
		this.thickness = 0.4;
		this.cameras = {
			perspective:  this.perspectiveCamera,
			orthographic: this.orthographicCamera,
		}
		this.backgroundColors = {
			black: 0x000000,
			 grey: 0xCCCCCC,
			white: 0xFFFFFF,
		};
		this.residueColors = {
			ALA: 0xC8C8C8,
			ARG: 0x145AFF,
			ASN: 0x00DCDC,
			ASP: 0xE60A0A,
			CYS: 0xE6E600,
			GLN: 0x00DCDC,
			GLU: 0xE60A0A,
			GLY: 0xEBEBEB,
			HIS: 0x8282D2,
			ILE: 0x0F820F,
			LEU: 0x0F820F,
			LYS: 0x145AFF,
			MET: 0xE6E600,
			PHE: 0x3232AA,
			PRO: 0xDC9682,
			SER: 0xFA9600,
			THR: 0xFA9600,
			TRP: 0xB45AB4,
			TYR: 0x3232AA,
			VAL: 0x0F820F,
		};
		this.polarColor = 0xCC0000;
		this.nonpolarColor = 0x00CCCC;
		this.polarityColors = {
			ARG: this.polarColor,
			HIS: this.polarColor,
			LYS: this.polarColor,
			ASP: this.polarColor,
			GLU: this.polarColor,
			SER: this.polarColor,
			THR: this.polarColor,
			ASN: this.polarColor,
			GLN: this.polarColor,
			TYR: this.polarColor,
			GLY: this.nonpolarColor,
			PRO: this.nonpolarColor,
			ALA: this.nonpolarColor,
			VAL: this.nonpolarColor,
			LEU: this.nonpolarColor,
			ILE: this.nonpolarColor,
			MET: this.nonpolarColor,
			PHE: this.nonpolarColor,
			CYS: this.nonpolarColor,
			TRP: this.nonpolarColor,
		};
		this.helixColor = 0xCC00CC;
		this.sheetColor = 0x00CCCC;
		this.coilColor  = 0xCCCC00;
		this.options = {
			camera: 'perspective',
			background: 'black',
			colorBy: 'spectrum',
			secondaryStructure: 'cylinder & plate',
			primaryStructure: 'none',
			ligands: 'stick',
			waters: 'sphere',
			ions: 'sphere',
		};

		// UI variables
		this.cq = new THREE.Quaternion(1, 0, 0, 0);
		this.dq = new THREE.Quaternion(1, 0, 0, 0);
		this.isDragging = false;
		this.mouseStartX = 0;
		this.mouseStartY = 0;
		this.currentModelPos = 0;
		this.cz = 0;

		var me = this;
		$(window).resize(function () {
			me.WIDTH = me.container.width();
			me.HEIGHT = me.container.height();
			me.ASPECT = me.WIDTH / me.HEIGHT;
			me.renderer.setSize(me.WIDTH, me.HEIGHT);
			me.camera.aspect = me.ASPECT;
			me.camera.updateProjectionMatrix();
			me.show();
		});
		$('body').bind('mouseup touchend', function (ev) {
			me.isDragging = false;
		});
		this.container.bind("contextmenu", function (ev) { ev.preventDefault(); });
		this.container.bind('mousedown touchstart', function (ev) {
			ev.preventDefault();
			if (!me.scene) return;
			var x = ev.pageX, y = ev.pageY;
			if (ev.originalEvent.targetTouches && ev.originalEvent.targetTouches[0]) {
				x = ev.originalEvent.targetTouches[0].pageX;
				y = ev.originalEvent.targetTouches[0].pageY;
			}
			if (x == undefined) return;
			me.isDragging = true;
			me.mouseButton = ev.which;
			me.mouseStartX = x;
			me.mouseStartY = y;
			me.cq = me.rotationGroup.quaternion;
			me.cz = me.rotationGroup.position.z;
			me.currentModelPos = me.modelGroup.position.clone();
			me.cslabNear = me.slabNear;
			me.cslabFar = me.slabFar;
		});
		this.container.bind('DOMMouseScroll mousewheel', function (ev) { // Zoom
			ev.preventDefault();
			if (!me.scene) return;
			var scaleFactor = (me.rotationGroup.position.z - me.CAMERA_Z) * 0.85;
			if (ev.originalEvent.detail) { // Webkit
				me.rotationGroup.position.z += scaleFactor * ev.originalEvent.detail / 10;
			} else if (ev.originalEvent.wheelDelta) { // Firefox
				me.rotationGroup.position.z -= scaleFactor * ev.originalEvent.wheelDelta / 400;
			}
			me.show();
		});
		this.container.bind('mousemove touchmove', function (ev) { // touchmove
			ev.preventDefault();
			if (!me.scene) return;
			if (!me.isDragging) return;
			var x = ev.pageX, y = ev.pageY;
			if (ev.originalEvent.targetTouches && ev.originalEvent.targetTouches[0]) {
				x = ev.originalEvent.targetTouches[0].pageX;
				y = ev.originalEvent.targetTouches[0].pageY;
			}
			if (x == undefined) return;
			var dx = (x - me.mouseStartX) / me.WIDTH;
			var dy = (y - me.mouseStartY) / me.HEIGHT;
			if (!dx && !dy) return;
			var mode = 0;
			if (mode == 3 || (me.mouseButton == 3 && ev.ctrlKey)) { // Slab
				me.slabNear = me.cslabNear + dx * 100;
				me.slabFar = me.cslabFar + dy * 100;
			} else if (mode == 2 || me.mouseButton == 3 || ev.shiftKey) { // Zoom
				var scaleFactor = (me.rotationGroup.position.z - me.CAMERA_Z) * 0.85;
				if (scaleFactor < 80) scaleFactor = 80;
				me.rotationGroup.position.z = me.cz - dy * scaleFactor;
			} else if (mode == 1 || me.mouseButton == 2 || ev.ctrlKey) { // Translate
				var scaleFactor = (me.rotationGroup.position.z - me.CAMERA_Z) * 0.85;
				if (scaleFactor < 20) scaleFactor = 20;
				var translationByScreen = new THREE.Vector3(-dx * scaleFactor, -dy * scaleFactor, 0);
				var q = me.rotationGroup.quaternion;
				var qinv = new THREE.Quaternion(q.x, q.y, q.z, q.w).inverse().normalize();
				var translation = translationByScreen.applyQuaternion(qinv);
				me.modelGroup.position.x = me.currentModelPos.x + translation.x;
				me.modelGroup.position.y = me.currentModelPos.y + translation.y;
				me.modelGroup.position.z = me.currentModelPos.z + translation.z;
			} else if ((mode == 0 || me.mouseButton == 1)) { // Rotate
				var r = Math.sqrt(dx * dx + dy * dy);
				var rs = Math.sin(r * Math.PI) / r;
				me.dq.x = Math.cos(r * Math.PI);
				me.dq.y = 0;
				me.dq.z = rs * dx;
				me.dq.w = rs * dy;
				me.rotationGroup.quaternion = new THREE.Quaternion(1, 0, 0, 0);
				me.rotationGroup.quaternion.multiply(me.dq);
				me.rotationGroup.quaternion.multiply(me.cq);
			}
			me.show();
		});
	}

	iview.prototype.isConnected = function (atom1, atom2) {
		if (atom1.bonds.indexOf(atom2.serial) != -1) return 1;
		var distSquared = (atom1.x - atom2.x) * (atom1.x - atom2.x) +
						  (atom1.y - atom2.y) * (atom1.y - atom2.y) +
						  (atom1.z - atom2.z) * (atom1.z - atom2.z);
		if (isNaN(distSquared)) return 0;
		if (distSquared < 0.5) return 0; // maybe duplicate position.
		if (distSquared > 1.3 && (atom1.elem == 'H' || atom2.elem == 'H')) return 0;
		if (distSquared < 3.42 && (atom1.elem == 'S' || atom2.elem == 'S')) return 1;
		if (distSquared > 2.78) return 0;
		return 1;
	};

	// Catmull-Rom subdivision
	iview.prototype.subdivide = function (_points, DIV) { // points as Vector3
		var ret = [];
		var points = _points;
		points = new Array(); // Smoothing test
		points.push(_points[0]);
		for (var i = 1, lim = _points.length - 1; i < lim; i++) {
			var p1 = _points[i], p2 = _points[i + 1];
			if (p1.smoothen) points.push(new THREE.Vector3((p1.x + p2.x) / 2, (p1.y + p2.y) / 2, (p1.z + p2.z) / 2));
			else points.push(p1);
		}
		points.push(_points[_points.length - 1]);
		for (var i = -1, size = points.length; i <= size - 3; i++) {
			var p0 = points[(i == -1) ? 0 : i];
			var p1 = points[i + 1], p2 = points[i + 2];
			var p3 = points[(i == size - 3) ? size - 1 : i + 3];
			var v0 = new THREE.Vector3().subVectors(p2, p0).multiplyScalar(0.5);
			var v1 = new THREE.Vector3().subVectors(p3, p1).multiplyScalar(0.5);
			for (var j = 0; j < DIV; j++) {
				var t = 1.0 / DIV * j;
				var x = p1.x + t * v0.x
						 + t * t * (-3 * p1.x + 3 * p2.x - 2 * v0.x - v1.x)
						 + t * t * t * (2 * p1.x - 2 * p2.x + v0.x + v1.x);
				var y = p1.y + t * v0.y
						 + t * t * (-3 * p1.y + 3 * p2.y - 2 * v0.y - v1.y)
						 + t * t * t * (2 * p1.y - 2 * p2.y + v0.y + v1.y);
				var z = p1.z + t * v0.z
						 + t * t * (-3 * p1.z + 3 * p2.z - 2 * v0.z - v1.z)
						 + t * t * t * (2 * p1.z - 2 * p2.z + v0.z + v1.z);
				ret.push(new THREE.Vector3(x, y, z));
			}
		}
		ret.push(points[points.length - 1]);
		return ret;
	};

	iview.prototype.drawAtomsAsSphere = function (atomlist, defaultRadius, forceDefault, scale) {
		var sphereGeometry = new THREE.SphereGeometry(1, this.sphereQuality, this.sphereQuality); // r, seg, ring
		for (var i = 0; i < atomlist.length; i++) {
			var atom = this.atoms[atomlist[i]];
			var sphereMaterial = new THREE.MeshLambertMaterial({ color: atom.color });
			var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
			var r = (!forceDefault && this.vdwRadii[atom.elem] != undefined) ? this.vdwRadii[atom.elem] : defaultRadius;
			if (!forceDefault && scale) r *= scale;
			sphere.scale.x = sphere.scale.y = sphere.scale.z = r;
			sphere.position.x = atom.x;
			sphere.position.y = atom.y;
			sphere.position.z = atom.z;
			this.modelGroup.add(sphere);
		}
	};

	iview.prototype.drawBondAsStickSub = function (atom1, atom2, bondR) {
		var p1 = new THREE.Vector3(atom1.x, atom1.y, atom1.z);
		var p2 = new THREE.Vector3(atom2.x, atom2.y, atom2.z);
		var mp = p1.clone().add(p2).multiplyScalar(0.5);
		var c1 = new THREE.Color(atom1.color);
		var c2 = new THREE.Color(atom2.color);
		this.drawCylinder(p1, mp, bondR, atom1.color);
		this.drawCylinder(p2, mp, bondR, atom2.color);
	};

	iview.prototype.drawBondsAsStick = function (atomlist, bondR, atomR, ignoreNonbonded, scale) {
		var sphereGeometry = new THREE.SphereGeometry(1, this.sphereQuality, this.sphereQuality);
		var nAtoms = atomlist.length, mp;
		var forSpheres = [];
		for (var _i = 0; _i < nAtoms; _i++) {
			var i = atomlist[_i];
			var atom1 = this.atoms[i];
			for (var _j = _i + 1; _j < _i + 30 && _j < nAtoms; _j++) {
				var j = atomlist[_j];
				var atom2 = this.atoms[j];
				if (this.isConnected(atom1, atom2) == 0) continue;
				atom1.connected = atom2.connected = true;
				this.drawBondAsStickSub(atom1, atom2, bondR);
			}
			for (var _j = 0; _j < atom1.bonds.length; _j++) {
				var j = atom1.bonds[_j];
				if (j < i + 30) continue; // be conservative!
				if (atomlist.indexOf(j) == -1) continue;
				var atom2 = this.atoms[j];
				atom1.connected = atom2.connected = true;
				this.drawBondAsStickSub(atom1, atom2, bondR);
			}
			if (atom1.connected) forSpheres.push(i);
		}
		this.drawAtomsAsSphere(forSpheres, atomR, !scale, scale);
	};

	iview.prototype.drawBondsAsLineSub = function (geo, atom1, atom2) {
		var p1 = new THREE.Vector3(atom1.x, atom1.y, atom1.z);
		var p2 = new THREE.Vector3(atom2.x, atom2.y, atom2.z);
		var mp = p1.clone().add(p2).multiplyScalar(0.5);
		var c1 = new THREE.Color(atom1.color);
		var c2 = new THREE.Color(atom2.color);
		geo.vertices.push(p1); geo.colors.push(c1); geo.vertices.push(mp); geo.colors.push(c1);
		geo.vertices.push(p2); geo.colors.push(c2); geo.vertices.push(mp); geo.colors.push(c2);
	};

	iview.prototype.drawBondsAsLine = function (atomlist, lineWidth) {
		var geo = new THREE.Geometry();
		var nAtoms = atomlist.length;
		for (var _i = 0; _i < nAtoms; _i++) {
			var i = atomlist[_i];
			var atom1 = this.atoms[i];
			for (var _j = _i + 1; _j < _i + 30 && _j < nAtoms; _j++) {
				var j = atomlist[_j];
				var atom2 = this.atoms[j];
				if (this.isConnected(atom1, atom2) == 0) continue;
				this.drawBondsAsLineSub(geo, atom1, atom2);
			}
			for (var _j = 0; _j < atom1.bonds.length; _j++) {
				var j = atom1.bonds[_j];
				if (j < i + 30) continue; // be conservative!
				if (atomlist.indexOf(j) == -1) continue;
				var atom2 = this.atoms[j];
				this.drawBondsAsLineSub(geo, atom1, atom2);
			}
		}
		var lineMaterial = new THREE.LineBasicMaterial({ linewidth: lineWidth });
		lineMaterial.vertexColors = true;
		this.modelGroup.add(new THREE.Line(geo, lineMaterial, THREE.LinePieces));
	};

	iview.prototype.drawSmoothCurve = function (_points, width, colors, div) {
		if (_points.length == 0) return;
		div = (div == undefined) ? 5 : div;
		var geo = new THREE.Geometry();
		var points = this.subdivide(_points, div);
		for (var i = 0; i < points.length; i++) {
			geo.vertices.push(points[i]);
			geo.colors.push(new THREE.Color(colors[(i == 0) ? 0 : Math.round((i - 1) / div)]));
		}
		var lineMaterial = new THREE.LineBasicMaterial({ linewidth: width });
		lineMaterial.vertexColors = true;
		this.modelGroup.add(new THREE.Line(geo, lineMaterial, THREE.LineStrip));
	};

	iview.prototype.drawMainchainCurve = function (atomlist, curveWidth, atomName, div) {
		var points = [], colors = [];
		var currentChain, currentResi;
		if (div == undefined) div = 5;
		for (var i in atomlist) {
			var atom = this.atoms[atomlist[i]];
			if ((atom.atom == atomName) && !atom.het) {
				if (currentChain != atom.chain || currentResi + 1 != atom.resi) {
					this.drawSmoothCurve(points, curveWidth, colors, div);
					points = [];
					colors = [];
				}
				points.push(new THREE.Vector3(atom.x, atom.y, atom.z));
				colors.push(atom.color);
				currentChain = atom.chain;
				currentResi = atom.resi;
			}
		}
		this.drawSmoothCurve(points, curveWidth, colors, div);
	};

	// FIXME: Winkled...
	iview.prototype.drawSmoothTube = function (_points, colors, radii) {
		if (_points.length < 2) return;
		var circleDiv = this.tubeDIV, axisDiv = this.axisDIV;
		var geo = new THREE.Geometry();
		var points = this.subdivide(_points, axisDiv);
		var prevAxis1 = new THREE.Vector3(), prevAxis2;
		for (var i = 0, lim = points.length; i < lim; i++) {
			var r, idx = (i - 1) / axisDiv;
			if (i == 0) r = radii[0];
			else {
				if (idx % 1 == 0) r = radii[idx];
				else {
					var floored = Math.floor(idx);
					var tmp = idx - floored;
					r = radii[floored] * tmp + radii[floored + 1] * (1 - tmp);
				}
			}
			var delta, axis1, axis2;
			if (i < lim - 1) {
				delta = new THREE.Vector3().subVectors(points[i], points[i + 1]);
				axis1 = new THREE.Vector3(0, -delta.z, delta.y).normalize().multiplyScalar(r);
				axis2 = new THREE.Vector3().crossVectors(delta, axis1).normalize().multiplyScalar(r);
				//      var dir = 1, offset = 0;
				if (prevAxis1.dot(axis1) < 0) {
					axis1.negate(); axis2.negate();  //dir = -1;//offset = 2 * Math.PI / axisDiv;
				}
				prevAxis1 = axis1; prevAxis2 = axis2;
			} else {
				axis1 = prevAxis1; axis2 = prevAxis2;
			}
			for (var j = 0; j < circleDiv; j++) {
				var angle = 2 * Math.PI / circleDiv * j; //* dir  + offset;
				var c = Math.cos(angle), s = Math.sin(angle);
				geo.vertices.push(new THREE.Vector3(
				points[i].x + c * axis1.x + s * axis2.x,
				points[i].y + c * axis1.y + s * axis2.y,
				points[i].z + c * axis1.z + s * axis2.z));
			}
		}
		var offset = 0;
		for (var i = 0, lim = points.length - 1; i < lim; i++) {
			var c = new THREE.Color(colors[Math.round((i - 1) / axisDiv)]);
			var reg = 0;
			var r1 = new THREE.Vector3().subVectors(geo.vertices[offset], geo.vertices[offset + circleDiv]).lengthSq();
			var r2 = new THREE.Vector3().subVectors(geo.vertices[offset], geo.vertices[offset + circleDiv + 1]).lengthSq();
			if (r1 > r2) { r1 = r2; reg = 1; };
			for (var j = 0; j < circleDiv; j++) {
				geo.faces.push(new THREE.Face3(offset + j, offset + (j + reg) % circleDiv + circleDiv, offset + (j + 1) % circleDiv));
				geo.faces.push(new THREE.Face3(offset + (j + 1) % circleDiv, offset + (j + reg) % circleDiv + circleDiv, offset + (j + reg + 1) % circleDiv + circleDiv));
				geo.faces[geo.faces.length - 2].color = c;
				geo.faces[geo.faces.length - 1].color = c;
			}
			offset += circleDiv;
		}
		geo.computeFaceNormals();
		geo.computeVertexNormals(false);
		var mat = new THREE.MeshLambertMaterial();
		mat.vertexColors = THREE.FaceColors;
		var mesh = new THREE.Mesh(geo, mat);
		mesh.doubleSided = true;
		this.modelGroup.add(mesh);
	};

	iview.prototype.drawMainchainTube = function (atomlist, atomName, radius) {
		var points = [], colors = [], radii = [];
		var currentChain, currentResi;
		for (var i in atomlist) {
			var atom = this.atoms[atomlist[i]];
			if ((atom.atom == atomName) && !atom.het) {
				if (currentChain != atom.chain || currentResi + 1 != atom.resi) {
					this.drawSmoothTube(points, colors, radii);
					points = []; colors = []; radii = [];
				}
				points.push(new THREE.Vector3(atom.x, atom.y, atom.z));
				if (radius == undefined) {
					radii.push((atom.b > 0) ? atom.b / 100 : 0.3);
				} else {
					radii.push(radius);
				}
				colors.push(atom.color);
				currentChain = atom.chain;
				currentResi = atom.resi;
			}
		}
		this.drawSmoothTube(points, colors, radii);
	};

	iview.prototype.drawCylinder = function (from, to, radius, color, cap) {
		if (!from || !to) return;
		var midpoint = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5);
		if (!this.cylinderGeometry) {
			this.cylinderGeometry = new THREE.CylinderGeometry(1, 1, 1, this.cylinderQuality, 1, !cap);
			this.cylinderGeometry.faceUvs = [];
			this.faceVertexUvs = [];
		}
		var cylinderMaterial = new THREE.MeshLambertMaterial({ color: color });
		var cylinder = new THREE.Mesh(this.cylinderGeometry, cylinderMaterial);
		cylinder.position = midpoint;
		cylinder.lookAt(from);
		cylinder.updateMatrix();
		cylinder.matrixAutoUpdate = false;
		var m = new THREE.Matrix4().makeScale(radius, radius, from.distanceTo(to));
		m.rotateX(Math.PI / 2);
		cylinder.matrix.multiply(m);
		this.modelGroup.add(cylinder);
	};

	// FIXME: transition!
	iview.prototype.drawHelixAsCylinder = function (atomlist, radius) {
		var start = null;
		var currentChain, currentResi;
		var others = [], beta = [];
		for (var i in atomlist) {
			var atom = this.atoms[atomlist[i]];
			if (atom.het) continue;
			if ((atom.ss != 'helix' && atom.ss != 'sheet') || atom.ssend || atom.ssbegin) others.push(atom.serial);
			if (atom.ss == 'sheet') beta.push(atom.serial);
			if (atom.atom != 'CA') continue;
			if (atom.ss == 'helix' && atom.ssend) {
				if (start != null) this.drawCylinder(new THREE.Vector3(start.x, start.y, start.z), new THREE.Vector3(atom.x, atom.y, atom.z), radius, atom.color, true);
				start = null;
			}
			currentChain = atom.chain;
			currentResi = atom.resi;
			if (start == null && atom.ss == 'helix' && atom.ssbegin) start = atom;
		}
		if (start != null) this.drawCylinder(new THREE.Vector3(start.x, start.y, start.z), new THREE.Vector3(atom.x, atom.y, atom.z), radius, atom.color);
		this.drawMainchainTube(others, "CA", 0.3);
		this.drawStrand(beta, undefined, undefined, true, 0, this.helixSheetWidth, false, this.thickness * 2);
	};

	iview.prototype.drawStrip = function (p1, p2, colors, div, thickness) {
		if ((p1.length) < 2) return;
		div = div || this.axisDIV;
		p1 = this.subdivide(p1, div);
		p2 = this.subdivide(p2, div);
		var geo = new THREE.Geometry();
		if (!thickness) {
			for (var i = 0, lim = p1.length; i < lim; i++) {
				geo.vertices.push(p1[i]); // 2i
				geo.vertices.push(p2[i]); // 2i + 1
			}
			for (var i = 1, lim = p1.length; i < lim; i++) {
				var f = new THREE.Face4(2 * i, 2 * i + 1, 2 * i - 1, 2 * i - 2);
				f.color = new THREE.Color(colors[Math.round((i - 1) / div)]);
				geo.faces.push(f);
			}
			geo.computeFaceNormals();
			geo.computeVertexNormals(false);
			var material = new THREE.MeshLambertMaterial();
			material.vertexColors = THREE.FaceColors;
			var mesh = new THREE.Mesh(geo, material);
			mesh.doubleSided = true;
			this.modelGroup.add(mesh);
			return;
		}
		var vs = geo.vertices, fs = geo.faces;
		var axis, p1v, p2v, a1v, a2v;
		for (var i = 0, lim = p1.length; i < lim; i++) {
			vs.push(p1v = p1[i]); // 0
			vs.push(p1v); // 1
			vs.push(p2v = p2[i]); // 2
			vs.push(p2v); // 3
			if (i < lim - 1) {
				var toNext = p1[i + 1].clone().sub(p1[i]);
				var toSide = p2[i].clone().sub(p1[i]);
				axis = toSide.cross(toNext).normalize().multiplyScalar(thickness);
			}
			vs.push(a1v = p1[i].clone().add(axis)); // 4
			vs.push(a1v); // 5
			vs.push(a2v = p2[i].clone().add(axis)); // 6
			vs.push(a2v); // 7
		}
		var faces = [[0, 2, -6, -8], [-4, -2, 6, 4], [7, 3, -5, -1], [-3, -7, 1, 5]];
		for (var i = 1, lim = p1.length; i < lim; i++) {
			var offset = 8 * i, color = new THREE.Color(colors[Math.round((i - 1) / div)]);
			for (var j = 0; j < 4; j++) {
				var f = new THREE.Face4(offset + faces[j][0], offset + faces[j][1], offset + faces[j][2], offset + faces[j][3], undefined, color);
				fs.push(f);
			}
		}
		var vsize = vs.length - 8; // Cap
		for (var i = 0; i < 4; i++) { vs.push(vs[i * 2]); vs.push(vs[vsize + i * 2]) };
		vsize += 8;
		fs.push(new THREE.Face4(vsize, vsize + 2, vsize + 6, vsize + 4, undefined, fs[0].color));
		fs.push(new THREE.Face4(vsize + 1, vsize + 5, vsize + 7, vsize + 3, undefined, fs[fs.length - 3].color));
		geo.computeFaceNormals();
		geo.computeVertexNormals(false);
		var material = new THREE.MeshLambertMaterial();
		material.vertexColors = THREE.FaceColors;
		var mesh = new THREE.Mesh(geo, material);
		mesh.doubleSided = true;
		this.modelGroup.add(mesh);
	};

	iview.prototype.drawStrand = function (atomlist, num, div, fill, coilWidth, helixSheetWidth, doNotSmoothen, thickness) {
		num = num || this.strandDIV;
		div = div || this.axisDIV;
		coilWidth = coilWidth || this.coilWidth;
		doNotSmoothen == (doNotSmoothen == undefined) ? false : doNotSmoothen;
		helixSheetWidth = helixSheetWidth || this.helixSheetWidth;
		var points = []; for (var k = 0; k < num; k++) points[k] = [];
		var colors = [];
		var currentChain, currentResi, currentCA;
		var prevCO = null, ss = null, ssborder = false;
		for (var i in atomlist) {
			var atom = this.atoms[atomlist[i]];
			if ((atom.atom == 'O' || atom.atom == 'CA') && !atom.het) {
				if (atom.atom == 'CA') {
					if (currentChain != atom.chain || currentResi + 1 != atom.resi) {
						for (var j = 0; !thickness && j < num; j++)
							this.drawSmoothCurve(points[j], 1, colors, div);
						if (fill) this.drawStrip(points[0], points[num - 1], colors, div, thickness);
						var points = []; for (var k = 0; k < num; k++) points[k] = [];
						colors = [];
						prevCO = null; ss = null; ssborder = false;
					}
					currentCA = new THREE.Vector3(atom.x, atom.y, atom.z);
					currentChain = atom.chain;
					currentResi = atom.resi;
					ss = atom.ss; ssborder = atom.ssstart || atom.ssend;
					colors.push(atom.color);
				} else { // O
					var O = new THREE.Vector3(atom.x, atom.y, atom.z);
					O.sub(currentCA);
					O.normalize(); // can be omitted for performance
					O.multiplyScalar((ss == 'coil') ? coilWidth : helixSheetWidth);
					if (prevCO != undefined && O.dot(prevCO) < 0) O.negate();
					prevCO = O;
					for (var j = 0; j < num; j++) {
						var delta = -1 + 2 / (num - 1) * j;
						var v = new THREE.Vector3(currentCA.x + prevCO.x * delta, currentCA.y + prevCO.y * delta, currentCA.z + prevCO.z * delta);
						if (!doNotSmoothen && ss == 'sheet') v.smoothen = true;
						points[j].push(v);
					}
				}
			}
		}
		for (var j = 0; !thickness && j < num; j++)
			this.drawSmoothCurve(points[j], 1, colors, div);
		if (fill) this.drawStrip(points[0], points[num - 1], colors, div, thickness);
	};

	iview.prototype.drawDottedLines = function (points, color) {
		var geo = new THREE.Geometry();
		var step = 0.3;
		for (var i = 0, lim = Math.floor(points.length / 2) ; i < lim; i++) {
			var p1 = points[2 * i], p2 = points[2 * i + 1];
			var delta = p2.clone().sub(p1);
			var dist = delta.length();
			delta.normalize().multiplyScalar(step);
			var jlim = Math.floor(dist / step);
			for (var j = 0; j < jlim; j++) {
				geo.vertices.push(new THREE.Vector3(p1.x + delta.x * j, p1.y + delta.y * j, p1.z + delta.z * j));
			}
			if (jlim % 2 == 1) geo.vertices.push(p2);
		}
		var mat = new THREE.LineBasicMaterial({ 'color': color, linewidth: 2 });
		this.modelGroup.add(new THREE.Line(geo, mat, THREE.LinePieces));
	};

	iview.prototype.getAllAtoms = function () {
		var ret = [];
		for (var i in this.atoms) {
			ret.push(this.atoms[i].serial);
		}
		return ret;
	};

	iview.prototype.getHetatms = function (atomlist) {
		var ret = [];
		for (var i in atomlist) {
			var atom = this.atoms[atomlist[i]];
			if (atom.het) ret.push(atom.serial);
		}
		return ret;
	};

	iview.prototype.getLigands = function (atomlist) {
		var ret = [];
		for (var i in atomlist) {
			var atom = this.atoms[atomlist[i]];
			if (atom.bonds.length) ret.push(atom.serial);
		}
		return ret;
	};

	iview.prototype.getWaters = function (atomlist) {
		var ret = [];
		for (var i in atomlist) {
			var atom = this.atoms[atomlist[i]];
			if (atom.bonds.length == 0 && atom.resn == 'HOH') ret.push(atom.serial);
		}
		return ret;
	};

	iview.prototype.getIons = function (atomlist) {
		var ret = [];
		for (var i in atomlist) {
			var atom = this.atoms[atomlist[i]];
			if (atom.bonds.length == 0 && atom.resn != 'HOH') ret.push(atom.serial);
		}
		return ret;
	};

	iview.prototype.getSidechains = function (atomlist) {
		var ret = [];
		for (var i in atomlist) {
			var atom = this.atoms[atomlist[i]];
			if (atom.het) continue;
			if (atom.atom == 'C' || atom.atom == 'O' || (atom.atom == 'N' && atom.resn != 'PRO')) continue;
			ret.push(atom.serial);
		}
		return ret;
	};

	iview.prototype.colorByAtom = function (atomlist) {
		for (var i in atomlist) {
			var atom = this.atoms[atomlist[i]];
			atom.color = this.elementColors[atom.elem] || this.defaultColor;
		}
	};

	iview.prototype.colorByStructure = function (atomlist, colorSidechains) {
		for (var i in atomlist) {
			var atom = this.atoms[atomlist[i]];
			if (!colorSidechains && (atom.atom != 'CA' || atom.het)) continue;
			if (atom.ss == 'sheet') atom.color = this.sheetColor;
			else if (atom.ss == 'helix') atom.color = this.helixColor;
		}
	};

	iview.prototype.colorByBFactor = function (atomlist, colorSidechains) {
		var minB = 1000, maxB = -1000;
		for (var i in atomlist) {
			var atom = this.atoms[atomlist[i]];
			if (atom.het) continue;
			if (colorSidechains || atom.atom == 'CA' || atom.atom == 'O3\'') {
				if (minB > atom.b) minB = atom.b;
				if (maxB < atom.b) maxB = atom.b;
			}
		}
		var mid = (maxB + minB) * 0.5;
		var range = (maxB - minB) * 0.5;
		for (var i in atomlist) {
			var atom = this.atoms[atomlist[i]];
			if (atom.het) continue;
			if (colorSidechains || atom.atom == 'CA' || atom.atom == 'O3\'') {
				var color = new THREE.Color();
				if (atom.b < mid)
					color.setHSV(0.667, (mid - atom.b) / range, 1);
				else
					color.setHSV(0, (atom.b - mid) / range, 1);
				atom.color = color.getHex();
			}
		}
	};

	iview.prototype.colorByChain = function (atomlist, colorSidechains) {
		for (var i in atomlist) {
			var atom = this.atoms[atomlist[i]];
			if (atom.het) continue;
			if (colorSidechains || atom.atom == 'CA' || atom.atom == 'O3\'') {
				var color = new THREE.Color();
				color.setHSV((atom.chain.charCodeAt(0) * 5) % 17 / 17.0, 1, 0.9);
				atom.color = color.getHex();
			}
		}
	};

	iview.prototype.colorByResidue = function (atomlist) {
		for (var i in atomlist) {
			var atom = this.atoms[atomlist[i]];
			if (this.residueColors[atom.resn]) {
				atom.color = this.residueColors[atom.resn];
			}
		}
	};

	iview.prototype.colorByPolarity = function (atomlist) {
		for (var i in atomlist) {
			var atom = this.atoms[atomlist[i]];
			if (this.polarityColors[atom.resn]) {
				atom.color = this.polarityColors[atom.resn];
			}
		}
	};

	iview.prototype.colorChainbow = function (atomlist, colorSidechains) {
		var cnt = 0;
		var atom, i;
		for (i in atomlist) {
			atom = this.atoms[atomlist[i]];
			if ((colorSidechains || atom.atom != 'CA' || atom.atom != 'O3\'') && !atom.het)
				cnt++;
		}
		var total = cnt;
		cnt = 0;
		for (i in atomlist) {
			atom = this.atoms[atomlist[i]];
			if ((colorSidechains || atom.atom != 'CA' || atom.atom != 'O3\'') && !atom.het) {
				var color = new THREE.Color(0);
				color.setHSV(2 / 3 * (1 - cnt++ / total), 1, 0.9);
				atom.color = color.getHex();
			}
		}
	};

	iview.prototype.rebuildScene = function (options) {
		var view;
		if (!this.modelGroup) view = [0, 0, 0, 0, 0, 0, 0, 1];
		else {
			var pos = this.modelGroup.position;
			var q = this.rotationGroup.quaternion;
			view = [pos.x, pos.y, pos.z, this.rotationGroup.position.z, q.x, q.y, q.z, q.w];
		}
		var directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1.2);
		directionalLight.position = new THREE.Vector3(0.2, 0.2, -1).normalize();
		var ambientLight = new THREE.AmbientLight(0x202020);
		this.scene = new THREE.Scene();
		this.scene.add(directionalLight);
		this.scene.add(ambientLight);

		this.modelGroup = new THREE.Object3D();
		this.rotationGroup = new THREE.Object3D();
		this.rotationGroup.useQuaternion = true;
		this.rotationGroup.quaternion = new THREE.Quaternion(1, 0, 0, 0);
		this.rotationGroup.add(this.modelGroup);
		this.scene.add(this.rotationGroup);

		$.extend(this.options, options);
		this.camera = this.cameras[this.options.camera];

		this.options.background = this.backgroundColors[this.options.background] || this.options.background;
		this.renderer.setClearColorHex(this.options.background);
		this.scene.fog = new THREE.Fog(this.options.background, 100, 200);

		var all = this.getAllAtoms();
		var hetatms = this.getHetatms(all);
		var ligands = this.getLigands(hetatms);
		var waters = this.getWaters(hetatms);
		var ions = this.getIons(hetatms);

		this.colorByAtom(all);
		switch (this.options.colorBy) {
			case 'spectrum':
				this.colorChainbow(all);
				break;
			case 'chain':
				this.colorByChain(all);
				break;
			case 'secondary structure':
				this.colorByStructure(all);
				break;
			case 'B factor':
				this.colorByBFactor(all);
				break;
			case 'residue':
				this.colorByResidue(all);
				break;
			case 'polarity':
				this.colorByPolarity(all);
				break;
			case 'atom':
				break;
		}

		var doNotSmoothen = false;
		switch (this.options.secondaryStructure) {
			case 'ribbon':
				this.drawStrand(all, 2, undefined, true, undefined, undefined, doNotSmoothen, this.thickness);
				break;
			case 'strand':
				this.drawStrand(all, null, null, null, null, null, doNotSmoothen);
				break;
			case 'cylinder & plate':
				this.drawHelixAsCylinder(all, 1.6);
				break;
			case 'C alpha trace':
				this.drawMainchainCurve(all, this.curveWidth, 'CA', 1);
				break;
			case 'B factor tube':
				this.drawMainchainTube(all, 'CA');
				break;
		}

		switch (this.options.primaryStructure) {
			case 'residues':
				this.drawBondsAsLine(all, this.lineWidth);
				break;
			case 'sidechains':
				this.drawBondsAsLine(this.getSidechains(all), this.lineWidth);
				break;
		}

		switch (this.options.ligands) {
			case 'line':
				this.drawBondsAsLine(ligands, this.curveWidth);
				break;
			case 'stick':
				this.drawBondsAsStick(ligands, this.cylinderRadius, this.cylinderRadius, true);
				break;
			case 'ball and stick':
				this.drawBondsAsStick(ligands, this.cylinderRadius / 2.0, this.cylinderRadius, true, 0.3);
				break;
			case 'sphere':
				this.drawAtomsAsSphere(ligands, this.sphereRadius);
				break;
		}

		switch (this.options.waters) {
			case 'sphere':
				this.drawAtomsAsSphere(waters, 0.3, true);
				break;
		}

		switch (this.options.ions) {
			case 'sphere':
				this.drawAtomsAsSphere(ions, this.sphereRadius);
				break;
		}

		this.modelGroup.position.x = view[0];
		this.modelGroup.position.y = view[1];
		this.modelGroup.position.z = view[2];
		this.rotationGroup.position.z = view[3];
		this.rotationGroup.quaternion.x = view[4];
		this.rotationGroup.quaternion.y = view[5];
		this.rotationGroup.quaternion.z = view[6];
		this.rotationGroup.quaternion.w = view[7];
	};

	iview.prototype.loadReceptor = function (src) {
		var helices = [], sheets = [];
		this.atoms = [];
		var lines = src.split("\n");
		for (var i in lines) {
			var line = lines[i];
			var record = line.substr(0, 6);
			if (record == 'ATOM  ' || record == 'HETATM') {
				if (!(line[16] == ' ' || line[16] == 'A')) continue;
				var serial = parseInt(line.substr(6, 5));
				this.atoms[serial] = {
					het: record[0] == 'H',
					serial: serial,
					atom: line.substr(12, 4).replace(/ /g, ''),
					resn: line.substr(17, 3),
					chain: line.substr(21, 1),
					resi: parseInt(line.substr(22, 5)),
					x: parseFloat(line.substr(30, 8)),
					y: parseFloat(line.substr(38, 8)),
					z: parseFloat(line.substr(46, 8)),
					b: parseFloat(line.substr(60, 8)),
					elem: line.substr(76, 2).replace(/ /g, ''),
					bonds: [],
					ss: 'coil',
				};
			} else if (record == 'CONECT') {
				var from = parseInt(line.substr(6, 5));
				for (var j = 0; j < 4; ++j) {
					var to = parseInt(line.substr([11, 16, 21, 26][j], 5));
					if (isNaN(to)) continue;
					this.atoms[from].bonds.push(to);
				}
			} else if (record == 'HELIX ') {
				helices.push({
					chain: line.substr(19, 1),
					initialResidue: parseInt(line.substr(21, 4)),
					terminalResidue: parseInt(line.substr(33, 4)),
				});
			} else if (record == 'SHEET ') {
				sheets.push({
					chain: line.substr(21, 1),
					initialResidue: parseInt(line.substr(22, 4)),
					terminalResidue: parseInt(line.substr(33, 4)),
				});
			}
		}
		for (var i in this.atoms) {
			var atom = this.atoms[i];
			for (var j in helices) {
				var helix = helices[j];
				if (atom.chain == helix.chain && atom.resi >= helix.initialResidue && atom.resi <= helix.terminalResidue) {
					atom.ss = 'helix';
					if (atom.resi == helix.initialResidue) atom.ssbegin = true;
					else if (atom.resi == helix.terminalResidue) atom.ssend = true;
				}
			}
			for (var j in sheets) {
				var sheet = sheets[j];
				if (atom.chain == sheet.chain && atom.resi >= sheet.initialResidue && atom.resi <= sheet.terminalResidue) {
					atom.ss = 'sheet';
					if (atom.resi == sheet.initialResidue) atom.ssbegin = true;
					else if (atom.resi == sheet.terminalResidue) atom.ssend = true;
				}
			}
		}
		this.rebuildScene();
		this.resetView();
	};

	iview.prototype.show = function () {
		var center = this.rotationGroup.position.z - this.camera.position.z;
		if (center < 1) center = 1;
		this.camera.near = center + this.slabNear;
		if (this.camera.near < 1) this.camera.near = 1;
		this.camera.far = center + this.slabFar;
		if (this.camera.near + 1 > this.camera.far) this.camera.far = this.camera.near + 1;
		if (this.camera instanceof THREE.PerspectiveCamera) {
			this.camera.fov = this.fov;
		} else {
			this.camera.right = center * Math.tan(Math.PI / 180 * this.fov);
			this.camera.left = -this.camera.right;
			this.camera.top = this.camera.right / this.ASPECT;
			this.camera.bottom = -this.camera.top;
		}
		this.camera.updateProjectionMatrix();
		this.scene.fog.near = this.camera.near + this.fogStart * (this.camera.far - this.camera.near);
		//   if (this.scene.fog.near > center) this.scene.fog.near = center;
		this.scene.fog.far = this.camera.far;
		this.renderer.render(this.scene, this.camera);
	};

	iview.prototype.resetView = function () {
		var xmin = ymin = zmin = 9999;
		var xmax = ymax = zmax = -9999;
		var xsum = ysum = zsum = cnt = 0;
		for (var i in this.atoms) {
			var atom = this.atoms[i];
			xsum += atom.x; ysum += atom.y; zsum += atom.z;
			xmin = (xmin < atom.x) ? xmin : atom.x;
			ymin = (ymin < atom.y) ? ymin : atom.y;
			zmin = (zmin < atom.z) ? zmin : atom.z;
			xmax = (xmax > atom.x) ? xmax : atom.x;
			ymax = (ymax > atom.y) ? ymax : atom.y;
			zmax = (zmax > atom.z) ? zmax : atom.z;
			++cnt;
		}
		var center = new THREE.Vector3(xsum / cnt, ysum / cnt, zsum / cnt);
		this.modelGroup.position = center.multiplyScalar(-1);
		var x = xmax - xmin, y = ymax - ymin, z = zmax - zmin;
		var maxD = Math.sqrt(x * x + y * y + z * z);
		if (maxD < 25) maxD = 25;
		this.slabNear = -maxD / 1.9;
		this.slabFar = maxD / 3;
		this.rotationGroup.position.z = maxD * 0.35 / Math.tan(Math.PI / 180.0 * this.camera.fov / 2) - 150;
		this.rotationGroup.quaternion = new THREE.Quaternion(1, 0, 0, 0);
		this.show();
	};

	iview.prototype.export = function () {
		this.show();
		window.open(this.renderer.domElement.toDataURL('image/png'));
	};

	return iview;
}());