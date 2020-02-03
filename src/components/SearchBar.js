import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { purple } from '@material-ui/core/colors';

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
    }

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  search(){
    this.props.onSearch(this.state.term);
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
    return(
      <div style={{ paddingBottom: '25px' }} >
        <div style={{ paddingBottom: '20px' }}>
          <TextField 
            multiline
            fullWidth
            //helperText='Enter ingredients seperated by a comma'
            onChange={this.handleTermChange} 
            onKeyDown={this.handleKeyPress} 
            placeholder="apple, orange, steak" 
            margin='dense'
          />
        </div>
        <div>
          <ThemeProvider theme={theme}>
            <Button variant='contained' color="primary" onClick={this.search}>
              Search
            </Button>
            <Button variant='contained' color="secondary" onClick={this.search} style={{marginLeft: '5px'}}>
              Filter
            </Button>
          </ThemeProvider>  
        </div>
      </div>
    );
  }
}

export default SearchBar;
