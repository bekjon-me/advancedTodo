# TodoAPI

Todo loyihasi uchun djangoda yozilgan rest api

## Mos keladigan python versiyalari

Python [3.6, 3.7, 3.8, 3.9 va 3.10].
Tavfsiya qilinadigan versiya: 3.10

## Virtual muhitni yaratish

```bash
python -m venv venv
```

## Virtual muhitni aktivlashtirish

Har safar terminalni qayta ochganda virtual muhitni aktivlashtirish kerak

### Linux

```bash
source venv/bin/activate
```

### Windows

cmd.exe

```commandline
venv\Scripts\activate.bat
```

PowerShell

```commandline
venv\Scripts\activate.ps1
```

## O'rnatish

Kerakli paketlarni o'rnatish uchun [pip](https://pip.pypa.io/en/stable/) paket menejeridan  foydalaning.

```bash
pip install -r requirements.txt
```

## Database yaratish va ilovalarni migratsiyalash

```bash
python manage.py migrate
```

## Automatik konfiguratsiyani ishga tushirish

```bash
python manage.py runscript -v3 auto_configure
```

## `Gunicorn` setup

```bash
nano /etc/systemd/system/gunicorn_advancedTodo.socket
```

```ignorelang
[Unit]
Description=advancedTodo gunicorn socket
[Socket]
ListenStream=/run/gunicorn_advancedTodo.sock
[Install]
WantedBy=sockets.target
```

and

```bash
nano /etc/systemd/system/gunicorn_advancedTodo.service
```

```ignorelang
[Unit]
Description=gunicorn daemon
Requires=gunicorn_advancedTodo.socket
After=network.target
[Service]
User=root
Group=www-data
WorkingDirectory=/root/advancedTodo/server
ExecStart=/root/advancedTodo/server/venv/bin/gunicorn \
    --access-logfile -  \
    --workers 3 \
    --bind unix:/run/gunicorn_advancedTodo.sock
    config.wsgi:application
[Install]
WantedBy=multi-user.target
```

and

```bash
# Save and close the file then set proper permission to the Django project directory
$ chown -R www-data:root ~/advancedTodo

# reload systemd daemon
$ systemctl daemon-reload

# start and enable gunicorn_advancedTodo service
$ systemctl start gunicorn_advancedTodo.service
$ systemctl enable gunicorn_advancedTodo.service
# check 
$ systemctl status gunicorn_advancedTodo
```

## `Nginx` setup

```ignorelang
# /etc/nginx/conf.d//advancedTodo.conf
# This configuration will be changed to redirect to HTTPS later
server {
  server_name               server_adress;
  listen                    80;
  location / {
    include proxy_params;
    proxy_pass http://unix:/run/gunicorn_advancedTodo.sock;
  }
}
```

Setup

```bash
$ nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

```bash
sudo systemctl restart nginx
```

## Ishga tushirish

```bash
python manage.py runserver
```

## Default qiymatlar

Admin panelga kirish uchun superuser ma'lumotlari

```text
username = superuser
password = superuser
```

## Google oauth2 ni sozlash

[GoogleOauth2.md](https://github.com/Jahongir-Qurbonov/TodoAPI/blob/main/GoogleOauth2.md) ga qarang
