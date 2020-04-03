# simple-serverless-proxy
POG to workaround a external service that can only receive requests from our server IP

# Run locally:
  ```npm run local```

# To deploy:
Define these two env variables: SECURITY_GROUP_ID (e.g.:sg-02xxxx)
and SUBNET_IDS as a list of subnets separated by comma (e.g.:subnetxxx,subnetxxy,subnetxyz)
Now run ```npm run deploy```

# How to use:
  Send a request to the API passing your original request after /proxy/http[s]
  `ex:localhost:3000/sandbox/proxy/http[s]/checkip.amazonaws.com`
