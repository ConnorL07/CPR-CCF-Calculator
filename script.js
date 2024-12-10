let timer1, timer2;
let elapsedTime1 = 0, elapsedTime2 = 0; // Centiseconds (hundredths of a second)
let isRunning = false; // Controls both timers
let isCompressionRunning = true; // Tracks the state of the "Total Compressions Time" timer (default to running)

// HTML Elements
const timerDisplay1 = document.getElementById("timer1");
const timerDisplay2 = document.getElementById("timer2");
const startStopButton = document.getElementById("startStopButton");
const resetButton = document.getElementById("resetButton");
const pauseResumeButton = document.getElementById("pauseResumeButton");
const cffResult = document.getElementById("cffResult");
const cffRemarks = document.getElementById("cffRemarks");
const timersPage = document.getElementById("timersPage");
const resultsPage = document.getElementById("resultsPage");
const startAgainButton = document.getElementById("startAgainButton");

// Disable buttons by default
pauseResumeButton.disabled = true;
resetButton.disabled = true;

// Utility function to format time as mm:ss:cc
function formatTime(centiseconds) {
    const minutes = Math.floor(centiseconds / (60 * 100));
    const seconds = Math.floor((centiseconds / 100) % 60);
    const hundredths = centiseconds % 100;
    return `${pad(minutes)}:${pad(seconds)}:${pad(hundredths)}`;
}

// Utility function to pad numbers with leading zero
function pad(num) {
    return num.toString().padStart(2, "0");
}

// Start/Stop Both Timers
startStopButton.addEventListener("click", () => {
    if (isRunning) {
        // Stop both timers and show results
        clearInterval(timer1);
        clearInterval(timer2);
        startStopButton.textContent = "Start";
        startStopButton.classList.remove("button-stop"); // Remove red styling
        pauseResumeButton.disabled = true; // Disable Pause/Resume button
        resetButton.disabled = false; // Enable reset button
        showResults();
    } else {
        // Start "Total Scene Time" timer
        timer1 = setInterval(() => {
            elapsedTime1++;
            timerDisplay1.textContent = formatTime(elapsedTime1);
        }, 10);

        // Start "Total Compressions Time" timer
        timer2 = setInterval(() => {
            elapsedTime2++;
            timerDisplay2.textContent = formatTime(elapsedTime2);
        }, 10);

        startStopButton.textContent = "Stop";
        startStopButton.classList.add("button-stop"); // Add red styling
        pauseResumeButton.disabled = false; // Enable Pause/Resume button
        resetButton.disabled = false; // Enable reset button
    }
    isRunning = !isRunning;
});

// Reset Both Timers
resetButton.addEventListener("click", () => {
    clearInterval(timer1);
    clearInterval(timer2);
    elapsedTime1 = 0;
    elapsedTime2 = 0;
    timerDisplay1.textContent = "00:00:00";
    timerDisplay2.textContent = "00:00:00";
    startStopButton.textContent = "Start";
    startStopButton.classList.remove("button-stop"); // Remove red styling
    resetButton.disabled = true;
    pauseResumeButton.disabled = true; // Disable Pause/Resume button
    pauseResumeButton.textContent = "Pause Compressions"; // Reset button text
    isRunning = false;
    isCompressionRunning = true; // Reset compression timer state
});

// Pause/Resume "Total Compressions Time" Timer
pauseResumeButton.addEventListener("click", () => {
    if (isCompressionRunning) {
        // Pause the compressions timer
        clearInterval(timer2);
        pauseResumeButton.textContent = "Resume Compressions";
    } else {
        // Resume the compressions timer
        timer2 = setInterval(() => {
            elapsedTime2++;
            timerDisplay2.textContent = formatTime(elapsedTime2);
        }, 10);
        pauseResumeButton.textContent = "Pause Compressions";
    }
    isCompressionRunning = !isCompressionRunning;
});

// Show Results Page
function showResults() {
    // Calculate CFF%
    const cffPercent = elapsedTime1 === 0 ? 0 : (elapsedTime2 / elapsedTime1) * 100;
    cffResult.textContent = `CFF%: ${cffPercent.toFixed(2)}%`;

    // Determine remarks based on CFF%
    let remarks;
    if (cffPercent >= 99 && cffPercent <= 100) {
        remarks = "Hacker";
    } else if (cffPercent >= 90 && cffPercent < 99) {
        remarks = "Outstanding Job! How Do You Do It?!?";
    } else if (cffPercent >= 80 && cffPercent < 90) {
        remarks = "Amazing CFF, Good Work!!!";
    } else if (cffPercent >= 60 && cffPercent < 80) {
        remarks = "Not Bad, But Not Good Either";
    } else if (cffPercent >= 1 && cffPercent < 60) {
        remarks = "You Suck";
    } else if (cffPercent >= 0 && cffPercent < 1) {
        remarks = "How.";
    } else {
        remarks = "Invalid CFF%";
    }

    // Display remarks
    cffRemarks.textContent = remarks;

    // Switch to results page
    timersPage.style.display = "none";
    resultsPage.style.display = "block";
}

// Start Again
startAgainButton.addEventListener("click", () => {
    // Reset everything
    elapsedTime1 = 0;
    elapsedTime2 = 0;
    timerDisplay1.textContent = "00:00:00";
    timerDisplay2.textContent = "00:00:00";
    startStopButton.textContent = "Start";
    resetButton.disabled = true;
    pauseResumeButton.disabled = true; // Disable Pause/Resume button
    pauseResumeButton.textContent = "Pause Compressions"; // Reset button text
    isRunning = false;
    isCompressionRunning = true; // Reset compression timer state

    // Switch to timers page
    resultsPage.style.display = "none";
    timersPage.style.display = "block";
});
