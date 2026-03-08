// ====================================================================
// 1. INICIALIZACIÓN DE LA ESCENA 3D (SOLO GALAXIA)
// ====================================================================

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050015); // Fondo de Nebulosa

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let galaxyMesh;

const textureLoader = new THREE.TextureLoader();

function createGalaxy() {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 15000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
        posArray[i * 3] = (Math.random() - 0.5) * 500;
        posArray[i * 3 + 1] = (Math.random() - 0.5) * 500;
        posArray[i * 3 + 2] = (Math.random() - 0.5) * 500;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const starTexture = textureLoader.load('https://threejs.org/examples/textures/sprites/disc.png');

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.8,
        sizeAttenuation: true,
        color: 0xffffff,
        transparent: true,
        map: starTexture,
        alphaTest: 0.5,
        depthWrite: false
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    return particlesMesh;
}

galaxyMesh = createGalaxy();
camera.position.z = 100;

// ====================================================================
// 2. BUCLE DE ANIMACIÓN (Movimiento de Estrellas)
// ====================================================================

const animate = function () {
    requestAnimationFrame(animate);

    galaxyMesh.rotation.y += 0.0002;
    galaxyMesh.rotation.x += 0.0001;

    renderer.render(scene, camera);
};

animate();

// ====================================================================
// 3. MANEJO DE REDIMENSIONAMIENTO
// ====================================================================

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ====================================================================
// 4. FUNCIONALIDAD DE FRASES
// ====================================================================

// Frases para mostrar una por una
const frases = [
    "Con Amor, un  detalle para ti",
    "Hola Niña Consentida ",
    "Como esta, La",
    "Niña de los Ojos Cafes mas Lindos del Mundo",
    "Bueno...",
    "Hoy es un día muy especial",
    "Porque celebramos a la mujer mas  increíble ",
    "Gracias por existir",
    "Gracias por tu forma de ser",
    "Gracias por ser Unica",
    "Nunca olvides lo valiosa que eres",
    "Sigue luchando por tus sueños",
    "Metas",
    "No te pierdas",
    "Recuerda que siempre estare para apoyarte",
    "Y estoy muy Orgulloso de ti",
    "El mundo es mejor porque tu existes",
    "Feliz Día de la Mujer, Danis 💜"
];

let fraseIndex = 0;
const phraseElement = document.getElementById('phrase');
let audioPlayed = false;
if (phraseElement) {
    phraseElement.addEventListener('click', () => {
        if (!audioPlayed) {
            const audio = document.getElementById('audio');
            audio.play();
            audioPlayed = true;
        }
        fraseIndex = (fraseIndex + 1) % frases.length;
        phraseElement.textContent = frases[fraseIndex];
    });
}
requestAnimationFrame(animate);

galaxyMesh.rotation.y += 0.0002;
galaxyMesh.rotation.x += 0.0001;

renderer.render(scene, camera);


animate();

// ====================================================================
// 3. MANEJO DE REDIMENSIONAMIENTO
// ====================================================================

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});