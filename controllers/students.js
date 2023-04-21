// const Student = require("../studentdata")
const Student = require("../model");

const getStudents = async (req, res) => {
    try {
        const student = await Student.find();
        console.log(student)
        res.status(200).json(student);
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log("err in getting all student")
    }
}

const getspecStudent = async (req, res) => {
    const roll = req.params.roll;
    try {
        const stud = await Student.findOne({ roll: roll });
        if (!stud)
            res.status(404).json("student not exist")
        else {
                res.status(200).json(stud);
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log("roll err")
    }
}

const createstudent = async (req, res) => {
    const newstudent = new Student({
        name: req.body.name,
        roll: req.body.roll,
        registration: req.body.registration,
        subjects: req.body.subjects,
        created_on: req.body.created_on
    })
    try {
        await newstudent.save();
        res.status(201).json(newstudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updatestudent = async (req, res) => {
    const roll = req.params.roll;
    try {
        const stud = await Student.findOne({ roll: roll });
        if (!stud)
            res.status(404).json("student not exist")
        else
        {
            stud.name = req.body.name,
            stud.registration= req.body.registration,
            stud.subjects= req.body.subjects,
            res.status(200).json(stud);
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log("roll err")
    }
}

const deletestudent = async (req, res) => {
    const roll = req.params.roll;
    console.log(roll)
    try {
        const stud = await Student.findOne({ roll: roll });
        if (stud != null) {
            await Student.deleteOne({ roll: roll });
            return res.status(200).json({ message: "Successfully Deleted" });
        } else
            return res.status(404).json({ message: "no student having roll no : " +roll+ " not found" });
    } catch (err) {
        console.log(err);
    }
    
};
module.exports = {getStudents,getspecStudent,createstudent,deletestudent,updatestudent};
