import axios from 'axios';

const API_URL = 'http://localhost:3333/api';

async function testAPI() {
  console.log('🧪 Testando API do Auto Peças\n');
  
  // Testar login
  try {
    console.log('1. Testando login...');
    const login = await axios.post(`${API_URL}/auth/login`, {
      usuario: 'admin',
      senha: '123456'
    });
    
    console.log('✅ Login bem-sucedido!');
    console.log('   Token:', login.data.token.substring(0, 50) + '...');
    console.log('   Usuário:', login.data.usuario.nome);
    
    const token = login.data.token;
    
    // Testar listar usuários
    console.log('\n2. Testando listagem de usuários...');
    const usuarios = await axios.get(`${API_URL}/usuarios`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('✅ Usuários carregados:', usuarios.data.length);
    usuarios.data.forEach(u => {
      console.log(`   - ${u.nome} (${u.usuario}) - ${u.nivel}`);
    });
    
    console.log('\n🎉 Todos os testes passaram!');
    
  } catch (error) {
    console.error('❌ Erro:', error.response?.data || error.message);
  }
}

testAPI();