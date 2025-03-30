# MyWordlist

An app, for learners of English as a second language, to store and organise their english vocabulary through categorisation. They will also be able to save notes on each wordlist entry. Features may also include:

- For a given category, the app will suggest additional words based on other users' wordlist data
- Generate sentences appropriate to their English level
- Share their Wordlist with other users
- Generate pdfs of their Wordlist with desired words filtered out

## Sequence diagram

### Key

- `Client`: The MyWordlist mobile app or other frontend client
- `GraphQLServer`: https://github.com/Yorkshireman/my_wordlist_graphql
- `GQLServerDB`: `my_wordlist_graphql`'s provisioned postgres database
- `AuthServer`: https://github.com/Yorkshireman/authentication-server
- `AuthServerDB`: `authentication-server`'s provisioned postgres database

```mermaid
sequenceDiagram
  actor User
  participant Client
  participant LocalStorage
  participant GraphQLServer
  participant GQLServerDB
  participant AuthServer
  participant AuthServerDB

  User -->> Client: open app
  Client -->> User: render Home screen
  Client -->> LocalStorage: getAuthToken()

  alt localStorage has an auth token
    LocalStorage -->> Client: JWT
    Client -->> User: render loading spinner
    Client ->> GraphQLServer: JWT in headers, query myWordlist
    GraphQLServer -->> GraphQLServer: decode JWT

    alt JWT expired
      GraphQLServer ->> Client: 401
      Client -->> User: go to Signin screen
      User -->> Client: submit signin form
      Client -->> User: render loading spinner
      Client ->> AuthServer: /api/signin
      AuthServer -->> AuthServerDB: find User by email/password
      AuthServerDB -->> AuthServer: User
      AuthServer -->> AuthServer: create JWT containing user_id
      AuthServer ->> Client: JWT
      Client -->> LocalStorage: storeAuthToken(JWT)
      Client -->> User: go to Home screen
      Client -->> LocalStorage: getAuthToken()
      LocalStorage -->> Client: JWT
      Client -->> User: render loading spinner
      Client ->> GraphQLServer: JWT in headers, query myWordlist
      GraphQLServer -->> GraphQLServer: decode JWT
    end

    GraphQLServer -->> GQLServerDB: user_id
    GQLServerDB -->> GraphQLServer: data
    GraphQLServer -->> GraphQLServer: create JWT containing user_id
    GraphQLServer ->> Client: myWordlist data + JWT
    Client -->> LocalStorage: storeAuthToken(JWT)
    Client -->> User: render user's wordlist
  end

  alt localStorage has no auth token
    LocalStorage -->> Client: null
    Client -->> User: go to Signin screen

    alt new user
      User -->> Client: click signup cta
      Client -->> User: go to Signup screen
      User -->> Client: submit signup form
      Client -->> User: render loading spinner
      Client ->> AuthServer: /signup
      AuthServer -->> AuthServerDB: create User
      AuthServerDB -->> AuthServer: User
      AuthServer -->> AuthServer: create JWT containing user_id
      AuthServer ->> Client: JWT
      Client -->> LocalStorage: storeAuthToken(JWT)
      Client ->> GraphQLServer: myWordlistCreate mutation
      GraphQLServer -->> GraphQLServer: decode JWT
      GraphQLServer -->> GQLServerDB: user_id
      GQLServerDB -->> GQLServerDB: create Wordlist with user_id
      GQLServerDB -->> GraphQLServer: data
      GraphQLServer -->> GraphQLServer: create JWT containing user_id
      GraphQLServer ->> Client: myWordlist data + JWT
      Note right of Client: store is reset with client.resetStore(), so active queries are refetched with new auth token
    end

    alt existing user on new device
      User -->> Client: submit signin form
      Client -->> User: render loading spinner
      Client ->> AuthServer: /api/signin
      AuthServer -->> AuthServerDB: find User by email/password
      AuthServerDB -->> AuthServer: User
      AuthServer -->> AuthServer: create JWT containing user_id
      AuthServer ->> Client: JWT
      Client -->> LocalStorage: storeAuthToken(JWT)
    end

    Client -->> User: go to Home screen
    Client -->> LocalStorage: getAuthToken()
    LocalStorage -->> Client: JWT
    Client -->> User: render loading spinner
    Note right of Client: this query may be resolved from apollo cache instead
    Client ->> GraphQLServer: JWT in headers, query myWordlist
    GraphQLServer -->> GraphQLServer: decode JWT
    GraphQLServer -->> GQLServerDB: user_id
    GQLServerDB -->> GraphQLServer: data
    GraphQLServer -->> GraphQLServer: create JWT containing user_id
    GraphQLServer ->> Client: myWordlist data + JWT
    Client -->> LocalStorage: storeAuthToken(JWT)
    Client -->> User: render user's Wordlist
  end
```

