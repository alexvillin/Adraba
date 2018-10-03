# Adraba
test 

I didn't use Vue CLI here and some modern bundlers like Webpack (I use them in another my repositiry)
The main case in this task is using external API (THE MovieDB) and start work with Vue-router and common Vue configuration.
Some cases like filtering and ordering work with internal logic (it's like example of internal data processing only), so pagination can crash when search or ordering active.

--------------------
How to install
```
> cd [workdir]
> git clone [url]
> npm i
> gulp
```
+ I use gulp for generate html from jade, minify and concat js files, and start local web server on http://localhost:5500
+ You can use https://alexvillin.github.io/Adraba/#/ for watch the result


## Task requirements:
- Use [The Movie Database API](https://www.themoviedb.org/), we want to see your work with real data.
- On the Homepage, we should see a list of popular movies. There should be pagination or infinite scroll.
- When the user clicks on a movie card in the list, we go to the page where we will see detailed information about the movie. Also, there should be the list of related movies.
- In the header, we should have the search field, when user type text here we should see the list of matched movies below fields(autocomplete).
- Each card of a movie in the list should have the list of genres when the user clicks on the name of a genre we should show the list of movies of that genre.
- The user should be able to add/remove movie to/from the favorite list. And see the list of favorite movies on a separate page. Save this info to store. If the movie from popular movies list on the home page is in the favorite list of the user, you should mark it by special icon etc.

## Bonus tasks
- Bonus if you will sync the list of favorite movies with browser memory(localstorage for example) or remote storage(Firebase for example).
- Bonus if you will add sorting to all movies lists.

## Important

- You may use any libraries you want.
- Pay close attention to how your application look, beautiful UI for us is very important because we create interfaces for humans.
- You may use any library of ready to use components.
- Use modern JS.
- Deploy your work on gh-pages or Heroku, or Zeit etc.
- Add the short instruction to your project, how to run code etc. Always remember that your code will use someone else.

## What we pay attention to?

- Did you follow our requirements?
- Clean, readable code one of the most important things!
- Do you follow best practices?
- UI/UX
