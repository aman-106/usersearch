import React, { Component } from 'react';
import PropTypes from 'prop-types';


const users = [{
 id: "123-s2-546",
 name: "John Jacobs",
 items: ["bucket", "bottle" ],
 address: "1st Cross, 9th Main, abc Apartment",
 pincode: "5xx012"
},
{
 id: "123-s3-146",
 name: "David Mire",
 items: ["Bedroom Set" ],
 address: "2nd Cross, BTI Apartment",
 pincode: "4xx012"
},
{
 id: "223-a1-234",
 name: "Soloman Marshall",
 items: ["bottle" ],
 address: "Riverbed Apartment",
 pincode: "4xx032"
},
{
 id: "121-s2-111",
 name: "Ricky Beno",
 items: ["Mobile Set"],
 address: "Sunshine City",
 pincode: "5xx072"
},
{
 id: "123-p2-246",
 name: "Sikander Singh",
 items: ["Air Conditioner"],
 address: "Riverbed Apartment",
 pincode: "4xx032"
},
{
 id: "b23-s2-321",
 name: "Ross Wheeler",
 items: ["Mobile"],
 address: "1st Cross, 9th Main, abc Apartement",
 pincode: "5xx012"
},
{
 id: "113-n2-563",
 name: "Ben Bish",
 items: ["Kitchen Set", "Chair"],
 address: "Sunshine City",
 pincode: "5xx072"
},
{
 id: "323-s2-112",
 name: "John Michael",
 items: ["Refrigerator"],
 address: "1st Cross, 9th Main, abc Apartement",
 pincode: "5xx012"
},
{
 id: "abc-34-122",
 name: "Jason Jordan",
 items: ["Mobile"],
 address: "Riverbed Apartment",
 pincode: "4xx032"
}
];

//  this displays the search bar and shows the list of users
class UserSearchPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      query: '', // key for search
      filterUsers:users,  // stores the updated user data
    };
    this.users = users;
    this.handleKeys = this.handleKeys.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.shouldMoveSelected = this.shouldMoveSelected.bind(this);


  }

  //  sets the state and filter the users data for given value
  handleSearch (e) {
   this.setState({ query: e.target.value })
   this.filterdata(e.target.value);
 }

 // for string returns the filter the users list
 filterdata(query){
   let newUsers ;
   newUsers = this.users;
   if(query){
     query = query.toLowerCase();
     newUsers = Array.prototype.filter.call(this.users,(user)=>{
       // checks if id , name , pincode , address contains specific query
       if(user.id.toLowerCase().includes(query) || user.name.toLowerCase().includes(query) || user.pincode.toLowerCase().includes(query)  || user.address.toLowerCase().includes(query)){
         return true;
       }
       return false;
     });
   }
   this.setState({filterUsers:newUsers});
 }

 // handle keys arrow up and arrow down
  handleKeys(event){
   if(event.keyCode == 40 && event.shiftKey == false && event.metaKey == false && event.altKey == false && event.ctrlKey == false ){
     // arrowDown
     this.shouldMoveSelected(1);
   }
   if(event.keyCode == 38  && event.shiftKey == false && event.metaKey == false && event.altKey == false && event.ctrlKey == false){
     //arrowUp
     this.shouldMoveSelected(-1);
   }
 }

// on press keys shift the selected user
 shouldMoveSelected(move){
   // current user index
   var userIndex = this.state.filterUsers.findIndex((user)=>{
     if(user.id == this.state.selected){
       return true;
     }
   });
   // for arrow down
   if(userIndex!=(this.state.filterUsers.length-1) && move == 1 ){
     userIndex = userIndex + 1;
   }else if(userIndex==(this.state.filterUsers.length-1) && move==1){
      userIndex=0;
    }
    // for arrow up
   if( userIndex!= 0 && move == -1){
     userIndex = userIndex - 1;
   }else if (userIndex == 0 && move == -1) {
     userIndex = this.state.filterUsers.length - 1 ;
   }

   const userId  = this.state.filterUsers[userIndex].id;

   this.setState({
     selected:userId,
   });

 }

// on click the set the userid
 handleClick(userid){
   this.setState({selected:userid});
 }

  render() {
    return (
        <div className="UserSearchPage" style={{'margin':'20px','position': 'relative'}}
          onKeyDown={this.handleKeys}
          >
          <input
            style={{'height':'50px','width':'500px','padding':'10px','border':'2px solid #e9e9e9','font-size':'24px'}}
            type="search"
            placeholder="search by id,address,name"
            onChange={(event)=>{this.handleSearch(event)}}
            value={this.state.query}
          />
          <div id='informationDiv' class="UserSearchPage-container" style={{'position': 'absolute','left':'0px','top':'60px','padding':'2px'}}>
            {this.state.query ? <ScrollView
              users={this.state.filterUsers}
              handleClick={this.handleClick}
              selected={this.state.selected}/>
              : false}
          </div>
        </div>

    );
  }
}






// display the list of users in div (allows scroll)
function ScrollView(props){
  return (
    <div style={{'height':'300px','width':'400px','overflow': 'scroll','border':'5px solid #e9e9e9','padding':'10px'}}
      >
      <ListOfUsers users={props.users} handleClick={props.handleClick} selected={props.selected}/>
    </div>);
}

// render the list of users
function ListOfUsers(props){
  if(props.users.length==0){
    return <h2>No Data Available</h2>
  }
  return props.users.map((user)=>{
    return (<UserInformation userdata={user} handleClick={props.handleClick} selected={props.selected}/>);
  });
}

// render the user
class UserInformation extends React.Component{

  constructor(props) {
    super(props);
    this.state = { flipped: null , color:'#FFFFFF','selected':false};
  }

  mouseOut() {
    this.setState({flipped: false,color:'#FFFFFF'});
  }
// mouse hover div
  mouseOver() {
    this.setState({flipped: true,color:'#FAF3DD'});
  }
  // for a click , fires props handleClick and state selected true
  handleClick(event){
    event.stopPropagation();
    console.log(event.currentTarget.getAttribute('index'));
    this.setState({'selected':true});
    const currentUser = event.currentTarget.getAttribute('index')
    // callback on Click
    if(this.props.handleClick){
      this.props.handleClick(currentUser);
    }
  }

  render(){
    let borderStyle = '2px solid #e9e9e9';
    // checks if div is selected
    if(this.props.selected && this.props.selected == this.props.userdata.id){
      borderStyle = '4px solid #B8F2E6';
    }
    return (
      <div
        className="UserInfo"
        style={{'border':borderStyle,'padding':'5px','margin':'5px','background-color':this.state.color}}
        onMouseOut={() => this.mouseOut()}
        onMouseOver={() => this.mouseOver()}
        onClick={(event)=>{this.handleClick(event)}}
        index={this.props.userdata.id}
        >
        <div className="UserID">
          {this.props.userdata.id}
        </div>
        <div className="UserInfo-name">
          {this.props.userdata.name}
        </div>
        <div className="Useraddress">
          {this.props.userdata.address}
        </div>
      </div>
    );
  }

}





export default UserSearchPage;
