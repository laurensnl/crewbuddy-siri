## Run

```
$ pm2 start
```

## Run locally

```
$ yarn start
```

In a browser, go to http://localhost:4040/standby?code=LWA&role=FOJ&base=RTM&day=today.

## Update the list of Airport Codes

```
1. Download the list from https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat
2. Store the list in /node_modules/airport-codes/
3. $ node /node_modules/airport-codes/convert.js
```

## Update server on Raspberry pi

### On Mac

```
Commit changes to master branch
```

### On Raspberry Pi

```
$ cd ~/crewbuddy-siri
$ git pull

Server will restart automatically
```
