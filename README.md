# Authress Starter Kit: React

A repository that contains an React example that uses Authress to Login.

## Getting Started

Run `yarn` and then `yarn start`. Or use pnpm to install dependencies and then `start` the site.

### File Directory

* `src`
  * `main.tsx` - Application Root and contains all the routes of the starter kit application
  * `authressClient.tsx` - Configuration for Authress for users to login
  * `routes`
    * `home.tsx` - Landing page which has login and logout buttons
    * `protected.tsx` - Page protected by user login via the login guard defined in the `main.tsx` file