## To run whole stack locally

- Run `authentication-server` on port `3001` (`r s -p 3001`)
- Run `my_wordlist_graphql` on port `3000` (`r s -p 3000`)

## For Web

`.env.development`:

```
MY_WORDLIST_GRAPHQL_URL=http://localhost:3000/graphql
RESET_PASSWORD_URL=http://localhost:3001/api/reset-password
SIGN_IN_URL=http://localhost:3001/api/signin
SIGN_UP_URL=http://localhost:3001/api/signup
```

- `RCT_METRO_PORT=<port> npm run web`
- Navigate to `http://localhost:<port>`

NB setting this env var isn't strictly necessary, but the default port will be `8081` which is a common port number and so may clash.

### For iOS Simulator

`.env.development`:

```
MY_WORDLIST_GRAPHQL_URL=http://localhost:3000/graphql
RESET_PASSWORD_URL=http://localhost:3001/api/reset-password
SIGN_IN_URL=http://localhost:3001/api/signin
SIGN_UP_URL=http://localhost:3001/api/signup
```

- Run `authentication-server` with `r s -p 3001`
- Run `my_wordlist_graphql` with `r s`
- `npm run ios`

### For Android Simulator

Hardcode the following values into the code instead of relying on the values being pulled from `.env.development`:
`MY_WORDLIST_GRAPHQL_URL`: `'http://10.0.2.2:3000/graphql'`
`RESET_PASSWORD_URL`: `http://10.0.2.2:3001/api/reset-password`
`SIGN_IN_URL`: `'http://10.0.2.2:3001/api/signin'`
`SIGN_UP_URL`: `'http://10.0.2.2:3001/api/signup'`

- Run `authentication-server` with `r s -p 3001`
- Run `my_wordlist_graphql` with `r s`
- `npm run android`

It's currently a mystery as to why it works this way and not from relying on the `.env.development` file with exactly the same values.

## Building a downloadable APK to install on Android devices

### Install the EAS CLI

`nvm use; npm install -g eas-cli`

Check you're logged in with `eas whoami`

### Provide configuration for EAS

- Add `eas.json` to `.gitignore`
- Create an `eas.json` file at root level

```
{
  "build": {
    "staging-internal": {
      "android": {
        "buildType": "apk",
        "env": {
          "MY_WORDLIST_GRAPHQL_URL": <url>,
          "RESET_PASSWORD_URL": <url>,
          "SIGN_IN_URL": <url>,
          "SIGN_UP_URL": <url>
        }
      }
    },
    "staging": {
      "env": {
        "MY_WORDLIST_GRAPHQL_URL": <url>,
        "RESET_PASSWORD_URL": <url>,
        "SIGN_IN_URL": <url>,
        "SIGN_UP_URL": <url>
      }
    }
  }
}
```

NB strictly speaking, only the `staging-internal` part is needed for this specific task

`eas build -p android --profile staging-internal`

This will build remotely and, when completed, provide an apk download url in the terminal.

## Troubleshooting

If environment variable value changes do not appear to be respected after restarting the server, try `npx expo start -c` - this clears the Metro bundler cache and rebuilds the app.
