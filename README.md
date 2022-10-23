To get started : 

1. clone repo to local
2. create a .env file in the root of your app and place inside the following:

```
MONGODB_CONNECTION_STRING= <redacted>
PORT = 5000
```

3. go into the frontend directory and create a .env file and place inside the following:

```
REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSyCVkG7yj-uoJQSlFcqnl_BkSSULIlmWGis
```

Go to root and run :
```
npm install     
cd frontend
npm install
cd ..
```

Finally, to run locally :
```
npm run dev
```


