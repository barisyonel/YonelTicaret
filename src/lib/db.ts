// MSSQL Connection - Vercel optimized
import sql from 'mssql';

const config: sql.config = {
  server: process.env.DB_SERVER || '',
  database: process.env.DB_NAME || '',
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  options: {
    encrypt: true,
    trustServerCertificate: true,
    enableArithAbort: true,
    connectTimeout: 30000, // 30 seconds
    requestTimeout: 30000,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  connectionTimeout: 30000,
};

let pool: sql.ConnectionPool | null = null;

export async function getConnection(): Promise<sql.ConnectionPool> {
  if (!pool) {
    try {
      console.log('🔄 SQL Server\'a bağlanılıyor...');
      console.log('📍 Server:', config.server);
      console.log('📂 Database:', config.database);
      
      pool = await sql.connect(config);
      console.log('✅ SQL Server bağlantısı başarılı!');
    } catch (error) {
      console.error('❌ SQL Server bağlantı hatası:', error);
      console.error('🔍 Config:', {
        server: config.server,
        database: config.database,
        user: config.user,
        hasPassword: !!config.password,
      });
      
      // Connection hatası detayları
      if (error instanceof Error) {
        console.error('📋 Hata mesajı:', error.message);
        
        // Yaygın hatalar için öneriler
        if (error.message.includes('ESOCKET') || error.message.includes('connect')) {
          console.error('💡 Öneri: SQL Server firewall\'unda Vercel IP\'lerini whitelist edin:');
          console.error('   - 76.76.21.0/24');
          console.error('   - 76.76.19.0/24');
        }
      }
      
      throw error;
    }
  }
  return pool;
}

export { sql };

