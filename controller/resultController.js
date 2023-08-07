const resultModel = require("../model/resultModel")
const studentModel = require("../model/studentModel")

const createResult = async(req, res) => {
    try {
        const student = await studentModel.findById(req.params.id)
        const { Year, subjectNames1, classAssesement, test1, exams1, subTotal1, teacherRemark } = req.body

        const body = new resultModel({
            Year, 
            subjectNames1, 
            classAssesement,
            test1, 
            exams1, 
            subTotal1, 
            teacherRemark
        })


        const result = await body.save()
        
        student.result.push(result)
        student.save()
        result.save()

        res.status(201).json({
            message: "result created sucessfully",
            data: result
        })

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

const AllResult = async(req, res) => {
    try {
        const AllResult = await resultModel.find()

        res.status(404).json({
            message: "all result available are " + AllResult.length,
            data: AllResult
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}


module.exports = {
    createResult,
    AllResult
}