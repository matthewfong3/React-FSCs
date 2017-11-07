'use strict';

//controlling our state manually (though this could be done through libraries such as flux, redux or others)

/** State of our friend list **/
var friendState = {
  name: 'Cody',
  friends: ['My', 'Myself', 'I', 'The gangs all here']

  /** State of our new friend input **/
};var newFriendState = {
  newFriend: ''
};

//Function to render the ShowList class elements
/**
  Since this will be created by Friend Container elements,
  it will have attributes passed in during creation 
  (see renderFriendContainer for <ShowList names={this.state.friends} />).
  Those attributes will become inherited values in this called this.props.
  
  For example our renderFriendContainer creates 
  <ShowList names={this.state.friends} /> 
  
  which means in this ShowList object, we will have this.props.names
  which is the values from this.state.friends of the FriendsContainer. 
  this.props is the inherited variables as opposed to this.state
  which is the variables that are part of this element. 
  The this.props.names field is called names because the tag that made it
  set the attribute to names
  <ShowList names={this.state.friends} /> 
  
  It does not need to be called names. It can be called anything. 
**/
var renderList = function renderList() {
  //For each name in the names inherited array (friends in FriendsContainer)
  //we will put that name into an <li>. 
  /**
      .map is a build-in for-each loop for an array
      but lets you selectively add/edit/remove
      on the fly while building a new array
      Like with adding friends, we are mapping to
      a new array for immutability. That way we can
      check differences and history quickly.
  **/
  var listItems = this.props.names.map(function (friend) {
    return React.createElement(
      'li',
      null,
      ' ',
      friend,
      ' '
    );
  });

  //Render the structure for the ShowList class including the list items
  //which will also have JSX in it for <li> tags.
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h3',
      null,
      ' Friends '
    ),
    React.createElement(
      'ul',
      null,
      listItems
    )
  );
};

//Function to update the state of an AddFriend object. 
//Since we are drawing the friend name to the NewFriend input,
//we need this so we can see the changes on the page as the user types.
//We have tied the value of the user input to the newFriend value, so
//we need to make sure we keep it up to date.
/**  
  This function is invoked by the onChange attribute AddFriend component.
  
  We will update our newFriendState on each key change to make sure the
  element always stays up to date in code. 
  
  We will also trigger a re-render on the screen to make sure the latest
  data is shown. The components are controlled by React and do not quite
  act the same as typical HTML elements 
  (since they have custom JS controlling their events)
**/
var updateNewFriend = function updateNewFriend(e) {
  newFriendState.newFriend = e.target.value;

  ReactDOM.render(React.createElement(FriendsContainer, { name: friendState.name, friends: friendState.friends }), document.getElementById('app'));
};

//Function to add a new friend to our friends list 
//This will be invoked by the onClick attribute in AddFriend component
/**
  This is a custom function that will accept a friend name
  and add it to the friends list for this container. 
  
  Then we will re-render the components to show the changes.
  
  When you have a small amount of data, this manual re-render is quick and 
  keeps the code clean. 
  
  !!Although!!
  If you have larger or more complex structures (not just a couple simple elements),
  then this (FSCs) becomes much more expensive and slow. In those cases, 
  using classes extending React.Component makes more sense. The code is more complicated,
  but it is much more performant.
  
  React is working hard on making FSCs to be much more performance optimized in future
  releases with the goal of moving towards them.
  
  ---
  Also notice, we are using .concat instead of push.
  The concat function will create a new array
  from the old array with the new values appended.
  
  We are doing this so that we do not modify the original
  array (not pushing to it). This means the original
  array has not been mutated. We call this immutability. 
  
  Why do we want the array to be immutable? 
  Well React and many frameworks check current values
  against the previous value to see differences. This 
  also means we can undo changes 
  (several times if we store several states).
  
  The difference check is actually much easier to maintain 
  and faster to calculate than trying to see if an array
  has been mutated over time (without having separate arrays or history).
  
  Changes in the array can trigger events like re-rendering and such. 
  Immutability makes this process much faster and easier.
**/
var addNewFriend = function addNewFriend(e) {
  friendState.friends = friendState.friends.concat([newFriendState.newFriend]);

  newFriendState.newFriend = '';

  ReactDOM.render(React.createElement(FriendsContainer, { name: friendState.name, friends: friendState.friends }), document.getElementById('app'));
};

