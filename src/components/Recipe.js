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
  const madeBy = props.recipe.sourceName ? <Typography style={{ textAlign: 'center' }} variant="body2" gutterBottom>
			      	Courtesy of <a href={props.recipe.sourceUrl}>{props.recipe.sourceName}</a>
			      </Typography> : null

  const instructions = props.recipe.analyzedInstructions[0]


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

			      <div>
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
				  <div>
			      	<Typography variant="h4" component="h4" style={{ paddingTop: 20 }}>
			      		Instructions
			      	</Typography>
			      	<ol style={{ paddingTop: 20, paddingBottom: 50 }}>
				      {
				      	instructions.steps.map(item => {
				      		return <li key={item.number}>{item.step}</li>;
				      	})
				      }
				     </ol>
				  </div>
			     
          <Typography>

          </Typography>
	      
	    </div>
    </div>
  );
}
