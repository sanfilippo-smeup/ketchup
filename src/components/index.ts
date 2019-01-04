import { Vue } from 'vue-property-decorator';
import KLabel from './KLabel/KLabel.vue';
import KInput from './KInput';

const Ketchup = {
    install(Vue: any) {
        Vue.component(KLabel.name, KLabel);
        Vue.component(KInput.name, KInput);
    },
};

export  default Ketchup;
