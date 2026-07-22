// ==========================================
// 3D WebGL Background (Three.js)
// ==========================================
const canvas = document.getElementById('webgl-canvas');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x05050a, 0.002);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Create a cyber-grid / particle system
const geometry = new THREE.BufferGeometry();
const particlesCount = 1500;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    // Spread particles across a wide area
    posArray[i] = (Math.random() - 0.5) * 20; 
}

geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const material = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(geometry, material);
scene.add(particlesMesh);

camera.position.z = 5;

// Mouse interactivity
let mouseX = 0;
let mouseY = 0;
document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) - 0.5;
    mouseY = (event.clientY / window.innerHeight) - 0.5;
});

const clock = new THREE.Clock();

function animate3D() {
    requestAnimationFrame(animate3D);
    const elapsedTime = clock.getElapsedTime();

    particlesMesh.rotation.y = elapsedTime * 0.05;
    particlesMesh.rotation.x = elapsedTime * 0.02;
    
    // Parallax effect
    camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 2 - camera.position.y) * 0.05;
    
    renderer.render(scene, camera);
}
animate3D();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


// ==========================================
// Vibe Coding Hub Logic & UI
// ==========================================
const projects = [
    { id: 1, name: 'Influencer_Assistant_Hub', type: 'AI Assistant UI', date: '2026-07-20', lang: 'JavaScript', snippet: '// Connect to Vercel deployment\nconst env = "production";\ninit_assistant({ vibe: "high" });', link: 'https://fuckshitpoet.com/influencerhub' },
    { id: 2, name: 'Poet_Proposals', type: 'Creative Writing Tech', date: '2026-07-20', lang: 'JavaScript', snippet: '// fuckshitpoet proposals loaded\nasync function generatePoetry() {\n  return await LLM.prompt("Spit bars.");\n}', link: 'https://fuckshitpoet.com/proposals' },
    { id: 3, name: 'Disguise', type: 'Web App', date: '2026-07-22', lang: 'Java', snippet: '// Initialize Disguise protocol\nDisguise.init();', link: 'https://fuckshitpoet.com/disguise' }
];

const contentEl = document.getElementById('content');
const nowViewingEl = document.getElementById('now-viewing');

function renderHome() {
    let html = `
        <div style="margin-bottom: 30px;" class="gsap-item">
            <h2 style="color: #fff; margin-top: 0; font-family: 'Orbitron', sans-serif;">PROJECT_COLLECTION</h2>
            <p style="color: #888; font-size: 0.85rem; line-height: 1.6;">
                Active directory for developer: <span style="color: #38bdf8;">Blessing Bafunso</span>.<br>
                A collection of deployed projects and active experiments.
            </p>
        </div>
        <ul class="project-list">
    `;
    
    projects.forEach((p, index) => {
        html += `
            <li class="project-item gsap-item" onclick="viewProject(${p.id})">
                <div>
                    <span style="color: #4ade80; margin-right: 15px; font-size: 0.8rem;">0${index + 1}</span>
                    <span class="project-name">${p.name}</span>
                </div>
                <span class="project-meta">${p.lang}</span>
            </li>
        `;
    });
    
    html += `</ul>`;
    contentEl.innerHTML = html;
    nowViewingEl.innerText = 'DIRECTORY';

    // GSAP Animation
    gsap.fromTo(".gsap-item", 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }
    );
}

