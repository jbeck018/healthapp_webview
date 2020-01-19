const key = '4fda5e30430c43798bef73feb3648e81'

const Spoonacular = {
	
	byIngredients(terms) {
		return fetch('https://api.spoonacular.com/recipes/findByIngredients?apiKey='+key+'&ingredients='+terms+'&number=50&ranking=2', {
			headers: {'Content-Type': 'application/json'}
		}).then(
			response => {
				if(response.ok){
	        		return response.json();
	      		}
	      throw new Error('Network error');
		}).then(jsonResponse => {
		    if (jsonResponse) {
		      return jsonResponse.map(recipe => ({
		        id: recipe.id,
		        name: recipe.title,
		        image: recipe.image
		      }));
		    }else{
		      return [];
		    }
	  	})	
	},

	forRecipe(id) {
		const url = 'https://api.spoonacular.com/recipes/'+id+'/information?apiKey='+key+'&includeNutrition=true'
		return fetch(url, {
			headers: {'Content-Type': 'application/json'}
		}).then(
			response => {
				if(response.ok){
	        		return response.json();
	      		}
	      throw new Error('Network error');
		}).then(recipe => {
		    if (recipe) {
		      console.log(recipe.nutrition);
		      console.log(recipe.extendedIngredients);
		      console.log(recipe.analyzedInstructions[0]);
		      return recipe;
		  	}
		    else{
		      return [];
		    }
	  	})	
	}
}

export default Spoonacular;