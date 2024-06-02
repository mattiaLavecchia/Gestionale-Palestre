# Gestionale Palestra



Questa è un'applicazione per la gestione di una palestra. Consente ai gestori della palestra di tenere traccia dei membri, delle prenotazioni delle lezioni e altro ancora.

## Tecnologie utilizzate
<img src="https://user-images.githubusercontent.com/25181517/192108372-f71d70ac-7ae6-4c0d-8395-51d8870c2ef0.png" width="50">  <img src="https://user-images.githubusercontent.com/25181517/192158954-f88b5814-d510-4564-b285-dff7d6400dad.png" width="50">
<img src="https://user-images.githubusercontent.com/25181517/183898674-75a4a1b1-f960-4ea9-abcb-637170a00a75.png" width="50">
<img src="https://user-images.githubusercontent.com/25181517/189716058-71f74b6f-5936-40b5-92e3-00381e35ccb9.png" width="50">
<img src="https://user-images.githubusercontent.com/25181517/183890595-779a7e64-3f43-4634-bad2-eceef4e80268.png" width="50">
<img src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png" width="50">
<img src="https://user-images.githubusercontent.com/25181517/121401671-49102800-c959-11eb-9f6f-74d49a5e1774.png" width="50">
<img src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" width="50">
<img src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" width="50">
<img src="https://user-images.githubusercontent.com/25181517/182884177-d48a8579-2cd0-447a-b9a6-ffc7cb02560e.png" width="50">


## Installazione

Per installare il gestionale esegui questi passaggi:

1. Clona il repository
2. Entra nelle directory di gym-customer e server-gym
3. Installa tutte le dipende con `npm install` (utilizzare una versione di node.js che va dalla 16 alla 18)

## Configurazioni

> [!IMPORTANT]
> Prima dell'avvio dell'applicazione bisogna fare dei piccoli passaggi:

1. Aprire il file config.env server-gym/config.env
2. Inserire l'indirizzo del proprio DB Mongo nella linea di DATABASE (Si consiglia di aggiungere queste informazioni per creare un database con un nome significativo `fitness?retryWrites=true&w=majority`)
3. Inserire la password dell'account con cui si accede al DB nella linea DATABASE_PASSWORD
4. Inserire un secret per criptare le password nella linea JWT_SECRET
5. Inserire tempo di durata del jwt e del coockie nelle linee JWT_EXPIRES_IN e JWT_COOKIE_EXPIRES_IN

Dovreste avere un risultato simile nel vostro config.env (potete anche eliminare i campi riguardanti l'email):

```
NODE_ENV=development
PORT=3000
DATABASE=mongodb+srv://mat:<password>@fitness.mssaad321kns.mongodb.net/fitness?retryWrites=true&w=majority
USERNAME=mat
DATABASE_PASSWORD=11321312213123123214


JWT_SECRET=la-tua-password
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90
````

## Avvio

Per avviare l'applicazione ora ci basterà eseguire due diversi comandi nelle due diverse direcory:
+ Nella Gym_customer_client utilizziamo `npm run start:mock`
+ Nella server-gym utilizziamo `npm run start`

## Licenza

Questo progetto è concesso in licenza sotto la Licenza MIT. Consulta il file LICENSE per ulteriori informazioni.

## Contatti

Per domande o feedback, contattami all'indirizzo email: mattia.lavecchia05@email.com

