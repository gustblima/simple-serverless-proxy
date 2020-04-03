# simple-serverless-proxy
Simple serverless proxy in development. Created using serverless, you can deploy it on AWS and make requests through it

# Run locally:
  ```npm run local```

# To deploy:
Define these two env variables: SECURITY_GROUP_ID (e.g.:sg-02xxxx)
and SUBNET_IDS as a list of subnets separated by comma (e.g.:subnetxxx,subnetxxy,subnetxyz)
Now run ```npm run deploy```

# How to use:
  Send a request to the API passing your original request after /proxy/http[s]
  `ex:localhost:3000/sandbox/proxy/http[s]/checkip.amazonaws.com`

  Any http method and headers you use you be passed to the url you want to request.
