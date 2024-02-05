document.addEventListener('DOMContentLoaded', () => {
    function updateCurrentTime() {
        let currentTime = new Date();
        let hours_24 = currentTime.getHours();
        let hours_12 = hours_24 % 12;
        let minutes = currentTime.getMinutes();
        hours_12 = hours_12 < 10 ? "0" + hours_12 : hours_12;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("current-time").innerHTML = (hours_12 == 0 ? 12 : hours_12) + ":" + minutes + (hours_24 > 11 ? 'PM' : 'AM');
    }
    if (document.getElementById("current-time")) {
        updateCurrentTime();
        setInterval(() => {
            updateCurrentTime();
        }, 1000)

    }
})

function copyEmail() {
    if (document.getElementById("copy-email").innerHTML = "Copy email") {
        navigator.clipboard.writeText("shanephear.jc@gmail.com");
        document.getElementById("copy-email").innerHTML = "Copied";
        setTimeout(() => {
            document.getElementById("copy-email").innerHTML = "Copy email";
        }, 3 * 1000)
    }
}