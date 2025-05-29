<template>
    <header class="header">
            <a href="#" class="logo"><router-link to="/Menu">Mercado FIPP</router-link></a>
    
            <nav class="navbarra">
              <a style="--i:1"><router-link to="/form-categorias/Categorias">Categoria</router-link></a>
              <a style="--i:2"><router-link to="/form-usuario/Usuário">Admin</router-link></a>
            </nav>
    </header>
    <div class="mainContent">
            <div v-if="anuncio" class="infos">
                    <h3>{{anuncios.titulo}}</h3>
                    <p>Categoria: {{ anuncios.catid}}</p>
                    <h6>Descrição do produto</h6>
                    <p>{{ anuncios.descricao}}</p>
            </div>
        <div class="interacao">
            <form class="form-pesquisa" @submit.prevent="adicionarPergunta">
                    <input type="text" id="buscar" placeholder="Digite sua pergunta..." v-model="texto">
                    <button id="botaoPesquisar" type="submit">Enviar pergunta</button>
            </form>
            <div class="perguntasRespostas" v-if="anuncios?.perguntas?.length">
                <div v-for="(per, index) in this.anuncios.perguntas" :key="index" class="pergunta">
                    <h3>{{ per.texto }}</h3>
                    <p v-if="!per.resposta" @click="mostrarInput(index)" style="cursor: pointer; color: blue;">Responder</p>
                    <div v-if="respostaVisivel[index] && !per.resposta">
                    <input
                        type="text"
                        v-model="respostas[index]"
                        placeholder="Digite a resposta..."
                    />
                    <button @click="adicionarResposta(index)">Enviar</button>
                    </div>
                    <h3 v-if="per.resposta">{{ per.resposta }}</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default{
    name: 'AnuncioIndividual',
    props:{
        msg: String
    },
    data(){
        return {id:0, titulo:"", data:"", descricao:"", preco:"", catid:"", catusu:"", perguntas:[],respostas: [], respostaVisivel:[], formOn:false,
        anuncios: null}
    },
    created() {
        this.id = this.$route.params.id;  
        this.carregarDados();
    },
    methods:{
        carregarDados(){
            axios.get("http://localhost:8080/apis/anuncio/"+this.id)
            .then(result=>{
                this.anuncios=result.data;
                this.respostaVisivel = this.anuncios.perguntas.map(() => false); 
                this.respostas = this.anuncios.perguntas.map(() => "");
            }).catch(error=>{
                alert(error)
            })
        },
        adicionarPergunta(){
            axios.get("http://localhost:8080/apis/anuncio/add-pergunta/"+this.anuncios.id+"/"+this.texto)
            .then(result=>{
                this.anuncios=result.data;
                this.respostaVisivel = this.anuncios.perguntas.map(() => false);
                this.texto = "";
            }).catch(error=>{
                alert(error)
            })
        },
        adicionarResposta(index){
            axios.get("http://localhost:8080/apis/pergunta/add-resposta/"+this.anuncios.perguntas[index].id+"/"+this.respostas[index]).then(result=>{
                this.anuncios = result.data; // atualiza dados com a resposta nova
                this.respostaVisivel = this.anuncios.perguntas.map(() => false); // oculta inputs
                this.respostas = this.anuncios.perguntas.map(() => "");
            }).catch(error=>{
                alert(error)
            })
        },
        mostrarInput(index) {
            this.$set(this.respostaVisivel, index, true); 
        },
    }
}
</script>

<style>
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

.mainContent {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  margin-top: 100px; /* Para não ficar atrás do header fixo */
  padding: 20px;
  gap: 20px;
}

/* Quadro do anúncio */
.infos {
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 45%;
}

/* Quadro de interação */
.interacao {
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 45%;
}

.form-pesquisa {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

#buscar {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

#botaoPesquisar {
  padding: 10px;
  background-color: #000143;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

#botaoPesquisar:hover {
  background-color: #1a1a70;
}
</style>