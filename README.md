```mermaid
@startuml MyWordlist Sequence Diagram
  actor User
  participant Client
  entity LocalStorage
  participant GraphQLServer
  database GQLServerDB
  participant AuthServer
  database AuthServerDB

  User --> Client: open app
  Client --> User: render Home screen
  Client --> LocalStorage: getAuthToken()

  group localStorage has an auth token
    LocalStorage --> Client: JWT
    Client --> User: render loading spinner
    Client -> GraphQLServer: JWT in headers, query myWordlist
    GraphQLServer --> GraphQLServer: decode JWT
    
    group JWT expired
      GraphQLServer -> Client: 401
      Client --> User: go to Signin screen
      User --> Client: submit signin form
      Client --> User: render loading spinner
      Client -> AuthServer: /signin
      AuthServer --> AuthServerDB: find User by email/password
      AuthServerDB --> AuthServer: User
      AuthServer --> AuthServer: create JWT containing user_id
      AuthServer -> Client: JWT
      Client --> LocalStorage: storeAuthToken(JWT)
      Client --> User: go to Home screen
      Client --> LocalStorage: getAuthToken()
      LocalStorage --> Client: JWT
      Client --> User: render loading spinner
      Client -> GraphQLServer: JWT in headers, query myWordlist
      GraphQLServer --> GraphQLServer: decode JWT
    end

    GraphQLServer --> GQLServerDB: user_id
    GQLServerDB --> GraphQLServer: data
    GraphQLServer --> GraphQLServer: create JWT containing user_id
    GraphQLServer -> Client: myWordlist data + JWT
    Client --> LocalStorage: storeAuthToken(JWT)
    Client --> User: render user's wordlist
  end
  
  group localStorage has no auth token
    LocalStorage --> Client: null
    Client --> User: go to Signin screen

    group new user
      User --> Client: click signup cta
      Client --> User: go to Signup screen
      User --> Client: submit signup form
      Client --> User: render loading spinner
      Client -> AuthServer: /signup
      AuthServer --> AuthServerDB: create User
      AuthServerDB --> AuthServer: User
      AuthServer --> AuthServer: create JWT containing user_id
      AuthServer -> Client: JWT
      Client --> LocalStorage: storeAuthToken(JWT)
    end

    group existing user on new device
      User --> Client: submit signin form
      Client --> User: render loading spinner
      Client -> AuthServer: /signin
      AuthServer --> AuthServerDB: find User by email/password
      AuthServerDB --> AuthServer: User
      AuthServer --> AuthServer: create JWT containing user_id
      AuthServer -> Client: JWT
      Client --> LocalStorage: storeAuthToken(JWT)
    end

    Client --> User: go to Home screen
    Client --> LocalStorage: getAuthToken()
    LocalStorage --> Client: JWT
    Client --> User: render loading spinner
    Client -> GraphQLServer: JWT in headers, query myWordlist
    GraphQLServer --> GraphQLServer: decode JWT
    GraphQLServer --> GQLServerDB: user_id
    GQLServerDB --> GraphQLServer: data
    GraphQLServer --> GraphQLServer: create JWT containing user_id
    GraphQLServer -> Client: myWordlist data + JWT
    Client --> LocalStorage: storeAuthToken(JWT)
    Client --> User: render user's wordlist
  end

@enduml
```
