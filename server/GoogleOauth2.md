# Google Oauth2 yordamida autentifikatsiyalash
Todo loyihasida Google login va registratsiyani sozlash.


## 1 - qadam. [Google Developers Console](https://console.developers.google.com/)'da OAuth2 Client ilovasi yaratish 
Agar GDC (Google Developer Console)da proyekt yaratmagan bo'lsangiz yangi proyekt yarating.

Mavjud proyektingiz bo'lsa [APIs & Services](https://console.cloud.google.com/apis) bo'limidagi
[Credentials](https://console.cloud.google.com/apis/credentials)'ga o'ting.
`CREATE CREDENTIALS` -> `Oauth client ID` orqali yangi autorizatsiya ilovasini yaratishga bosing.
`Application type` ga `Web application` ni belgilang. Frontend loyihangizni asosiy url'ini 
	(127.0.0.1:3000 yoki localhost:3000) http yoki https bilan `Authorized JavaScript origins` ga kiriting. 
`Authorized redirect URIs` ga google oauth malumotlarini qabul qilib oladigan `callback` url'ingizni (bu url talablari keyingi qadamda) kiritib `CREATE` ni bosing. `GDC` da Oauth2 ilovangiz yaratildi!

## 2 - qadam. `Callback` url yaratish va talablar
`Google Oauth` brauzerni yo'naltirganda bu redirect url parametrlarida `code` yuboriladi, fontend loyihangiz uni qabul qilib backendga yuborishi kerak.


# Backenddan foydalanish

Ishlash prinspi quidagicha:

Backenddan foydalanuvchi brauzeriga yuboriladigan urlni olib uni Google login tugmasiga biriktiriladi, yoki shu urlga yo'naltiriladi.
Foydalanuvchi accauntini tanlagach brauzer `code` ni callback url orqali frontendga yuboradi.
Frontend esa `code` ni backendga yuboradi va backend foydalanuvchini login qiladi, agar foydalanuvchi avval ro'yhatdan o'tmagan bo'lmasa backend `code` orqali google serverlariga murojaat qilib account ma'lumotlarini avtomatik oladi hamda registratsiya qiladi. Login yoki register bo'lgach responseda backend frontendga foydalanuvchi uchun access_token ni yuboradi.

## Foydalanuvchi brauzeriga yuboriladigan auth urlni olish
`http://127.0.0.1:8000/api/auth/google/login/?redirect_uri={callback_url}` urlga GET metodi orqali request yuborganda responseda foydalanuvchi login qilishni bosganda yo'naltiriladigan url json ichida qaytadi. U foydalanuvchi login yoki register qilmoqchi bo'lsa uning brauzeriga yuboriladi.
*callback_url - 2-qadamga qarang*

## Foydalanuvchi brauzeridan qaytadigan ma'lumotlar
Foydalanuvchi brauzeriga `login_url` yuborilib, u google authga o'tib accountini tanlagach brauzer callback urlga `code` ni yuboradi.
`code` ni frontend qabul qilib `http://127.0.0.1:8000/api/auth/google/login/` urlga post metodi orqali json ko'rinishida yuborishi kerak. Keyin backendda foydalanuvchi autentifikatsiya qilinib jwt `access_token` i qaytariladi.

# Foydalanuvchini farqlash, AUHTENTICATION
ToDo backend jwt autentifikatsiyaga asoslangan. [Batafsil](https://github.com/Jahongir-Qurbonov/TodoAPI/blob/main/JWT-AUTH.md)

[Readme](https://github.com/Jahongir-Qurbonov/TodoAPI/blob/main/README.md)