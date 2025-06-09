document.addEventListener('DOMContentLoaded', function () {
    const currentYear = new Date().getFullYear();

    const projectus = [ 'docs' ];//project-up-select
    const projectudcs = [ 'AFFiNE' ];//project-up-description-select
    const projectds = [];//project-down-select
    const projectddcs = [];//project-down-description-select

    if (projectus.length === 0) {
        let projectsuDiv = document.querySelector('.projects-up');
        if (projectsuDiv) {
            projectsuDiv.remove();
        }
    } else {
        const projectuLinks = [];
        for (let i = 0; i < projectus.length; i++) {
            const link = `https://${projectus[i]}.wozsun.com`;
            const projectDesc = `<div class="project-up">${projectudcs[i]}</div>`;
            const projectLink = `<a class="linktxt" href="${link}" target="_blank">${projectDesc}</a>`;
            projectuLinks.push(projectLink);
        }
        let projectsu = document.querySelector('.projects-up');
        if (projectsu) {
            projectsu.innerHTML = projectuLinks.join('\n');
        }
    };

    if (projectds.length === 0) {
        let projectsdDiv = document.querySelector('.projects-down');
        if (projectsdDiv) {
            projectsdDiv.remove();
        }
    } else {
        const projectdLinks = [];
        for (let i = 0; i < projectds.length; i++) {
            const link = `https://${projectds[i]}.wozsun.com`;
            const projectDesc = `<div class="project-down">${projectddcs[i]}</div>`;
            const projectLink = `<a class="linktxt" href="${link}" target="_blank">${projectDesc}</a>`;
            projectdLinks.push(projectLink);
        }
        let projectsd = document.querySelector('.projects-down');
        if (projectsd) {
            projectsd.innerHTML = projectdLinks.join('\n');
        }
    };

    let footer = document.querySelector('.footer');
    footer.innerHTML = `
        <div>
            <a class="flinktxt" href="https://beian.miit.gov.cn/" target="_blank">鄂ICP备2022020520号-1</a> |
            <a class="flinktxt" href="https://beian.mps.gov.cn/#/query/webSearch?code=42018502006419"
                target="_blank">鄂公网安备42018502006419号</a>
        </div>
        <div>
            Copyright © 2022-${currentYear} <a class="flinktxt" href="https://wozsun.com" target="_blank">wozsun</a> | All Rights
            Reserved
        </div>
        <div>
            Powered by Tencent Cloud & Alibaba Cloud
        </div>
    `;
})