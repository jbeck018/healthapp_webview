import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import RestaurantRoundedIcon from '@material-ui/icons/RestaurantRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import { PieChart } from 'react-chartkick'
import 'chart.js'

import './general.css';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  media: {
    height: 300,
  },
}));

export default function Recipe(props) {
  const classes = useStyles();
  const madeBy = props.recipe.sourceName ? <Typography style={{ textAlign: 'center' }} variant="body2" gutterBottom>
			      	Courtesy of <a href={props.recipe.sourceUrl}>{props.recipe.sourceName}</a>
			      </Typography> : null

  const instructions = props.recipe.analyzedInstructions[0];
  const servingByWeight = props.recipe.nutrition.weightPerServing.amount.toString() + props.recipe.nutrition.weightPerServing.unit;
  const hasRecipe = (instructions === undefined) ? false : true;


	// dairyFree: recipe.dairyFree,
	// glutenFree: recipe.glutenFree,
	// ketogenic: recipe.ketogenic,
	// vegan: recipe.vegan,

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton 
          	edge="start" 
          	className={classes.menuButton} 
          	color="inherit" 
          	aria-label="back"
          	onClick = {() => props.handleClick()}
          >
            <ArrowBack />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div>
      	  <Card className={classes.card}>
	          <CardMedia
	            className={classes.media}
	            image={props.recipe.image}
	            title={props.recipe.title}
	          />
	          <CardContent>
	            <Typography variant="h4" component="h2">
	              {props.recipe.title}
	            </Typography>
	            {madeBy}
	            <Grid item xs={12} style={{ paddingTop: 20 }}>
			        <Grid container justify="center" spacing={2} alignItems="center">
			            <Grid key='servings' item>
			             	<RestaurantRoundedIcon fontSize="small" /><b>:</b> {props.recipe.servings}
			            </Grid>
			     		<Grid key='time' item>
			             	<AccessTimeRoundedIcon fontSize="small" /><b>:</b> {props.recipe.readyInMinutes} minutes
			            </Grid>
			            <Grid key='likes' item>
			             	<FavoriteBorderRoundedIcon fontSize="small" /><b>:</b> {props.recipe.aggregateLikes}
			            </Grid>
			        </Grid>
			    </Grid>
			</CardContent>
          </Card>

	      <div style={{ width: '95%', margin: '0 auto', }}>
	      	<Typography variant="h4" component="h4" style={{ paddingTop: 40 }}>
	      		Ingredients
	      	</Typography>
	      	<ul style={{ paddingTop: 20 }}>
		      {
		      	props.recipe.extendedIngredients.map(item => {
		      		return <li key={item.id} >{item.original}</li>
		      	})
		      }
		     </ul>
		  </div>
		  {
		  	(hasRecipe) ? <div style={{ width: '95%', margin: '0 auto', }}>
			      	<Typography variant="h4" component="h4" style={{ paddingTop: 20 }}>
			      		Instructions
			      	</Typography>
			      	<ol style={{ paddingTop: 20,}}>
				      {
				      	instructions.steps.map(item => {
				      		return <li key={item.number}>{item.step}</li>;
				      	})
				      }
				     </ol>
				  </div>
		  	: null
		  }
			     
          <div style={{ width: '95%', margin: '0 auto', paddingBottom: '100px'}} >
          	<Card>
          		<CardContent>
          			<Typography variant="h4" component="h2">
		              Nutrition Facts
		            </Typography>
		            Serving Size: {servingByWeight}
		            <br />
		            <br />
		            <Grid container justify="center" alignItems="center">
        				<Grid key='nutrient' item xs={8}>
			             	<span>Amount Per Serving</span>
			            </Grid>
			     		<Grid key='value' item xs={4}>
			             	<span>% Daily value</span>
			            </Grid>
		            </Grid>
		            <hr />
		            	{
		            		props.recipe.nutrition.nutrients.map(nutrient => {
		            			return(
		            				<Grid key={nutrient.title} container justify="center" alignItems="center">
			            				<Grid item xs={9}>
							             	<span>{nutrient.title}: {nutrient.amount}{nutrient.unit}</span>
							            </Grid>
							     		<Grid item xs={3}>
							             	<span>{nutrient.percentOfDailyNeeds}%</span>
							            </Grid>
						            </Grid>
		            			);
		            		})
		            	}
		            <Typography variant="h4" component="h2" style={{paddingTop: 30, paddingBottom: 20}} >
		              Caloric Breakdown
		            </Typography>
		            <PieChart data={[
		            		['Protein', props.recipe.nutrition.caloricBreakdown.percentProtein], 
		            		['Fat', props.recipe.nutrition.caloricBreakdown.percentFat], 
		            		['Carbs', props.recipe.nutrition.caloricBreakdown.percentCarbs],
		            	]}
		            />
		        </CardContent>
		    </Card>
		  </div>
	      
	    </div>
    </div>
  );
}
