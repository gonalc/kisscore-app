# Kisscore App

To run it in your phone you'll need to download the Expo Go app.

- [Doanload it for Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=es_PY)

- [Download it for Apple](https://apps.apple.com/us/app/expo-go/id982107779)

## Run the app

In order to run the app you'll need to accomplish the following requirements:

- Run the API.

- You will need to change the `src/api/apiService.ts` file. There is stored the local IP address and you will need to add yours. So far it's hardcoded but would be good to store it into an environment file so each one can have it's own.

    - In order to check your IP address you can run `ifconfig | grep 192`, the printed IP address is yours.

- Install the dependencies:

```sh
# NPM
npm install

# Yarn
yarn install
```

- Run the Expo server:

```sh
# NPM
npm start

# Yarn
yarn start
```

- That command will show a QR code on screen -- console -- that you can scan with your Expo Go app.
