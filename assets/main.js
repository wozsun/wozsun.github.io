document.addEventListener('DOMContentLoaded', function () {
    const hostname = window.location.hostname;
    const currentYear = new Date().getFullYear();

    let name = null;
    let host = null;
    let icp = null;
    let mps = null;
    let projectus = null; //project-up-select
    let projectudcs = null; //project-up-description-select
    let projectds = null; //project-down-select
    let projectddcs = null; //project-down-description-select
    const projectuw = [];
    const projectudcw = [];
    const projectdw = ['code', 'drive', 'cloud'];
    const projectddcw = ['仓库', '网盘', '私云'];

    switch (hostname) {
        case 'wozsun.com':
        case 'www.wozsun.com':
            name = 'wozsun';
            host = 'wozsun.com';
            icp = '-1';
            mps = '42018502006419';
            projectus = projectuw;
            projectudcs = projectudcw;
            projectds = projectdw;
            projectddcs = projectddcw;
            document.title = 'wozsun';
            break;
        default:
            name = 'ZeSean Woo';
            host = 'localhost';
            icp = '-0';
            mps = '00000000000000';
            projectus = [];
            projectudcs = [];
            projectds = [];
            projectddcs = [];
            document.title = '我的主页';
    };

    let master = document.querySelector('.mname');
    master.innerHTML = name;

    if (projectus.length === 0) {
        let projectsuDiv = document.querySelector('.projects-up');
        if (projectsuDiv) {
            projectsuDiv.remove();
        }
    } else {
        const projectuLinks = [];
        for (let i = 0; i < projectus.length; i++) {
            const link = `https://${projectus[i]}.${host}`;
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
            const link = `https://${projectds[i]}.${host}`;
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
            <a class="flinktxt" href="https://beian.miit.gov.cn/" target="_blank">鄂ICP备2022020520号${icp}</a> |
            <a class="flinktxt" href="https://beian.mps.gov.cn/#/query/webSearch?code=${mps}"
                target="_blank">鄂公网安备${mps}号</a>
        </div>
        <div>
            Copyright © 2022-${currentYear} <a class="flinktxt" href="https://www.${host}" target="_blank">${name}</a> | All Rights
            Reserved
        </div>
        <div>
            Powered by <a class="flinktxt" href="https://url.cn/d2HDR47V" target="_blank">Tencent Cloud</a>
        </div>
    `;
})