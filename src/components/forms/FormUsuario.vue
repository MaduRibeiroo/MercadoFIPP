<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div v-if="formOn">
      <form @submit.prevent="this.gravar()">
        <label for="idusu">Id</label>
        <input type="text" id="idusu" v-model="id" placeholder="ID da Senha..">
        <label for="name">Nome</label>
        <input type="text" id="name" v-model="nome" placeholder="Nome da Senha..">
        <label for="senha">Senha</label>
        <input type="text" id="senha" v-model="senha" placeholder="Senha ..">
        <input type="submit" value="Confirmar">
      </form>
    </div>
    <div style="display: flex; justify-content: flex-end;">
      <button @click="this.mostrarForm(true)">Novo Usuario</button>
    </div>
    <div>
      <table id="customers">
        <thead>
          <tr>
            <th>Id</th>
            <th @click="ordenarNome()">Nome</th>
            <th >Senha</th>
            <th colspan="2">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="usu in this.usuarios">
            <td>{{usu.id}}</td>
            <td>{{usu.nome}}</td>
            <td>{{usu.senha}}</td>
            <td><button @click="this.alterar(usu.id)">Alterar</button></td>
            <td><button @click="this.apagar(usu.id)">Apagar</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FormUsuario',
  props: {
    msg: String
  },
  data(){
    return {id:0, nome:"", senha:"", formOn:false,
    usuarios:[]}
  },
  methods:{
    mostrarForm(flag)
    {
      this.formOn=flag;
    },
    gravar(){
      const url = 'http://localhost:8080/apis/usuario';
      const data = { id: this.id, nome: this.nome, senha: this.senha};
      axios.post(url, data)
      .then(response => {
        this.carregarDados();
      })
      .catch(error => {
        alert('Erro:', error);
      });
      this.mostrarForm(false);
    },
    apagar(id){
      axios.delete("http://localhost:8080/apis/usuario/"+id)
      .then(result=>{this.carregarDados()})
      .catch(error=>{alert(error)})
    },
    alterar(id){
      this.formOn=true;
      axios.get("http://localhost:8080/apis/usuario/"+id)
      .then(result=>{        
        const categoria=result.data;
        this.id=categoria.id;
        this.nome=categoria.nome;
        this.senha=categoria.senha;
      })
      .catch(error=>{alert(error)})

    },
    carregarDados(){
      axios.get("http://localhost:8080/apis/usuario")
      .then(result=>{this.usuarios=result.data})
      .catch(error=>{alert(error)})
    },
    ordenarNome(){
      this.usuarios.sort((a,b)=>a.nome.localeCompare(b.nome));
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
  background-color: blueviolet;
  color: white;
}
</style>