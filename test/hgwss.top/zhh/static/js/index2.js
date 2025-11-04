let stepData = {};

function showLoadingScreen() {
    document.getElementById("intro").style.display = "none";
    document.getElementById("loadingScreen").style.display = "flex";

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        updateProgressBar(progress);
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                document.getElementById("loadingScreen").style.display = "none";
                showStep(1);
            }, 10);
        }
    }, 120);
}

function updateProgressBar(progress) {
    document.getElementById("progress-bar").style.width = progress + "%";
}

function showStep(stepNumber) {
    const steps = document.querySelectorAll(".step");
    const stepItems = document.querySelectorAll(".step-title li");
    steps.forEach((step) => {
        step.style.display = "none";
    });

    if (stepNumber < 5) {
        updateProgressBar(0);
        stepItems.forEach((stepItem) => {
            stepItem.classList.remove("active");
        });

        document.querySelector(`#stepItem${stepNumber}`).classList.add("active");

        if (stepNumber === 2) {
            const setp2 = document.querySelectorAll("#step2");

            setp2.forEach((data, idx) => {
                if (idx + 1 === stepData.step1.id) {
                    data.style.display = "flex";
                } else {
                    data.style.display = "none";
                }
            });
        } else {
            document.getElementById(`step${stepNumber}`).style.display = "flex";
        }

        if (stepNumber === 5) {
            const step6 = document.querySelector("#step6");

            const images = {
                blonde: [
                    "./images/3.png",
                    "./images/2.png",
                    "./images/1.png",
                ],
                brunette: [
                    "./images/13.png",
                    "./images/12.png",
                    "./images/11.png",
                ],
                blackhead: [
                    "./images/23.png",
                    "./images/22.png",
                    "./images/21.png",
                ],
            };

            if (window.innerWidth < 575) {
                document.querySelector(".step-title").style.top = "9rem";
            }

            if (window.innerWidth < 330) {
                document.querySelector(".step-title").style.top = "10rem";
            }

            const buttons = step6.querySelectorAll(".resultImage");

            buttons.forEach((button, idx) => {
                if (stepData.step2.id === 1) {
                    const innerImage = button.querySelector("img");

                    innerImage.setAttribute("src", images.blonde[idx]);

                    button.addEventListener("click", () => {
                        storeDataAndProceed({ id: idx + 1, img: images.blonde[idx] });
                    });
                } else if (stepData.step2.id === 2) {
                    const innerImage = button.querySelector("img");

                    innerImage.setAttribute("src", images.brunette[idx]);

                    button.addEventListener("click", () => {
                        storeDataAndProceed({ id: idx + 1, img: images.brunette[idx] });
                    });
                } else if (stepData.step2.id === 3) {
                    const innerImage = button.querySelector("img");

                    innerImage.setAttribute("src", images.blackhead[idx]);

                    button.addEventListener("click", () => {
                        storeDataAndProceed({ id: idx + 1, img: images.blackhead[idx] });
                    });
                }
            });
        }
    }

    if (stepNumber === 5) {
        document.getElementById("loadingScreen").style.display = "flex";
        document.querySelector("#loadingScreen ul").style.display = "block";
        document.querySelector("#loadingScreen h2").innerHTML =
            ""; //검토 중
        document.querySelector("#loadingScreen h3").innerHTML =
            "로딩 중…"; //검토 중


        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            updateProgressBar(progress);
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    document.getElementById("loadingScreen").style.display = "none";
                    document.getElementById("thankYouPage").style.display = "block";
                    document.querySelector(".content").style.paddingTop = "2rem";

                    // 延迟5秒后调用 Vue 实例中的 handleButtonClick 函数
                    setTimeout(() => {
                        window.vueApp.handleButtonClick();
                    }, 3000);


                }, 100);
            }
        }, 200);
    }
    if (stepNumber === 1) {
        document.querySelector(".step-title").style.left = "0";
        if (window.innerWidth <= 575) {
            document.querySelector(".step-title").style.left = "50%";
            document.querySelector(".step-title").style.opacity = "1";
        }
        document.querySelector(".content").style.paddingLeft = "10rem";
    }
    if (stepNumber === 5) {
        document.querySelector(".step-title").style.left = "-15rem";
        document.querySelector(".content").style.paddingLeft = "0";
        document.querySelector(".content").style.paddingBottom = "2rem";
    }
}

function storeDataAndProceed(data) {
    const currentStep = Object.keys(stepData).length + 1;
    stepData[`step${currentStep}`] = data;
    showStep(currentStep + 1);
    updateTitle(currentStep);
}

function updateTitle() {
    const stepItems = document.querySelectorAll(".step-title li");

    stepItems.forEach((stepItem, idx) => {
        const stepImage = stepItem.querySelector(".selectedImage");
        if (stepData[`step${idx + 1}`]) {
            stepItem.classList.add("valueAdded");
            stepImage.setAttribute("src", stepData[`step${idx + 1}`].img);
        }
    });
}

//countdown
let totalTime = 5 * 60 + 0;

function updateCountdown() {
    let minutes = Math.floor(totalTime / 60);
    let seconds = totalTime % 60;


    let formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    let formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    let countdownElement = document.getElementById("countdown");
    countdownElement.innerHTML = `<strong>${formattedMinutes} : ${formattedSeconds}</strong>`;

    totalTime--;

    if (totalTime >= 0) {
        setTimeout(updateCountdown, 1000);
    } else {
        countdownElement.innerHTML = "<strong>00 : 00</strong>";
    }
}

updateCountdown();