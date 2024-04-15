window.onload = function () {
    var hostname = window.location.hostname;
    var master = document.querySelector('.mname');
    var footer = document.querySelector('.footer');

    var currentYear = new Date().getFullYear(); // 获取当前年份

    var name = null;
    var icp = null;
    var mps = null;

    if (hostname === 'wozsun.com' || hostname === 'www.wozsun.com') {
        name = 'wozsun';
        icp = '-1';
        mps = '42018502006419';
    } else if (hostname === 'zesn.cn' || hostname === 'www.zesn.cn') {
        name = 'ZeSean';
        icp = '-2';
        mps = '000';
    }

    master.innerHTML = name;
    footer.innerHTML = `
        <div>
            Copyright © 2022-${currentYear} <a class="flinktxt" href="https://www.wozsun.com" target="_blank">${name}</a> | All Rights
            Reserved
        </div>
        <div>
            <a class="flinktxt" href="https://beian.miit.gov.cn/" target="_blank">鄂ICP备2022020520号${icp}</a> |
            <a class="flinktxt" href="https://beian.mps.gov.cn/#/query/webSearch?code=${mps}"
                target="_blank">鄂公网安备${mps}号</a>
        </div>
        <div>
            Powered by <a class="flinktxt" href="https://url.cn/d2HDR47V" target="_blank">Tencent Cloud</a>
        </div>
    `;
}