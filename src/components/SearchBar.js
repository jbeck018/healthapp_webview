import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { purple } from '@material-ui/core/colors';
import FilterListIcon from '@material-ui/icons/FilterList';
import Checkbox from '@material-ui/core/Checkbox';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';


const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: purple[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
});

const cuisineList = ['African', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese', 'Eastern European', 'European', 
                     'French', 'German', 'Greek', 'Indian', 'Irish', 'Italian', 'Japanese', 'Jewish', 'Korean', 'Latin American', 
                     'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'Southern', 'Spanish', 'Thai', 'Vietnamese']
const dietList = ['Whole30', 'Primal', 'Paleo', 'Pescetarian', 'Vegan', 'Ovo-Vegetarian', 'Lacto-Vegetarian',
                  'Vegetarian', 'Ketogenic', 'Gluten Free']
const intolList = ['Dairy', 'Egg', 'Gluten', 'Grain', 'Peanut', 'Seafood', 'Sesame', 'Shellfish', 'Soy', 
                   'Sulfite', 'Tree Nut', 'Wheat']

class SearchBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      term: '',
      intols: '',
      diet: '',
      cuisine: '',
      ingredients: '',
      open: false,
      showIng: false,
      showInt: false,
      showDiet: false,
      showCuisine: false,
    }

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.toggleView = this.toggleView.bind(this);
  }

  search(){
    this.props.onSearch(this.state.term, 
                        this.state.ingredients, 
                        this.state.cuisine, 
                        this.state.diet, 
                        this.state.intols);
  }

  toggleDrawer(){
    // if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    //   return;
    // }
    this.setState({
      open: !this.state.open,
    })
  }

  toggleView(id){
    if (id === 'ingredients'){
      this.setState({
        showIng: !this.state.showIng,
      })
    } 
    if (id === 'cuisine'){
      this.setState({
        showCuisine: !this.state.showCuisine,
      })
    }
    if (id === 'diet'){
      this.setState({
        showDiet: !this.state.showDiet,
      })
    } 
    if (id === 'intolerances'){
      this.setState({
        showInt: !this.state.showInt,
      })
    }
  }

  handleTermChange(event){
    this.setState({
      term: event.target.value,
    });
  }

  handleKeyPress(event){
    if (event.key === "Enter"){
      this.props.onSearch(this.state.term);
    }
  }

  render() {

    const filterList = (
      <div
        style={{ width: 250 }}
        role="presentation"
      >
        <List>
            <ListItem key='cuisine' onClick={() => this.toggleView('cuisine')} button>
              <ListItemText 
                primary='Cuisine' 
                secondary='Select what type of cuisine(s) to find'
              />
            </ListItem>
            { (this.state.showCuisine) ?
                <ListItem>
                  <FormGroup>
                  {
                    cuisineList.map(item => {
                      return <FormControlLabel
                        control={<Checkbox />}
                        label={item}
                      />
                    })
                  }
                  </FormGroup>
                </ListItem> : null
            }
            <Divider />
            <ListItem button onClick={() => this.toggleView('ingredients')} key='ingredients' >
              <ListItemText 
                primary='Ingredients' 
                secondary='Enter ingredients seperated by a comma'
              />
            </ListItem>
            { (this.state.showIng) ?
              <ListItem>
                <TextField 
                  multiline
                  fullWidth
                  style={{margin: '0 auto'}}
                  placeholder={this.state.ingredients}
                  variant='outlined' 
                />
              </ListItem> : null
            }
            <Divider />
            <ListItem key='diet' button onClick={() => this.toggleView('diet')}>
              <ListItemText 
                primary='Diet'
                secondary='Sort by your diet'
              />
            </ListItem>
            { (this.state.showDiet) ?
                <ListItem>
                  <FormGroup>
                  {
                    dietList.map(item => {
                      return <FormControlLabel
                        control={<Checkbox />}
                        label={item}
                      />
                    })
                  }
                  </FormGroup>
                </ListItem> : null
            }
            <Divider />
            <ListItem key='intols' button onClick={() => this.toggleView('intolerances')}>
              <ListItemText 
                primary='Intolerances'
                secondary='Filter out your intolerances' 
              />
            </ListItem>
            { (this.state.showInt) ?
                <ListItem>
                  <FormGroup>
                  {
                    intolList.map(item => {
                      return <FormControlLabel
                        control={<Checkbox />}
                        label={item}
                      />
                    })
                  }
                  </FormGroup>
                </ListItem> : null
            }
            <Divider />
            <ListItem>
              <Button variant='contained' color="primary" onClick={this.toggleDrawer}>
                Done!
              </Button>
            </ListItem>
        </List>
      </div>
    );

    return(
      <div style={{ paddingBottom: '25px' }} >
        <div style={{ paddingBottom: '12.5px' }}>
          <TextField 
            multiline
            fullWidth
            style={{ width: '85%', float: 'left'}}
            //helperText='Enter ingredients seperated by a comma'
            onChange={this.handleTermChange} 
            onKeyDown={this.handleKeyPress} 
            placeholder="Alfredo" 
            margin='dense'
          />
          <button 
            style={{ width: '14%', margin: '5px auto 0 auto',}}
            onClick={this.toggleDrawer} 
          >
            <FilterListIcon fontSize="large"/>
          </button>
        </div>
        <div>
          <ThemeProvider theme={theme}>
            <Button variant='contained' color="primary" onClick={this.search}>
              Search
            </Button>
          </ThemeProvider>  
        </div>
        <Drawer anchor="right" open={this.state.open} onClose={this.toggleDrawer}>
          {filterList}
        </Drawer>
      </div>
    );
  }
}

export default SearchBar;
