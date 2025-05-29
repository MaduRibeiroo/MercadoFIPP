<template>
        <header class="header">
            <a href="#" class="logo"><router-link to="/Menu">Mercado FIPP</router-link></a>
    
            <nav class="navbarra">
              <a style="--i:1"><router-link to="/form-categorias/Categorias">Categoria</router-link></a>
              <a style="--i:2"><router-link to="/form-usuario/Usuário">Admin</router-link></a>
            </nav>
        </header>
    
        <main class="main-content">
            <div class="formContent">
                <h1 class="sub-title">ANÚNCIOS</h1>
                <h4 class="sub-title">Busque o anúncio pelo nome</h4>
                <form class="form-pesquisa" @submit.prevent="buscarTitulo">
                    <input type="text" id="buscar" placeholder="Digite o título..." v-model="titulo">
                    <button id="botaoPesquisar" type="submit">Pesquisar</button>
                </form>
            </div>
            <div class="divAnuncios">
                <div v-for="anu in this.anuncios" :key="anu.id" class="cards" @click="irParaAnuncioIndividual(anu)">
                    <h3>{{ anu.titulo}}</h3>
                    <h5>{{ anu.descricao}}</h5>
                    <p>Categoria: {{anu.catusu.nome}}</p>
                </div>
            </div>
        </main>
</template>

<script>
import axios from 'axios';
//import MainView from './layouts/mainView.vue'

export default{
    name: 'BuscarAnuncios',
    props: {
        msg: String
    },
    data(){
      return {id:0, titulo:"", data:"", descricao:"", preco:"", catid:"", catusu:"", perguntas:[], formOn:false,
      anuncios:[]}
    },
    methods:{
        carregarDados(){
            axios.get("http://localhost:8080/apis/anuncio")
            .then(result=>{
                this.anuncios=result.data
            }).catch(erros=>{
                alert(error)
            })
        },
        buscarTitulo(){
            axios.get("http://localhost:8080/apis/anuncio/"+this.titulo)
            .then(result=>{
                this.anuncios=result.data
            }).catch(erro=>{
                alert(error)
            })
        },
        irParaAnuncioIndividual(anuncio) {
            this.$router.push({name: "anuncioIndividual" , params: {id: anuncio.id}});
        }
    }
}
</script>

<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'poppins', sans-serif;}

body {
  margin: 0;
  font-family: 'Arial', sans-serif;
  background-color: #030037;
  color: white;
  padding-top: 80px;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  background-color: #000143;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
}

.logo {
  font-size: 25px;
  color: white;
  text-decoration: none;
  font-weight: 600;
  animation: slideRight 1s ease forwards;
}

.navbarra a {
  font-size: 20px;
  color: white;
  text-decoration: none;
  margin-left: 30px;
  animation: slideLeft 1s ease forwards;
  animation-delay: calc(0.2s * var(--i));
}

.navbarra a:hover {
  color: #53bafff7;
}

.main-content {
  background-color: #030037;
  color: white;
  text-align: center;
  margin-top: 120px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 120px);
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
}

.sub-title {
  margin: 10px 0;
  font-size: 32px;
}

.form-pesquisa {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap; /* responsividade */
}

.divAnuncios {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
}

.form-pesquisa input {
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: none;
  width: 250px;
}

.form-pesquisa button {
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 4px;
  border: none;
  background-color: #53baff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.form-pesquisa button:hover {
  background-color: #409de0;
}

.cards {
  background-color: white;
  color: black;
  border-radius: 10px;
  padding: 20px;
  width: 250px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
}

@keyframes slideRight {
  0% {
    transform: translateX(-100px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideLeft {
  0% {
    transform: translateX(100px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>