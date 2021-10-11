let startTime, reactionTime
const Holder = document.getElementById('Holder');
const bg = document.querySelector('.container')
const title = document.querySelector('.title')
let data = [], avg = 0
let eventType = 'mousemove'
const blueColor = '#84c1ff', greenColor = '#a8e6cf', redColor = '#ff8b94'

function refresh() {
    reactionTime = Date.now() - startTime;
    if (reactionTime > 90) {
        data.push(reactionTime)
        avg = Math.round(data.reduce((a, b) => a + b, 0) / data.length) || 'insufficient data'
        Holder.textContent = `now ${reactionTime} ms | avg ${avg} ms`;
    } else {
        Holder.textContent = 'too soon'
    }

    document.removeEventListener(eventType, refresh);
    Holder.setAttribute('style', ' visibility: visible')

}

function spaceUp(e) {

    if (e.code === 'Space') {
        let refreshRateGreen = ((Math.random() + 0.7) * 2000)
        title.textContent = 'Wait for Green'
        bg.setAttribute('style', `background: ${redColor};`) // red
        Holder.textContent = '123'
        Holder.setAttribute('style', ' visibility: hidden')
        setTimeout(() => {
            bg.setAttribute('style', `background: ${greenColor};`) //green
            document.addEventListener(eventType, refresh);
            startTime = Date.now();
            title.textContent = 'Reaction Time'

        }, refreshRateGreen);


    }
}

function app() {
    title.textContent = 'Press spacebar... wait for green than move your mouse...'
    bg.setAttribute('style', `background: ${blueColor};`) // blue
    document.addEventListener('keyup', spaceUp);
}

app()


