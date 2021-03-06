import React from 'react';
import AddRecipeIngredients from './AddRecipeIngredients.jsx';
import $ from 'jquery';

class AddRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      directions: '',
      ingredients: [{quantity: 1, units: 'spoonful', ingredient: 'sugar', showButton: true}]
    }
    this.addRow = this.addRow.bind(this);
    this.handleIngredientsChange = this.handleIngredientsChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    $.ajax({
      url: "/api/addRecipe",
      data: JSON.stringify(this.state),
      method: 'POST',
      contentType: 'application/JSON',
      success: (result) => {
        //implement a redirect to the users recipe page
        console.log('POST successful');
      }
    });
    event.preventDefault();
  }

  addRow() {
    let myIngredients = this.state.ingredients;
    myIngredients[myIngredients.length - 1].showButton = false;
    myIngredients.push({quantity: 0, units: '', ingredient: '', showButton: true});
    this.setState({ingredients: myIngredients});
  }

  handleIngredientsChange (event, index) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    let ing = this.state.ingredients;
    ing[index][name] = value;

    this.setState({
      ingredients: ing
    });
  }

  handleInputChange (event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  }

  render () {
    return (
      <div>
        <header>
          <h1>Add Recipe</h1>
        </header>
        <form onSubmit={this.handleSubmit}>
          Name: <input type="text" name="name" onChange={this.handleInputChange}/>
          <table>
            <thead>
              <tr>
                <td>Quantity</td>
                <td>Units</td>
                <td>Ingredient</td>
              </tr>
            </thead>
            {this.state.ingredients.map(function(val, index) {
               return <AddRecipeIngredients key={index} index={index} quantity={val.quantity} units={val.units} ingredient={val.ingredient} showButton={val.showButton} addRow={this.addRow} handleIngredientsChange={this.handleIngredientsChange}/>;
             }, this)}
          </table>
          Directions: <br />
          <textarea name="directions" onChange={this.handleInputChange}></textarea>
          <div>
            <input type="submit" name="addRecipeSave" value="Save" />
            <input type="button" name="addRecipeCancel" value="Cancel" />
          </div>
        </form>
      </div>
    )
  }
}

export default AddRecipe;