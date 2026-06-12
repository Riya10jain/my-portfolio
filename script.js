// Initialize AOS (Animate on Scroll)
AOS.init({
  duration: 1000,
  once: false,
});

// Typing effect
const roles = [
  "Interactive Web Experiences",
  "Backend Engineering",
  "Full Stack Projects",
];

let i = 0;
let j = 0;
let current = "";
let isDeleting = false;
const typing = document.getElementById("typing");

function type() {
  current = roles[i];

  if (!isDeleting) {
    typing.textContent = current.substring(0, j++);
    if (j > current.length) {
      isDeleting = true;
      setTimeout(type, 1200);
      return;
    }
  } else {
    typing.textContent = current.substring(0, j--);
    if (j === 0) {
      isDeleting = false;
      i = (i + 1) % roles.length;
    }
  }
  setTimeout(type, isDeleting ? 50 : 80);
}

type();

// Navbar scrolled effect & shadow
window.addEventListener("scroll", () => {
  const nav = document.getElementById("navbar");
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

// Cursor Glow Centered
const glow = document.querySelector(".cursor-glow");
window.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

// Mobile Drawer Menu
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector("#navbar ul");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuBtn.textContent = navLinks.classList.contains("active") ? "✕" : "☰";
});

// Close mobile menu when clicking a link
document.querySelectorAll("#navbar a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuBtn.textContent = "☰";
  });
});

// Projects Category Filter
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Active class management
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filterValue = button.getAttribute("data-filter");

    projectCards.forEach(card => {
      const categories = card.getAttribute("data-category") || "";
      if (filterValue === "all" || categories.includes(filterValue)) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    });

    // Refresh AOS to calculate animations for visible items
    AOS.refresh();
  });
});

