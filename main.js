document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', function () {
    const currentYear = new Date().getFullYear();
    const backgroundImageUrl = 'https://api.wozsun.com/random-img?b=dark&t=wlop,acg,nature&m=redirect';
    const backgroundCycleMs = 10000;
    const backgroundCrossfadeMs = 1600;
    const initialRevealTimeoutMs = 1500;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const backgroundStage = document.querySelector('.background-stage');

    let currentBackground = null;
    let backgroundTimerId = null;
    let backgroundRequestInFlight = false;
    let hasRevealed = false;
    const revealPage = function () {
        if (hasRevealed) {
            return;
        }
        hasRevealed = true;
        document.body.classList.add('bg-ready');
    };

    const clearBackgroundTimer = function () {
        window.clearTimeout(backgroundTimerId);
        backgroundTimerId = null;
    };

    const scheduleNextBackground = function (delay = backgroundCycleMs) {
        clearBackgroundTimer();

        if (reduceMotion.matches || document.hidden) {
            return;
        }

        backgroundTimerId = window.setTimeout(function () {
            loadNextBackground({ initial: false });
        }, delay);
    };

    const activateBackground = function (bgImg) {
        const previousImage = currentBackground;
        backgroundStage.append(bgImg);

        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                bgImg.classList.add('is-active');
                document.body.classList.add('bg-visible');
                revealPage();

                if (previousImage) {
                    previousImage.classList.add('is-leaving');
                    window.setTimeout(function () {
                        previousImage.remove();
                    }, backgroundCrossfadeMs);
                }
            });
        });

        currentBackground = bgImg;

        backgroundStage.querySelectorAll('.background-image').forEach(function (image) {
            if (image !== bgImg && image !== previousImage) {
                image.remove();
            }
        });

        scheduleNextBackground(backgroundCycleMs);
    };

    const loadNextBackground = function ({ initial = false } = {}) {
        if (!backgroundStage) {
            revealPage();
            return;
        }

        if (backgroundRequestInFlight || document.hidden || (!initial && reduceMotion.matches)) {
            return;
        }

        backgroundRequestInFlight = true;
        const bgImg = new Image();
        bgImg.className = initial ? 'background-image is-initial' : 'background-image';
        bgImg.alt = '';
        bgImg.decoding = 'async';
        bgImg.setAttribute('aria-hidden', 'true');

        bgImg.addEventListener('load', async function () {
            try {
                if (bgImg.decode) {
                    await bgImg.decode();
                }
            } catch {
                // A completed load is still safe to display if decoding rejects.
            }

            backgroundRequestInFlight = false;
            activateBackground(bgImg);
        }, { once: true });

        bgImg.addEventListener('error', function () {
            backgroundRequestInFlight = false;
            revealPage();
            scheduleNextBackground(backgroundCycleMs);
        }, { once: true });

        bgImg.src = backgroundImageUrl;
    };

    window.setTimeout(revealPage, initialRevealTimeoutMs);
    loadNextBackground({ initial: true });

    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            clearBackgroundTimer();
            return;
        }

        if (!currentBackground) {
            loadNextBackground({ initial: true });
            return;
        }

        if (!reduceMotion.matches && !backgroundRequestInFlight) {
            scheduleNextBackground(backgroundCycleMs);
        }
    });

    reduceMotion.addEventListener('change', function () {
        if (reduceMotion.matches) {
            clearBackgroundTimer();
            return;
        }

        scheduleNextBackground(backgroundCycleMs);
    });

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
            <a class="flinktxt" href="https://beian.miit.gov.cn/" rel="nofollow noopener noreferrer" target="_blank">鄂ICP备2022020520号-1</a> |
            <a class="flinktxt" href="https://beian.mps.gov.cn/#/query/webSearch?code=42060002000302" rel="nofollow noopener noreferrer" target="_blank">鄂公网安备42060002000302号</a>
        </div>
        <div>
            Copyright © 2022-${currentYear} <a class="flinktxt" href="https://wozsun.com" rel="noopener noreferrer" target="_blank">wozsun</a> | All Rights Reserved
        </div>
        <div>
            Powered by Aliyun ESA & Tencent Cloud
        </div>
    `;
})
