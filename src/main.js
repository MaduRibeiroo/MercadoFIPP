import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import FormCategoria from "./components/forms/FormCategoria.vue"
import FormUsuario from "./components/forms/FormUsuario.vue"
import FormAnuncio from './components/forms/FormAnuncio.vue'
import MainView from './components/layouts/mainView.vue'
import Login from './components/layouts/login.vue'
import ViewADM from './components/layouts/viewADM.vue'
import BuscarAnuncios from './components/buscarAnuncios.vue'
import AnuncioIndividual from './components/AnuncioIndividual.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
    { path: '/', component: Login, props: true},
    { path: '/Menu', component: MainView, props: true},
    { path: '/view-ADM', component: ViewADM, props: true},
    { path: '/form-categorias/:msg', component: FormCategoria, props: true },
    { path: '/form-usuario/:msg', component: FormUsuario, props: true  },
    { path: '/form-anuncio/:msg', component: FormAnuncio, props: true },
    { path: '/buscarAnuncios', component: BuscarAnuncios, props: true},
    { path: '/anuncioIndividual/:id', name: 'anuncioIndividual', props: true}
    ]
});
    
const app=createApp(App);
app.use(router)
app.mount('#app')
