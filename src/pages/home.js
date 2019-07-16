import React, { Component } from 'react'
import './home.css';
import {getAllPosts,changeActivePage} from '../redux/actions/postActions'
import {connect} from 'react-redux'
class home extends Component {
 
    componentDidMount(){
        let start=this.props.activePage*10;
        // console.log(start);
        this.props.getAllPosts(start);
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.activePage !== this.props.activePage){
        let start=this.props.activePage*10;
            this.props.getAllPosts(start);
        }
    }



    renderPosts=()=>{
        return this.props.posts.map(post=>{
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
        this.props.changeActivePage(index);
    }


    renderPagination=()=>{
        let links=[];
        for(let i=0;i<this.props.totalCount/10;i++){
            links.push(<button key={i} style={{margin:"0 5px"}}
                onClick={()=>this.changePage(i)}
                className={`${this.props.activePage===i?'active':''}`}
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

const mapStateToProps=state=>({
    posts:state.post.posts,
    activePage:state.post.activePage,
    totalCount:state.post.totalCount,
    UI:state.UI
})

const MapDispatchToProps=dispatch=>({
    getAllPosts:(start)=>dispatch(getAllPosts(start)),
    changeActivePage:(index)=>dispatch(changeActivePage(index))
    
})

export default connect(mapStateToProps,MapDispatchToProps)(home);