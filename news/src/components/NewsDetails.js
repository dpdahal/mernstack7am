import React,{useEffect,useState} from "react";
import Menu from "./Menu";
import Footer from "./Footer";
import apiUrl from '../config/apiUrl';
import { useParams } from "react-router-dom";
function NewsDetails(){
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    const getNews = ()=>{
        apiUrl.get(`/news/${id}`).then((response)=>{            
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
                    {loading ? <div>Loading...</div>
                    : <div>
                        <h1>{news.title}</h1>
                        <img src={news.image} alt={news.title} />
                        <hr/>
                        <p>{news.category_id.title}</p>
                        <p>{news.description}</p>
                    </div>
                    }
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default NewsDetails;