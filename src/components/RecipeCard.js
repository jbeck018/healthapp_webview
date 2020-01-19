import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  card: {
    minWidth: 275,
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 140,
  },
});

export default function RecipeCard(props) {
  const classes = useStyles();

  return(
    <div>
        <Card className={classes.card} variant="outlined">
          <CardMedia
            className={classes.media}
            image={props.recipe.image}
            title={props.recipe.name}
          />
          <CardContent>
            <Typography variant="h5" component="h2">
              {props.recipe.name}
            </Typography>
          </CardContent>
          <CardActions>
            <Button 
              type="submit"
              size="small"
              onClick={() => props.handleClick(props.recipe.id)}
            >
              Learn More
            </Button>
          </CardActions>
        </Card>
    </div>
  );


}