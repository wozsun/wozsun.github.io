document.addEventListener('DOMContentLoaded', function () {
    const currentYear = new Date().getFullYear();
    const backgroundImageUrl = 'https://api.wozsun.com/random-img?b=dark&t=wlop,acg,nature&m=redirect';
    const bgRetryIntervalMs = 50;
    const bgTotalTimeoutMs = 1500;

    let hasRevealed = false;
    let hasShownBackground = false;
    let bgTimeoutId = null;
    const bgDeadline = Date.now() + bgTotalTimeoutMs;
    const revealPage = function () {
        if (hasRevealed) {
            return;
        }
        hasRevealed = true;

        clearTimeout(bgTimeoutId);
        bgTimeoutId = null;

        document.body.classList.add('bg-ready');
    };

    const showBackgroundImage = function (bgImg) {
        if (hasShownBackground) {
            return;
        }
        hasShownBackground = true;

        document.body.prepend(bgImg);
        requestAnimationFrame(function () {
            document.body.classList.add('bg-visible');
            revealPage();
        });
    };

    const requestBgImage = function () {
        if (hasShownBackground) {
            return;
        }

        const bgImg = new Image();
        bgImg.className = 'background-image';
        bgImg.alt = '';
        bgImg.decoding = 'async';
        bgImg.loading = 'eager';
        bgImg.setAttribute('aria-hidden', 'true');

        bgImg.addEventListener('load', function () {
            const revealLoadedImage = function () {
                showBackgroundImage(bgImg);
            };

            if (bgImg.decode) {
                bgImg.decode().then(revealLoadedImage, revealLoadedImage);
                return;
            }

            revealLoadedImage();
        });

        bgImg.addEventListener('error', function () {
            const timeLeft = bgDeadline - Date.now();

            if (timeLeft <= 0) {
                revealPage();
                return;
            }

            const nextDelay = Math.min(bgRetryIntervalMs, timeLeft);
            setTimeout(requestBgImage, nextDelay);
        });

        bgImg.src = backgroundImageUrl;
    };

    bgTimeoutId = setTimeout(function () {
        revealPage();
    }, bgTotalTimeoutMs);

    requestBgImage();

    const projectus = [ 'drive', 'cloud' ];//project-up-select
    const projectudcs = [ 'AList', 'Cloudreve' ];//project-up-description-select
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
            const projectLink = `<a class="linktxt" href="${link}" rel="noopener noreferrer" target="_blank">${projectDesc}</a>`;
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
            const projectLink = `<a class="linktxt" href="${link}" rel="noopener noreferrer" target="_blank">${projectDesc}</a>`;
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
            <a class="flinktxt" href="https://beian.miit.gov.cn/" rel="noopener noreferrer" target="_blank">鄂ICP备2022020520号-1</a> |
            <a class="flinktxt" href="https://beian.mps.gov.cn/#/query/webSearch?code=42060002000302" rel="noopener noreferrer" target="_blank">鄂公网安备42060002000302号</a>
        </div>
        <div>
            Copyright © 2022-${currentYear} <a class="flinktxt" href="https://wozsun.com" rel="noopener noreferrer" target="_blank">wozsun</a> | All Rights Reserved
        </div>
        <div>
            Powered by Aliyun ESA & Tencent Cloud
        </div>
    `;
})
