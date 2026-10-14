import { createApp } from './app.js';
import { connectDB } from './config/db.js';
import { PORT, NODE_ENV } from './config/env.js';

async function main() {
  try {
    await connectDB();
    const app = createApp();
    app.listen(PORT, () => {
      console.log(`✓ LUMIÈRE API listening on http://localhost:${PORT}/api  (${NODE_ENV})`);
    });
  } catch (err) {
    console.error('✗ Server failed to start.');
    process.exit(1);
  }
}

main();