function viewProject(id) {
    const project = projects.find(p => p.id === id);
    if (!project) return;
    
    contentEl.innerHTML = `
        <div class="gsap-view">
            <div style="margin-bottom: 20px; cursor: pointer; color: #38bdf8; font-size: 0.8rem;" onclick="renderHome()">
                &lt; BACK TO DIRECTORY
            </div>
            <h2 style="color: #fff; margin-top: 0; font-family: 'Orbitron', sans-serif;">${project.name}</h2>
            <div style="color: #888; margin-bottom: 20px; font-size: 0.75rem;">
                TYPE: <span style="color: #4ade80;">${project.type}</span> | DATE: ${project.date}
            </div>
            
            <div style="padding: 15px; border: 1px solid rgba(255,255,255,0.05); background: rgba(0,0,0,0.4); border-radius: 8px; margin-bottom: 20px; position: relative;">
                <div style="position: absolute; top: 0; left: 0; right: 0; height: 25px; background: rgba(255,255,255,0.02); border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; align-items: center; padding-left: 15px; font-size: 0.7rem; color: #888; border-radius: 8px 8px 0 0;">
                    source_code.exe
                </div>
                <pre style="margin: 0; margin-top: 20px; color: #38bdf8; font-family: 'Share Tech Mono', monospace; font-size: 0.85rem; overflow-x: auto;"><code>${project.snippet.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
            </div>
            
            <div style="padding: 15px; border: 1px dashed rgba(74, 222, 128, 0.4); background: rgba(74, 222, 128, 0.02); border-radius: 8px; margin-bottom: 20px;">
                <p style="margin-top: 0; color: #4ade80; font-size: 0.8rem;">> EXECUTION LOG:</p>
                <p style="margin: 5px 0; color: #888; font-size: 0.8rem;">Compiling vibe patterns...</p>
                <p style="margin: 5px 0; color: #888; font-size: 0.8rem;">Injecting <strong>Blessing Bafunso's</strong> algorithms...</p>
                <p style="margin: 5px 0; color: #fff; font-size: 0.8rem;">STATUS: <span style="color: #4ade80; animation: blink 1s infinite;">READY</span></p>
            </div>
            
            ${project.link ? `<a href="${project.link}" target="_blank" style="display: block; width: 100%; text-align: center; padding: 12px; background: rgba(74, 222, 128, 0.1); border: 1px solid #4ade80; color: #4ade80; font-family: 'Share Tech Mono', monospace; font-size: 0.9rem; text-decoration: none; border-radius: 8px; box-sizing: border-box; cursor: pointer; transition: all 0.3s;" onmouseover="this.style.background='#4ade80'; this.style.color='#000'" onmouseout="this.style.background='rgba(74, 222, 128, 0.1)'; this.style.color='#4ade80'">> LAUNCH PROTOCOL [EXTERNAL]</a>` : ''}
        </div>
    `;
    nowViewingEl.innerText = project.name.toUpperCase();
    
    gsap.fromTo(".gsap-view", 
        { x: 30, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
    );
}

function navTo(section) {
    if (section === 'home') {
        renderHome();
    } else if (section === 'projects') {
        renderHome();
    } else if (section === 'about') {
        contentEl.innerHTML = `
            <div class="gsap-view">
                <h2 style="color: #fff; margin-top: 0; font-family: 'Orbitron', sans-serif;">SYS_INFO: ORIGIN</h2>
                <p style="color: #888; font-size: 0.85rem;">
                    DEVELOPER: <span style="color: #38bdf8;">BLESSING BAFUNSO</span><br>
                    FRAMEWORK: WEBGL_GLASS_EDITION
                </p>
                <p style="color: #aaa; line-height: 1.6; font-size: 0.9rem; margin-bottom: 15px;">
                    My journey into <strong>vibe coding</strong> didn't start in a traditional computer science lab—it clicked for me after attending Adobe 99U in 2026. Being surrounded by that kind of raw creative energy made me realize that code shouldn't just be rigid syntax. I taught myself to build by leaning into the aesthetics and the feeling of the work, using development as a medium to highlight exactly what matters most in my own creative process.
                </p>
                <p style="color: #aaa; line-height: 1.6; font-size: 0.9rem;">
                    Today, I treat development like an art form. I vibecode my projects into existence by acting as a creative director for advanced AI, orchestrating environments using <strong>Antigravity, Codex, and Claude Code</strong>. It's less about typing out boilerplate and more about sculpting digital experiences while staying completely locked into a flow state.
                </p>
            </div>
        `;
        nowViewingEl.innerText = 'SYS_INFO';
        
        gsap.fromTo(".gsap-view", 
            { opacity: 0, scale: 0.95 }, 
            { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
        );
    }
}

// Clock logic
setInterval(() => {
    const now = new Date();
    document.getElementById('clock').innerText = now.toLocaleTimeString('en-US', { hour12: false });
}, 1000);

// Fake EQ animation (Vibe levels)
const eqFills = document.querySelectorAll('.eq-fill');
setInterval(() => {
    eqFills.forEach(fill => {
        const randomHeight = Math.floor(Math.random() * 70) + 10; // 10% to 80%
        fill.style.height = `${randomHeight}%`;
    });
}, 100);

// GSAP Initial Intro Animation
gsap.fromTo("#app-container",
    { scale: 0.9, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1.2, ease: "expo.out" }
);

// Initialize
renderHome();
