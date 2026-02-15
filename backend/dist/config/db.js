"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closePool = exports.testConnection = exports.testPgConnection = exports.connectMongo = void 0;
const pg_1 = require("pg");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// ==============================================
// CONFIGURAÇÃO PARA POSTGRES LOCAL (Docker/Compose)
// ==============================================
// Use esta seção para desenvolvimento local com Docker Compose
const localPoolConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    // Para desenvolvimento local, connectionTimeoutMillis pode ser menor
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 30000,
    max: 20, // Conexões máximas no pool
    // SSL não é necessário para localhost
    ssl: false
};
// ==============================================
// CONFIGURAÇÃO PARA NEON (Cloud PostgreSQL)
// ==============================================
// Use esta seção para produção/staging com Neon
const neonPoolConfig = {
    // Usando connection string do Neon (disponível no dashboard)
    connectionString: process.env.NEON_DATABASE_URL,
    // Neon requer SSL
    ssl: {
        rejectUnauthorized: false
    },
    // Configurações otimizadas para cloud
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 60000,
    max: 50, // Neon permite mais conexões simultâneas
    // Keep-alive para conexões persistentes
    keepAlive: true
};
/* =======================
   MONGODB
======================= */
const connectMongo = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mongoURL = process.env.MONGO_URL;
        yield mongoose_1.default.connect(mongoURL);
        console.log('✅ MongoDB conectado');
    }
    catch (error) {
        console.error('❌ Erro ao conectar no MongoDB:', error);
        process.exit(1);
    }
});
exports.connectMongo = connectMongo;
/* =======================
   EXPORTS
======================= */
const testPgConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pool.query('SELECT NOW()');
    return result.rows[0];
});
exports.testPgConnection = testPgConnection;
// ==============================================
// ESCOLHA A CONFIGURAÇÃO DESEJADA
// ==============================================
// OPÇÃO 1: Para PostgreSQL local (comente a linha abaixo para usar Neon)
// const poolConfig = localPoolConfig;
// OPÇÃO 2: Para Neon (descomente a linha abaixo e comente a de cima)
const poolConfig = neonPoolConfig;
// ==============================================
// VALIDAÇÃO DAS VARIÁVEIS DE AMBIENTE
// ==============================================
if (!poolConfig.connectionString) {
    // Validação para configuração local
    const requiredEnvVars = ['DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'];
    for (const envVar of requiredEnvVars) {
        if (!process.env[envVar]) {
            console.warn(`⚠️ Variável de ambiente faltando: ${envVar}`);
            // Não lançamos erro para permitir testes offline
        }
    }
}
// ==============================================
// CRIAÇÃO DO POOL DE CONEXÕES
// ==============================================
const pool = new pg_1.Pool(poolConfig);
// Event listeners para monitoramento
pool.on('connect', () => {
    console.log(`✅ Pool de conexões estabelecido com ${poolConfig.host ? 'PostgreSQL local' : 'Neon'}`);
});
pool.on('error', (err) => {
    console.error('❌ Erro no pool de conexões:', err.message);
    // Não sair do processo em produção, apenas logar o erro
    if (process.env.NODE_ENV === 'development') {
        process.exit(-1);
    }
});
// ==============================================
// FUNÇÕES ÚTEIS
// ==============================================
// Testa a conexão (útil para health checks)
const testConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield pool.connect();
        const result = yield client.query('SELECT NOW() as current_time, version() as version');
        client.release();
        console.log(`✅ Conexão testada com sucesso - ${result.rows[0].current_time}`);
        return {
            success: true,
            timestamp: result.rows[0].current_time,
            version: result.rows[0].version,
            provider: poolConfig.host ? 'PostgreSQL local' : 'Neon'
        };
    }
    catch (error) {
        console.error('❌ Falha ao testar conexão:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            provider: poolConfig.host ? 'PostgreSQL local' : 'Neon'
        };
    }
});
exports.testConnection = testConnection;
// Fecha todas as conexões (útil para shutdown)
const closePool = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield pool.end();
        console.log('✅ Pool de conexões fechado');
    }
    catch (error) {
        console.error('❌ Erro ao fechar pool:', error);
    }
});
exports.closePool = closePool;
exports.default = pool;
/** exemplo de uso:
 * // No seu app.ts
import pool, { testConnection } from './config/db';

// Health check endpoint
app.get('/health/db', async (req, res) => {
  const dbStatus = await testConnection();
  res.json(dbStatus);
});

// No shutdown
process.on('SIGTERM', async () => {
  await closePool();
  process.exit(0);
});
 */ 
