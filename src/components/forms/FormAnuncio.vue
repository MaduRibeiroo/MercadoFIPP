<template>
  <header class="header">
            <a href="#" class="logo"><router-link to="/Menu">Mercado FIPP</router-link></a>
    
            <nav class="navbarra">
              <a style="--i:1"><router-link to="/form-categorias/Categorias">Categoria</router-link></a>
              <a v-if="nivel==1" style="--i:2"><router-link to="/form-usuario/Usuário">Admin</router-link></a>
              <a v-if="nivel==2" style="--i:2"><router-link to="/form-usuario/Usuário">Usuario</router-link></a>
            </nav>
    </header>
  <h1 class="sub-title" style="margin-top: 100px;"><span>Anuncio</span></h1>
  <div class="hello" style="width: 50%; margin-left: auto; margin-right: auto; margin-bottom: 200px;">
    <div v-if="formOn">
      <form @submit.prevent="submitForm">
        <label for="idanun">Id</label>
        <input type="text" id="idanun" v-model="id" placeholder="ID do Anuncio..">
        <label for="title">Titulo</label>
        <input type="text" id="title" v-model="titulo" placeholder="Titulo do anuncio..">
        <label for="date">Data</label>
        <input type="date" id="date" v-model="data" placeholder="Data..">
        <label for="desc">Descrição</label>
        <input type="text" id="desc" v-model="descricao" placeholder="Descrição..">
        <label for="price">Preço</label>
        <input type="text" id="price" v-model="preco" placeholder="Preço..">
        <label for="idcat">Id categoria</label>
        <input type="text" id="idcat" v-model="catid" placeholder="Id da categoria..">
        <label for="idusu">Id do usuario</label>
        <input type="text" id="idusu" v-model="usrid" placeholder="Id do usuario..">
        <input type="submit" value="Confirmar">
      </form>
    </div>
    <button @click="this.mostrarForm(true)">Novo Anuncio</button>
    <table id="add">
      <thead>
        <tr>
          <th>Id</th>
          <th @click="ordenarTitulo()">Titulo</th>
          <th>Data</th>
          <th>Descrição</th>
          <th>Preço</th>
          <th>Cat id</th>
          <th>Usu id</th>
          <th colspan="2">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="anu in this.anuncios">
          <td>{{ anu.id }}</td>
          <td>{{ anu.titulo }}</td>
          <td>{{ anu.data }}</td>
          <td>{{ anu.descricao }}</td>
          <td>{{ anu.preco }}</td>
          <td>{{ anu.catid }}</td>
          <td>{{ anu.catusu }}</td>
          <td><button @click="this.alterar(anu.id)">Alterar</button></td>
          <td v-if="nivel == 1"><button @click="this.apagar(anu.id)">Apagar</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FormAnuncio',
  props: {
    msg: String
  },
  data() {
    return {
      id: 0, titulo: "", data: "", descricao: "", preco: "", catid: "", catusu: "", nivel:0, modoAlterar: false, formOn: false,
      anuncios: []
    }
  },
  created(){
    this.nivel = this.$route.query.nivel;
  },
 methods: {
  mostrarForm(flag) {
    this.formOn = flag;
  },
  submitForm() {
    if (this.modoAlterar) {
      this.alterarAnuncio();
    } else {
      this.gravar();
    }
  },
  gravar() {
    const url = 'http://localhost:8080/apis/anuncio';
    const data = {
      // id pode ser 0 ou null para novo registro
      id: this.id || null,
      titulo: this.titulo,
      data: this.data ? new Date(this.data).toISOString().substring(0, 10) : null,
      descricao: this.descricao,
      preco: this.preco,
      catid: this.catid,
      usrid: this.usrid
    };
    axios.post(url, data)
      .then(response => {
        this.carregarDados();
      })
      .catch(error => {
        console.error('Erro ao gravar anúncio:', error.response || error);
        alert('Erro ao gravar anúncio');
      });
    this.mostrarForm(false);
  },
  apagar(id) {
    axios.delete("http://localhost:8080/apis/anuncio/" + id)
      .then(() => this.carregarDados())
      .catch(error => alert('Erro ao apagar: ' + error));
  },
  alterar(id) {
    this.formOn = true;
    axios.get("http://localhost:8080/apis/anuncio/" + id)
      .then(result => {
        const anuncio = result.data;
        this.id = anuncio.id;
        this.titulo = anuncio.titulo;
        this.data = anuncio.data ? anuncio.data.substring(0,10) : ""; // para input type=date
        this.descricao = anuncio.descricao;
        this.preco = anuncio.preco;
        this.catid = anuncio.catid;
        this.usrid = anuncio.usrid;
        this.modoAlterar = true;
        this.mostrarForm(true);
      })
      .catch(error => alert('Erro ao carregar anuncio: ' + error));
  },
  alterarAnuncio() {
    const url = `http://localhost:8080/apis/anuncio`;
    const data = {
      id: this.id,  // importante enviar o id para update
      titulo: this.titulo,
      data: this.data ? new Date(this.data).toISOString().substring(0, 10) : null,
      descricao: this.descricao,
      preco: this.preco,
      catid: this.catid,
      usrid: this.usrid
    };
    axios.put(url, data)
      .then(() => {
        this.carregarDados();
        this.limparForm();
        this.mostrarForm(false);
        this.modoAlterar = false;
      })
      .catch(error => {
        alert("Erro ao alterar anúncio: " + error);
      });
  },
  limparForm() {
    this.id = 0;
    this.titulo = "";
    this.data = "";
    this.descricao = "";
    this.preco = "";
    this.catid = "";
    this.usrid = "";
    this.modoAlterar = false;
  },
  carregarDados() {
    axios.get("http://localhost:8080/apis/anuncio")
      .then(result => { this.anuncios = result.data; })
      .catch(error => alert('Erro ao carregar anúncios: ' + error));
  },
  ordenarTitulo() {
    this.anuncios.sort((a, b) => a.titulo.localeCompare(b.titulo));
  }
},
  mounted(){
      this.carregarDados();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[type=text],
select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type=submit] {
  width: 100%;
  background-color: #225c24;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}

div {
  border-radius: 5px;
  background-color: #91a1ff;
  padding: 20px;
}

#add {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#add td,
#add th {
  border: 1px solid #ddd;
  padding: 8px;
}

