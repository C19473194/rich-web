document.addEventListener('DOMContentLoaded', () => {
  const hoursInput = document.getElementById('hours');
  const minutesInput = document.getElementById('minutes');
  const secondsInput = document.getElementById('seconds');
  const startBtn = document.getElementById('startBtn');
  const countdownDisplay = document.getElementById('countdown');
  // Initially hide the countdown
  countdownDisplay.style.display = 'none';

  const onlyNumbers = (inputField) =>
    rxjs.fromEvent(inputField, 'input').pipe(
      rxjs.operators.map((event) => event.target.value),
      rxjs.operators.map((value) => value.replace(/[^0-9]/g, '')), // Remove non-numeric characters
      rxjs.operators.tap((value) => (inputField.value = value)) // Update the input field value
    );

  // Create observables for each input field
  const hours$ = onlyNumbers(hoursInput);
  const minutes$ = onlyNumbers(minutesInput);
  const seconds$ = onlyNumbers(secondsInput);

  // Combine observables to update minutes when seconds change
  rxjs.combineLatest(minutes$, seconds$)
    .subscribe(([minutes, seconds]) => {
      
      console.log(`Minutes: ${minutes}, Seconds: ${seconds}`);
    });

  // Combine observables to update hours when minutes change
  rxjs.combineLatest(hours$, minutes$)
    .subscribe(([hours, minutes]) => {
      
      console.log(`Hours: ${hours}, Minutes: ${minutes}`);
    });

  const startClick$ = rxjs.fromEvent(startBtn, 'click');

  let countdownSubscription;

  startClick$.subscribe(() => {
    // Stop the previous countdown
    if (countdownSubscription) {
      countdownSubscription.unsubscribe();
    }

    // Start a new countdown
    const startTime =
      (parseInt(hoursInput.value, 10) || 0) * 3600 +
      (parseInt(minutesInput.value, 10) || 0) * 60 +
      (parseInt(secondsInput.value, 10) || 0);

    // Show the countdown
    countdownDisplay.style.display = 'block';
    countdownSubscription = rxjs.timer(0, 1000).pipe(
      rxjs.operators.take(startTime + 1),
      rxjs.operators.map((time) => {
        const remainingSeconds = startTime - time;
        const remainingMinutes = Math.floor(remainingSeconds / 60) % 60;
        const remainingHours = Math.floor(remainingSeconds / 3600);

        return {
          hours: remainingHours,
          minutes: remainingMinutes,
          seconds: remainingSeconds % 60, // Ensure seconds stay within the standard range
        };
      }),
      rxjs.operators.map(({ hours, minutes, seconds }) => {
        if (hours > 0) {
          return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
        } else if (minutes > 0) {
          return `${padZero(minutes)}:${padZero(seconds)}`;
        } else {
          return `${padZero(seconds)}`;
        }
      })
    ).subscribe((value) => {
      countdownDisplay.textContent = value;
    });
  });
});

function padZero(num) {
  return num < 10 ? `0${num}` : `${num}`;
}
