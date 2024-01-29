<p align="center">
  <img height="300px" src="https://authress.io/static/images/media-banner.png" alt="Authress media banner">
</p>

# Authress Starter Kit: React

This repository is a repo template that contains an React example that uses Authress to Login. You can either [Fork](https://github.com/new?template_name=react-starter-kit&template_owner=Authress) this repository to start with the template, or directly clone it above.

## Getting Started

1. Fork this template repository to start a new React project: [Fork this template](https://github.com/Authress/react-starter-kit/fork)
2. Clone the new repository:

```sh
git clone git@github.com:Authress/react-starter-kit.git
```

3. Run `npm install` and then `npm run start`. (Or use yarn/pnpm to install dependencies and then `start` the site.)

### File Directory

* `src`
  * `main.tsx` - Application Root and contains all the routes of the starter kit application
  * `authressClient.tsx` - Configuration for Authress for users to login
  * `routes`
    * `home.tsx` - Landing page which has login and logout buttons
    * `protected.tsx` - Page protected by user login via the login guard defined in the `main.tsx` file
