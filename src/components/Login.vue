<template>
  <!-- Bootstrap core CSS -->
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0/css/bootstrap.min.css"
    rel="stylesheet"
  />

  <!-- MDB UI Kit CSS -->
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.4.2/mdb.min.css"
    rel="stylesheet"
  />

  <!-- Font Awesome para ícones -->
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    rel="stylesheet"
  />

  <div class="page gradient-bg">
    <section class="vh-100">
      <div class="container py-5 h-100">
        <div class="row d-flex align-items-center justify-content-center h-100">
          <div class="col-md-8 col-lg-7 col-xl-6 mb-4 mb-lg-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              class="img-fluid"
              alt="Phone image"
            />
          </div>

          <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <div class="form-card">
              <form @submit.prevent="login">
                <!-- Nome input -->
                <div class="mb-3">
                  <label for="inputNome" class="form-label">Nome</label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputNome"
                    v-model="nome"
                    placeholder="Digite seu nome"
                  />
                </div>

                <!-- Senha input -->
                <div class="mb-3">
                  <label for="inputSenha" class="form-label">Senha</label>
                  <input
                    type="password"
                    class="form-control"
                    id="inputSenha"
                    v-model="senha"
                    placeholder="Digite sua senha"
                  />
                </div>

                <div class="d-flex justify-content-between align-items-center mb-3">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="rememberCheck"
                      checked
                    />
                    <label class="form-check-label" for="rememberCheck">
                      Remember me
                    </label>
                  </div>
                  <a href="#!">Esqueceu a senha?</a>
                </div>

                <button type="submit" class="btn btn-primary btn-lg btn-block">
                  Sign in
                </button>

                <div v-if="erro" class="text-danger mt-3">{{ erro }}</div>

                <div class="divider d-flex align-items-center my-4">
                  <p class="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                </div>

                <a
                  class="btn btn-primary btn-lg btn-block mb-2"
                  style="background-color: #3b5998"
                  href="#!"
                  role="button"
                >
                  <i class="fab fa-facebook-f me-2"></i>Continuar com Facebook
                </a>
                <a
                  class="btn btn-primary btn-lg btn-block"
                  style="background-color: #55acee"
                  href="#!"
                  role="button"
                >
                  <i class="fab fa-twitter me-2"></i>Continuar com Twitter
                </a>
              </form>

            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data() {
    return {
      nome: '',
      senha: '',
      erro: ''
    }
  },
  methods: {
    login() {
      axios.get('http://localhost:8080/apis/usuario')
        .then(resp => {
          const usuarios = resp.data;
          const usuario = usuarios.find(u => u.nome === this.nome && u.senha === this.senha);
          if (usuario) {
            localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
            this.$router.push('/tela-adm/' + usuario.nome);
          } else {
            this.erro = 'Usuário ou senha inválidos.';
          }
        })
        .catch(() => this.erro = 'Erro ao conectar ao servidor.');
    }
  }
}
</script>

<style scoped>
.gradient-bg {
  background: linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1));
}

.form-card {
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.divider:after,
.divider:before {
content: "";
flex: 1;
height: 1px;
background: #eee;
}
</style>

