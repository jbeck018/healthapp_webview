import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { purple } from '@material-ui/core/colors';
import FilterListIcon from '@material-ui/icons/FilterList';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


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
            <ListItem key='cuisine' button>
              <ListItemText 
                primary='Cuisine' 
                secondary='Select what type of cuisine(s) to find'
              />
            </ListItem>
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
                  placeholder="Apple, steak, parmesian"
                  variant='outlined' 
                />
              </ListItem> : null
            }
            <Divider />
            <ListItem key='diet' button>
              <ListItemText 
                primary='Diet'
                secondary='Sort by your diet'
              />
            </ListItem>
            <Divider />
            <ListItem key='intols' button>
              <ListItemText 
                primary='Intolerances'
                secondary='Filter out your intolerences' 
              />
            </ListItem>
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
