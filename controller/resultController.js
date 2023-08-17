const resultModel = require("../model/resultModel")
const studentModel = require("../model/studentModel")

const createResult = async(req, res) => {
    try {
        const student = await studentModel.findById(req.params.id)
        const { Year, subjectNames1, classAssesement1, test1, exams1, subTotal1, 
            subjectNames2, classAssesement2, test2, exams2, subTotal2,
            subjectNames3, classAssesement3, test3, exams3, subTotal3,
            subjectNames4, classAssesement4, test4, exams4, subTotal4,
            subjectNames5, classAssesement5, test5, exams5, subTotal5,
            subjectNames6, classAssesement6, test6, exams6, subTotal6,
            subjectNames7, classAssesement7, test7, exams7, subTotal7,
            subjectNames8, classAssesement8, test8, exams8, subTotal8,
            subjectNames9, classAssesement9, test9, exams9, subTotal9,
            subjectNames10, classAssesement10, test10, exams10, subTotal10,
            resultTotal, teacherRemark } = req.body

        const result = await resultModel.create(req.body)
        
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

const oneResult = async(req, res) => {
    try {
        const resultId = req.params.id
        const result = await resultModel.findById(resultId)

        if (!result) {
            res.status(404).json({
                message: `${result} not found`,
            })
        } else {
            res.status(200).json({
                message: `${result._id}`
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}


const deleteResult = async(req, res) => {
    try {
        const id = req.params.id
        const result = await resultModel.findByIdAndDelete(id)

        res.status(200).json({
            message: "result deleted sucessfully",
            data: result
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })  
    }
}

module.exports = {
    createResult,
    AllResult,
    deleteResult,
    oneResult
}