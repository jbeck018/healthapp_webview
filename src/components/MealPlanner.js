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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import './general.css'


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

const dietList = ['Whole30', 'Primal', 'Paleo', 'Pescetarian', 'Vegan', 'Ovo-Vegetarian', 'Lacto-Vegetarian',
                  'Vegetarian', 'Ketogenic', 'Gluten Free']

class MealPlanner extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      timeFrame: 'day',
      targetCalories: 2000,
      diet: '',
      exclude: '',
      open: false,
      showIng: false,
      showDiet: false,
      showTF: false,
    }

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.handleIngredientChange = this.handleIngredientChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  search(){
    this.props.onSearch(this.state.timeFrame, 
                        this.state.targetCalories,
                        this.state.diet, 
                        this.state.exclude);
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
    if (id === 'timeFrame'){
      this.setState({
        showTF: !this.state.showTF,
      })
    } 
    if (id === 'ingredients'){
      this.setState({
        showIng: !this.state.showIng,
      })
    } 
    if (id === 'diet'){
      this.setState({
        showDiet: !this.state.showDiet,
      })
    } 
  }

  handleCheck(id, item){
    if (id === 'diet'){
      if (this.state.diet.includes(item)){
        this.setState({
          diet: this.state.diet.replace(item, ''),
        })
      } else {
        this.setState({
          diet: this.state.diet.concat(item)
        })
      }
    } 
  }

  handleTermChange(event){
    this.setState({
      targetCalories: event.target.value,
    });
  }

  handleIngredientChange(event){
    this.setState({
      exclude: event.target.value,
    });
  }

  handleKeyPress(event){
    if (event.key === "Enter"){
      this.props.onSearch(this.state.term);
    }
  }

  handleChange = event => {
    this.setState({
      timeFrame: event.target.value
    });
  };

  render() {

    const filterList = (
      <div
        style={{ width: 250 }}
        role="presentation"
      >
        <List>
            <ListItem button onClick={() => this.toggleView('timeFrame')} key='timeFrame' >
              <ListItemText 
                primary='Time Frame' 
                secondary='Select whether you want to plan for 1 day or 1 week.'
              />
            </ListItem>
            { (this.state.showTF) ?
              <ListItem>
              <FormControl component="fieldset">
                <RadioGroup aria-label="timeframe" name="timeframes" value={this.state.timeFrame} onChange={this.handleChange}>
                  <FormControlLabel
                    value='day'
                    control={<Radio />}
                    label="Day"
                  />
                  <FormControlLabel
                    value='week'
                    control={<Radio />}
                    label="Week"
                  />
                </RadioGroup>  
              </FormControl>
              
              </ListItem> : null
            }
            <Divider />

            <ListItem button onClick={() => this.toggleView('ingredients')} key='ingredients' >
              <ListItemText 
                primary='Ingredients' 
                secondary='Enter ingredients to exclude from your meals'
              />
            </ListItem>
            { (this.state.showIng) ?
              <ListItem>
                <TextField 
                  multiline
                  fullWidth
                  style={{margin: '0 auto'}}
                  placeholder={this.state.exclude}
                  variant='outlined'
                  onChange={this.handleIngredientChange} 
                  defaultValue={this.state.exclude} 
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
                        control={
                          <Checkbox 
                            checked={this.state.diet.includes(item.toLowerCase()) ? true : false}
                            onClick={() => this.handleCheck('diet', item.toLowerCase()+',')}
                          />
                        }
                        label={item}
                        id={item}
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
      <div>
        <AppBar position="fixed" style={{ paddingTop: '25px', paddingBottom: '5px' }}>
          <Toolbar>
            <Typography variant="h6">
              Meal Planning
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ paddingBottom: '25px', marginTop: '85px'}} >
          <div style={{ paddingBottom: '12.5px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <TextField 
              multiline
              fullWidth
              style={{ flexGrow: '2' }}
              onChange={this.handleTermChange} 
              onKeyDown={this.handleKeyPress} 
              placeholder="Calories per day" 
              margin='dense'
              defaultValue={this.state.targetCalories}
            />
            <button 
              onClick={this.toggleDrawer}
              className="button"
            >
              <FilterListIcon fontSize="large" />
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
      </div>
    );
  }
}

export default MealPlanner;
