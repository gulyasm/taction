db.comments.find().forEach(function(d) {
        var r =  Math.random();
        db.comments.update({_id: d._id},{$set: {random :r}},{multi: true})
    })