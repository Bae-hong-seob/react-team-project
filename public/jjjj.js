import * as THREE from './node_modules/three/build/three.module.js';
  
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';
import { VOXLoader, VOXMesh } from './node_modules/three/examples/jsm/loaders/VOXLoader.js';


/* global THREE */
let childNum = 21;
let newChildNum = 0;
let charactorVox = ['chr_bow.vox', 'chr_cat.vox','chr_fox.vox','chr_gumi.vox','chr_jp.vox','chr_knight.vox','chr_man.vox','chr_mom.vox','chr_old.vox','chr_poem.vox','chr_rain.vox','chr_sasami.vox','chr_sol.vox',
                  'chr_sword.vox','chr_tale.vox','chr_tama.vox','chr_tsurugi.vox','chr_bow1.vox', 'chr_cat1.vox','chr_fox1.vox','chr_sasami1.vox','chr_sol1.vox'] ;
let pos = [0,0,0];
let charactorArr = []

function main() {

  
  const canvas = document.querySelector('.cccc');
  const renderer = new THREE.WebGLRenderer({canvas});

  let camera, controls, scene;
    camera = new THREE.PerspectiveCamera( 50, canvas.width / canvas.height, 0.01, 10 );
    camera.position.set(0, 0.15, 0.15 );
    scene = new THREE.Scene();
    const texture = new THREE.TextureLoader().load( "school.jpeg" );
    scene.background = texture
    
    scene.add( camera );
    // light
    const hemiLight = new THREE.HemisphereLight( 0x888888, 0x444444, 1 );
    scene.add( hemiLight );
    const dirLight = new THREE.DirectionalLight( 0xffffff, 0.75 );
    dirLight.position.set( 1.5, 3, 2.5 );
    scene.add( dirLight );
    const dirLight2 = new THREE.DirectionalLight( 0xffffff, 0.5 );
    dirLight2.position.set( - 1.5, - 3, - 2.5 );
    scene.add( dirLight2 );
    const loader = new VOXLoader();
    
    let index = 0;
    let charactorPos = [[-0.06,0,0],[-0.03,0,0],[0,0,0],[0.03,0,0],[0.06,0,0], [-0.05,0,0.02],[-0.02,0,0.02],[0.01,0,0.02],[0.04,0,0.02],[0.07,0,0.02],
    [-0.06,0,0.04],[-0.03,0,0.04],[0,0,0.04],[0.03,0,0.04],[0.06,0,0.04], [-0.05,0,0.06],[-0.02,0,0.06],[0.01,0,0.06],[0.04,0,0.06],[0.07,0,0.06],[-0.06,0,0.08],[-0.03,0,0.08] ]
    for( var i = 0; i < childNum; i++){
      loader.load( charactorVox[i], function ( chunks ) {
        for ( let i = 0; i < chunks.length; i ++ ) {
            let chunk = chunks[ i ];
            // displayPalette( chunk.palette );
            let mesh = new VOXMesh( chunk );
            mesh.scale.setScalar( 0.0015 );
            // mesh.position.set(pos[0], 0, pos[2]); // 0,0,0 0,
            mesh.position.set(charactorPos[charactorArr.length][0],charactorPos[charactorArr.length][1], charactorPos[charactorArr.length][2]); // 0,0,0 0,
            // console.log(mesh.position.x)
            pos[0] += 0.03
            pos[2] += 0.03
            
            scene.add( mesh );
            charactorArr.push(mesh);
            console.log(charactorArr.length)
          }
        } );
      }

      controls = new OrbitControls( camera, renderer.domElement );
      controls.minDistance = .1;
      controls.maxDistance = 0.5;
      //
    window.addEventListener( 'resize', onWindowResize );
    
    function onWindowResize() {
        camera.aspect = canvas.width / canvas.height;
        camera.updateProjectionMatrix();
        renderer.setSize( canvas.width, canvas.height );
    }
    
    // function animate() {
    //     // canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
    //     requestAnimationFrame( animate );
    //     controls.update();
    //     renderer.render( scene, camera );
    // }
    
    
    function render(time) {
      time *= 0.001
    renderer.render(scene, camera);
    requestAnimationFrame(render);
    // console.log(charactorArr[0].position) 
    if(charactorArr[0] != null){
      for(var i = 0; i < childNum; i++){
        charactorArr[i].rotation.y = time
      }
    }
    if(Math.ceil(parseInt((document.getElementsByClassName('ratio')[0].innerHTML)))!= childNum){
      for(var i = 0; i< childNum; i ++)
      {
        scene.remove(charactorArr[i])
      }
      childNum = Math.ceil(parseInt((document.getElementsByClassName('ratio')[0].innerHTML)))
      for(var i = 0; i< childNum; i ++)
      {
        scene.add(charactorArr[i])
      }
      // scene.remove(charactorArr[0])
    }
    // else if(newChildNum < childNum){
    //   for(let i = newChildNum; i < 15; i++){
    //     scene.remove(charactorArr[i])
    //     childNum = newChildNum
    //   }
    // }

  }
  requestAnimationFrame(render);

  
  
}

main();


