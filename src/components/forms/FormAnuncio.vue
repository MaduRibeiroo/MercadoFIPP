<template>
  <h1 class="sub-title" style="margin-top: 100px;"><span>Anuncio</span></h1>
  <div class="hello" style="width: 50%; margin-left: auto; margin-right: auto; margin-bottom: 200px;">
    <div v-if="formOn">
      <form @submit.prevent="this.gravar()">
        <label for="idanun">Id</label>
        <input type="text" id="idanun" v-model="id" placeholder="ID do Anuncio..">

        <label for="title">Titulo</label>
        <input type="text" id="title" v-model="titulo" placeholder="Titulo do anuncio..">

        <label for="date">Data</label>
        <input type="text" id="date" v-model="data" placeholder="Data..">

        <label for="desc">Descrição</label>
        <input type="text" id="desc" v-model="descricao" placeholder="Descrição..">

        <label for="price">Preço</label>
        <input type="text" id="price" v-model="preco" placeholder="Preço..">

        <label for="idcat">Id categoria</label>
        <input type="text" id="idcat" v-model="catid" placeholder="Id da categoria..">

        <label for="idusu">Id do usuario</label>
        <input type="text" id="idusu" v-model="catusu" placeholder="Id do usuario..">

        <label for="foto">Foto</label>
        <input type="file" id="foto" @change="onFileChange">

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
          <th>Foto</th>
          <th colspan="2">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="anu in this.anuncios" :key="anu.id">
          <td>{{ anu.id }}</td>
          <td>{{ anu.titulo }}</td>
          <td>{{ anu.data }}</td>
          <td>{{ anu.descricao }}</td>
          <td>{{ anu.preco }}</td>
          <td>{{ anu.catid }}</td>
          <td>{{ anu.catusu }}</td>
          <td>
            <img :src="getImageUrl(anu.foto)" alt="Foto" style="width: 100px; height: auto;" v-if="anu.foto">
          </td>
          <td>
            <button @click="this.alterar(anu.id)">Alterar</button>
          </td>
          <td v-if="usuarioLogado == 1">
            <button @click="this.apagar(anu.id)">Apagar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FormAnuncio',
  data() {
    return {
      id: 0,
      titulo: "",
      data: "",
      descricao: "",
      preco: "",
      catid: "",
      catusu: "",
      foto: null,
      formOn: false,
      anuncios: [],
      usuarioLogado: 0
    }
  },
  methods: {
    mostrarForm(flag) {
      this.formOn = flag;
    },
    onFileChange(event) {
      this.foto = event.target.files[0];
    },
    gravar() {
      const url = 'http://localhost:8080/apis/anuncio/';
      const formData = new FormData();

      formData.append('id', this.id);
      formData.append('titulo', this.titulo);
      formData.append('data', this.data);
      formData.append('descricao', this.descricao);
      formData.append('preco', this.preco);
      formData.append('catid', this.catid);
      formData.append('catusu', this.catusu);

      if (this.foto) {
        formData.append('foto', this.foto);
      }

      axios.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(() => {
        this.carregarDados();
      })
      .catch(error => {
        alert('Erro: ' + error);
      });

      this.mostrarForm(false);
    },
    apagar(id) {
      axios.delete(`http://localhost:8080/apis/anuncio/${id}`)
        .then(() => { this.carregarDados() })
        .catch(error => { alert(error) })
    },
    alterar(id) {
      this.formOn = true;
      axios.get(`http://localhost:8080/apis/anuncio/${id}`)
        .then(result => {
          const anuncio = result.data;
          this.id = anuncio.id;
          this.titulo = anuncio.titulo;
          this.data = anuncio.data;
          this.descricao = anuncio.descricao;
          this.preco = anuncio.preco;
          this.catid = anuncio.catid;
          this.catusu = anuncio.catusu;
        })
        .catch(error => { alert(error) })
    },
    carregarDados() {
      axios.get("http://localhost:8080/apis/anuncio")
        .then(result => { this.anuncios = result.data })
        .catch(error => { alert(error) })
    },
    ordenarTitulo() {
      this.anuncios.sort((a, b) => a.titulo.localeCompare(b.titulo));
    },
    getImageUrl(foto) {
      if (!foto) return '';
      return `http://localhost:8080/uploads/${foto}`;
    }
  },
  mounted() {
    this.carregarDados();
    const user = localStorage.getItem('usuarioLogado');
    this.usuarioLogado = user ? JSON.parse(user) : 0;
  }
}
</script>

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
</style>
