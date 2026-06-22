module.exports = {
  apps: [{
    name: 'skills-client',
    script: 'node_modules/.bin/next',
    args: 'start -p 5001',
    cwd: '/var/www/html/craft/skills/client',
    env: {
      NODE_ENV: 'production'
    }
  }]
};