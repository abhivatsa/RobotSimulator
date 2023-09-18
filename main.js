import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import Stats from 'three/addons/libs/stats.module.js';

function update_status(){

    var cmd_json = {
        "j1_tar_pos": joint_1_position,
        "j2_tar_pos": joint_2_position,
        "j3_tar_pos": joint_3_position,
        "jog_mode_enable": 0,
    };

    console.log("Hello world");

    socket.send(JSON.stringify(cmd_json));

}


//-------------------- Websocket -----------------------
let socket = new WebSocket("ws://127.0.0.1:8080");
// var btn = document.getElementById("btn");
socket.onopen = function (e) {
    console.log("[open] Connection established");
    console.log("Sending to server");

    // setInterval(update_status, 10);

    // btn.onclick = function () {
    //     var points = [[1.5, -1.5, -1, -2, 0.5, -0.5], [-1.5, 1.5, 0, 2, -0.5, 0.5], [1.5, -1.5, 1, 0, 0.5, -0.5], [0, 1.5, 0, 2, 1, 0]];
    //     var vel = [[1.5, 1.5, 1.5, 1.5, 1.5, 1.5], [1.5, 1.5, 1.5, 1.5, 1.5, 1.5], [1.5, 1.5, 1.5, 1.5, 1.5, 1.5], [1.5, 1.5, 1.5, 1.5, 1.5, 1.5]];
    //     var acc = [[1.5, 1.5, 1.5, 1.5, 1.5, 1.5], [1.5, 1.5, 1.5, 1.5, 1.5, 1.5], [1.5, 1.5, 1.5, 1.5, 1.5, 1.5], [1.5, 1.5, 1.5, 1.5, 1.5, 1.5]];
    //     var time = [-1, -1, -1, -1]
    //     //   var obj = {name : "shubham", age : "26", city : "Hyderabad"};
    //     var obj = {
    //         type: 1,
    //         plan_order: ["one"],
    //         one: {
    //             joint_space: true,
    //             points: points,
    //             velocity: vel,
    //             acceleration: acc,
    //             time: time,
    //             num_loops: 1
    //         }
    //     }
    //     const myObj = JSON.stringify(obj);

    //     //   var obj = {data : "hi from client", }
    //     console.log(`[message] Data sending to server`);
    //     //   console.log("hi from client");
    //     //   const myObj = JSON.stringify(obj);
    //     // socket.send(myObj);
    // }
};

socket.onmessage = function (event) {
    console.log(`[message] Data received from server`);
    let joint_data = JSON.parse(event.data);
    //   console.log(obj.data)
    link1.rotation.y = joint_data.j1_pos;
    link2.rotation.z = joint_data.j2_pos;
    link3.rotation.z = joint_data.j3_pos;
    link4.rotation.y = joint_data.j4_pos;
    link5.rotation.z = joint_data.j5_pos;
    link6.rotation.y = joint_data.j6_pos;
};

socket.onclose = function (event) {
    if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        console.log('[close] Connection died');
    }
};

socket.onerror = function (error) {
    console.log(`[error]`);
};

// -----------------------------------------------------------




// ------------------------- ThreeJS ---------------------------
// const container = document.createElement( 'div' );
// document.body.appendChild( container );

console.log("line 95");

const container = document.getElementById("render-container");

console.log(container);

let camera, scene, renderer, stats;

const clock = new THREE.Clock();
let mixer;

// camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 20 );
camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100);
camera.position.set(-2, 2, 2);

scene = new THREE.Scene();
scene.background = new THREE.Color(0xa0a0a0);
scene.fog = new THREE.Fog(0xa0a0a0, 2, 10);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 5);
hemiLight.position.set(0, 200, 0);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 5);
dirLight.position.set(0, 200, 100);
dirLight.castShadow = true;
dirLight.shadow.camera.top = 180;
dirLight.shadow.camera.bottom = - 100;
dirLight.shadow.camera.left = - 120;
dirLight.shadow.camera.right = 120;
scene.add(dirLight);

const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }));
mesh.rotation.x = - Math.PI / 2;
mesh.receiveShadow = true;
scene.add(mesh);

const grid = new THREE.GridHelper(20, 40, 0x000000, 0x000000);
grid.material.opacity = 0.2;
grid.material.transparent = true;
scene.add(grid);

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setSize(container.innerWidth, container.innerHeight);
renderer.shadowMap.enabled = true;
container.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.5, 0);
controls.update();

window.addEventListener('resize', onWindowResize);

// stats = new Stats();
// container.appendChild( stats.dom );

const loader1 = new GLTFLoader();
const loader2 = new GLTFLoader();
const loader3 = new GLTFLoader();
const loader4 = new GLTFLoader();
const loader5 = new GLTFLoader();
const loader6 = new GLTFLoader();
const loader7 = new GLTFLoader();

var link0;
var link1;
var link2;
var link3;
var link4;
var link5;
var link6;


loader1.load('./robot_gltf/link0.glb', function (gltf) {

    link0 = gltf.scene;
    scene.add(link0);

    loader2.load('./robot_gltf/link1.glb', function (gltf) {

        link1 = gltf.scene;
        link0.add(link1);
        link1.position.setY(0.075);

        loader3.load('./robot_gltf/link2.glb', function (gltf) {

            link2 = gltf.scene;
            link1.add(link2);
            link2.position.setY(0.124);
            link2.position.setZ(0.085);

            loader4.load('./robot_gltf/link3.glb', function (gltf) {

                link3 = gltf.scene;
                link2.add(link3);
                link3.position.setY(0.52);
                link3.position.setZ(0.0025)

                loader5.load('./robot_gltf/link4.glb', function (gltf) {

                    link4 = gltf.scene;
                    link3.add(link4);
                    link4.position.setY(0.118);
                    link4.position.setZ(-0.085);
                    // link4.rotation.y = -Math.PI/2;

                    loader6.load('./robot_gltf/link5.glb', function (gltf) {

                        link5 = gltf.scene;
                        link4.add(link5);
                        link5.position.setY(0.362);
                        link5.position.setZ(0.075);

                        loader7.load('./robot_gltf/link6.glb', function (gltf) {

                            link6 = gltf.scene;
                            link5.add(link6);
                            link6.position.setY(0.115);
                            link6.position.setZ(-0.072);
                        });

                    });

                });

            });

        });

    });

});

onWindowResize();

function onWindowResize() {

    // camera.aspect = window.innerWidth / window.innerHeight;
    camera.aspect  = 1.333;
    camera.updateProjectionMatrix();

    renderer.setSize(768, 576);

}



var y_val = 0;
function animate() {



    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    if (mixer) mixer.update(delta);

    renderer.render(scene, camera);

    // link4.rotation.y = -1.5708;
    // link5.rotation.y = -1.5708;
    // link6.rotation.y = -1.5708;

    // link0.position.setX(0);
    // link0.position.setY(0);
    // link0.position.setZ(0.2);

    // link1.rotation.y = y_val;
    // link2.rotation.z = -y_val;
    // link3.rotation.z = -y_val;
    // link4.rotation.y = y_val;
    // link5.rotation.z = -y_val;
    // link6.rotation.y = y_val;

    // link1.rotation.y = points.j1;
    // link2.rotation.z = points.j2;
    // link3.rotation.z = points.j3;
    // link4.rotation.y = points.j4;
    // link5.rotation.z = points.j5;
    // link6.rotation.y = points.j6;

    // 
    y_val = y_val + 0.01;

    // stats.update();

}


animate();

//-----------------------------------------------------------


