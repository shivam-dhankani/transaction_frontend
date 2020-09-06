import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment'

class Transaction extends Component {
    constructor() {
        super();
        this.state = {
            showForm:false,
            transactions:[{
                _id:'',
                createdAt:'',
                amount:''
            }],
            type:1,
            amount:0,
            description:''            
        };
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        axios.get(`http://localhost:3007/getTransaction`, {}).then((result) => {
            if(result.data && result.data.length > 0){
            this.setState({transactions:result.data})
            }
        })
    }
    renderTableData() {
        return this.state.transactions.map((transaction, index) => {
           const { _id, createdAt,amount,description,total,type } = transaction //destructuring
           if(type == 1){
           return (
              <tr key={_id}>
                 <td>{moment(createdAt).format('YYYY-MM-DD') }</td>
                 <td>-</td>
                 <td>{amount}</td>
                 <td>{description}</td>
                 <td>{total}</td>
              </tr>
           )}
           else{
            return (
                <tr key={_id}>
                   <td>{moment(createdAt).format('YYYY-MM-DD') }</td>
                   <td>{amount}</td>
                   <td>-</td>
                   <td>{description}</td>
                   <td>{total}</td>
                </tr>
             )
           }
        })
     }
     showForm = () => {
         if(this.state)
        this.setState({showForm:true})
     }
     updateAmount = (evt)=>{
         this.setState({
             amount:evt.target.value
         })
     }
     _handleChange = (evt)=>{
        this.setState({ type: evt.target.value })
     }
     updateDesc = (evt) =>{
         this.setState({
            description:evt.target.value
         })
     }
     handleSubmit(event) {
        axios.post(`http://localhost:3007/addTransaction`, {
            description:this.state.description,
            amount:this.state.amount,
            type:this.state.type
        }).then((result) => {
        })
       }
     render() {
         console.log(this.state)
        const showForm = this.state.showForm;
        return (
           <div>
              <table id='students'>
              <th key='head'>Date</th>
              <th key='head'>credit</th>
              <th key='head'>debit</th>
              <th key='head'>description</th>
              <th key='head'>total</th>
                 <tbody>
                    {this.renderTableData()}
                 </tbody>
              </table>
              <button onClick={this.showForm}>Add transaction</button> 
              { showForm ?<form onSubmit={this.handleSubmit}>
                <label for="tran">Choose Transaction</label>
                    <select id="tran" onChange={this._handleChange}>
                    <option value="1">debit</option>
                    <option value="2">credit</option>
                    </select><br/>
                    <label for="amount">Amount</label>
                    <input value={this.state.amount} onChange={this.updateAmount} /><br/>
                    <label for="desc">description</label>
                    <input value={this.state.description} onChange={this.updateDesc}/><br/>
                    <input type="submit" value="Submit"/>
              </form> : null }
           </div>
          
        )
        
     }
}

export default Transaction;