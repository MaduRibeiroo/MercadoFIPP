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
                <h3 class="sub-title">ANÚNCIOS</h3>
                <p class="sub-title">Busque o anúncio pelo nome</p>
                <form class="form-pesquisa" @submit.prevent="buscarTitulo">
                    <input type="text" id="buscar" placeholder="Digite o título..." v-model="titulo">
                    <button id="botaoPesquisar" type="submit">Pesquisar</button>
                    <p v-if="mensagem" style="color: #ff9999; margin-top: 20px;">{{ mensagem }}</p>
                </form>
            </div>
            <div class="divAnuncios">
                <div v-for="anu in this.anuncios" :key="anu.id" class="cards" @click="irParaAnuncioIndividual(anu)">
                    <h3>{{ anu.titulo}}</h3>
                    <h5>{{ anu.descricao}}</h5>
                    <h4>R$ {{ anu.preco }}</h4>
                    <button class="">Acessar produto</button>
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
      return {id:0, titulo:"", data:"", descricao:"", preco:"", catid:"", catusu:"", perguntas:[], mensagem:"", formOn:false,
      anuncios:[]}
    },
    created() {
        this.carregarDados();
    },
    methods:{
        carregarDados(){   //ok
            axios.get("http://localhost:8080/apis/anuncio")
            .then(result=>{
                this.anuncios=result.data
            }).catch(error=>{
              this.mensagem = "Anuncio nao encontrado";
            })
        },
        buscarTitulo(){
            axios.get("http://localhost:8080/apis/anuncio/buscarTitulo", {
              params: {
                  titulo: this.titulo
              }
            })
            .then(result=>{
                this.anuncios=result.data;
                this.mensagem="";
            }).catch(error=>{
                this.mensagem = "Anuncio nao encontrado";
            })
        },
        irParaAnuncioIndividual(anuncio) {
            this.$router.push({name: "AnuncioIndividual" , params: {id: anuncio.id}});
        }
    }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

body {
  background-color: #0b0b3b;
  color: #fff;
  padding-top: 80px;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px 40px;
  background-color: #0a084d;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);
}

.logo a {
  font-size: 28px;
  font-weight: bold;
  color: #53baff;
  text-decoration: none;
  transition: color 0.3s;
}

.logo a:hover {
  color: #79cdff;
}

.navbarra a {
  font-size: 18px;
  margin-left: 30px;
  color: #ffffff;
  text-decoration: none;
  position: relative;
  transition: color 0.3s;
}

.navbarra a::after {
  content: "";
  position: absolute;
  width: 0%;
  height: 2px;
  bottom: -5px;
  left: 0;
  background-color: #53baff;
  transition: 0.3s;
}

.navbarra a:hover {
  color: #53baff;
}

.navbarra a:hover::after {
  width: 100%;
}

.main-content {
  text-align: center;
  padding: 60px 20px;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sub-title {
  margin: 10px 0;
  font-size: 10px; 
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.form-pesquisa {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  width: 100%;
}

.form-pesquisa input {
  padding: 14px 20px;
  font-size: 18px;
  border-radius: 10px;
  border: 1px solid #ccc;
  width: 400px;
  max-width: 90%;
  background-color: #fff;
  color: #000;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}


.form-pesquisa button {
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 6px;
  border: none;
  background-color: #53baff;
  color: white;
  cursor: pointer;
  transition: 0.3s ease;
}

.form-pesquisa button:hover {
  background-color: #3fa4e0;
}

.divAnuncios {
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
  width: 100%;
  max-width: 1200px;
}

.cards {
  background-color: #ffffff;
  color: #000;
  border-radius: 12px;
  padding: 20px;
  width: 260px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  transition: transform 0.2s, box-shadow 0.3s;
  cursor: pointer;
}

.cards:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.3);
}

.cards h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #0b0b3b;
}

.cards h5 {
  font-size: 14px;
  color: #333;
}

.cards button {
  margin-top: 15px;
  padding: 10px 16px;
  font-size: 15px;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  background-color: #0b5ed7;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.cards button:hover {
  background-color: #084298;
  transform: scale(1.05);
}


</style>