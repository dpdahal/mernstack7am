import News from "../models/News.js";

class NewsController{

    async index(req, res){
        try{
            // const news = await News.find({}).populate("category_id");
            let newsData = await News.aggregate([
                {
                    $lookup:{
                        from:"categories",
                        localField:"category_id",
                        foreignField:"_id",
                        as:"category"
                    }
                },
                {
                    $unwind:"$category"
                }
            ]);

            newsData = newsData.map((news_res) => {
                if (news_res.image) {
                    news_res.image = process.env.BASE_URL + "/uploads/news/" + news_res.image;
                } else {
                    news_res.image = process.env.BASE_URL + "/uploads/icons/a.jpg";
                }
                return news_res;
            });  
          return  res.status(200).json(newsData);
        }catch(err){
            res.send(err);
        }
    }

    async show(req, res){
        try{
            const news = await News.findById(req.params.id).populate("category_id");
            if (news.image) {
                news.image = process.env.BASE_URL + "/uploads/news/" + news.image;
            } else {
                news.image = process.env.BASE_URL + "/uploads/icons/a.jpg";
            }
            res.status(200).json(news);
        }catch(err){
            res.send(err);
        }
    }

    async store(req, res){
        try{
            let imageName="";
            if(req.file){
                imageName= req.file.filename;
            }
            console.log(req.body);
            const news  = new News({...req.body,image:imageName});
            await news.save();
            const sendData={
                "message":"News Created Successfully",
                "success":true,
            }
            return res.status(200).json(sendData);
        }catch(err){
            return res.status(500).json(err);
        }
    }

    async update(req, res){
        try{
          
            if(req.file){
               let imageName= req.file.filename;
            }
            const news = await News.findByIdAndUpdate(req.params.id, {...req.body,image:imageName});
            const sendData={
                "message":"News Updated Successfully",
                "success":true,
            }
            return res.status(200).json(sendData);
        }catch(err){
            return res.status(500).json(err);
        }
    }

    async destroy(req, res){
        try{
            const news = await News.findByIdAndDelete(req.params.id);
            const sendData={
                "message":"News Deleted Successfully",
                "success":true,
            }
            return res.status(200).json(sendData);
        }catch(err){
            return res.status(500).json(err);
        }
    }

}

export default  NewsController;