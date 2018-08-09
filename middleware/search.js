import axios from 'axios'
export default function({params, store}) {
    store.commit('addshop',params.id);
    //params.id = 'Changed1234';
    //return 
}