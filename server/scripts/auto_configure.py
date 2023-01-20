"""
run:

    $ python manage.py runscript -v3 auto_configure
"""


# autoset envs
def set_random_generate_secret_key(env):
    try:
        env.str("SECRET_KEY")
    except:
        from django.core.management.utils import get_random_secret_key

        secret_key = get_random_secret_key()
        with open("./.env", "a+") as envfile:
            envfile.write(f"SECRET_KEY='{secret_key}'\n")
            print("Create SECRET_KEY variable in .env")
        env.read_env()

        return secret_key


def set_default_keys(env):
    # ALLOWED_HOSTS
    try:
        env.list("ALLOWED_HOSTS")
    except:
        with open("./.env", "a+") as envfile:
            envfile.write("ALLOWED_HOSTS=localhost,127.0.0.1\n")
            print("Create ALLOWED_HOSTS variable in .env")
        env.read_env()

    # DEBUG
    try:
        env.str("DEBUG")
    except:
        with open("./.env", "a+") as envfile:
            envfile.write("DEBUG=false\n")
            print("Create DEBUG variable in .env")
        env.read_env()


def autoCreateSuperUser():
    from django.contrib.auth.models import User as user_model

    super_users = user_model.objects.filter(is_superuser=True)
    if not super_users:
        super_user = user_model.objects.create_superuser(
            username='superuser', password='superuser')
        if super_user.id:
            print('Successful create default superuser')


def autoCreateDjangoSite(env):
    from django.contrib.sites.models import Site

    sites = Site.objects.all()
    example_site = Site.objects.filter(name='example.com')
    if not sites.exists() or (example_site.exists() and sites.count() == 1):
        new_site = Site.objects.create(
            domain='127.0.0.1:8000', name='127.0.0.1:8000')
        if new_site.id:
            print(f'Saccessful create site -> {new_site.name}')
            try:
                env.int("SITE_ID")
            except:
                with open("./.env", "a+") as envfile:
                    envfile.write(f"SITE_ID={new_site.id}\n")
                    print("Create SITE_ID variable in .env")
                env.read_env()


def auto_configure(env):
    # set_random_generate_secret_key(env)
    set_default_keys(env)
    autoCreateSuperUser()
    autoCreateDjangoSite(env)


def run():
    from config.settings import env

    auto_configure(env)
