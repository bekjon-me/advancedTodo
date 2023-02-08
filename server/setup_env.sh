

activate(){
  source venv/bin/activate # activete python env
  if [ -n "$VIRTUAL_ENV" ]; then
    echo "==> Activated environment"
  else
    echo "===> Error activating"
  fi
  echo "==> Installing requirements to virtual environment"
  pip install -r requirements.txt
}

if [ -f ./manage.py ]; then
    if [ ! -f ./venv/bin/activate ]; then
      echo "==> Create python environment"
      python -m venv venv
    fi
    activate
fi

configure(){
  source venv/bin/activate
  python manage.py migrate
  python manage.py runscript -v3 auto_configure
}
configure
