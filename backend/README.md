# This is setup for django, which ccan parse data from json file and save it to database and elastic search
## 1. Install docker and docker-compose
[Docker installation](https://docs.docker.com/desktop/install/linux-install/)
[Docker Compose Installation](https://docs.docker.com/compose/install/linux/)

- fix docker low memory issue
```bash
$ sudo sysctl -w vm.max_map_count=262144
```
[Docker low memory issue for max](mac je tu https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html#docker-prod-prerequisites)
## 2. Clone repository
```bash
$ git clone git@github.com:marosstudenic/whys-hiring-task.git
$ cd whys-hiring-task
```
## 3. Create and install python virtualenv and install requirements
```bash
# create virtualenv
$ python3 -m venv .venv
# activate virtualenv
$ source .venv/bin/activate
# install requirements
$ pip install -r requirements.txt
```
## 4. Run docker-compose
```bash
$ docker-compose up
```
- this might take a while, because of the elasticsearch image
## 5. Run migrations and create elastic search index
```bash
# run migrations
$ python manage.py migrate
# create elastic search index
$ python manage.py search_index --rebuild
```

## 6. Run server
```bash
$ python manage.py runserver
```

## 7. (optional) Run tests
```bash
$ python manage.py test
```

## 8. (optional) Create superuser
```bash
$ python manage.py createsuperuser
```

# Usage 

- **[POST]** /import - tento endpoint bude příjímat data a parsovat data
- **[GET]** /detail/<nazev modelu> - seznam záznamů na základě názvu modelu
- **[GET]** /detail/<nazev modelu>/<id> - všechna data ke konkrétnímu záznamu

## Features:

- pri jednotlivých endpointech je mozne filtrovat data
/detail/<nazev modelu>?nazev=Barva  <nazov kluca z objektu>=<jeho hodnota>
- podobne aj pri /detail/<nazev modelu>/<id>?nazev=Barva
- Pri endpointe /detail/<nazev modelu>/<id> moze byt viacero zaznamov, pretoze sa uklada kazdy <nazov modelu>, ak ked uz rovnaky <nazov modelu> s <id> existuje

response has following format:
```json
[
   {
        "name": "<<nazev Modelu>>",
        "content": {
            "<<hodnota Modelu>>"
        },
        "created": "2023-02-16T01:05:48.860880Z",
        "last_updated": "2023-02-16T01:05:48.860845Z"
    },
    {
        "name": "AttributeName",
        "content": {
            "id": 1,
            "zobrazit": true
        },
        "created": "2023-02-16T00:58:59.316372Z",
        "last_updated": "2023-02-16T00:58:59.316357Z"
    },
    {
        "name": "AttributeName",
        "content": {
            "id": 1,
            "nazev": "Barva"
        },
        "created": "2023-02-16T01:05:48.045020Z",
        "last_updated": "2023-02-16T01:05:48.045003Z"
    }
]
```

