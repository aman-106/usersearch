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

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      query: '',
      filterUsers:users,
    };
    this.users = users;
    this.handler = this.handler.bind(this);
  }

  handleSearch (e) {
   this.setState({ query: e.target.value })
   this.filterdata(e.target.value);
 }

 filterdata(query){
   let newUsers ;
   newUsers = this.users;
   if(query){
     newUsers = Array.prototype.filter.call(this.users,(user)=>{
       // debugger;
       if(user.id.toLowerCase().includes(query) || user.name.toLowerCase().includes(query) || user.pincode.toLowerCase().includes(query)  || user.address.toLowerCase().includes(query)){
         return true;
       }
       return false;
     });
   }
   this.setState({filterUsers:newUsers});
 }

  handler(event){
   if(event.keyCode == 40 && event.shiftKey == false && event.metaKey == false && event.altKey == false && event.ctrlKey == false ){
     // arrowDown
     this.shouldMoveSelected(1);
   }
   if(event.keyCode == 38  && event.shiftKey == false && event.metaKey == false && event.altKey == false && event.ctrlKey == false){
     //arrowUp
     this.shouldMoveSelected(-1);

   }
 }

  render() {
    return (
        <div className="App" style={{'margin':'20px','position': 'relative'}}
          onKeyDown={this.handler}
          // onKeyPress={handler}
          // onKeyUp={handler}
          >
          <input
            style={{'height':'50px','width':'500px','padding':'10px','border':'2px solid #e9e9e9','font-size':'24px'}}
            type="search"
            placeholder="search by id,address,name"
            onChange={(event)=>{this.handleSearch(event)}}
            value={this.state.query}
          />
          <div id='informationDiv' class="app-container" style={{'position': 'absolute','left':'0px','top':'60px','padding':'2px'}}>
            {this.state.query ? <ScrollView users={this.state.filterUsers}/> : false}
          </div>
        </div>

    );
  }
}







function ScrollView(props){
  return (
    <div style={{'height':'300px','width':'400px','overflow': 'scroll','border':'5px solid #e9e9e9','padding':'10px'}}
      >
      <ListOfUsers users={props.users}/>
    </div>);
}

function ListOfUsers(props){
  if(props.users.length==0){
    return <h2>No Data Available</h2>
  }
  return props.users.map((user)=>{
    return (<UserInformation userdata={user}/>);
  });
}

class UserInformation extends React.Component{

  constructor(props) {
    super(props);
    this.state = { flipped: null , color:'#FFFFFF','selected':false};
  }

  mouseOut() {
    this.setState({flipped: false,color:'#FFFFFF'});
  }

  mouseOver() {
    // console.log("Mouse over!!!");
    this.setState({flipped: true,color:'#FAF3DD'});
    // if(this.props.handleMouseOver){
    //   this.props.handleMouseOver();
    // }

  }

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
    if(this.props.selected && this.props.selected == this.props.userdata.id){
      borderStyle = '2px solid #B8F2E6';
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





export default App;
