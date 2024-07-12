class Timer {
  constructor(name, duration) {
    this.name = name;
    this.duration = duration * 1000; // Convert to milliseconds
    this.remainingTime = duration * 1000;
    this.isRunning = false;
    this.intervalId = null;
    this.reminders = [];
    this.updateTimeDisplay();
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.intervalId = setInterval(() => {
        this.remainingTime -= 1000;
        this.updateTimeDisplay();
        this.checkReminders();

        if (this.remainingTime <= 0) {
          this.stop();
          console.log(`Timer "${this.name}" has finished!`);
        }
      }, 1000);
    }
  }

  stop() {
    clearInterval(this.intervalId);
    this.isRunning = false;
  }

  addReminder(name, triggerTime) {
    if (name.trim() !== "") {
      this.reminders.push({ name, triggerTime });
    }
  }

  checkReminders() {
    const triggeredReminders = this.reminders.filter(
      (reminder) => this.remainingTime <= reminder.triggerTime * 1000
    );

    for (const reminder of triggeredReminders) {
      console.log(`Reminder: ${reminder.name} for timer "${this.name}"`);
      const reminderDisplay = document.getElementById('reminderDisplay');
      reminderDisplay.textContent = `Reminder: ${reminder.name}`;
      setTimeout(() => {
        reminderDisplay.textContent = '';
      }, 10000); // Clear the reminder after 10 seconds

      this.playBeep();

      this.reminders = this.reminders.filter(
        (r) => r.name !== reminder.name && r.triggerTime !== reminder.triggerTime
      );
    }
  }

  playBeep() {
    const beep = new Audio('beep.mp3'); // Path to your beep sound file
    beep.play();
  }

  updateTimeDisplay() {
    const timeDisplay = document.getElementById('timeDisplay');
    const minutes = Math.floor(this.remainingTime / 60000);
    const seconds = Math.floor((this.remainingTime % 60000) / 1000);
    timeDisplay.textContent = `Time left: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  getTimeLeft() {
    const minutes = Math.floor(this.remainingTime / 60000);
    const seconds = Math.floor((this.remainingTime % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const customPrompt = document.getElementById('customPrompt');
  const promptInput = document.getElementById('promptInput');
  const counterOutput = document.getElementById('counterOutput');
  let timerId;
  let secondsLeft;
  let startTime;

  const startTimer = (duration) => {
    if (timerId) {
      clearInterval(timerId);
    }
    
    startTime = Date.now();
    secondsLeft = duration;

    customPrompt.style.display = 'block';
    promptInput.value = '';
    counterOutput.textContent = '';

    promptInput.focus();

    timerId = setInterval(() => {
      secondsLeft--;
      if (secondsLeft < 0) {
        clearInterval(timerId);
        customPrompt.style.display = 'none';
        calculateAndDisplayCount();
      }
    }, 1000);
  };

  const calculateAndDisplayCount = () => {
    const elapsedTime = (Date.now() - startTime) / 1000;
    const charactersTyped = promptInput.value.length;
    const rate = Math.round((charactersTyped / elapsedTime) * 60);
    counterOutput.textContent = `Characters per minute: ${rate}`;
  };

  document.getElementById('btn60').addEventListener('click', () => startTimer(60));
  document.getElementById('btn30').addEventListener('click', () => startTimer(30));
  document.getElementById('btn15').addEventListener('click', () => startTimer(15));

  document.getElementById('startMainTimer').addEventListener('click', () => {
    const duration = parseInt(document.getElementById('timerDuration').value) * 60;
    const reminder1Time = parseInt(document.getElementById('reminder1Time').value) * 60;
    const reminder1Text = document.getElementById('reminder1Text').value;
    const reminder2Time = parseInt(document.getElementById('reminder2Time').value) * 60;
    const reminder2Text = document.getElementById('reminder2Text').value;
    const reminder3Time = parseInt(document.getElementById('reminder3Time').value) * 60;
    const reminder3Text = document.getElementById('reminder3Text').value;
    
    const myTimer = new Timer("Main Timer", duration);
    myTimer.addReminder(reminder1Text, reminder1Time);
    myTimer.addReminder(reminder2Text, reminder2Time);
    myTimer.addReminder(reminder3Text, reminder3Time);
    myTimer.start();
  });

  document.getElementById('calculateButton').addEventListener('click', () => {
    const number = parseFloat(document.getElementById('numberInput').value);
    if (!isNaN(number)) {
      document.getElementById('result0.6').textContent = (number * 0.6).toFixed(2);
      document.getElementById('result0.9').textContent = (number * 0.9).toFixed(2);
      document.getElementById('result1').textContent = (number * 1).toFixed(2);
      document.getElementById('result1.05').textContent = (number * 1.05).toFixed(2);
      document.getElementById('result1.1').textContent = (number * 1.1).toFixed(2);
    }
  });
});
