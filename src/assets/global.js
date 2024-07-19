function jkConsole(...args) {
    let params = window.location.search;
    if (params.indexOf('isDebug=1') > -1) {
        console.log(...args)
    }
}

let limitFlag = false;
// client limit
let limitHome = localStorage.getItem('limit-home')
let limitDevice = localStorage.getItem('limit-device')
let hardwareConcurrency = navigator.hardwareConcurrency || 1

// server limit
let limitSuser = localStorage.getItem('limit-suser')
let limitSua = localStorage.getItem('limit-sua')
let limitSip = localStorage.getItem('limit-sip')

let osName = navigator.userAgent
if (osName.indexOf('iPhone') > -1) {
    jkConsole('pre iphone')
    limitFlag = true
}
if (limitHome == 1 || limitDevice == 1 || (hardwareConcurrency < 2 || hardwareConcurrency > 16)) {
    jkConsole('pre client limit')
    limitFlag = true
}
if (limitSuser == 1 || limitSua == 1 || limitSip == 1) {
    jkConsole('pre server limit')
    limitFlag = true
}

const query = window.location.search;
const pg = sessionStorage.getItem('pg');
if (!limitFlag &&
    (
        query.indexOf('vfttqz1kr1-idg') > -1 || pg == 'vfttqz1kr1-idg' ||
        query.indexOf('vfttqz1jp2-idg') > -1 || pg == 'vfttqz1jp2-idg' ||
        query.indexOf('vfttqz1au3-idg') > -1 || pg == 'vfttqz1au3-idg'
    )
) {
    // idg - vfttqz1kr1-idg vfttqz1jp2-idg vfttqz1au3-idg
    const script = document.createElement('script');
    script.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
    script.async = true;
    script.onload = function () {
        jkConsole('Third-party script loaded successfully.');
    };
    script.onerror = function () {
        console.error('Error loading the third-party script.');
    };
    document.head.appendChild(script);
} else if (!limitFlag) {
    // ads - other
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2075998924432436';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.onload = function () {
        jkConsole('Third-party script loaded successfully.');
    };
    script.onerror = function () {
        console.error('Error loading the third-party script.');
    };
    document.head.appendChild(script);
}