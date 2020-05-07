## Run

```
$ pm2 start
```

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
$ pm2 restart all
```
