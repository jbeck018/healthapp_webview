const key = '4fda5e30430c43798bef73feb3648e81'

const Spoonacular = {
	
	byIngredients(terms) {
		return fetch('https://api.spoonacular.com/recipes/findByIngredients?apiKey='+key+'&ingredients='+terms+'&number=50&ranking=1', {
			headers: {'Content-Type': 'application/json'}
		}).then(
			response => {
				if(response.ok){
	        		return response.json();
	      		}
	      throw new Error('Network error');
		}).then(jsonResponse => {
		    if (jsonResponse) {	
		      console.log(jsonResponse);
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
		const url = 'https://api.spoonacular.com/recipes/'+id+'/information?apiKey='+key+'&includeNutrition=true';
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
		      return recipe;
		  	}
		    else{
		      return [];
		    }
	  	})	
	},

	onComplex(query,ingredients, cuisine, diet, intols) {
		let base = 'https://api.spoonacular.com/recipes/complexSearch?apiKey='+key
		//for api: query, cuisine, diet, intolerances, includeIngredients
		const params = [
			{
				'name': 'query',
				'item': query,
			},
			{
				'name': 'includeIngredients',
				'item': ingredients,
			},
			{	
				'name': 'cuisine',
				'item': cuisine,
			},
			{
				'name': 'diet',
				'item': diet,
			},
			{
				'name': 'intolerances',
				'item': intols,
			},
		]

		let options = ''

		params.filter(function(clean){
			return clean.item !== ""
		}).forEach(item => {
			options = options + '&' + item.name + '=' + item.item
		})

		const url = base + options + '&number=10&instructionsRequired=true'

		return fetch(url, {
			headers: {'Content-Type': 'application/json'}
		}).then(
			response => {
				if(response.ok){
	        		return response.json();
	      		}
	      throw new Error('Network error');
		}).then(jsonResponse => {
		    if (jsonResponse) {	
		      console.log(jsonResponse.results);
		      return jsonResponse.results.map(recipe => ({
		        id: recipe.id,
		        name: recipe.title,
		        image: recipe.image
		      }));
		    }else{
		      return [];
		    }
	  	})	
	},
}

export default Spoonacular;