//Creating a new React component
/** 
  This will create a component we can call in JSX generates HTML
  or other JSX that will be rendered.
  
  The following will create a React component called 
  AddFriend that, when we make <AddFriend /> tags,
  will render out AddFriend JSX.
  
  React has special events different from the normal events. 
  Instead of onclick or onchange, React has custom events with camelcase
  that automatically set up listeners and scope. 
  These are events like onClick and onChange. They work similarly, but
  have a lot of special code involved. 
  
  Items passed in as attributes are called props.
  These will be inherited as this.props in children
  made by this element. 

  The attribute name is the variable name
  <ShowList names=['Cody', 'V'] />
  would make a new ShowList object
  with this.props.names set equal to ['Cody', 'V']
  
  In this 
  <AddFriend addNew={addFriendToContainer} />
  line we are setting a prop inside of
  an AddFriend object as props.addNew 
  that is set equal to the Container's 
  addFriendToContainer function.
**/
var FriendsContainer = function FriendsContainer(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h3',
      null,
      ' Name: ',
      props.name,
      ' '
    ),
    React.createElement(AddFriend, { newFriend: newFriendState.newFriend }),
    React.createElement(ShowList, { names: props.friends })
  );
};

//Creating a new React Functional Stateless Component (FSC)
/**
  This will create a component we can call in JSX generates HTML
  or other JSX that will be rendered.
  
  The following will create a React component called 
  AddFriend that, when we make <AddFriend /> tags,
  will render out AddFriend JSX.
  
  React has special events different from the normal events. 
  Instead of onclick or onchange, React has custom events with camelcase
  that automatically set up listeners and scope. 
  These are events like onClick and onChange. They work similarly, but
  have a lot of special code involved. 
  
  handleAddNew is a custom function we made and attached
  to AddFriend objects that we can call to have certain events fire.
  
  updateNewFriend is a custom function we made and attached
  to AddFriend objects that we can call to have certain events fire.
**/
var AddFriend = function AddFriend(props) {
  return React.createElement(
    'div',
    null,
    React.createElement('input', { type: 'text', value: props.newFriend, onChange: updateNewFriend }),
    React.createElement(
      'button',
      { onClick: addNewFriend },
      ' Add Friend '
    )
  );
};

/**
  propTypes allows us to specify the variable type of custom
  props passed in from the parent. It will ensure the parent
  provides the correct variables and functions to the child element.
  
  PropTypes allow type checking on a variable.
  Check out prop type options here
  https://facebook.github.io/react/docs/typechecking-with-proptypes.html
**/
AddFriend.propTypes = {
  addNew: PropTypes.func.isRequired,
  newFriend: PropTypes.string.isRequired
};

//Creating a new React class
/**
  This will create a component we can call in JSX generates HTML
  or other JSX that will be rendered.
  
  The following will create a React component called 
  ShowList that, when we make <ShowList /> tags,
  will render out ShowList JSX.
  
  The map function of any JS array is like a forEach loop. It will
  loop through each value of the array and do something.
  
  The goal of a map function is to create a SECOND array with values
  based on values from the previous array but likely for a different reason.
  
  In this case, we create an li out of each item in the array without modifying
  the original array so that we can still use it.
  
  Then we take our new array of li tags and drop it into our JSX
**/
var ShowList = function ShowList(props) {
  //map is a build-in for-each loop for an array
  //but lets you selectively add/edit/remove
  //on the fly while building a new array
  var listItems = props.names.map(function (friend) {
    return React.createElement(
      'li',
      null,
      ' ',
      friend,
      ' '
    );
  });
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h3',
      null,
      ' Friends '
    ),
    React.createElement(
      'ul',
      null,
      listItems
    )
  );
};

//ReactDOM.render allows us to 'render' React classes/components
//to the page. 
/**
  ReactDOM.render will generate or update HTML on the page
  very quickly with the new structure given.

  The first argument is the JSX to render to the page
  and all subsequent JSX elements. The JSX will be 
  converted into normal valid HTML. 

  The second argument is where on the page to add it.
  
  The attibutes of our JSX are sent in to the FriendContainer component
  as an argument called props. This allows us to pass data and functions
  into our components. 
  
  In this case, the FriendsContainer component will receive a props object
  that has a variable called 'name' set to our friendState.name and
  a variable called friends set to our friendState.friends array.
**/
var init = function init() {
  ReactDOM.render(React.createElement(FriendsContainer, { name: friendState.name, friends: friendState.friends }), document.getElementById('app'));
};

window.onload = init;
