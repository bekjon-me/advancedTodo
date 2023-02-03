# TodoAPI
Todo loyihasi uchun djangoda yozilgan rest api



## Mos keladigan python versiyalari
Python [3.6, 3.7, 3.8, 3.9 va 3.10].
Tavfsiya qilinadigan versiya: 3.10


## Virtual muhitni yaratish
```bash
$ python -m venv venv
```


## Virtual muhitni aktivlashtirish
Har safar terminalni qayta ochganda virtual muhitni aktivlashtirish kerak

### Linux
```bash
$ source venv/bin/activate
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
$ pip install -r requirements.txt
```


## Database yaratish va ilovalarni migratsiyalash
```bash
$ python manage.py migrate
```


## Automatik konfiguratsiyani ishga tushirish
```bash
$ python manage.py runscript -v3 auto_configure
```


## Ishga tushirish
```bash
$ python manage.py runserver
```

## Default qiymatlar
Admin panelga kirish uchun superuser ma'lumotlari
```text
username = superuser
password = superuser
```

## `Gunicorn` setup
```bash
$ sudo mkdir -pv /var/{log,run}/gunicorn/
mkdir: created directory '/var/log/gunicorn/'
mkdir: created directory '/var/run/gunicorn/'
$ sudo chown -cR user:user /var/{log,run}/gunicorn/
changed ownership of '/var/log/gunicorn/' from root:root to user:user
changed ownership of '/var/run/gunicorn/' from root:root to user:user

# Gunicorn'ni sozlash
$ gunicorn -c config/gunicorn/dev.py
# Ishga tushirish
$ tail -f /var/log/gunicorn/dev.log
```

## `Nginx` setup
```ignorelang
# /etc/nginx/sites-available/advancedTodo

server_tokens               off;
access_log                  /var/log/nginx/supersecure.access.log;
error_log                   /var/log/nginx/supersecure.error.log;

# This configuration will be changed to redirect to HTTPS later
server {
  server_name               server_adress;
  listen                    80;
  location / {
    proxy_pass              http://127.0.0.1:8000;
    proxy_set_header        Host $host;
  }
}
```
Setup
```bash
$ cd /etc/nginx/sites-enabled
$ sudo ln -s ../sites-available/advancedTodo .
$ sudo systemctl restart nginx
```


## Google oauth2 ni sozlash
[GoogleOauth2.md](https://github.com/Jahongir-Qurbonov/TodoAPI/blob/main/GoogleOauth2.md) ga qarang

