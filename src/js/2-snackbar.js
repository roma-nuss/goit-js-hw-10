import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();

  const form = event.target;
  const delayInput = form.querySelector('input[name="delay"]');
  const stateRadios = form.querySelectorAll('input[name="state"]');
  const delay = Number(delayInput.value);
  let state;

  stateRadios.forEach(radio => {
    if (radio.checked) {
      state = radio.value;
    }
  });

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .finally(() => {
      delayInput.value = '';
      stateRadios.forEach(radio => (radio.checked = false));
    });
});
