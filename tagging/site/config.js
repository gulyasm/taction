module.exports = function(){
    switch(process.env.NODE_ENV){
        case 'development':
            return {
                db_name: 'sentiment_dev'
                , port: 8087
            };

        case 'production':
            return {
                db_name: 'sentiment'
                , port: 8086
            };

        default:
            throw new Error('NODE_ENV not recognized: ' + NODE_ENV)
    }
};