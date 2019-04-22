# Bonus exercises

## Connect GraphQL to a real database

Some simple solutions:

- Postgres + Heroku + knex.js
- Postgres + Prisma + Docker

## Build the follower system

- Each person has a list of _followers_ and _following_
- Build the database model (_Follow_ table)

## Make tweets like-able

## Make tweets retweet-able

## Build a notification system

Create notification events when:

- Somebody liked your own tweets/retweets
- Somebody started following you

## Build a DM system

- Each person has a messaging inbox
- Build the database model (_Message_ table)

## Upload avatar to image CDN (eg. Cloudinary)

- Instead of editing the Image URL, users should be able to upload an image (eg. via drag & drop)
- `updateAvatar` mutation should upload the image to the CDN and store the URL to the database

## Implement a complete authentication flow

- Passport.js or Auth0 Service might be helpful
- Create Login page
