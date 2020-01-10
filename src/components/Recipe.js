import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
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
    height: 140,
  },
}));

export default function Recipe(props) {
  const classes = useStyles();


 //  	id: recipe.id,
	// name: recipe.title,
	// image: recipe.image,
	// servings: recipe.servings,
	// readyInMinutes: recipe.readyInMinutes,
	// sourceName: recipe.sourceName,
	// sourceUrl: recipe.sourceUrl,
	// likes: recipe.aggregateLikes,
	// health: recipe.healthScore,
	// cost: recipe.pricePerServing,
	// dairyFree: recipe.dairyFree,
	// glutenFree: recipe.glutenFree,
	// ketogenic: recipe.ketogenic,
	// vegan: recipe.vegan,
	// ingredients: recipe.extendedIngredients,
	// instructions: recipe.analyzedInstructions,
	// nutrition: recipe.nutrition,

  return (
    <div className={classes.root}>
      <AppBar position="static">
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
      	  <Card className={classes.card} variant="outlined">
	          <CardMedia
	            className={classes.media}
	            image={props.recipe.image}
	            title={props.recipe.title}
	          />
	          <CardContent>
	            <Typography variant="h4" component="h2">
	              {props.recipe.title}
	            </Typography>
	          </CardContent>
          </Card>
	      <Grid item xs={12}>
	        <Grid container justify="center" spacing={1}>
	            <Grid key='servings' item>
	             	Serves: {props.recipe.servings}
	            </Grid>
	     		<Grid key='time' item>
	             	Ready in: {props.recipe.readyInMinutes} minutes
	            </Grid>
	            <Grid key='likes' item>
	             	Likes: {props.recipe.aggregateLikes}
	            </Grid>
	        </Grid>
	      </Grid>
	    </div>
    </div>
  );
}
