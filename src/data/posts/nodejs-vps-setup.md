---
title: How to deploy a Node.js app to a VPS
published: 2025-04-13
updated:
description: A step by step guide for beginners
---

## Introduction

Deploying a Node.js app to a Virtual Private Server (VPS) gives you full control, nearly 100% uptime, and the freedom to host your own database or backend logic — all without relying on third-party platforms like Vercel or Heroku.

This guide is aimed at beginners to Linux and VPS. It assumes you have a Node.js app hosted on GitHub and want to get it running on your own VPS.

### Prerequisites

- Basic understanding of the terminal
- A Node.js app hosted on GitHub
- A local development machine (Mac/Linux/WSL\*)

\*WSL = Windows Subsystem for Linux

## 1. Generate SSH Keys

SSH keys are a pair of cryptographic keys (a public key and a private key) used to securely authenticate and establish a connection between your local machine and a remote server, such as your VPS. The public key is shared with the server, while the private key remains on your local machine. This ensures that only someone with the private key can access the server, making it a secure alternative to passwords.

We use SSH keys to securely connect to the VPS without needing to enter a password every time. This not only improves security but also simplifies the process of accessing the server and interacting with services like GitHub.

To generate SSH keys on your local machine (if you haven't already), run the following command:

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

This will create a new SSH key pair. You'll be prompted to specify a file location to save the key (you may keep the default) and set a passphrase for added security. You may leave the passphrase empty.

## 2. Choose a VPS Provider

A VPS is a virtual machine that gives you full control over your hosting environment. Unlike shared hosting or platform-as-a-service (PaaS) solutions like Vercel or Heroku, a VPS allows you to configure the server exactly how you need it, making it ideal for hosting custom applications, databases, or backend services.

### What to Look for in a VPS Provider

When choosing a VPS provider, consider the following factors:

- **Reliability**: Look for a provider with a strong uptime guarantee (e.g., 99.9% or higher).
- **Ease of Use**: Some providers offer user-friendly dashboards for managing your server.
- **Pricing**: VPS plans typically start at $5–$10/month for basic configurations.
- **Scalability**: Ensure the provider allows you to upgrade resources (CPU, RAM, storage) as your app grows.

### Selection of VPS Providers

Here are some options for VPS providers:

- [Infomaniak](https://www.infomaniak.com/)
- [Linode](https://www.linode.com/)
- [DigitalOcean](https://www.digitalocean.com/)
- [Vultr](https://www.vultr.com/)
- [Hetzner](https://www.hetzner.com/)

### Setting Up Your VPS

Once you've chosen a provider, follow these steps to set up your server:

1. **Create a New Server Instance**:  
   Log in to your VPS provider's dashboard and create a new server. During setup, you'll be asked to choose an operating system. Select **Ubuntu LTS** (e.g., Ubuntu 24.04 LTS) for stability and long-term support.

2. **Add Your Public SSH Key**:  
   During the setup process, you'll have the option to add an SSH key. Copy the **public** key you generated earlier (from `~/.ssh/id_ed25519.pub`) and paste it into the provided field. This allows you to securely log in to your server without using a password.

3. **Choose Server Specifications**:  
   For most small to medium-sized Node.js apps, a basic VPS with 1 CPU, 1GB RAM, and 25GB storage is sufficient. You can always upgrade later if needed.

4. **Launch the Server**:  
   Once the setup is complete, your VPS provider will assign an IP address to your server (e.g., `1.2.3.4`). Make a note of this IP address, as you'll use it to connect to your server in the next step.

## 3. SSH Into Your VPS

To make connecting to your VPS easier, you can create an SSH configuration file on your local machine. This allows you to use a simple alias instead of typing the full IP address and other details every time.

On your local machine, open the SSH config file for editing (or create it if it doesn't exist):

```bash
nano ~/.ssh/config
```

Add the following entry to the file:

```
Host yourserver
    HostName 1.2.3.4
    User ubuntu
    IdentityFile ~/.ssh/id_ed25519
```

- **Host**: This is the alias you'll use to connect (e.g., `yourserver`).
- **HostName**: Replace this with your VPS's IP address.
- **User**: The default username for most VPS setups is `ubuntu` (or `root` for some providers).
- **IdentityFile**: This points to the private SSH key you generated earlier.

Save and close the file.

Now that you've set up the config file, connecting to your VPS is as simple as running:

```bash
ssh yourserver
```

The first time you connect, you'll see a prompt asking you to confirm the server's authenticity:

```
The authenticity of host '1.2.3.4 (1.2.3.4)' can't be established.
ED25519 key fingerprint is SHA256:...
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

Type `yes` and press Enter. This will add the server to your list of known hosts, so you won't see this prompt again for future connections.

Once connected, you'll see a welcome message like this:

```
Welcome to Ubuntu 24.04.2 LTS (GNU/Linux ...)
```

## 4. Updating Of Packages

Once connected to your VPS, the first step is to ensure that your system is up to date. This involves updating the package lists and upgrading any outdated software packages.

Run the following command:

```bash
sudo apt update && sudo apt upgrade
```

- `sudo` stands for "superuser do." It allows you to run commands with elevated privileges (administrator-level access). Many system-level tasks, such as installing or updating software, require these privileges. Without `sudo`, you would not have the necessary permissions to make changes to the system.
- `apt` (Advanced Package Tool) is a package manager for Debian-based Linux distributions, such as Ubuntu. It simplifies the process of installing, updating, and managing software on your server. With `apt`, you can easily fetch software from official repositories and keep your system up to date.
- `apt update` updates the package lists on your system. It fetches the latest information about available software and their versions from the repositories. However, it does not install or upgrade any software.
- `apt upgrade` upgrades all installed packages to their latest versions based on the updated package lists. It ensures that your system is running the most recent versions of the software.

In short, `update` refreshes the list of available updates, while `upgrade` actually applies those updates.

It's a good practice to run `sudo apt update && sudo apt upgrade` regularly to keep your system secure and stable.

## 5. Install Node.js (using nvm)

To run your Node.js app on the VPS, you'll need to install Node.js. Using **Node Version Manager (nvm)** is an easy way to manage Node.js versions, as it allows you to install, switch, and update versions effortlessly. This is particularly useful if you're hosting multiple apps that require different Node.js versions or if you need to upgrade Node.js in the future without affecting your existing setup.

Run the following commands to install `nvm` and the latest LTS version of Node.js:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash

. "$HOME/.nvm/nvm.sh"

nvm install --lts
```

Verify the installation:

```bash
node -v
```

### Optional: Install `pnpm`

If you prefer a faster and more efficient package manager, you can install `pnpm`:

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

After installation, reconnect to your VPS or run `source ~/.bashrc` to ensure `pnpm` is available in your shell.

## 6. Add SSH Key for GitHub (on the VPS)

To clone private repositories from GitHub directly onto your VPS, you need to authenticate your VPS with GitHub using an SSH key. This ensures secure and passwordless access to your repositories.

1. Run the following command on your VPS to generate a new SSH key pair:

    ```bash
    ssh-keygen -t ed25519 -C "your_email@example.com"
    ```

    This is the same process as in Step 1, where we generated a key on our local machine.

2. Once the key is generated, display the public key with:

    ```bash
    cat ~/.ssh/id_ed25519.pub
    ```

    This will output the public key, which looks something like this:

    ```
    ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAA... your_email@example.com
    ```

3. Copy the entire output of the `cat` command and add it to your GitHub account:

    - Go to [GitHub SSH Key Settings](https://github.com/settings/keys).
    - Click **"New SSH Key"**.
    - Paste the public key into the "Key" field.
    - Add a descriptive title.
    - Click **"Add SSH Key"**.

4. Verify that your VPS can connect to GitHub using the SSH key:

    ```bash
    ssh -T git@github.com
    ```

    If everything is set up correctly, you'll see a message like this:

    ```
    Hi yourusername! You've successfully authenticated, but GitHub does not provide shell access.
    ```

## 7. Clone and Run Your App

Now that your VPS is set up and authenticated with GitHub, you can clone your Node.js app and run it.

1. Organize your VPS by creating a directory for your applications:

    ```bash
    mkdir apps && cd apps
    ```

2. Use the SSH URL of your GitHub repository to clone it onto your VPS:

    ```bash
    git clone git@github.com:yourusername/your-repo.git
    cd your-repo
    ```

3. Install the required Node.js dependencies for your app:

    ```bash
    pnpm i
    ```

    If you're using `npm` instead of `pnpm`, replace the command with `npm install`.

4. Run your app to ensure it works:

    ```bash
    pnpm start
    ```

    Test it by sending a request to your app:

    ```bash
    curl http://localhost:3000
    ```

    Replace `3000` with the port your app is configured to use. If everything is working, you should see the expected response.

5. Stop the app by pressing `Ctrl + C`.

## 8. Keep Your App Running with PM2

By default, your app will stop running when you close the terminal or disconnect from the VPS. To keep it running in the background, use **PM2**, a process manager for Node.js.

1. Install PM2 globally using your package manager:

    ```bash
    pnpm i -g pm2
    ```

    If you're using `npm`, use `npm i -g pm2`.

2. Use PM2 to start your app:

    ```bash
    pm2 start "pnpm start" --name "your-app-name"
    ```

    Replace `"pnpm start"` with the appropriate start command for your app.

3. To make sure your app restarts automatically when the VPS reboots, run:

    ```bash
    pm2 save
    pm2 startup
    ```

    The last command asks you to copy/paste a certain command.

PM2 provides several useful commands for managing your app:

- `pm2 list` lists all processes.
- `pm2 restart your-app-name` restarts the process.
- `pm2 stop your-app-name` stops the process.
- `pm2 delete your-app-name` deletes the process from PM2.

You may also refer to a process by its ID. For example, if `your-app-name` was assigned the ID `0`, you can restart it with `pm2 restart 0`.

## 9. Set Up NGINX as a Reverse Proxy

To make your app accessible via a browser, you'll set up **NGINX** as a reverse proxy. This will forward requests from port 80 (HTTP) to your app running on port 3000 (or another port).

1. Install NGINX on your VPS:

    ```bash
    sudo apt install nginx
    ```

2. Navigate to the NGINX configuration directory and create a new file for your app:

    ```bash
    cd /etc/nginx/sites-available
    sudo nano your-app-name
    ```

    Add the following configuration (adjust the IP address and port as needed):

    ```
    server {
        listen 80;
        server_name your-domain.com; # Replace with your domain or VPS IP

        location / {
            proxy_pass http://localhost:3000; # Replace with your app's port
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
    ```

3. Add a symlink of the configuration file to the `sites-enabled` directory:

    ```bash
    sudo ln -s /etc/nginx/sites-available/your-app-name /etc/nginx/sites-enabled/
    sudo systemctl restart nginx
    ```

4. Ensure your VPS firewall allows traffic on port 80:

    ```bash
    sudo ufw allow 'Nginx Full'
    ```

5. Visit your VPS IP or domain in a browser. You should see your app running! 🎉

## 10. Use a Custom Domain

To make your app accessible via a custom domain, follow these steps:

1. Log in to your domain registrar's dashboard and add an **A record** pointing to your VPS IP address. For example:

    ```
    Type: A
    Name: @
    Value: 1.2.3.4
    ```

    Replace `1.2.3.4` with your VPS IP. Notice that DNS propagation can take up to 48 hours.

2. Edit your NGINX configuration file to use your domain:

    ```bash
    sudo nano /etc/nginx/sites-available/your-app-name
    ```

    In that file, replace `server_name your-domain.com;` with your actual domain (e.g., `app.example.com`).

3. Apply the changes by restarting NGINX:

    ```bash
    sudo systemctl restart nginx
    ```

4. Visit your domain in a browser. Your app should now be accessible via your custom domain. If it doesn't work, it may be because DNS propagation has not yet completed.

## 11. Enable HTTPS with Certbot

To secure your app with HTTPS, use **Certbot** to obtain and install an SSL certificate.

1. In the VPS, install Certbot and the NGINX plugin:

    ```bash
    sudo apt install certbot python3-certbot-nginx
    ```

2. Run Certbot to automatically configure HTTPS for your domain:

    ```bash
    sudo certbot --nginx -d your-domain.com
    ```

    Replace `your-domain.com` with your actual domain.

3. Visit your domain in a browser using `https://`. You should see the secure padlock icon.

4. Certbot automatically renews certificates, but you can test the renewal process with:

    ```bash
    sudo certbot renew --dry-run
    ```

## 12. Bonus: Deploy SvelteKit Apps

The approach outlined in this blog post can also be used to host [SvelteKit apps](https://svelte.dev) via the [Node adapter](https://svelte.dev/docs/kit/adapter-node).

1. Add the Node adapter to your project:

    ```bash
    pnpm add -D @sveltejs/adapter-node
    ```

2. Configure the adapter in your SvelteKit project:

    ```javascript
    import adapter from '@sveltejs/adapter-node'

    export default {
    	kit: {
    		adapter: adapter(),
    	},
    }
    ```

3. In the `package.json`, add the start command pointing to the built Node application:

    ```json
    "start": "node build/server.js"
    ```

4. Build your app:

    ```bash
    pnpm build
    ```

5. Restart the PM2 process.
    ```bash
    pm2 restart your-app-name
    ```

## Reduction of Database Latency

One of my main motivations for exploring a VPS was to test the performance difference between:

1. A SvelteKit application with a SQLite database hosted in the cloud (specifically using [Turso](https://turso.tech)).
2. A SvelteKit application with a SQLite file stored directly on the server.

Note that option 2 is not possible on serverless platforms like Vercel or Netlify, as they don't support persistent file storage. A VPS, however, allows you to simply add a SQLite database as a file to your server.

I set up a tiny application using a basic database and a query that retrieves all items from a table and displays them on a page.

**Results:** The self-hosted database was approximately 30 times faster. On average, the query took about 4ms to complete on the VPS, compared to around 140ms on the cloud-hosted database.

This is not surprising at all since the self-hosted database requires no network request to fetch the data.

## Conclusion

The length of this blog post might seem intimidating, but once you've gone through the setup a couple of times, the process becomes straightforward. Here's a very high-level summary:

1. Connect to your VPS using SSH.
2. Install Node.js and clone your repository.
3. Use PM2 to create a permanent process for your app.
4. Install and configure NGINX to route traffic to your app.
