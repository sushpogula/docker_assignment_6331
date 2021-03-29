
#Docker Integration

## Initially create a client folder and put your react code in that.
- Navigate to the Client folder.
- Create a new file named Dockerfile.
- Place this code inside it:

### #Use a lighter version of Node as a parent image
FROM mhart/alpine-node:8.11.4

### #Set the working directory to /client
WORKDIR /client

### #copy package.json into the container at /client
COPY package*.json /client/

### #install dependencies
RUN npm install

### #Copy the current directory contents into the container at /client
COPY . /client/
### #Make port 3000 available to the world outside this container
EXPOSE 3000

### #Run the app when the container launches
CMD ["npm", "start"]


- This will instruct docker to build an image (using these configurations) for our Client.


# Now create an api folder and put your node code in that

- Navigate to the API folder.
- Create a new file named Dockerfile.
- Place this code inside it:

### #Use a lighter version of Node as a parent image
FROM mhart/alpine-node:8.11.4

### #Set the working directory to /api
WORKDIR /api

### #copy package.json into the container at /api
COPY package*.json /api/

### #install dependencies
RUN npm install

### #Copy the current directory contents into the container at /api
COPY . /api/

### #Make port 80 available to the world outside this container
EXPOSE 80

### #Run the app when the container launches
CMD ["npm", "start"]

- This will instruct docker to build an image (using these configurations) for our API.



## On your App main folder, create a new file and name it docker-compose.yml.
Basically, I’m telling Docker that I want to build a container called client, using the image webapp-client (which is the image we defined on our Client Dockerfile) that will be listening on port 3000. Then, I’m telling it that I want to build a container called api using the image webapp-api(which is the image we defined on our API Dockerfile) that will be listening on port 9000.

### Now in the client folder just run this command : 
```docker build -t webapp-client .```

### And then in the api folder just run this command : 
```docker build -t webapp-api .```


## These commands will make the image in docker and build them.


Now that you have a docker-compose.yml file, let’s build your images. Go to the terminal and on your App’s main directory run:
docker-compose build
Now, to make Docker spin up the containers, just run:
docker-compose up

## Now your application will be hosted in localhost:3000 with frontend, backend and db with a single command.



# Now you need to install kubectl module for kuberneters deploy

## In the client and api folder you need to make a service and deploy file in both of them. And in this service file you need to mention basic specs and metadata with port and apiVersion.
## After creating it on local create it on kubectl by following commands in their respective directories:
In client folder
```kubectl create -f client-app-service.yaml```

In api folder  
```kubectl create -f server-app-service.yaml```


## Now you need to make a deploy file for each. And in this service file you need to mention basic specs and metadata with port and apiVersion.

In client folder
```kubectl create -f client-app-deploy.yaml```

In api folder  
```kubectl create -f server-app-deploy.yaml```

## Now deploy you applocation with the following command:

 ```kubectl scale deploy client-app-deploy --replicas=<count>```

 ```kubectl scale deploy server-app-deploy --replicas=<count>``` 