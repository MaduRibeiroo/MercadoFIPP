<template>
  <div class="dashboard-container">
    <!-- Decorações -->

    <!-- Cartão principal -->
    <div class="dashboard-card">
      <h2>Tela de Administrador</h2>
      <p class="subtitle">Gerencie as opções administrativas do sistema</p>
      <hr />

      <router-link to="/form-categoria/Categorias" class="dashboard-button">
        <i class="fas fa-folder"></i>
        <span>Manutenção de Categoria</span>
      </router-link>

      <router-link to="/form-usuario/Usuario" class="dashboard-button">
        <i class="fas fa-user"></i>
        <span>Excluir Usuário</span>
      </router-link>

      <router-link to="/form-anuncio/Anuncio" class="dashboard-button">
        <i class="fas fa-ad"></i>
        <span>Excluir Anúncio</span>
      </router-link>
      <br>
      <button class="logout-button" @click="logout">
        <i class="fas fa-sign-out-alt"></i>
        <span>Sair</span>
      </button>

    </div>
  </div>
</template>


<script>
export default {
  name: 'TelaADM',
  data() {
    return {
      usuario: { nome: '', nivel: '' }
    }
  },
  mounted() {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  
  if (!usuario || usuario.nivel !== 1) {
    // Redireciona para a tela inicial caso o usuário não seja admin
    this.$router.push('/');
  } else {
    this.usuario = usuario;
  }
}
,
  methods: {
    logout() {
      localStorage.removeItem('usuarioLogado');
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

.dashboard-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
}

.dashboard-card {
  background: white;
  padding: 48px 36px;
  border-radius: 20px;
  width: 100%;
  max-width: 480px;
  text-align: center;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.25);
}

h2 {
  color: #0070f3;
  font-size: 30px;
  margin-bottom: 5px;
}

.subtitle {
  color: #7f9eb2;
  margin-bottom: 25px;
  font-size: 14px;
}

hr {
  border: none;
  border-top: 1px solid #cfe3f0;
  margin-bottom: 30px;
}

.dashboard-button {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  background-color: #0070f3;
  color: white;
  padding: 14px 18px;
  margin-bottom: 16px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 500;
  font-size: 15px;
  transition: background 0.3s ease, transform 0.1s ease;
  box-shadow: 0 4px 8px rgba(0, 112, 243, 0.2);
}

.dashboard-button:hover {
  background-color: #005bb5;
  transform: translateY(-1px);
}

.logout-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 12px 0;
  margin-top: 10px;
  border: none;
  background-color: #f44336;
  color: white;
  border-radius: 10px;
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(244, 67, 54, 0.2);
  transition: background 0.3s ease, transform 0.1s ease;
}

.logout-button:hover {
  background-color: #d32f2f;
  transform: translateY(-1px);
}

.footer {
  font-size: 13px;
  color: #9baec8;
  margin-top: 25px;
}

.decor-image {
  position: absolute;
  width: 120px;
  z-index: 7;
}

.decor-top-left {
  top: 20px;
  left: 20px;
}

.decor-bottom-right {
  bottom: 20px;
  right: 20px;
}

</style>
