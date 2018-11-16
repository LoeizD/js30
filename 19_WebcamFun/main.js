console.log("Must be opened on an https server or localhost");


const video = document.querySelector('.player')
const canvas = document.querySelector('.photo')
const ctx = canvas.getContext('2d')
const strip = document.querySelector('.strip')
const snap = document.querySelector('.snap')

function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(localMediaStream => {
            video.src = window.URL.createObjectURL(localMediaStream);
            video.play()
        })
        .catch(err => console.log(err))
}

function redEffect(pixels) {
    for(let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i + 0] = pixels.data[i + 0]
        pixels.data[i + 1] *= .8
        pixels.data[i + 2] *= .8
    }
    return pixels
}
function rgbSplit(pixels) {
    for(let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i - 50] = pixels.data[i + 0]
        pixels.data[i + 50] = pixels.data[i + 1]
        pixels.data[i + 2] = pixels.data[i + 2]
    }
    return pixels
}
const min = document.getElementsByName('gmin')[0]
const max = document.getElementsByName('gmax')[0]
function greenScreen(pixels) {
    
    for(let i = 0; i < pixels.data.length; i+=4) {
        if (min.value < pixels.data[i + 1] && pixels.data[i + 1] < max.value) {
            pixels.data[i + 0]  = 0
            pixels.data[i + 1]  = 0
            pixels.data[i + 2]  = 0
            pixels.data[i + 3]  = 0
        }
    }
    return pixels


}

function paintToCanvas() {
    const width = video.videoWidth
    const height = video.videoHeight
    canvas.width = width
    canvas.height = height

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height)
        let pixels =  ctx.getImageData(0, 0, width, height)
        pixels = rgbSplit(greenScreen(pixels))
        ctx.globalAlpha = 0.2

        ctx.putImageData(pixels, 0, 0)
    }, 16)
}

function takePhoto() {
    snap.currentTime = 0
    snap.play()

    const data = canvas.toDataURL('image/jpeg')
    const link = document.createElement('a')
    link.href = data
    link.setAttribute('download', 'handsome')
    link.innerHTML = `<img src='${data}' alt="handsome man" />`
    strip.insertBefore(link, strip.firstChild)
}

getVideo()
video.addEventListener('canplay', paintToCanvas)