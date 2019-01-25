import 'izitoast/dist/css/iziToast.min.css'
import iZtoast from 'izitoast'

iZtoast.settings({
  timeout: 5000,
  pauseOnHover: true,
  transitionIn: 'bounceInLeft',
  transitionOut: 'fadeOutRight',
  position: 'topRight'
});

const toast = {
  error: (message) => {
    return iZtoast.error({
      title: 'Error',
      message: message,
      timeout: false
    });
  }
}

export default toast;
