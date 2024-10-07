document.addEventListener('DOMContentLoaded', function () {
    const hostname = window.location.hostname;
    var master = document.querySelector('.mname');
    var projectsd = document.querySelector('.projects-down');
    var footer = document.querySelector('.footer');

    const currentYear = new Date().getFullYear();

    var name = null;
    var host = null;
    var icp = null;
    var mps = null;
    var projectds = null; //project-down-select
    var projectddcs = null; //project-down-description-select
    const projectdw = ['code', 'drive', 'cloud'];
    const projectddcw = ['仓库', '网盘', '私云'];
    const projectdz = ['docs', 'life'];
    const projectddcz = ['文档', '生活'];

    switch (hostname) {
        case 'wozsun.com':
        case 'www.wozsun.com':
            name = 'wozsun';
            host = 'wozsun.com';
            icp = '-1';
            mps = '42018502006419';
            projectds = projectdw;
            projectddcs = projectddcw;
            document.title = 'wozsun';
            break;
        case 'zesn.cn':
        case 'www.zesn.cn':
            name = 'ZeSean';
            host = 'zesn.cn';
            icp = '-2';
            mps = '000';
            projectds = projectdz;
            projectddcs = projectddcz;
            document.title = 'ZeSean';
            break;
        default:
            document.title = '我的主页';
    };

    master.innerHTML = name;

    const projectLinks = [];
    for (let i = 0; i < projectds.length; i++) {
        const link = `https://${projectds[i]}.${host}`;
        const projectDiv = `<div class="project-down">${projectddcs[i]}</div>`;
        const projectLink = `<a class="linktxt" href="${link}" target="_blank">${projectDiv}</a>`;
        projectLinks.push(projectLink);
    }
    const projectsHTML = projectLinks.join('\n');
    projectsd.innerHTML = projectsHTML;

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