const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Lock body scroll when nav is open
        document.body.classList.toggle('nav-open', nav.classList.contains('nav-active'));

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = ''
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Close on link click (mobile)
    nav.addEventListener('click', (e) => {
        const target = e.target;
        if (target instanceof HTMLElement && target.closest('a')) {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            document.body.classList.remove('nav-open');
        }
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('nav-active')) {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            document.body.classList.remove('nav-open');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    navSlide();

    // Smooth scrolling for main navigation
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add skills and projects dynamically
    const skills = [
        { name: "HTML5", icon: "devicon-html5-plain" },
        { name: "CSS3", icon: "devicon-css3-plain" },
        { name: "JavaScript", icon: "devicon-javascript-plain" },
        { name: "React", icon: "devicon-react-original" },
        { name: "Next.js", icon: "devicon-nextjs-original" },
        { name: "TailwindCSS", icon: "devicon-tailwindcss-plain" },
        { name: "Git", icon: "devicon-git-plain" },
        { name: "TypeScript", icon: "devicon-typescript-plain" },
        { name: "OpenAI", icon: "fas fa-brain" }
    ];
    const projects = [
        { 
            name: "DevHelp AI – Developer Q&A Assistant", 
            description: "Built with Next.js and OpenAI API. Provides instant coding help, bug explanations, and code suggestions. Mimics a Stack Overflow-like experience with real-time AI responses.", 
            skills: "Key Skills: Next.js, OpenAI API, Prompt Engineering, React Hooks",
            image: "images/DevHelp.png", 
            link: "#" 
        },
        { 
            name: "Finance Tracker Dashboard", 
            description: "A responsive dashboard app to track daily expenses, set budget goals, and visualize spending trends using charts. Data stored locally or with a backend API.", 
            skills: "Key Skills: React, Chart.js, CSS Grid, Local Storage/API Integration",
            image: "images/Finance-Tracker.png", 
            link: "#" 
        },
        { 
            name: "AI Resume Builder", 
            description: "Smart resume builder using OpenAI that generates bullet points, summaries, and job-specific keywords. Users can download polished resumes as PDFs.", 
            skills: "Key Skills: React, OpenAI API, Form Handling, Tailwind CSS",
            image: "images/AI-Resume-Builder.png", 
            link: "#" 
        }
    ];

    const skillsContainer = document.querySelector('.skills-container');
    const projectsContainer = document.querySelector('.projects-container');

    if (skillsContainer) {
        skills.forEach(skill => {
            const skillElement = document.createElement('div');
            skillElement.classList.add('skill');
            skillElement.innerHTML = `<i class="${skill.icon}"></i><h3>${skill.name}</h3>`;
            skillsContainer.appendChild(skillElement);
        });
    }

    if (projectsContainer) {
        projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.classList.add('project');
            projectElement.innerHTML = `
                <img src="${project.image}" alt="${project.name}" class="project-bg-img">
                <div class="project-content">
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
                    <p class="project-skills"><strong>${project.skills}</strong></p>
                    <a href="${project.link}" class="btn" target="_blank">View Project</a>
                </div>
            `;
            projectsContainer.appendChild(projectElement);
        });
    }

    // Scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    });

    const hiddenElements = document.querySelectorAll('section');
    hiddenElements.forEach(el => observer.observe(el));

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Typewriter effect
    const typewriterText = ["A Frontend Developer", "A learner who loves learning"];
    let textIndex = 0;
    let charIndex = 0;
    const typewriterElement = document.querySelector('.typewriter-text');
    const cursorElement = document.querySelector('.cursor');

    function type() {
        if (charIndex < typewriterText[textIndex].length) {
            typewriterElement.textContent += typewriterText[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            cursorElement.style.animation = 'blink 1s infinite';
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        cursorElement.style.animation = 'none';
        if (charIndex > 0) {
            typewriterElement.textContent = typewriterText[textIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            textIndex = (textIndex + 1) % typewriterText.length;
            setTimeout(type, 500);
        }
    }

    setTimeout(type, 1000);
});
