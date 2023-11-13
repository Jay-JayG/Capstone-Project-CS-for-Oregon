import mongoose from "mongoose";

const gradesSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    student_id: { type: Number },
    scores: [
        {
            type: { type: String },
            scores: { type: Number }
        }
    ],
    class_id: { type: Number }
},
{
    timestamps: true,
});

const gradesModel = mongoose.model("grades", gradesSchema);
export default gradesModel;
