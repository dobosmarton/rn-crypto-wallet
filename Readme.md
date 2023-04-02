# Simple crypto wallet app

The wallet allows users to create ethereum address and use the app as a wallet of the address.

## Getting Started

To get started with the project, please follow the steps below:

1. Clone the repository onto your local machine.
2. Install the dependencies by running `npm install`.
3. Install iOS dependencies by running `cd ios && pod install && cd ...`
4. Start the development server by running `npm start`.
5. For running on Android device, run `npm run android`.
6. For running on iOS device, run `npm run ios`.

Note: You will need to have Xcode or Android Studio installed on your computer in order to run the app on your respective device.

## Environment Variables

The project utilizes environment variables that are stored in a `.env` file in the root directory of the project.

Please follow the steps below to generate the necessary keys for the environment variables:

1. Create a new `.env` file in the root directory of the project.
2. Add the following keys to the `.env` file:

```
ETHEREUM_ENDPOINT=
```

3. To generate the endpoint, use [Infura](https://docs.infura.io/infura/getting-started)
4. Replace the `ETHEREUM_ENDPOINT` value in the `.env` file with the key that you generated.

Note: Do not share your API key with others or commit it to any public repository. Keep it safe and secure.

## Demo

https://user-images.githubusercontent.com/11165169/229310968-e193ba44-b81e-43fa-b09c-5802cf84cc65.mov
