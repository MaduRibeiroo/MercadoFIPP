<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div v-if="formOn">
      <form @submit.prevent="this.gravar()">
        <label for="idcat">Id</label>
        <input type="text" id="idcat" v-model="id" placeholder="ID da Categoria..">
        <label for="name">Nome</label>
        <input type="text" id="name" v-model="nome" placeholder="Nome da Categoria..">
        <input type="submit" value="Cadastrar">
      </form>
    </div>
    <div style="display: flex; justify-content: flex-end;">
      <button @click="this.mostrarForm(true)">Nova Categoria</button>
    </div>
    <div>
      <table id="customers">
        <thead>
          <tr>
            <th>Id</th>
            <th @click="ordenarNome()">Nome</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cat in this.categorias">
            <td>{{ cat.id }}</td>
            <td>{{ cat.nome }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FormCategoria',
  props: {
    msg: String
  },
  data() {
    return {
      id: 0, nome: "", formOn: false,
      categorias: []
    }
  },
  methods: {
    mostrarForm(flag) {
      this.formOn = flag;
    },
    gravar() {
      const url = 'http://localhost:8080/apis/categoria';
      const data = { id: this.id, nome: this.nome };
      axios.post(url, data)
        .then(response => {
          this.carregarDados();
        })
        .catch(error => {
          alert('Erro:', error);
        });
      this.mostrarForm(false);
    },
    apagar(id) {
      axios.delete("http://localhost:8080/apis/categoria/" + id)
        .then(result => { this.carregarDados() })
        .catch(error => { alert(error) })
    },
    alterar(id) {
      this.formOn = true;
      axios.get("http://localhost:8080/apis/categoria/" + id)
        .then(result => {
          const categoria = result.data;
          this.id = categoria.id;
          this.nome = categoria.nome;
        })
        .catch(error => { alert(error) })

      alert('Alterando ' + id);
    },
    carregarDados() {
      axios.get("http://localhost:8080/apis/categoria")
        .then(result => { this.categorias = result.data })
        .catch(error => { alert(error) })
    },
    ordenarNome() {
      this.categorias.sort((a, b) => a.nome.localeCompare(b.nome));
    }
  },
  mounted() {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (!usuario || usuario.nivel !== 1) {
      alert('Acesso negado! Apenas administradores podem acessar esta página.');
      this.$router.push('/');
    } else {
      this.carregarDados();
    }
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
  background-color: #4CAF50;
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
  background-color: #f2f2f2;
  padding: 20px;
}

#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04AA6D;
  color: white;
}
</style>