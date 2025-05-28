import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import FormCategoria from "./components/forms/FormCategoria.vue"
import FormUsuario from "./components/forms/FormUsuario.vue"
import FormAnuncio from './components/forms/FormAnuncio.vue'
import MainView from './components/layouts/mainView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
    { path: '/Menu', component: MainView, props: true},
    { path: '/form-categorias/:msg', component: FormCategoria, props: true },
    { path: '/form-usuario/:msg', component: FormUsuario, props: true  },
    { path: '/form-anuncio/:msg', component: FormAnuncio, props: true },
    ]
});
    
const app=createApp(App);
app.use(router)
app.mount('#app')
