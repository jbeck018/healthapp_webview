import React from 'react';
import MealPlanner from './MealPlanner';
import MealPlannerResults from './MealPlannerResults';
import Recipe from './Recipe'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Spoonacular from '../utils/Spoonacular';
import './general.css';

class MealPlannerApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      recipeDetails: [],
      isHome: true,
    }

    this.search = this.search.bind(this);
    this.recipe = this.recipe.bind(this);
    this.back = this.back.bind(this);
  }

  search(timeFrame, targetCalories, diet, exclude) {
    Spoonacular.mealPrep(timeFrame, targetCalories, diet, exclude).then(searchResults => {
      this.setState({
        searchResults: searchResults
      });
    });
  }

  recipe(id) {
    Spoonacular.forRecipe(id).then(recipeDetails => {
      this.setState({
        recipeDetails: recipeDetails,
        isHome: false,
      })
    })
  }

  back() {
    this.setState({
      isHome: true,
    })
  }

  render() {
    const isHome = this.state.isHome;
    let to_display;

    if (isHome) {
      to_display = <div>
          <div className='main_view'>
            <MealPlanner onSearch = {this.search}/>
            <MealPlannerResults searchResults = {this.state.searchResults} handleClick = {this.recipe} />
          </div>
        </div>;
    } else {
      to_display = <div>
          <Recipe recipe={this.state.recipeDetails} handleClick={this.back} />
        </div>;
    }

    return(
      <div>
        {to_display}
      </div>
    );
  }
}

export default MealPlannerApp;
