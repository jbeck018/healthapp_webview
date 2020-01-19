import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
        <div>
          <TextField 
            multiline
            fullWidth
            helperText='Enter ingredients seperated by a comma'
            onChange={this.handleTermChange} 
            onKeyDown={this.handleKeyPress} 
            placeholder="apple, orange, steak" 
            margin='dense'
          />
        </div>
        <div styles={{paddingTop: 25}}>
            <Button variant='contained' color="primary" onClick={this.search}>
              Search
            </Button>
        </div>
      </div>
    );
  }
}

export default SearchBar;