// Canvas Particle Constellation Animation
const canvas = document.getElementById("hero-canvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let particlesArray = [];
  let mouse = { x: null, y: null, radius: 100 };

  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // Particle Class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1; // Particle diameter between 1px and 3px
      this.speedX = Math.random() * 0.6 - 0.3; // Gentle speeds
      this.speedY = Math.random() * 0.6 - 0.3;
      this.density = (Math.random() * 25) + 15;
      // Mix of violet and pink particles matching the new color theme
      this.color = Math.random() > 0.5 ? "rgba(139, 92, 246, 0.45)" : "rgba(236, 72, 153, 0.45)";
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Bounce at boundary
      if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
      if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;

      // Mouse interactive repelling force
      if (mouse.x !== null && mouse.y !== null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          let maxDistance = mouse.radius;
          let force = (maxDistance - distance) / maxDistance;
          let directionX = forceDirectionX * force * this.density * 0.35;
          let directionY = forceDirectionY * force * this.density * 0.35;
          
          this.x -= directionX;
          this.y -= directionY;
        }
      }
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }
  }

  // Populate particles
  function initParticles() {
    particlesArray = [];
    // Calculate density proportional to canvas area
    const numberOfParticles = Math.floor((canvas.width * canvas.height) / 12000);
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }
  initParticles();
  window.addEventListener("resize", initParticles);

  // Connect particles in proximity
  function connect() {
    const maxDistance = 110;
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        let dx = particlesArray[a].x - particlesArray[b].x;
        let dy = particlesArray[a].y - particlesArray[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          let opacity = 1 - (distance / maxDistance);
          ctx.strokeStyle = `rgba(139, 92, 246, ${opacity * 0.12})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }

  // Loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }
    connect();
    requestAnimationFrame(animate);
  }
  animate();

  // Mouse move listeners
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });
}

// ==========================================
// Flagship Project: AI-Powered Platform Simulator
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  // Simulator DOM Elements
  const modal = document.getElementById("simulator-modal");
  const openModalBtn = document.getElementById("open-simulator-btn");
  const closeModalBtn = document.getElementById("close-simulator-btn");
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  // Modal Toggle Logic
  if (openModalBtn && modal) {
    openModalBtn.addEventListener("click", () => {
      modal.style.display = "flex";
      // Allow display flex to register before animating opacity
      setTimeout(() => modal.classList.add("active"), 10);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    });
  }

  const closeModal = () => {
    if (modal) {
      modal.classList.remove("active");
      setTimeout(() => modal.style.display = "none", 300);
      document.body.style.overflow = "";
    }
  };

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  // Close modal when clicking outside contents
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Tab Switching Logic
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));
      
      btn.classList.add("active");
      const targetTab = btn.getAttribute("data-tab");
      const targetContent = document.getElementById(targetTab);
      if (targetContent) {
        targetContent.classList.add("active");
      }
    });
  });

  // --- Tab 1: Resume ATS Screener Simulator Logic ---
  const resumePresetButtons = document.querySelectorAll(".preset-btn");
  const analyzeResumeBtn = document.getElementById("analyze-resume-btn");
  const dragDropArea = document.getElementById("drag-drop-resume");
  const resumeFileInput = document.getElementById("resume-file-input");
  const resumeEmptyState = document.getElementById("resume-empty-state");
  const resumeResult = document.getElementById("resume-result");

  let selectedResumePreset = "java-backend";

  // Preset selection
  resumePresetButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      resumePresetButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedResumePreset = btn.getAttribute("data-resume");
    });
  });

  // Drag & drop file trigger
  if (dragDropArea && resumeFileInput) {
    dragDropArea.addEventListener("click", () => {
      resumeFileInput.click();
    });

    resumeFileInput.addEventListener("change", (e) => {
      if (e.target.files.length > 0) {
        const fileName = e.target.files[0].name;
        const dragDropText = dragDropArea.querySelector("p");
        dragDropText.textContent = `Selected: ${fileName}`;
        dragDropArea.querySelector("span").textContent = "File ready for parsing simulation";
        selectedResumePreset = "custom-upload";
        resumePresetButtons.forEach(b => b.classList.remove("active"));
      }
    });

    // dragover effects
    dragDropArea.addEventListener("dragover", (e) => {
      e.preventDefault();
      dragDropArea.classList.add("dragover");
    });

    dragDropArea.addEventListener("dragleave", () => {
      dragDropArea.classList.remove("dragover");
    });

    dragDropArea.addEventListener("drop", (e) => {
      e.preventDefault();
      dragDropArea.classList.remove("dragover");
      if (e.dataTransfer.files.length > 0) {
        resumeFileInput.files = e.dataTransfer.files;
        const fileName = e.dataTransfer.files[0].name;
        dragDropArea.querySelector("p").textContent = `Selected: ${fileName}`;
        dragDropArea.querySelector("span").textContent = "File ready for parsing simulation";
        selectedResumePreset = "custom-upload";
        resumePresetButtons.forEach(b => b.classList.remove("active"));
      }
    });
  }

  // Resume Simulator Data
  const resumeSimulatorDb = {
    "java-backend": {
      score: 88,
      title: "Java Backend Developer Profile",
      status: "Excellent match potential for core SDE/Backend Developer roles.",
      matched: ["Java 17", "Spring Boot", "REST APIs", "PostgreSQL", "Hibernate", "JUnit", "Docker"],
      missing: ["AWS (EC2/S3)", "Kubernetes", "Redis Caching", "CI/CD (GitHub Actions)"],
      feedback: [
        "Quantify your impacts: E.g., 'Optimized Spring Boot queries using JPA specifications, reducing latency by 35%'.",
        "Add exposure to cloud platforms (specifically AWS) to strengthen backend depth.",
        "List familiarity with caching architectures (Redis) for scaling read-intensive workloads."
      ]
    },
    "frontend-react": {
      score: 81,
      title: "Frontend React Developer Profile",
      status: "Good client-side foundation; lacks enterprise state management tools.",
      matched: ["React.js", "JavaScript (ES6+)", "HTML5/CSS3", "Tailwind CSS", "Vite", "Git"],
      missing: ["TypeScript", "Redux Toolkit", "Jest/RTL Testing", "Next.js Framework"],
      feedback: [
        "Integrate TypeScript into key frontend projects to demonstrate enterprise readiness.",
        "Add automated testing coverage (Jest/React Testing Library) details to resume.",
        "Mention experiences with advanced features like Next.js Server Components."
      ]
    },
    "fresher-intern": {
      score: 65,
      title: "Entry-Level Developer Profile",
      status: "Needs full-stack project maturity and framework experience.",
      matched: ["Java (Core)", "HTML", "CSS", "JavaScript", "SQL", "Git"],
      missing: ["Spring Boot", "RESTful Services", "React.js", "System Design Basics"],
      feedback: [
        "Build a modern full-stack web application combining a Spring Boot REST backend with a React UI.",
        "Detail your database design exposure, such as tables schema design and database indexing.",
        "Highlight DSA problem-solving milestones (e.g., LeetCode 300+ solved) explicitly on your resume."
      ]
    },
    "custom-upload": {
      score: 74,
      title: "Custom Parsed Resume",
      status: "Moderate candidate match. Core languages present; ecosystem tools missing.",
      matched: ["Java", "JavaScript", "HTML5", "CSS3", "SQL", "Git"],
      missing: ["Spring Boot", "Docker", "REST APIs", "CI/CD Platforms"],
      feedback: [
        "Gemini AI detected a generic profile format. Structure your skills section with categorizations.",
        "Integrate backend frameworks (Spring Boot) and database integration tools (Hibernate/JPA).",
        "Ensure project listings include technical challenges solved rather than only features list."
      ]
    }
  };

  // ATS Scoring Circle Animator
  function animateScoreCircle(score) {
    const circle = document.getElementById("score-circle");
    if (!circle) return;
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    
    // Reset dashoffset
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference;
    
    // Trigger layout redraw
    circle.getBoundingClientRect();
    
    // Calculate final dashoffset
    const offset = circumference - (score / 100) * circumference;
    circle.style.strokeDashoffset = offset;
  }

  if (analyzeResumeBtn) {
    analyzeResumeBtn.addEventListener("click", () => {
      const spinner = analyzeResumeBtn.querySelector(".loader-spinner");
      const btnText = analyzeResumeBtn.querySelector("span");
      
      // UI Loading state
      spinner.style.display = "inline-block";
      btnText.textContent = "Parsing PDF & Scoring...";
      analyzeResumeBtn.disabled = true;
      
      setTimeout(() => {
        // Restore Button
        spinner.style.display = "none";
        btnText.textContent = "Analyze Resume with Gemini AI";
        analyzeResumeBtn.disabled = false;
        
        // Hide Empty State, show Result
        if (resumeEmptyState) resumeEmptyState.style.display = "none";
        if (resumeResult) resumeResult.style.display = "flex";
        
        // Load selected resume preset details
        const data = resumeSimulatorDb[selectedResumePreset] || resumeSimulatorDb["java-backend"];
        
        // Set Text
        document.getElementById("ats-score").textContent = data.score;
        document.getElementById("profile-result-title").textContent = data.title;
        document.getElementById("ats-match-status").textContent = data.status;
        
        // Render Matched tags
        const matchedContainer = document.getElementById("matched-keywords");
        matchedContainer.innerHTML = "";
        data.matched.forEach(kw => {
          const span = document.createElement("span");
          span.textContent = kw;
          matchedContainer.appendChild(span);
        });
        
        // Render Missing tags
        const missingContainer = document.getElementById("missing-keywords");
        missingContainer.innerHTML = "";
        data.missing.forEach(kw => {
          const span = document.createElement("span");
          span.textContent = kw;
          missingContainer.appendChild(span);
        });
        
        // Render feedback list
        const feedbackContainer = document.getElementById("feedback-list");
        feedbackContainer.innerHTML = "";
        data.feedback.forEach(fb => {
          const li = document.createElement("li");
          li.textContent = fb;
          feedbackContainer.appendChild(li);
        });
        
        // Animate score circle
        animateScoreCircle(data.score);
      }, 1500);
    });
  }

  // --- Tab 2: Mock Interview Simulator Logic ---
  const domainButtons = document.querySelectorAll(".domain-btn");
  const generateQuestionBtn = document.getElementById("generate-question-btn");
  const questionBox = document.getElementById("question-box");
  const questionText = document.getElementById("interview-question-text");
  const answerBox = document.getElementById("answer-box");
  const candidateAnswerInput = document.getElementById("candidate-answer");
  const loadSampleAnswerBtn = document.getElementById("load-sample-answer-btn");
  const evaluateAnswerBtn = document.getElementById("evaluate-answer-btn");
  const interviewEmptyState = document.getElementById("interview-empty-state");
  const interviewResult = document.getElementById("interview-result");

  let selectedDomain = "java";
  let currentQuestionIndex = 0;

  const interviewQuestionsDb = {
    "java": [
      {
        question: "How does the ConcurrentHashMap achieve thread-safety in Java 8 compared to Hashtable or synchronized maps, and when would you use it?",
        sampleAnswer: "In our recent project, we encountered a bottleneck with high concurrent read/write traffic on user session caching. I replaced our synchronized map with ConcurrentHashMap. ConcurrentHashMap in Java 8 uses a lock striping technique at the node-bucket level using Compare-And-Swap (CAS) operations and synchronized blocks on individual bucket heads rather than locking the entire map. This allowed multiple threads to read and write to different buckets concurrently, improving our application throughput by roughly 35% under peak load, while maintaining absolute thread-safety.",
        evaluation: {
          score: "9.2/10",
          clarity: "Excellent Structure",
          critique: "Outstanding response. You demonstrated deep knowledge of Java concurrency internals (CAS, bucket-level synchronization) and successfully quantified the real-world impact of your action (35% throughput increase).",
          star: {
            s: "A concurrency bottleneck was observed in user session cache under concurrent read/write loads.",
            t: "Implement a map implementation that allows concurrent writes and reads without blocking threads.",
            a: "Replaced standard HashMap/Hashtable with ConcurrentHashMap, utilizing its node-level locking.",
            r: "Improved server throughput by 35% and completely resolved contention issues."
          },
          modelAnswer: "ConcurrentHashMap in Java 8 locks only the head of each bucket/node during write operations, utilizing volatile variables and CAS (Compare-And-Swap) for lock-free reads. Hashtable locks the entire map instance, causing significant thread queueing. You should use ConcurrentHashMap in any multi-threaded environment seeking high throughput."
        }
      },
      {
        question: "What is the difference between optimistic locking and pessimistic locking in JPA/Hibernate, and how would you resolve a OptimisticLockException?",
        sampleAnswer: "In our high-volume ticket booking API, concurrent checkout requests were updating the same ticket records. I implemented optimistic locking using JPA's @Version annotation. When two transactions attempted to read and write the same version, Hibernate detected the conflict at commit time, throwing an OptimisticLockException. I caught this exception and implemented an automatic retry mechanism with exponential backoff (up to 3 retries). This maintained transactional data consistency without locking database rows, avoiding deadlock spikes.",
        evaluation: {
          score: "8.8/10",
          clarity: "High Clarity",
          critique: "Great implementation description. You correctly identified the difference in concurrency approaches and detailed a robust retry mechanism to handle concurrency conflicts gracefully.",
          star: {
            s: "Ticket booking updates experienced race conditions and ticket double-booking.",
            t: "Ensure transactional integrity without causing deadlocks on heavily hit database rows.",
            a: "Implemented JPA @Version optimistic locking and wrapped booking commits in a retry block.",
            r: "Guaranteed single-ticket assignment with zero deadlocks and handled conflicts gracefully."
          },
          modelAnswer: "Optimistic locking assumes conflicts are rare, checking for conflicts via a version column during update commits. Pessimistic locking locks database rows immediately upon retrieval (e.g., SELECT FOR UPDATE). Resolve OptimisticLockExceptions by catching the exception in the application tier and retrying the transaction with updated state."
        }
      }
    ],
    "react": [
      {
        question: "What is the difference between React Server Components (RSC) and Client Components, and how do they impact page load performance?",
        sampleAnswer: "In building a dynamic telemetry dashboard, our initial load times were slow due to large JS bundle sizes. I restructured it using Next.js React Server Components. Sourcing data directly on the server kept database query code out of the client bundle. I limited 'use client' strictly to interactive elements like charts and controls. This reduced our client bundle footprint by 45% and improved our Lighthouse performance score from 71 to 94.",
        evaluation: {
          score: "9.0/10",
          clarity: "Highly Structured",
          critique: "Excellent structural answer. You connected the theoretical concepts (Server vs. Client bundle sizes) to concrete performance milestones (bundle size -45% and Lighthouse score +23 points).",
          star: {
            s: "Heavy client-side Javascript bundles degraded initial dashboard paint metrics.",
            t: "Improve telemetry load speeds and reduce client-side hydration overhead.",
            a: "Migrated data-fetching and layout generation to React Server Components (RSC).",
            r: "Reduced client bundles by 45% and increased Lighthouse metrics to 94."
          },
          modelAnswer: "React Server Components run exclusively on the server, eliminating server dependencies from the client bundle. Client Components ('use client') run on the browser and enable stateful hooks (useState, useEffect) and event listeners. Blending both correctly minimizes hydration scripts, accelerating Largest Contentful Paint (LCP)."
        }
      }
    ],
    "general": [
      {
        question: "Tell me about a time you had a technical disagreement with a team member. How did you handle it and what was the outcome?",
        sampleAnswer: "During a collaborative backend project, a teammate insisted on storing nested transaction data in MongoDB, whereas I advocated for PostgreSQL. Our system required absolute transactional consistency for payment records. I set up a quick database simulation script running 100 concurrent checkout attempts. The SQL constraints prevented race conditions natively, while Mongo required app-level locking. I presented these benchmarks to the teammate, and we aligned on PostgreSQL, delivering a fully consistent API.",
        evaluation: {
          score: "9.4/10",
          clarity: "Excellent (STAR)",
          critique: "Outstanding response. You handled the disagreement by creating objective proofs (benchmarks) rather than arguing, showing mature collaboration and technical pragmatism.",
          star: {
            s: "A team dispute arose over NoSQL vs. Relational databases for transaction storage.",
            t: "Evaluate transaction safety under high concurrent loads to choose the correct storage.",
            a: "Designed a performance simulation to test payment constraints on both database systems.",
            r: "Aligned the team objectively around PostgreSQL, leading to a secure payment API."
          },
          modelAnswer: "When discussing conflicts, structure your answer using the STAR format. Emphasize open communication, active listening to alternative designs, making decisions using factual data/prototypes, and maintaining positive team dynamics."
        }
      }
    ]
  };

  // Domain selection
  domainButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      domainButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedDomain = btn.getAttribute("data-domain");
      currentQuestionIndex = 0;
      
      // Clear state
      if (questionBox) questionBox.style.display = "none";
      if (answerBox) answerBox.style.display = "none";
      if (interviewEmptyState) interviewEmptyState.style.display = "flex";
      if (interviewResult) interviewResult.style.display = "none";
      if (candidateAnswerInput) candidateAnswerInput.value = "";
    });
  });

  // Generate Question
  if (generateQuestionBtn) {
    generateQuestionBtn.addEventListener("click", () => {
      const list = interviewQuestionsDb[selectedDomain];
      if (!list) return;
      
      const item = list[currentQuestionIndex];
      
      if (questionText && questionBox) {
        questionText.textContent = item.question;
        questionBox.style.display = "block";
      }
      
      if (answerBox) {
        answerBox.style.display = "flex";
        candidateAnswerInput.value = "";
        candidateAnswerInput.focus();
      }
      
      if (interviewEmptyState) interviewEmptyState.style.display = "flex";
      if (interviewResult) interviewResult.style.display = "none";
    });
  }

  // Load Pre-filled Answer
  if (loadSampleAnswerBtn && candidateAnswerInput) {
    loadSampleAnswerBtn.addEventListener("click", () => {
      const list = interviewQuestionsDb[selectedDomain];
      if (!list) return;
      const item = list[currentQuestionIndex];
      if (item) {
        candidateAnswerInput.value = item.sampleAnswer;
      }
    });
  }

  // Evaluate Answer
  if (evaluateAnswerBtn) {
    evaluateAnswerBtn.addEventListener("click", () => {
      const ans = candidateAnswerInput.value.trim();
      if (!ans) {
        alert("Please write or pre-fill an answer first to evaluate!");
        return;
      }
      
      const spinner = evaluateAnswerBtn.querySelector(".loader-spinner");
      const btnText = evaluateAnswerBtn.querySelector("span");
      
      spinner.style.display = "inline-block";
      btnText.textContent = "AI Analysis In Progress...";
      evaluateAnswerBtn.disabled = true;
      
      setTimeout(() => {
        // Reset button
        spinner.style.display = "none";
        btnText.textContent = "Submit Answer for Evaluation";
        evaluateAnswerBtn.disabled = false;
        
        // Switch layouts
        if (interviewEmptyState) interviewEmptyState.style.display = "none";
        if (interviewResult) interviewResult.style.display = "flex";
        
        const list = interviewQuestionsDb[selectedDomain];
        if (!list) return;
        const item = list[currentQuestionIndex];
        const evalData = item.evaluation;
        
        // Load Evaluation Result
        document.getElementById("interview-score").textContent = evalData.score;
        document.getElementById("clarity-level").textContent = evalData.clarity;
        document.getElementById("interview-critique").textContent = evalData.critique;
        
        document.getElementById("star-s").textContent = evalData.star.s;
        document.getElementById("star-t").textContent = evalData.star.t;
        document.getElementById("star-a").textContent = evalData.star.a;
        document.getElementById("star-r").textContent = evalData.star.r;
        
        document.getElementById("model-answer-text").textContent = evalData.modelAnswer;
      }, 1800);
    });
  }
});
