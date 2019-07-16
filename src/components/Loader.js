import React from 'react'

function Loader() {
    return (
        <div className="page-loader"
            style={
                {
                    position:"fixed",
                    zIndex:"9",             
                    background:"rgba(255, 255, 255, 0.75) none repeat scroll 0% 0%",
                    right:"0",
                    top: "0",
                    bottom:"0",
                    display:"flex",
                    left:"0"
                }
            }
        >
            <div className="spinner-border text-info" style={{borderWidth: "0.4rem",margin:"auto", width:"3rem",height:"3rem"}}></div>
        </div>
    )
}

export default Loader
