import { Link } from "react-router-dom";
import React,{useEffect,useState} from "react";
import Menu from "./Menu";
import Footer from "./Footer";
import apiUrl from '../config/apiUrl';
function News(){
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    const getNews = ()=>{
        apiUrl.get("/news").then((response)=>{            
                setNews(response.data);
                setLoading(false);            
        }).catch((err)=>{
            console.log(err);
        })

    }

  useEffect(() => {
    getNews();
    }, [])


    return (
        <div className="container">
            <Menu/>
            <div className="row">
                <div className="col-md-12">
                    <h1>News List</h1>
                </div>
            </div>

            <div className="row">
                {loading ? <div className="col-md-12">Loading...</div>
                 : news && news.map((item,index)=>{
                    return (
                        <div key={index} className="col-md-3">
                            <div className="card">
                                <img src={item.image} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{item.title}</h5>
                                    <p className="card-text">{item.description}</p>
                                    <Link to={"/news-details/"+item._id} className="btn btn-primary">Read More</Link>
                                </div>
                            </div>
                        </div>
                    )
                })
                }
               
                
            </div> 
            <Footer/>           
        </div>
    
    )
}

export default News;