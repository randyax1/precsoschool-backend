const courseModel = require("../models/course.model");

const createCourse = async (req, res) => {

    const course = new courseModel( req.body );

    try {

        const courseSaved = await course.save();

        res.json({
            ok: true,
            course: courseSaved
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator',
        })
    }

}

const getCourses = async (req, res) => {

    const events = await courseModel.find();

    res.json({
        ok: true,
        events
    })
}

const updateCourse = async (req, res) => {

    const courseId = req.params.id;

    try {

        const course = await courseModel.findById( courseId );

        if( !course ){
            return res.status(404).json({
                ok: false,
                msg: 'The course dont exist with that id.'
            });
        }

        const newCourse = {
            ...req.body
        }
        
        //new: true es para que traiga el evento actualizado al momento en postman
        const courseUpdated = await courseModel.findByIdAndUpdate( courseId, newCourse, { new: true } );

        res.json({
            ok: true,
            course: courseUpdated
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }

}

const deleteCourse = async (req, res) => {

    const courseId = req.params.id;

    try {

        const course = await courseModel.findById( courseId );

        if( !course ){
            return res.status(404).json({
                ok: false,
                msg: 'The course dont exist with that id.'
            });
        }

        const courseDeleted = await courseModel.findByIdAndDelete( courseId );

        res.json({
            ok: true,
            msg:'Course deleted',
            course: courseDeleted
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }

}

module.exports = {
    createCourse,
    getCourses,
    updateCourse,
    deleteCourse
}