#add tr:nth-child(even) {
  background-color: #f2f2f2;
}

#add tr:hover {
  background-color: #ddd;
}

#add th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #000143;
  color: white;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'poppins', sans-serif;
}


.relatorio {
  color: aliceblue;
  font-size: 20px;
  line-height: 1.4;
  margin-bottom: 4rem;
  background-color: #030037;
}

.sub-title {
  text-align: center;
  font-size: 60px;
  padding-bottom: 70px;
}

.sub-title span {
  color: #53bafff7;
}

.container {
  padding: 90px;
}

.relatorio-lista {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(259px, 1fr));
  grid-gap: 40px;
  margin-top: 50px;
}

.relatorio-lista div {
  background-color: transparent;
  padding: 40px;
  font-size: 13px;
  font-weight: 13px;
  border-right: 10px;
  border-radius: 20px;
  transition: background 0.5s, transform 0.5;
  box-shadow: 1px 1px 20px #170251,
    1px 1px 40px #0d0ab6;
}

.relatorio-lista div i {
  font-size: 50px;
  margin-bottom: 30px;
}

.relatorio-lista div h2 {
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 15px;
}

.relatorio-lista div a {
  text-decoration: none;
  color: black;
  font-size: 12px;
  margin-top: 20px;
  display: inline-block;
}

.relatorio-lista div p {
  font-size: 14px;
}

.read {
  display: inline-block;
  padding: 12px 28px;
  background: #53bafff7;
  border-radius: 40px;
  font-size: 16px;
  color: black;
  letter-spacing: 1px;
  text-decoration: none;
  font-weight: 600;
  opacity: 0;
  animation: slideTop 1s ease forwards;
  animation-delay: 2s;
  box-shadow: 0 0 5px #53bafff7,
    0 0 25px #53bafff7;
}

.read:hover {
  box-shadow: 0 0 5px #53bafff7, 0 0 25px #53bafff7, 0 0 50px #53bafff7, 0 0 100px #53bafff7, 0 0 200px #53bafff7;
}

.relatorio-lista div:hover {
  transform: translate(-10px);
}

.tabela {
  width: 80%;
  /* Define a largura da tabela */
  margin: 20px auto;
  /* Centraliza a tabela */
  border-collapse: collapse;
  /* Remove espaços entre as bordas */
  background-color: white;
  box-shadow: 0px 4px 15px 2px rgba(174, 174, 240, 0.3);
  margin-top: 100px;
  color: #000;
}

.tabela th,
.tabela td {
  padding: 10px;
  border: 1px solid #ddd;
  /* Adiciona bordas às células */
  text-align: center;

}


@keyframes slideRight {
  0% {
    transform: translateX(-100px);
    opacity: 0;
  }

  100% {
    transform: translateX(0px);
    opacity: 1;
  }
}

@keyframes slideLeft {
  0% {
    transform: translateX(100px);
    opacity: 0;
  }

  100% {
    transform: translateX(0px);
    opacity: 1;
  }
}


@keyframes slideTop {
  0% {
    transform: translateY(100px);
    opacity: 0;
  }

  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}

@keyframes slideBottom {
  0% {
    transform: translateY(-100px);
    opacity: 0;
  }

  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}
</style>