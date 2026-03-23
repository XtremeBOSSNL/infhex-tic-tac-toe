import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import { installSoundEffects } from './soundEffects'

installSoundEffects()

import("./entry-web").catch(error => {
    console.error(error);
    alert('Failed to load app.\nPlease reload!');
});