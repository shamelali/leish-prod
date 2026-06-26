import { config } from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, '../.env.local') });

import { sendEmail } from '../src/lib/email/brevo';

async function main() {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error('❌ BREVO_API_KEY is not set in .env.local');
    process.exit(1);
  }

  console.log(`✓ BREVO_API_KEY found (${apiKey.substring(0, 12)}...)`);

  const fromEmail = process.env.FROM_EMAIL || 'hello@leish.my';
  const fromName = process.env.FROM_NAME || 'Leish';
  console.log(`✓ FROM: ${fromName} <${fromEmail}>`);

  const testTo = process.env.TEST_EMAIL_TO;
  if (!testTo) {
    console.log('\nℹ  Set TEST_EMAIL_TO in .env.local to send a test email.');
    console.log('   Example: TEST_EMAIL_TO=you@example.com\n');
    console.log('✓ Configuration looks valid (dry-run, no email sent)');
    return;
  }

  console.log(`\nSending test email to ${testTo}...`);

  const result = await sendEmail({
    to: testTo,
    subject: 'Leish! – Test Email from Check Script',
    html: '<h2>Test Email</h2><p>This is a test email from the Leish! project email setup.</p>',
    text: 'Test Email\n\nThis is a test email from the Leish! project email setup.',
  });

  if (result.success) {
    console.log('✅ Test email sent successfully');
  } else {
    console.error('❌ Failed to send test email:', result.error);
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
