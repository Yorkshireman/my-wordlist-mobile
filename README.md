# MyWordlist
An app, for learners of English as a second language, to store and organise their english vocabulary through categorisation. They will also be able to save notes on each wordlist entry. Features may also include:

* For a given category, the app will suggest additional words based on other users' wordlist data
* Generate sentences appropriate to their English level
* Share their Wordlist with other users
* Generate pdfs of their Wordlist with desired words filtered out

## Sequence diagram
### Key
* `Client`: The MyWordlist mobile app or other frontend client
* `GraphQLServer`: https://github.com/Yorkshireman/my_wordlist_graphql
* `GQLServerDB`: `my_wordlist_graphql`'s provisioned postgres database
* `AuthServer`: https://github.com/Yorkshireman/authentication-server
* `AuthServerDB`: `authentication-server`'s provisioned postgres database

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
      Client ->> AuthServer: /signin
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
      Client ->> AuthServer: /signin
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
