module.exports = {
    apps: [
        {
            name: 'craft-skills-client',
            cwd: '/var/www/html/craft/skills/client',
            script: 'node_modules/next/dist/bin/next',
            args: 'start -p 5001',
            instances: 1,
            exec_mode: 'fork',
            max_memory_restart: '400M',
            restart_delay: 5000,
            max_restarts: 20,
            env: {
                NODE_ENV: 'production',
            },
            out_file: './logs/out.log',
            error_file: './logs/error.log',
        },
    ],
};
