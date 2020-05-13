const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made

     //Iteration 2
     const myRecipe = new Recipe({
      title: "Bandeja Paisa con suchi",
      cuisine: "Colombian"
    })
    myRecipe.save()
      .then(res => (res))
      .catch(err => console.log(err))

      //Iteration 3
    Recipe.insertMany(data)  //3 seconds 
    .then(res => { 

     //Iteration 4

        //BONUS FIGURE OUT USING PROMISE.ALL and using async await 

        
        Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'}, {duration: 100}) //avoids race condition ... We used a promise
          .then(res => { console.log('rigatonoi updated') })
          .catch(err => err)

        Recipe.deleteOne({title: 'Carrot Cake'})
          .then(res => console.log('carot cake deleted'))
          .catch(err => err)

             
        setTimeout( () => mongoose.connection.close() , 0)  // Adds to the end. 


        //Solution using thens.
        // Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'}, {duration: 100}) //avoids race condition ... We used a promise
        //   .then(res => { 
        //       console.log('rigatonoi updated') 
        //       Recipe.deleteOne({title: 'Carrot Cake'})
        //       .then(res => { 
        //           console.log('carot cake deleted')
        //            mongoose.connection.close()
        //       })
        //       .catch(err => err)

        // }).catch(err => err)
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
