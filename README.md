# graphql-and-rest

Small app to demonstrate use of graphql and rest endpoints using `apollo-link-rest`

## To setup

```
$ git clone git@github.com:katebeavis/graphql-and-rest.git && cd graphql-and-rest
$ yarn
$ touch .env
$ echo "GITHUB_TOKEN='YOUR_TOKEN_GOES_HERE'" >> .env
$ yarn dev
```

You will need to add a [Github token](https://developer.github.com/v4/guides/forming-calls/#authenticating-with-graphql) to your `.env` file. `GITHUB_TOKEN='YOUR_TOKEN_GOES_HERE'`

Your app will now be running on http://localhost:8080

## To use

Search for a user via their Github username. Info about them will be displayed via the Github graphQL api. Github status will be displayed via the [GitHub Status API](https://kctbh9vrtdwd.statuspage.io/api/v2) REST endpoint.

![Image of app](https://github.com/katebeavis/graphql-and-rest/blob/master/app_image.png)
