import './3dForceGraph.css';

import './threeGlobal';
// import 'three/examples/js/controls/TrackBallControls';
import 'three/examples/js/controls/OrbitControls';

import * as d3 from 'd3-force-3d';
import graph from 'ngraph.graph';
import forcelayout from 'ngraph.forcelayout';
import forcelayout3d from 'ngraph.forcelayout3d';
const ngraph = { graph, forcelayout, forcelayout3d };

import Stats from '../../lib/stats'
import { INDEX_FOR_STATS } from '../../const'

import DEFAULT_IMG from './avatar.png';

import * as SWC from 'swc';


const CAMERA_DISTANCE2NODES_FACTOR = 150;

var stats = null;

export default (config) => {
	return SWC.createComponent({
		props: [
			new SWC.Prop('width', window.innerWidth),
			new SWC.Prop('height', window.innerHeight),
			new SWC.Prop('jsonUrl'),
			new SWC.Prop('graphData', {
				nodes: [],
				links: []
			}),
			new SWC.Prop('numDimensions', 3),
			new SWC.Prop('nodeRelSize', 4), // volume per val unit
			new SWC.Prop('lineOpacity', 0.2),
			new SWC.Prop('autoColorBy'),
			new SWC.Prop('idField', 'id'),
			new SWC.Prop('valField', 'val'),
			new SWC.Prop('nameField', 'name'),
			new SWC.Prop('colorField', 'color'),
			new SWC.Prop('linkSourceField', 'source'),
			new SWC.Prop('linkTargetField', 'target'),
			new SWC.Prop('forceEngine', 'd3'), // d3 or ngraph
			new SWC.Prop('warmupTicks', 0), // how many times to tick the force engine at init before starting to render
			new SWC.Prop('cooldownTicks', Infinity),
			new SWC.Prop('cooldownTime', 15000) // ms
		],

		init: (domNode, state) => {
			// Wipe DOM
			domNode.innerHTML = '';

			// add stats to show performance when DEBUG
			if (DEBUG) {
				stats = new Stats()
				stats.domElement.style.position = 'absolute'
				stats.domElement.style.zIndex = INDEX_FOR_STATS
				document.body.appendChild(stats.domElement)
			}

			// Add info space
			domNode.appendChild(state.infoElem = document.createElement('div'));
			state.infoElem.className = 'graph-info-msg';
			state.infoElem.textContent = '';

			// Setup tooltip
			const toolTipElem = document.createElement('div');
			toolTipElem.classList.add('graph-tooltip');
			toolTipElem.style.background = config.tooltip.background;
			toolTipElem.style.color = config.tooltip.color;
			toolTipElem.style.fontSize = config.tooltip.fontSize;
			toolTipElem.style.padding = config.tooltip.padding;
			toolTipElem.style.borderRadius = config.tooltip.borderRadius;
			domNode.appendChild(toolTipElem);

			// Capture mouse coords on move
			const raycaster = new THREE.Raycaster();
			const mousePos = new THREE.Vector2();
			mousePos.x = -2; // Initialize off canvas
			mousePos.y = -2;
			domNode.addEventListener("mousemove", ev => {
				// update the mouse pos
				const offset = getOffset(domNode),
					relPos = {
						x: ev.pageX - offset.left,
						y: ev.pageY - offset.top
					};
				mousePos.x = (relPos.x / state.width) * 2 - 1;
				mousePos.y = -(relPos.y / state.height) * 2 + 1;

				// Move tooltip
				toolTipElem.style.top = (relPos.y - 40) + 'px';
				toolTipElem.style.left = (relPos.x - 20) + 'px';

				function getOffset(el) {
					const rect = el.getBoundingClientRect(),
						scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
						scrollTop = window.pageYOffset || document.documentElement.scrollTop;
					return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
				}
			}, false);

			// Setup renderer
			state.renderer = new THREE.WebGLRenderer();
			domNode.appendChild(state.renderer.domElement);

			// Setup scene
			const scene = new THREE.Scene();
			scene.background = new THREE.Color(config.general.background || 0x0000A);
			scene.add(state.graphScene = new THREE.Group());

			// Add lights
			scene.add(new THREE.AmbientLight(config.general.amLightColor || 0xbbbbbb));
			scene.add(new THREE.DirectionalLight(config.general.diLightColor || 0xffffff, config.general.diLightIntensity || 0.6));

			// Setup camera
			state.camera = new THREE.PerspectiveCamera();
			state.camera.far = 20000;

			// Add camera interaction
			// const tbControls = new THREE.TrackballControls(state.camera, state.renderer.domElement);
			const obControls = new THREE.OrbitControls(state.camera, state.renderer.domElement);

			// Add D3 force-directed layout
			state.d3ForceLayout = d3.forceSimulation()
				.force('link', d3.forceLink())
				.force('charge', d3.forceManyBody())
				.force('center', d3.forceCenter())
				.stop();

			//

			// Kick-off renderer
			(function animate() { // IIFE
				if(state.onFrame) state.onFrame();

				// Update tooltip
				raycaster.setFromCamera(mousePos, state.camera);
				const intersects = raycaster.intersectObjects(state.graphScene.children)
					.filter(o => o.object.name); // Check only objects with labels
				toolTipElem.style.display = intersects.length ? "block" : "none";
				toolTipElem.textContent = intersects.length ? intersects[0].object.name : '';

				if (DEBUG) {
					stats.update();
				}

				// Frame cycle
				// tbControls.update();
				obControls.update();
				state.renderer.render(scene, state.camera);
				requestAnimationFrame(animate);
			})();
		},

		update: function updateFn(state) {
			resizeCanvas();

			state.onFrame = null; // Pause simulation
			state.infoElem.textContent = 'Loading...';

			if (state.graphData.nodes.length || state.graphData.links.length) {
				console.info('3d-force-graph loading', state.graphData.nodes.length + ' nodes', state.graphData.links.length + ' links');
			}

			if (!state.fetchingJson && state.jsonUrl && !state.graphData.nodes.length && !state.graphData.links.length) {
				// (Re-)load data
				state.fetchingJson = true;
				qwest.get(state.jsonUrl).then((_, json) => {
					state.fetchingJson = false;
					state.graphData = json;
					updateFn(state);  // Force re-update
				});
			}

			// Auto add color to uncolored nodes
			autoColorNodes(state.graphData.nodes, state.autoColorBy, state.colorField);

			// parse links
			state.graphData.links.forEach(link => {
				link.source = link[state.linkSourceField];
				link.target = link[state.linkTargetField];
			});

			// Add WebGL objects
			while (state.graphScene.children.length) { state.graphScene.remove(state.graphScene.children[0]) } // Clear the place

			state.graphData.nodes.forEach(node => {
				const radius = Math.cbrt(node[state.valField] || 1) * state.nodeRelSize;
				const sphere = new THREE.Mesh(
					new THREE.SphereGeometry(radius, 80, 80),
					new THREE.MeshLambertMaterial({ color: node[state.colorField] || config.node.color, transparent: true, opacity: config.node.opacity })
				);
				sphere.name = node[state.nameField]; // Add label
				state.graphScene.add(node.__sphere = sphere);

				if (node.image) {
					var texLoader = new THREE.TextureLoader();
					texLoader.crossOrigin = '';
				    texLoader.load(/*DEFAULT_IMG*/node.image,
				      function(texture){
				        texture.magFilter = THREE.LinearFilter;
				        texture.minFilter = THREE.LinearFilter;

				        const tmpMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide});
				        const tmpGeometry = new THREE.CircleGeometry(radius, 80);
				        if (node.__nodeImage) {
				        	state.graphScene.remove(node.__nodeImage);
				        }
				        node.__nodeImage = new THREE.Mesh(tmpGeometry, tmpMaterial);
				        state.graphScene.add(node.__nodeImage);
				      }
				    );
				}

			});

			const lineMaterial = new THREE.LineBasicMaterial({ color: config.line.color, transparent: true, opacity: state.lineOpacity });
			state.graphData.links.forEach(link => {
				const geometry = new THREE.BufferGeometry();
				geometry.addAttribute('position', new THREE.BufferAttribute(new Float32Array(2 * 3), 3));
				const line = new THREE.Line(geometry, lineMaterial);

				line.renderOrder = 10; // Prevent visual glitches of dark lines on top of spheres by rendering them last

				state.graphScene.add(link.__line = line);
			});

			state.camera.lookAt(state.graphScene.position);
			state.camera.position.z = Math.cbrt(state.graphData.nodes.length) * CAMERA_DISTANCE2NODES_FACTOR;

			// Feed data to force-directed layout
			const isD3Sim = state.forceEngine !== 'ngraph';
			let layout;
			if (isD3Sim) {
				// D3-force
				(layout = state.d3ForceLayout)
					.stop()
					.alpha(1)// re-heat the simulation
					.numDimensions(state.numDimensions)
					.nodes(state.graphData.nodes)
					.force('link')
						.id(d => d[state.idField])
						.links(state.graphData.links);
			} else {
				// ngraph
				const graph = ngraph.graph();
				state.graphData.nodes.forEach(node => { graph.addNode(node[state.idField]); });
				state.graphData.links.forEach(link => { graph.addLink(link.source, link.target); });
				layout = ngraph['forcelayout' + (state.numDimensions === 2 ? '' : '3d')](graph);
				layout.graph = graph; // Attach graph reference to layout
			}

			for (let i=0; i<state.warmupTicks; i++) { layout[isD3Sim?'tick':'step'](); } // Initial ticks before starting to render

			let cntTicks = 0;
			const startTickTime = new Date();
			state.onFrame = layoutTick;
			state.infoElem.textContent = '';

			//

			function resizeCanvas() {
				if (state.width && state.height) {
					state.renderer.setSize(state.width, state.height);
					state.camera.aspect = state.width/state.height;
					state.camera.updateProjectionMatrix();
				}
			}

			function layoutTick() {
				if (cntTicks++ > state.cooldownTicks || (new Date()) - startTickTime > state.cooldownTime) {
					state.onFrame = null; // Stop ticking graph
				}

				layout[isD3Sim?'tick':'step'](); // Tick it

				// Update nodes position
				state.graphData.nodes.forEach(node => {
					const sphere = node.__sphere,
						pos = isD3Sim ? node : layout.getNodePosition(node[state.idField]);

					sphere.position.x = pos.x;
					sphere.position.y = pos.y || 0;
					sphere.position.z = pos.z || 0;

					if (node.__nodeImage) {
						node.__nodeImage.position.x = pos.x;
						node.__nodeImage.position.y = pos.y || 0;
						node.__nodeImage.position.z = pos.z || 0;
					}
				});

				// Update links position
				state.graphData.links.forEach(link => {
					const line = link.__line,
						pos = isD3Sim
							? link
							: layout.getLinkPosition(layout.graph.getLink(link.source, link.target).id),
						start = pos[isD3Sim ? 'source' : 'from'],
						end = pos[isD3Sim ? 'target' : 'to'],
						linePos = line.geometry.attributes.position;

					linePos.array[0] = start.x;
					linePos.array[1] = start.y || 0;
					linePos.array[2] = start.z || 0;
					linePos.array[3] = end.x;
					linePos.array[4] = end.y || 0;
					linePos.array[5] = end.z || 0;

					linePos.needsUpdate = true;
					line.geometry.computeBoundingSphere();
				});
			}

			function autoColorNodes(nodes, colorBy, colorField) {
				if (!colorBy) return;

				// Color brewer paired set
				const colors = ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a','#ffff99','#b15928'];

				const uncoloredNodes = nodes.filter(node => !node[colorField]),
					nodeGroups = {};

				uncoloredNodes.forEach(node => { nodeGroups[node[colorBy]] = null });
				Object.keys(nodeGroups).forEach((group, idx) => { nodeGroups[group] = idx });

				uncoloredNodes.forEach(node => {
					node[colorField] = parseInt(colors[nodeGroups[node[colorBy]] % colors.length].slice(1), 16);
				});
			}
		}
	})();
};
