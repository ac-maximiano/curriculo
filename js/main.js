document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

async function fetchData() {
    try {
        const response = await fetch('./data.json');
        const data = await response.json();
        renderResume(data);
    } catch (error) {
        console.error('Erro ao carregar os dados:', error);
    }
}

function renderResume(data) {
    // 1. Header & Resumo
    document.getElementById('name').textContent = data.profile.name;
    document.getElementById('title').textContent = data.profile.title;
    document.getElementById('location-text').textContent = data.profile.location;
    document.getElementById('email-link').href = `mailto:${data.profile.email}`;
    document.getElementById('email-text').textContent = data.profile.email;
    document.getElementById('linkedin-link').href = data.profile.linkedin;
    document.getElementById('github-link').href = data.profile.github;
    
    document.getElementById('summary-text').textContent = data.summary;

    // 2. Skills
    renderSkills('backend-list', data.skills.backend);
    renderSkills('frontend-list', data.skills.frontend);
    renderSkills('arch-list', data.skills.architecture);

    // 3. Experiência
    const xpContainer = document.getElementById('experience-container');
    data.experience.forEach(job => {
        const jobHTML = `
            <div class="job-item">
                <div class="job-header">
                    <h4>${job.role}</h4>
                    <span class="company">${job.company}</span>
                    <span class="date">${job.period}</span>
                </div>
                <ul>
                    ${job.details.map(detail => `<li>${detail}</li>`).join('')}
                </ul>
            </div>
        `;
        xpContainer.innerHTML += jobHTML;
    });

    // 4. Experiência Anterior (Condensada)
    const prevXpContainer = document.getElementById('previous-xp');
    if(prevXpContainer) {
        prevXpContainer.innerHTML = data.previous_experience.map(xp => `<p>${xp}</p>`).join('');
    }

    // 5. Formação
    const eduContainer = document.getElementById('education-list');
    eduContainer.innerHTML = data.education.map(edu => `<li>${edu}</li>`).join('');
}

function renderSkills(elementId, skillsArray) {
    const container = document.getElementById(elementId);
    container.innerHTML = skillsArray.map(skill => `<span>${skill}</span>`).join('');
}