# Introduction

Backend for the tenant portal for Mimer.

## Installation

1. Make a copy of .env.template, call it .env
2. Fill out values in .env. (see below)
3. Install nvm
4. Install required version of node: `nvm install`
5. Use required version of node `nvm use`
6. Install packages: `npm run install`

## Development

Start the development server: `npm run dev`

Note: You need to have onecore-core, onecore-leasing and onecore-property-management running for this application to work.

## Env

- CORE\_\_URL - Url to onecore-core
- CORE\_\_USERNAME - Username for service account in onecore-core (configured in that application)
- CORE\_\_PASSWORD - Password for service account in onecore-core (configured in that application)
- AUTH\_\_COOKIE_DOMAIN - Set to "localhost" for local dev environment
- AUTH**TEST_ACCOUNT**ID - National registration number of a contact present in the database for onecore-leasing
- AUTH**TEST_ACCOUNT**USERNAME - Login username for the (currently only) user in the portal
- AUTH**TEST_ACCOUNT**SALT - Salt for portal user (create with /auth/generate-hash)
- AUTH**TEST_ACCOUNT**HASH - Password hash for user (create with /auth/generate-hash)
- BANK_ID\_\_URL - Url for the API
- BANK_ID\_\_REDIRECT_URL - Url to redirect to after bankId auth
- BANK_ID\_\_CLIENT_SECRET - Client secret used to get the token used for the bankID api
- BANK_ID\_\_CLIENT_ID - Client ID used to get the token used for the bankID api
- BANK_ID\_\_SCOPE - Scope used to get the token used for the bankID api
- BANK_ID\_\_TENANT_ID - Tenant ID used to get the token used for the bankID api
- BANK_ID\_\_SUBSCRIPTION_KEY - Key for the bankID API
