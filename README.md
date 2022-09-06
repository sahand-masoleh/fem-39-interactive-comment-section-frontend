# Frontend Mentor - Interactive comments section solution

This is a solution to the [Interactive comments section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Additional Features](#additional-features)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments
- ~~**Bonus**: If you're building a purely front-end project, use `localStorage` to save the current state in the browser that persists when the browser is refreshed.~~
- **Bonus**: Instead of using the `createdAt` strings from the `data.json` file, try using timestamps and dynamically track the time since the comment or reply was posted.

![reply-edit-delete](https://user-images.githubusercontent.com/63850404/188757050-452abd5e-f28b-4dd1-9811-39afe4cfa359.gif)

![vote](https://user-images.githubusercontent.com/63850404/188757147-153c0d1a-0482-4a89-b002-0b2e484b416b.gif)

### Additional features

#### **A Tree structure for comments**:

Each comment can have a comment and so on.

#### **Sorting comments**:

Comments can be sorted based on date or score, both in an ascending or descending order, while maintaining the parent-child relation. When sorting by score, children are sorted by date as per the requirement of the challenge.

![sort](https://user-images.githubusercontent.com/63850404/188757106-93956c6b-82c8-409d-9871-3b3d1d5dbea0.gif)

#### **Pagination by height and depth**

Only a certain number of parent posts are pulled from the database and shown at first. Scrolling down, the app will download more comments and adds them to the page.

![pagination](https://user-images.githubusercontent.com/63850404/188757118-3e985015-ff65-4aff-b5b3-8c828e9e521b.gif)

Also, the app will only show up to a certain depth on each page (both on the frontend and database level). The next sets of children can be viewed on separate pages.

![depth](https://user-images.githubusercontent.com/63850404/188757128-98dd6735-bc28-49a2-b6c7-c1494fb46d9c.gif)

#### **Authentication**

Users must log in before interacting with the app. I have utilized GitHub's Auth0 to mitigate the risk of having the app attacked by bots. The authorization info is stored in a non-expiring cookie encrypted by JWT. Needless to say, this is not the most secure way of authenticating users, but suffices for the purposes of this demo.

![authentication](https://user-images.githubusercontent.com/63850404/188756425-5160b560-74b4-48b0-ae79-05f93a41b6e5.gif)

### Links

- Frontend Repo: [https://github.com/sahand-masoleh/fem-39-interactive-comment-section-frontend](https://github.com/sahand-masoleh/fem-39-interactive-comment-section-frontend)
- Backend Repo: [https://github.com/sahand-masoleh/fem-39-interactive-comment-section-backend](https://github.com/sahand-masoleh/fem-39-interactive-comment-section-backend)
- Live Site: [https://fem-39-comment-section.netlify.app/](https://fem-39-comment-section.netlify.app/)

## My process

### Built with

- ReactJS (with React Router and React Query)
- SASS
- NodeJS with ExpressJS
- PostgreSQL (with bash scripting for configuring the database)

### What I learned

I learned a lot doing the project. The biggest challenge was implementing sorting for child comments, since the tree structure is queried in the database using a recursive CTE, a normal ORDER BY clause cannot be used, therefore a path must be manually constructed to be used for sorting. That, combined with pagination, and stickied comments, was a bit trickier than I anticipated.

Some of the technologies I had fun implementing were SQL functions and triggers, React Query, GitHub's Auth0, cookies and JWT, intersection observers, and React portals.

## Author

- Frontend Mentor - [@sahand-masoleh](https://www.frontendmentor.io/profile/sahand-masoleh)
- Twitter - [@SahandMasoleh](https://twitter.com/SahandMasoleh)
- LinkedIn - [@sahand-masoleh](https://www.linkedin.com/in/sahand-masoleh-220045244/)
