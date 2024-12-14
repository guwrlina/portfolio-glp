document.addEventListener('DOMContentLoaded', (event) => {
    // Typing effect for the name
    const name = document.querySelector('h1');
    name.innerHTML = name.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({loop: false})
        .add({
            targets: '.typing .letter',
            opacity: [0, 1],
            easing: "easeInOutQuad",
            duration: 2250,
            delay: (el, i) => 150 * (i + 1)
        });

    // Fade-in effect for sections
    const fadeElems = document.querySelectorAll('.fade-in');
    fadeElems.forEach((elem, index) => {
        elem.style.opacity = 0;
        window.setTimeout(() => {
            elem.style.transition = 'opacity 0.5s ease-in';
            elem.style.opacity = 1;
        }, 300 * index);
    });

    // Category navigation
    const categoryButtons = document.querySelectorAll('.category-btn');
    const projectContainers = document.querySelectorAll('.project-container');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;

            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            projectContainers.forEach(container => {
                if (container.id === category) {
                    container.classList.remove('hidden');
                } else {
                    container.classList.add('hidden');
                }
            });
        });
    });

    // Project click event
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        project.addEventListener('click', () => {
            const projectName = project.querySelector('h3').textContent;
            alert(`You clicked on ${projectName}. Here you can add more details or link to a separate page for this project.`);
        });
    });

    // Horizontal scrolling for project containers
    projectContainers.forEach(container => {
        let isDown = false;
        let startX;
        let scrollLeft;

        container.addEventListener('mousedown', (e) => {
            isDown = true;
            container.style.cursor = 'grabbing';
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });

        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.style.cursor = 'grab';
        });

        container.addEventListener('mouseup', () => {
            isDown = false;
            container.style.cursor = 'grab';
        });

        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        });
    });
});
