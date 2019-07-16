import React, { Component } from 'react'
import axios from 'axios';
import './home.css';
export default class home extends Component {
    state={
        posts:[],
        activePage:0,
        totalCount:0
    }
 
    componentDidMount(){
        let start=this.state.activePage*10;
        console.log(start);
        axios.get(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=10`)
        .then((res)=>{
            console.log(res.data);
                this.setState({
                    posts:res.data,
                    totalCount:res.headers["x-total-count"]
                })
        })
        .catch(err=>{
            console.log(err);
        })
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.activePage !== this.state.activePage){
        let start=this.state.activePage*10;
        console.log(start);
        axios.get(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=10`)
        .then((res)=>{
            console.log(res.data);
                this.setState({
                    posts:res.data,
                    totalCount:res.headers["x-total-count"]
                })
        })
        .catch(err=>{
            console.log(err);
        })
    }
    }



    renderPosts=()=>{
        return this.state.posts.map(post=>{
            return(
                <div className="card mb-3" key={post.id}>
                    <div className="card-header"><h4 className="card-title">{post.title}</h4></div>
                        <div className="card-body">
                            <p className="card-text">{post.body}</p>
                        </div>
                </div>
            )
        })
    }
    changePage=(index)=>{
        console.log(index);
        this.setState({
            activePage:index
        })
    }


    renderPagination=()=>{
        let links=[];
        for(let i=0;i<this.state.totalCount/10;i++){
            links.push(<button key={i} style={{margin:"0 5px"}}
                onClick={()=>this.changePage(i)}
                className={`${this.state.activePage===i?'active':''}`}
            >
            {i+1}
        </button>);
        }
        return links;
    }
    render() {
        return (
            <div className="container">
                <h2 className="text-center text-uppercase">Posts</h2>
                {this.renderPosts()}
                <div className="pagination" style={{display:"flex",justifyContent:"center"}}>
                    {this.renderPagination()}
                </div>
                
            </div>
        )
    }
}
